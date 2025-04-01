import { Request, Response } from 'express';
import { Attendance, IAttendance } from '../models/Attendance';
import { Event } from '../models/Event';
import { AttendeeStatus } from '../enums/AttendeeStatus';
import { Types } from 'mongoose';
import { formatEventDate } from '../utils/dateUtils';

interface MongoError extends Error {
  code?: number;
}

export class AttendanceController {
  public checkIn = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { eventId, userId: userIdStr, checkInMethod, location, deviceInfo } = req.body;
      // Convertendo o ID do usuário para ObjectId
      const userId = Types.ObjectId.createFromHexString(userIdStr);

      // Verificar se o evento existe e está ativo
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const now = new Date();
      if (now < event.startDate || now > event.endDate) {
        return res.status(400).json({ error: 'Event is not currently active' });
      }

      // Verificar se o usuário está registrado no evento
      const attendee = event.attendees.find(a => a.userId.equals(userId));
      if (!attendee) {
        return res.status(400).json({ error: 'User is not registered for this event' });
      }

      // Criar registro de presença
      const attendance = await Attendance.create({
        eventId,
        userId,
        checkInMethod,
        checkInTime: now,
        location,
        deviceInfo,
        synced: true,
      });

      // Atualizar o status do participante para "presente"
      attendee.status = AttendeeStatus.ATTENDED;
      await event.save();

      return res.status(201).json(attendance);
    } catch (error) {
      console.error('Error recording attendance:', error);
      if ((error as MongoError).code === 11000) { // Duplicate key error
        return res.status(400).json({ error: 'Attendance already recorded' });
      }
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Error recording attendance' });
    }
  }

  public getEventAttendance = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { eventId } = req.params;
      const attendances = await Attendance.find({ eventId })
        .populate('userId', 'name email')
        .sort({ checkInTime: -1 });
      
      return res.json(attendances);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      return res.status(500).json({ error: 'Error fetching attendance records' });
    }
  }

  public getUserAttendance = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.params;
      const attendances = await Attendance.find({ userId })
        .populate('eventId', 'title startDate endDate')
        .sort({ checkInTime: -1 });
      
      return res.json(attendances);
    } catch (error) {
      console.error('Error fetching user attendance:', error);
      return res.status(500).json({ error: 'Error fetching attendance records' });
    }
  }

  public syncOfflineAttendance = async (req: Request, res: Response): Promise<Response> => {
    try {
      const attendances = req.body.attendances;
      if (!attendances || !Array.isArray(attendances)) {
        return res.status(400).json({ error: 'Invalid attendance data' });
      }
      const results = await Promise.all(
        attendances.map(async (attendance: any) => {
          try {
            const event = await Event.findById(attendance.eventId);
            if (!event) {
              return { ...attendance, error: 'Event not found' };
            }

            const now = new Date(attendance.checkInTime);
            if (now < event.startDate || now > event.endDate) {
              return { ...attendance, error: 'Check-in time outside event window' };
            }

            const userId = Types.ObjectId.createFromHexString(attendance.userId);
            const saved = await Attendance.create({
              ...attendance,
              userId,
              synced: true
            });

            const attendee = event.attendees.find(a => 
              a.userId.equals(attendance.userId)
            );
            if (attendee) {
              attendee.status = AttendeeStatus.ATTENDED;
              await event.save();
            }

            return { ...attendance, success: true, _id: saved._id };
          } catch (error) {
            return { 
              ...attendance, 
              error: (error as MongoError).code === 11000 ? 'Duplicate attendance' : 'Failed to sync' 
            };
          }
        })
      );

      return res.status(200).json({
        success: results.filter(r => r.success).length,
        failed: results.filter(r => r.error).length,
        results
      });
    } catch (error) {
      console.error('Error syncing attendance:', error);
      return res.status(500).json({ error: 'Error syncing attendance records' });
    }
  }
}

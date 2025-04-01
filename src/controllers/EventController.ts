import { Request, Response } from 'express';
import { Event, IEvent } from '../models/Event';
import { Types } from 'mongoose';
import { AttendeeStatus } from '../enums/AttendeeStatus';

export class EventController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const event: IEvent = await Event.create({
        ...req.body,
        qrCodeData: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // Simple QR code data generation
      });
      return res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Error creating event' });
    }
  }

  public findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const events: IEvent[] = await Event.find()
        .populate('createdBy', 'name email')
        .populate('attendees.userId', 'name email');
      return res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Error fetching events' });
    }
  }

  public findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const event: IEvent | null = await Event.findById(req.params.id)
        .populate('createdBy', 'name email')
        .populate('attendees.userId', 'name email');
      
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      
      return res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      return res.status(500).json({ error: 'Error fetching event' });
    }
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const event: IEvent | null = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      return res.json(event);
    } catch (error) {
      console.error('Error updating event:', error);
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Error updating event' });
    }
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const event: IEvent | null = await Event.findByIdAndDelete(req.params.id);
      
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ error: 'Error deleting event' });
    }
  }

  public register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const userId = new Types.ObjectId(req.body.userId);
      
      // Check if user is already registered
      if (event.attendees.some(a => a.userId.equals(userId))) {
        return res.status(400).json({ error: 'User already registered' });
      }

      // Check if event is full
      if (event.attendees.length >= event.maxParticipants) {
        // Add to waiting list
        event.waitingList.push({
          userId,
          registeredAt: new Date()
        });
        await event.save();
        return res.status(200).json({ message: 'Added to waiting list' });
      }

      // Register user
      event.attendees.push({
        userId,
        status: AttendeeStatus.REGISTERED
      });
      
      await event.save();
      return res.status(200).json({ message: 'Successfully registered' });
    } catch (error) {
      console.error('Error registering for event:', error);
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Error registering for event' });
    }
  }

  public updateAttendeeStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { eventId, userId, status } = req.body;
      
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const attendee = event.attendees.find(a => a.userId.equals(new Types.ObjectId(userId)));
      if (!attendee) {
        return res.status(404).json({ error: 'Attendee not found' });
      }

      attendee.status = status;
      await event.save();

      return res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
      console.error('Error updating attendee status:', error);
      return res.status(400).json({ error: error instanceof Error ? error.message : 'Error updating attendee status' });
    }
  }
}

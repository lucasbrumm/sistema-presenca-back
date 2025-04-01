import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Notification } from '../models/Notification';

export class NotificationController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const notification = await Notification.create(req.body);
      return res.status(201).json(notification);
    } catch (error) {
      console.error('Error creating notification:', error);
      return res.status(400).json({ error: 'Error creating notification' });
    }
  };

  public getUserNotifications = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = Types.ObjectId.createFromHexString(req.params.userId);
      const notifications = await Notification.find({ userId })
        .sort({ createdAt: -1 });
      return res.json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(400).json({ error: 'Error fetching notifications' });
    }
  };

  public markAsRead = async (req: Request, res: Response): Promise<Response> => {
    try {
      const notificationId = Types.ObjectId.createFromHexString(req.params.id);
      const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { 
          read: true,
          readAt: new Date()
        },
        { new: true }
      );

      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }

      return res.json(notification);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return res.status(400).json({ error: 'Error updating notification' });
    }
  };

  public markAllAsRead = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = Types.ObjectId.createFromHexString(req.params.userId);
      const result = await Notification.updateMany(
        { userId, read: false },
        { 
          read: true,
          readAt: new Date()
        }
      );

      return res.json({ 
        modified: result.modifiedCount,
        message: 'Notifications marked as read'
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return res.status(400).json({ error: 'Error updating notifications' });
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const notificationId = Types.ObjectId.createFromHexString(req.params.id);
      const notification = await Notification.findByIdAndDelete(notificationId);

      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }

      return res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error('Error deleting notification:', error);
      return res.status(400).json({ error: 'Error deleting notification' });
    }
  };
}

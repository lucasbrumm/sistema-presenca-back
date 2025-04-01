import { Types } from 'mongoose';
import { Notification } from '../models/Notification';
import { NotificationType } from '../enums/NotificationType';
import { RelatedToType } from '../enums/RelatedToType';
import { IEvent } from '../models/Event';

interface CreateNotificationDTO {
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  relatedTo: {
    type: RelatedToType;
    id: Types.ObjectId;
  };
}

export class NotificationService {
  public async sendEventReminder(event: IEvent) {
    const attendees = event.attendees;
    const notifications = [];

    for (const attendee of attendees) {
      const notification = await this.create({
        userId: attendee.userId,
        title: 'Event Reminder',
        message: `Reminder: The event "${event.title}" is happening soon!`,
        type: NotificationType.REMINDER,
        relatedTo: {
          type: RelatedToType.EVENT,
          id: event.id
        }
      });
      notifications.push(notification);
    }

    return notifications;
  }

  public async sendAttendanceConfirmation(userId: Types.ObjectId, event: IEvent) {
    return this.create({
      userId,
      title: 'Attendance Confirmed',
      message: `Your attendance for "${event.title}" has been confirmed.`,
      type: NotificationType.UPDATE,
      relatedTo: {
        type: RelatedToType.EVENT,
        id: event.id
      }
    });
  }

  public async sendUpdateNotification(userId: Types.ObjectId, event: IEvent, message: string) {
    return this.create({
      userId,
      title: 'Event Update',
      message,
      type: NotificationType.UPDATE,
      relatedTo: {
        type: RelatedToType.EVENT,
        id: event.id
      }
    });
  }

  public async markAsRead(notificationId: Types.ObjectId) {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { 
        read: true,
        readAt: new Date()
      },
      { new: true }
    );

    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  }

  public async create(notificationData: CreateNotificationDTO) {
    try {
      const notification = await Notification.create(notificationData);
      // Aqui poderia ser integrado com um serviço de push notifications
      // como Firebase Cloud Messaging ou similar
      return notification;
    } catch (error) {
      throw error;
    }
  }
}

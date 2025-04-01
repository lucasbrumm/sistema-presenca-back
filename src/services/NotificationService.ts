import { Types } from 'mongoose';
import { NotificationType } from '../enums/NotificationType';
import { RelatedToType } from '../enums/RelatedToType';

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
  public async create(notificationData: CreateNotificationDTO) {
    try {
      // Por enquanto apenas logamos a notificação
      console.log('Notification sent:', notificationData);
      return notificationData;
    } catch (error) {
      throw error;
    }
  }
}

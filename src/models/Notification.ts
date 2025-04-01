import { Schema, model, Document, Types } from 'mongoose';
import { NotificationType } from '../enums/NotificationType';
import { RelatedToType } from '../enums/RelatedToType';

export interface INotification extends Document {
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  relatedTo: {
    type: RelatedToType;
    id: Types.ObjectId;
  };
  read: boolean;
  readAt?: Date;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(NotificationType),
    required: true
  },
  relatedTo: {
    type: {
      type: String,
      enum: Object.values(RelatedToType),
      required: true
    },
    id: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Notification = model<INotification>('Notification', notificationSchema);

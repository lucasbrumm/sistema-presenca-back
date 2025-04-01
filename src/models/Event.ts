import { Schema, model, Document, Types } from 'mongoose';
import { EventType } from '../enums/EventType';
import { EventCategory } from '../enums/EventCategory';
import { AttendeeStatus } from '../enums/AttendeeStatus';

interface ILocation {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface IAttendee {
  userId: Types.ObjectId;
  status: AttendeeStatus;
}

interface IWaitingList {
  userId: Types.ObjectId;
  registeredAt: Date;
}

export interface IEvent extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: ILocation;
  maxParticipants: number;
  createdBy: Types.ObjectId;
  type: EventType;
  category: EventCategory;
  qrCodeData: string;
  attendees: IAttendee[];
  waitingList: IWaitingList[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    name: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  maxParticipants: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(EventType),
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(EventCategory),
    required: true,
  },
  qrCodeData: {
    type: String,
    required: true,
    unique: true,
  },
  attendees: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AttendeeStatus),
      required: true,
    },
  }],
  waitingList: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

export const Event = model<IEvent>('Event', eventSchema);

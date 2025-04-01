import { Schema, model, Document, Types } from 'mongoose';
import { CheckInMethod } from '../enums/CheckInMethod';

interface ILocation {
  lat: number;
  lng: number;
}

export interface IAttendance extends Document {
  eventId: Types.ObjectId;
  userId: Types.ObjectId;
  checkInMethod: CheckInMethod;
  checkInTime: Date;
  location: ILocation;
  deviceInfo: Record<string, any>;
  synced: boolean;
}

const attendanceSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  checkInMethod: {
    type: String,
    enum: Object.values(CheckInMethod),
    required: true,
  },
  checkInTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  deviceInfo: {
    type: Schema.Types.Mixed,
    required: true,
  },
  synced: {
    type: Boolean,
    default: false,
  },
});

// para previnir check-ins duplicados
attendanceSchema.index({ eventId: 1, userId: 1 }, { unique: true });

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);

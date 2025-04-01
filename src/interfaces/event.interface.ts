import { Types } from 'mongoose';
import { EventType, EventCategory } from '../enums/EventType';

export interface CreateEventDTO {
  title: string;
  description: string;
  type: EventType;
  category: EventCategory;
  location: string;
  startDate: Date;
  endDate: Date;
  maxAttendees?: number;
  createdBy: Types.ObjectId;
}

export interface UpdateEventDTO {
  title?: string;
  description?: string;
  type?: EventType;
  category?: EventCategory;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  maxAttendees?: number;
}

export interface RegisterForEventDTO {
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
}

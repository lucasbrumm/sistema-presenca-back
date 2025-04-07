import { Schema, model, Document } from 'mongoose';
import { UserRole } from '../enums/UserRole';

export interface IUser extends Document {
  name: string;
  email: string;
  firebaseUid: string;
  course: string;
  registration: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firebaseUid: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    registration: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: Object.values(UserRole), default: UserRole.ALUNO },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>('User', userSchema);

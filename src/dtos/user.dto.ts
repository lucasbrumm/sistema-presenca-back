import { UserRole } from '../enums/UserRole';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  course?: string;
  registration: string;
  role?: UserRole;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  course?: string;
  registration?: string;
  role?: UserRole;
}

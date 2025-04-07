import { UserRole } from '../enums/UserRole';

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  course?: string;
  registration?: string;
  role?: UserRole;
}

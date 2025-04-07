export interface IUser {
  name: string;
  email: string;
  firebaseUid: string;
  course: string;
  registration: string;
  role: string;
}

export interface IUserWithToken {
  user: IUser;
  token: string;
}

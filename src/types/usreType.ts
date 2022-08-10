export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
  token?: string;
}

import { IUser } from "./usreType";

export interface IComments {
  _id: string;
  text: string;
  post: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

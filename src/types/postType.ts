import { IUser } from "./usreType";

export interface IPost {
  _id: string;
  title: string;
  text: string;
  description: string;
  photoUrl: string;
  views: number;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

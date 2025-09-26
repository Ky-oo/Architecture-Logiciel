import type {
  IUser,
  IUserCreate,
  IUserUpdate,
} from "../models/interfaces/User.interfaces.ts";

export interface IUserService {
  getUsers(): Promise<IUser[]>;
  createUser(body: IUserCreate): Promise<IUser>;
  updateUser(body: IUserUpdate, userId: string): Promise<IUser>;
  deleteUser(userId: string): Promise<void>;
}

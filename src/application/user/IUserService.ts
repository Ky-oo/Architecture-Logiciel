import type { IUser, IUserCreate, IUserUpdate } from "../../domain/user/IUser";

export interface IUserService {
  getUsers(): Promise<IUser[]>;
  createUser(body: IUserCreate): Promise<IUser>;
  updateUser(body: IUserUpdate, userId: string): Promise<IUser>;
  deleteUser(userId: string): Promise<void>;
}

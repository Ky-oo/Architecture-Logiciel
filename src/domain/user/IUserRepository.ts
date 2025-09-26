import type { IUser, IUserCreate, IUserUpdate } from "./IUser";

export interface IUserRepository {
  getUsers(): Promise<IUser[]>;
  getUserByPk(userId: string): Promise<IUser | null>;
  createUser(body: IUserCreate): Promise<IUser>;
  updateUser(body: IUserUpdate, userId: string): Promise<IUser>;
  deleteUser(userId: string): Promise<void>;
}

export { IUser, IUserCreate, IUserUpdate };

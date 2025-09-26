import type { IUser, IUserCreate, IUserUpdate } from "../../domain/user/IUser";
import type { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/User.ts";
import UserModel from "./UserModel.ts";

export class UserRepository implements IUserRepository {
  async getUsers(): Promise<IUser[]> {
    const users = await UserModel.findAll();
    return users.map((u: any) => u.toJSON());
  }

  async getUserByPk(userId: string): Promise<IUser | null> {
    const user = await UserModel.findByPk(userId);
    return user ? user.toJSON() : null;
  }

  async createUser(body: IUserCreate): Promise<IUser> {
    // Assign role using domain logic
    const role = User.assignRole(body.email);
    const user = await UserModel.create({ ...body, role });
    return user.toJSON();
  }

  async updateUser(body: IUserUpdate, userId: string): Promise<IUser> {
    const user = await UserModel.findByPk(userId);
    if (!user) throw new Error("User not found");
    await user.update(body);
    return user.toJSON();
  }

  async deleteUser(userId: string): Promise<void> {
    await UserModel.destroy({ where: { id: userId } });
  }
}

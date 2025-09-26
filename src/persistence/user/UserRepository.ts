import type { IUser, IUserCreate, IUserUpdate } from "../../domain/user/IUser";
import type { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/User.ts";

export class UserRepository implements IUserRepository {
  // Remplacer par ORM réel si besoin
  private users: IUser[] = [];

  async getUsers(): Promise<IUser[]> {
    return this.users;
  }

  async getUserByPk(userId: string): Promise<IUser | null> {
    return this.users.find((u) => u.id === Number(userId)) || null;
  }

  async createUser(body: IUserCreate): Promise<IUser> {
    const user = new User({ ...body, id: this.users.length + 1 });
    this.users.push(user);
    return user;
  }

  async updateUser(body: IUserUpdate, userId: string): Promise<IUser> {
    const user = await this.getUserByPk(userId);
    if (!user) throw new Error("User not found");
    Object.assign(user, body);
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== Number(userId));
  }
}

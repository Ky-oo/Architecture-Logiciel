import UserRepository from "../models/repositories/userRepository.ts";
import type {
  IUser,
  IUserCreate,
  IUserUpdate,
} from "../models/interfaces/User.interfaces.ts";
import { IUserService } from "../Interfaces/IUserService.ts";

class UserService implements IUserService {
  async getUsers(): Promise<IUser[]> {
    return await UserRepository.getUsers();
  }

  async createUser(body: IUserCreate): Promise<IUser> {
    const { firstname, lastname, email, phoneNumber } = body;
    const newUser = await UserRepository.createUser({
      firstname,
      lastname,
      email,
      phoneNumber,
    });
    return newUser;
  }

  async updateUser(body: IUserUpdate, userId: string): Promise<IUser> {
    const user = await UserRepository.updateUser(body, userId);
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    await UserRepository.deleteUser(userId);
  }
}

export default new UserService();

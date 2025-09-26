import type { IUser, IUserCreate, IUserUpdate } from "../../domain/user/IUser";
import type { IUserRepository } from "../../domain/user/IUserRepository";
import type { IUserService } from "./IUserService";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUsers(): Promise<IUser[]> {
    return await this.userRepository.getUsers();
  }

  async createUser(body: IUserCreate): Promise<IUser> {
    return await this.userRepository.createUser(body);
  }

  async updateUser(body: IUserUpdate, userId: string): Promise<IUser> {
    return await this.userRepository.updateUser(body, userId);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.deleteUser(userId);
  }
}

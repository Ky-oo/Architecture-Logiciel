import type { IHandler } from "./IMediator.ts";
import { CreateUserCommand } from "./CreateUserCommand.ts";
import { UserService } from "../application/user/UserService.ts";
import type { IUser } from "../domain/user/IUser";

export class CreateUserHandler implements IHandler<CreateUserCommand, IUser> {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  async handle(command: CreateUserCommand): Promise<IUser> {
    return await this.userService.createUser(command.body);
  }
}

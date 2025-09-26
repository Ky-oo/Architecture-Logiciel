import type { ICommand } from "./IMediator.ts";
import type { IUserCreate } from "../domain/user/IUser";

export class CreateUserCommand implements ICommand<any> {
  public readonly body: IUserCreate;
  constructor(body: IUserCreate) {
    this.body = body;
  }
}

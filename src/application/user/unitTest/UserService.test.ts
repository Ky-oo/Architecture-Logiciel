import { UserService } from "../UserService";
import type {
  IUser,
  IUserCreate,
  IUserUpdate,
} from "../../../domain/user/IUser";
import type { IUserRepository } from "../../../domain/user/IUserRepository";
import "@jest/globals";

describe("UserService", () => {
  let userRepository: jest.Mocked<IUserRepository>;
  let userService: UserService;

  beforeEach(() => {
    userRepository = {
      getUsers: jest.fn(),
      getUserByPk: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };
    userService = new UserService(userRepository);
  });

  it("should get all users", async () => {
    const users: IUser[] = [
      {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@company.com",
        phoneNumber: "123",
        role: "Admin",
      },
    ];
    userRepository.getUsers.mockResolvedValue(users);
    const result = await userService.getUsers();
    expect(result).toEqual(users);
    expect(userRepository.getUsers).toHaveBeenCalled();
  });

  it("should create a user", async () => {
    const body: IUserCreate = {
      firstname: "Jane",
      lastname: "Doe",
      email: "jane@company.com",
      phoneNumber: "456",
    };
    const created: IUser = { ...body, id: 2, role: "Admin" };
    userRepository.createUser.mockResolvedValue(created);
    const result = await userService.createUser(body);
    expect(result).toEqual(created);
    expect(userRepository.createUser).toHaveBeenCalledWith(body);
  });

  it("should update a user", async () => {
    const body: IUserUpdate = {
      firstname: "Jane",
      lastname: "Smith",
      email: "jane@company.com",
      phoneNumber: "789",
      role: "Admin",
    };
    const updated: IUser = {
      id: 2,
      firstname: "Jane",
      lastname: "Smith",
      email: "jane@company.com",
      phoneNumber: "789",
      role: "Admin",
    };
    userRepository.updateUser.mockResolvedValue(updated);
    const result = await userService.updateUser(body, "2");
    expect(result).toEqual(updated);
    expect(userRepository.updateUser).toHaveBeenCalledWith(body, "2");
  });

  it("should delete a user", async () => {
    userRepository.deleteUser.mockResolvedValue();
    await userService.deleteUser("2");
    expect(userRepository.deleteUser).toHaveBeenCalledWith("2");
  });
});

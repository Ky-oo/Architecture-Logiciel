import { UserRepository } from "../UserRepository.ts";
import UserModel from "../UserModel.ts";
import { User } from "../../../domain/user/User.ts";
import type { IUserCreate, IUserUpdate } from "../../../domain/user/IUser.ts";

jest.mock("./UserModel.ts");
const mockedUserModel = UserModel as jest.Mocked<typeof UserModel>;

describe("UserRepository", () => {
  let repository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new UserRepository();
  });

  it("should get all users", async () => {
    mockedUserModel.findAll.mockResolvedValue([
      {
        toJSON: () => ({
          id: 1,
          firstname: "John",
          lastname: "Doe",
          email: "john@company.com",
          phoneNumber: "123",
          role: "Admin",
        }),
      } as any,
    ]);
    const users = await repository.getUsers();
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("john@company.com");
    expect(UserModel.findAll).toHaveBeenCalled();
  });

  it("should get user by pk", async () => {
    mockedUserModel.findByPk.mockResolvedValue({
      toJSON: () => ({
        id: 2,
        firstname: "Jane",
        lastname: "Doe",
        email: "jane@company.com",
        phoneNumber: "456",
        role: "Admin",
      }),
    } as any);
    const user = await repository.getUserByPk("2");
    expect(user?.id).toBe(2);
    expect(UserModel.findByPk).toHaveBeenCalledWith("2");
  });

  it("should return null if user not found by pk", async () => {
    mockedUserModel.findByPk.mockResolvedValue(null);
    const user = await repository.getUserByPk("99");
    expect(user).toBeNull();
    expect(UserModel.findByPk).toHaveBeenCalledWith("99");
  });

  it("should create a user and assign role", async () => {
    const body: IUserCreate = {
      firstname: "Alice",
      lastname: "Smith",
      email: "alice@company.com",
      phoneNumber: "789",
    };
    const created = { ...body, id: 3, role: "Admin" };
    mockedUserModel.create.mockResolvedValue({ toJSON: () => created } as any);
    const user = await repository.createUser(body);
    expect(user).toEqual(created);
    expect(UserModel.create).toHaveBeenCalledWith({
      ...body,
      role: User.assignRole(body.email),
    });
  });

  it("should update a user", async () => {
    const body: IUserUpdate = { firstname: "Bob" };
    const userInstance = {
      update: jest.fn().mockResolvedValue(undefined),
      toJSON: () => ({
        id: 4,
        firstname: "Bob",
        lastname: "Brown",
        email: "bob@company.com",
        phoneNumber: "000",
        role: "User",
      }),
    };
    mockedUserModel.findByPk.mockResolvedValue(userInstance as any);
    const user = await repository.updateUser(body, "4");
    expect(user.firstname).toBe("Bob");
    expect(userInstance.update).toHaveBeenCalledWith(body);
  });

  it("should throw if updating non-existent user", async () => {
    mockedUserModel.findByPk.mockResolvedValue(null);
    await expect(
      repository.updateUser({ firstname: "Ghost" }, "999")
    ).rejects.toThrow("User not found");
  });

  it("should delete a user", async () => {
    mockedUserModel.destroy.mockResolvedValue(1);
    await repository.deleteUser("5");
    expect(UserModel.destroy).toHaveBeenCalledWith({ where: { id: "5" } });
  });
});

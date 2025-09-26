import { User } from "../index.ts";
import type {
  IUser,
  IUserCreate,
  IUserUpdate,
} from "../interfaces/User.interfaces.ts";

const getUsers = async (): Promise<IUser[]> => {
  const users = await User.findAll();
  return users.map((user) => user.get() as IUser);
};

const getUserByPk = async (userId: string): Promise<IUser | null> => {
  const user = await User.findByPk(userId);
  if (!user) return null;
  return user.get() as IUser;
};

const createUser = async (body: IUserCreate): Promise<IUser> => {
  const { firstname, lastname, email, phoneNumber } = body;
  const newUser = await User.create({
    firstname,
    lastname,
    email,
    phoneNumber,
    role: email.split("@")[1] === "company.com" ? "Admin" : "User",
  });
  return newUser.get() as IUser;
};

const updateUser = async (
  body: IUserUpdate,
  userId: string
): Promise<IUser> => {
  const { firstname, lastname, email, phoneNumber, role } = body;
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  user.set({
    firstname: firstname || user.get("firstname"),
    lastname: lastname || user.get("lastname"),
    email: email || user.get("email"),
    phoneNumber: phoneNumber || user.get("phoneNumber"),
    role: role || user.get("role"),
  });

  await user.save();

  return user.get() as IUser;
};

const deleteUser = async (userId: string): Promise<void> => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");
  await user.destroy();
};

export default { getUsers, getUserByPk, createUser, updateUser, deleteUser };

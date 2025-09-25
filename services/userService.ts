const { User } = require("../models");
import {
  IUser,
  IUserCreate,
  IUserUpdate,
} from "../models/interfaces/User.interfaces";

const getUsers = async (): Promise<IUser> => {
  return await User.findAll();
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
  return newUser;
};

const updateUser = async (
  body: IUserUpdate,
  userId: string
): Promise<IUser> => {
  const { firstname, lastname, email, phoneNumber, role } = body;
  const user = User.findByPk(userId);

  user.firstname = firstname || user.firstname;
  user.lastname = lastname || user.lastname;
  user.email = email || user.email;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.role = role || user.role;

  await user.save;
  return user;
};

const deleteUser = async (userId: string): Promise<void> => {
  const user = User.findByPk(userId);
  await user.destroy();
};

module.exports = { getUsers, createUser, updateUser, deleteUser };

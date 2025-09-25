const { User } = require("../models");

const getUsers = async () => {
  return await User.findAll();
};

const createUser = async (body) => {
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

const updateUser = async (body, userId) => {
  const { firtname, lastname, email, phoneNumber } = req.body;
  const user = User.findByPk(userId);

  user.firstname = firtname || user.firstname;
  user.lastname = lastname || user.lastname;
  user.email = email || user.email;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  await user.save;
};

const deleteUser = async (userId) => {
  const user = User.findByPk(userId);
  await user.destroy();
};

module.exports = { getUsers, createUser, updateUser, updateUser, deleteUser };

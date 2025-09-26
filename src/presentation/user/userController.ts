import express from "express";
import { UserRepository } from "../../persistence/user/UserRepository.ts";
import { UserService } from "../../application/user/UserService.ts";

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

router.get("/", async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ users });
});

router.post("/", async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json({ newUser });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userService.updateUser(req.body, id);
  res.status(200).json({ user });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.status(204).end();
});

export default router;

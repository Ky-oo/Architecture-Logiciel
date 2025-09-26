import express from "express";
import { UserRepository } from "../../persistence/user/UserRepository.ts";
import { UserService } from "../../application/user/UserService.ts";
import { Mediator } from "../../mediator/Mediator.ts";
import { CreateUserCommand } from "../../mediator/CreateUserCommand.ts";
import { CreateUserHandler } from "../../mediator/CreateUserHandler.ts";
import { UserModel } from "../../persistence/user/UserModel.ts";

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const mediator = new Mediator();

mediator.register(CreateUserCommand, new CreateUserHandler(userService));

mediator.use(async (request) => {
  if (request.constructor.name === "CreateUserCommand") {
    const existing = await UserModel.findOne({
      where: { email: request.body.email },
    });
    if (existing) {
      throw new Error("Cet email existe déjà.");
    }
  }
});

router.get("/", async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ users });
});

router.post("/", async (req, res) => {
  const command = new CreateUserCommand(req.body);
  mediator.use();
  const newUser = await mediator.send(command);
  res.status(201).json({ newUser });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.updateUser(req.body, id);
    res.status(200).json({ user });
  } catch (err) {
    if (err instanceof Error && err.message === "User not found") {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.status(204).end();
});

export default router;

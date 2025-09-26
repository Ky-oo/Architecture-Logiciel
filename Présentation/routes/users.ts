import express from "express";
import UserService from "../../services/userService";
const router = express.Router();

router.get("/", async function (req: any, res: any, next: any) {
  const users = await UserService.getUsers();
  res.status(200).json({ users });
});

router.post("/", async function (req: any, res: any, next: any) {
  const newUser = await UserService.createUser(req.body);
  res.status(201).json({ newUser });
});

router.put("/:id", async function (req: any, res: any, next: any) {
  const { id } = req.params;
  const user = await UserService.updateUser(req.body, id);
  res.status(200).json({ user });
});

router.delete("/:id", async function (req: any, res: any, next: any) {
  const { id } = req.params;
  await UserService.deleteUser(id);
  res.status(204).end();
});

export default router;

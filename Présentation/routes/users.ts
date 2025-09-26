import express from "express";
const router = express.Router();
import userService from "../../services/userService";

router.get("/", async function (req: any, res: any, next: any) {
  const users = await userService.getUsers();
  res.status(200).json({ users });
});

router.post("/", async function (req: any, res: any, next: any) {
  const newUser = await userService.createUser(req.body);
  res.status(201).json({ newUser });
});

router.put("/:id", async function (req: any, res: any, next: any) {
  const { id } = req.params;
  const user = await userService.updateUser(req.body, id);
  res.status(200).json({ user });
});

router.delete("/:id", async function (req: any, res: any, next: any) {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.status(204).end();
});

export default router;

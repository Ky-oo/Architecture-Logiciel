var express = require("express");
var router = express.Router();
const userService = require("../services/userService");

router.get("/", async function (req, res, next) {
  const users = await userService.getUsers();
  res.status(200).json({ users });
});

router.post("/", async function (req, res, next) {
  userService.createUser(req.body);
  res.status(201).json({ newUser });
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  const user = userService.updateUser(req.body, id);
  res.status(200).json({ user });
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  userService.deleteUser(id);
  res.status(204).end();
});

module.exports = router;

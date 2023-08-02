const express = require("express");
const { register, login } = require("../../controllers/userControllers");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("user router called");
});

userRouter.post("/register", async (req, res) => {
  let userData = req.body;
  register(userData).then((response) => {
    res.send(response);
  });
});

userRouter.post("/login", async (req, res) => {
  let userData = req.body;
  login(userData).then((response) => {
    res.send(response);
  });
});

module.exports = userRouter;

const express = require("express");
const router = express.Router();
const User = require("../models/user");

const userService = require("../services/user");
router.get("/", async (req, res) => {
  // const users = await User.find();
  // res.status(200).send(users);
  try {
    userService.getUsers(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    userService.postUser(req, res).populate("advertisement");
    //   const user = new User(req.body);
    //   await user.save();
    //   res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).send("Deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

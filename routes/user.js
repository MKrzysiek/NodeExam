const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.send(user);
});
router.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    //   {
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   login: req.body.login,
    //   password: req.body.password,
    // });
    await user.save();
    res.status(201).send(user);
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

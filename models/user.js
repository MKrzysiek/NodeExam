const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  // categoryId: ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  login: { type: String, select: false, required: true },
  password: {
    type: String,
    select: false,
    required: true,
    validate(password) {
      if (password.length < 5)
        throw new Error("Password musi mieć minimum 5 znaków");
    },
  },
  adds: [{ type: Schema.Types.ObjectId, ref: "advertisements" }],
  // date: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);
module.exports = User;

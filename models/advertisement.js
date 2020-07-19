const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");
const advertisementSchema = mongoose.Schema({
  title: { type: String, require: true },
  category: { type: String, require: true },
  body: { type: String, require: true },
  price: {
    type: Number,
    min: 0,
  },
  date: { type: Date, default: Date.now },
  author: { ref: "users", type: mongoose.Schema.Types.ObjectId },
});

const Advertisement = mongoose.model("advertisements", advertisementSchema);

module.exports = Advertisement;

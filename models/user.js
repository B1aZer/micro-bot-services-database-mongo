//User SCHEMA--------------------------------------------------------
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  guildID: { type: String, require: true },
  tasks: { type: Array, "default": [] },
  coins: { type: Number, "default": 0 },
  txs: { type: Array, "default": [] },
}, { timestamps: true });

const model = mongoose.model("UserModel", UserSchema);

module.exports = model;
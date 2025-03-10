const mongoose = require("mongoose");
const tokenCreate = require("../helper/create.token");
const adminSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    thumbnail: Array,
    status: String,
    address: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: tokenCreate.createToken(30),
    },
    roleId: String,
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema, "admin");
module.exports = Admin;

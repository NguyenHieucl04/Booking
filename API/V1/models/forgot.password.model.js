const mongoose = require("mongoose");

const forgorschema = new mongoose.Schema(
  {
    email: String,
    otp: Number,
    expireAt: {
      type: Date,
      expires: 11, // 11 seconds
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ForgorPassword = mongoose.model(
  "ForgorPassword",
  forgorschema,
  "forgot-password"
);

module.exports = ForgorPassword;

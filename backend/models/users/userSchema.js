const mongoose = require("mongoose");
const { AVATAR_IMAGE } = require("../../constants/images");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    user_type: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    deactivated: { type: Boolean, default: false },
    subscribed: { type: Boolean, default: false },
    storeName: { type: String, required: true },
    profileImage: {
      type: String,
      default: AVATAR_IMAGE,
    },
    coverImage: { type: String },
    totalCustomers: { type: Number, default: 0 },
    password: { type: String, required: true },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

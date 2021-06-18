const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");

const mongoose = require("../database/index");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    select: false,
    default: uuid(),
  },
  avatar: {
    type: String,
    default:
      "https://cdn.discordapp.com/avatars/599563864509513739/353b6fb0e0fd382db47666fc31076977.png",
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  posts: {
    type: Array,
    default: [],
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

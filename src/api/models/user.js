const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");

const mongoose = require("../database/index");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
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
    default: "http://localhost:3000/images/noavatar.png",
  },
  banner: {
    type: String,
    default: "http://localhost:3000/images/nobanner.png",
  },
  biography: {
    type: String,
    default: "Olá, sou um novo usuário do yMe!",
  },
  roles: {
    type: Object,
    required: true,
    default: {
      developer: {
        activated: false,
        since: Date.now(),
      },
      administrator: {
        activated: false,
        since: Date.now(),
      },
      moderator: {
        activated: false,
        since: Date.now(),
      },
      verified: {
        activated: false,
        since: Date.now(),
      },
    },
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
    type: Number,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

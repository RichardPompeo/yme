const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/user");
const mailer = require("../modules/mailer");
const authConfig = require("../config/auth.json");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 604800,
  });
}

router.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "User already exists" });
    }

    const user = await User.create(req.body);

    user.password = undefined;
    user.token = undefined;

    return res.send({
      user,
    });
  } catch (err) {
    return res.status(400).send({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password +token");

  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: "Invalid password" });
  }

  user.password = undefined;

  res.send({
    user,
    token: generateToken({
      token: user.token,
    }),
  });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: "noreply@apirest.com.br",
        subject: "API Rest",
        html: `<h1>Alterar senha</h1><br><br><p>Use esse token para alterar sua senha: <strong>${token}</strong></p>`,
      },
      (err) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ error: "Cannot send forgot password email" });
        }

        return res.send({
          message: "Mail sent",
          token: token,
          tokenExpires: now,
        });
      }
    );
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Error on forgot password, try again later" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    if (token !== user.passwordResetToken) {
      return res.status(400).send({ error: "Token invalid" });
    }

    const now = new Date();

    if (now > user.passwordResetExpires) {
      return res
        .status(400)
        .send({ error: "Token expired. Generate a new one" });
    }

    user.password = password;
    user.passwordResetToken = null;

    await user.save();

    res.send({ message: "Reseted Password" });
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Cannot reset password. Try again later" });
  }
});

module.exports = (app) => app.use("/api/v1/auth", router);

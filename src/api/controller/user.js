const express = require("express");

const authMiddleware = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

router.use(authMiddleware);

router.get("/authenticate", async (req, res) => {
  const token = req.token;

  try {
    let user;

    if (await User.findOne({ token })) {
      user = await User.findOne({ token });
    } else {
      return res.status(400).send({ error: "Invalid token was provided" });
    }

    res.send({
      ok: true,
      user: user,
    });
  } catch (err) {
    return res.status(400).send({ error: "Token error" });
  }
});

module.exports = (app) => app.use("/api/v1/user", router);

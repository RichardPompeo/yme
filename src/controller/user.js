const express = require("express");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/login-token", (req, res) => {
  res.send({ ok: true, user: { id: req.userId, name: req.userName } });
});

module.exports = (app) => app.use("/user", router);

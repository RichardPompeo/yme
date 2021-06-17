const express = require("express");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/authenticate", (req, res) => {
  res.send({
    ok: true,
    user: {
      id: req.userId,
      name: req.userName,
      email: req.userEmail,
      createdAt: req.createdAt,
    },
  });
});

module.exports = (app) => app.use("/api/v1/user", router);

const axios = require("axios");
const express = require("express");
const path = require("path/posix");

const router = express.Router();

const base_url = "http://localhost:3333/api/v1";

router.get("/", (req, res) => {
  res.sendFile(path.resolve("./src/web/views/index.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.resolve("./src/web/views/auth/register.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.resolve("./src/web/views/auth/login.html"));
});

router.post("/register", async (req, res) => {
  const { email, password, confirm_password } = req.body;

  if (confirm_password !== password) {
    return res.redirect("/register?password_error=true");
  }

  try {
    await axios.post(`${base_url}/auth/register`, req.body);
  } catch (err) {
    return res.redirect("/register?user_exists=true");
  }

  return res.redirect("/login?email=" + email);
});

router.post("/login", async (req, res) => {
  let user;

  try {
    user = await axios.post(`${base_url}/auth/login`, req.body);
  } catch (err) {
    if (err.response.data.error === "User not found") {
      return res.redirect("/login?not_found=true");
    } else if (err.response.data.error === "Invalid password") {
      return res.redirect("/login?invalid_password=true");
    }
  }

  res.cookie("token", user.data.token);
  res.redirect("/");
});

module.exports = (app) => app.use("/", router);

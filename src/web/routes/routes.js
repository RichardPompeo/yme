const axios = require("axios");
const express = require("express");
const path = require("path/posix");

const router = express.Router();

const base_url = "http://localhost:3000/api/v1";

router.get("/", (req, res) => {
  res.sendFile(path.resolve("./src/web/views/index.html"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.resolve("./src/web/views/auth/register.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.resolve("./src/web/views/auth/login.html"));
});

router.get("/@", (req, res) => {
  if (!req.cookies.token) return res.redirect("/login?ref=/@");
  res.sendFile(path.resolve("./src/web/views/user/account.html"));
});

router.get("/@/:username", async (req, res) => {
  let user;

  try {
    user = await axios.get(`${base_url}/user/authenticate`, {
      headers: { Authorization: `Bearer ${req.cookies.token}` },
    });
  } catch (err) {
    return res.redirect(`/login?ref=/@/${req.params.username}`);
  }

  req.params.username = "@" + req.params.username;

  if (user.data.user.username === req.params.username) {
    return res.redirect("/@");
  }

  res.sendFile(path.resolve("./src/web/views/user/account.html"));
});

router.get("/account/details", (req, res) => {
  res.sendFile(path.resolve("./src/web/views/user/accountDetails.html"));
});

router.get("/account/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const { email, password, confirm_password } = req.body;

  if (confirm_password !== password) {
    return res.redirect("/register?password_error=true");
  }

  try {
    await axios.post(`${base_url}/auth/register`, req.body);
  } catch (err) {
    let messageError = err.response.data.error.toLowerCase();

    if (messageError.includes("email")) {
      return res.redirect("/register?email_exists=true");
    }

    if (messageError.includes("username")) {
      return res.redirect("/register?username_exists=true");
    }
  }

  if (req.query.ref) {
    return res.redirect("/login?email=" + email + "&ref=" + req.query.ref);
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

  if (req.query.ref) {
    return res.redirect(req.query.ref);
  }

  res.redirect("/");
});

module.exports = (app) => app.use("/", router);

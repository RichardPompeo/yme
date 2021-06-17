const axios = require("axios");

const base_url = "http://localhost:3000";
let tokenResetPassword = null;
let tokenAuth = null;

(async () => {
  // Register a user
  await axios.post(`${base_url}/auth/register`, {
    email: "test@gmail.com",
    name: "testUserName",
    password: "testUserPassword",
  });

  // Authenticate a user
  await axios
    .post(`${base_url}/auth/authenticate`, {
      email: "test@gmail.com",
      password: "testUserPassword",
    })
    .then((res) => (tokenAuth = res.data.token));

  // Forgot password
  await axios
    .post(`${base_url}/auth/forgot-password`, {
      email: "test@gmail.com",
    })
    .then((res) => (tokenResetPassword = res.data.token));

  // Reset password
  await axios.post(`${base_url}/auth/reset-password`, {
    email: "test@gmail.com",
    token: tokenResetPassword,
    password: "123456789",
  });

  // Get user by token
  await axios.get(`${base_url}/user/login-token`, {
    headers: {
      Authorization: `Bearer ${tokenAuth}`,
    },
  });
})();

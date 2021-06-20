const query = new URLSearchParams(window.location.search);
const registerForm = document.getElementById("register-form");
const loginHref = document.getElementById("login-href");

if (query.get("password_error")) {
  setTimeout(() => {
    alert("As senhas devem ser iguais.");
  }, 500);
}

if (query.get("email_exists")) {
  setTimeout(() => {
    alert("Um usuário com esse email já existe.");
  }, 500);
}

if (query.get("username_exists")) {
  setTimeout(() => {
    alert("Um usuário com esse nome de exibição já existe.");
  });
}

if (query.get("ref")) {
  registerForm.action = "/register?ref=" + query.get("ref");
  loginHref.href = "/login?ref=" + query.get("ref");
}

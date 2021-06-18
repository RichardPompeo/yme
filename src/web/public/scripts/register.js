const query = new URLSearchParams(window.location.search);

if (query.get("password_error")) {
  document.querySelectorAll(`input[type="password"]`).forEach((input) => {
    input.style.border = `2px solid red`;
  });

  setTimeout(() => {
    alert("As senhas devem ser iguais.");
  }, 500);
}

if (query.get("user_exists")) {
  setTimeout(() => {
    alert("Um usuário com esse email já existe.");
  }, 500);
}

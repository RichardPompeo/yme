const query = new URLSearchParams(window.location.search);

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

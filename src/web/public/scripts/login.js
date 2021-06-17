const query = new URLSearchParams(window.location.search);

if (query.get("invalid_password")) {
  setTimeout(() => {
    alert("A senha digitada está incorreta.");
  }, 500);
}

if (query.get("not_found")) {
  setTimeout(() => {
    alert("Endereço de e-mail não encontrado.");
  }, 500);
}

if (query.get("email")) {
  document.getElementById("email").value = query.get("email");
}

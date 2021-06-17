const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
};

(async () => {
  const headers = {
    Authorization: `Bearer ${getCookie("tokens")}`,
    "Access-Control-Allow-Origin": `*`,
  };

  const user = await axios.get(
    "http://localhost:3333/api/v1/user/authenticate"
  );

  console.log(user.data);
})();

// Not working now!

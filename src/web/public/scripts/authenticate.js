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

  return "nouser";
};

const getUser = async () => {
  if (getCookie("token") === "nouser") {
    return redirectAndClearCookies();
  }

  let user;

  try {
    user = await axios.get(`/api/v1/user/authenticate`, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
  } catch (err) {
    return redirectAndClearCookies();
  }

  return user.data.user;
};

const redirectAndClearCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  if (window.location.href.includes("/account")) {
    return window.open("/login?ref=/account", "_self");
  }

  return window.open("/login", "_self");
};

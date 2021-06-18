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

(async () => {
  if (getCookie("token") === "nouser") {
    return redirect();
  }

  let user;

  try {
    user = await axios.get(`/api/v1/user/authenticate`, {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
  } catch (err) {
    return redirect();
  }

  user = user.data.user;

  console.log(user);

  document.getElementById("name").innerText = user.name;
  document.getElementById("email").innerText = user.email;
  document.getElementById("createdAt").innerText = user.createdAt;
  document.getElementById("id").innerText = user._id;
  document.getElementById("followers").innerText = user.followers.join(",");
  document.getElementById("following").innerText = user.following.join(",");
  document.getElementById("posts").innerText = user.posts.join(",");
  document.getElementById("avatar").src = user.avatar;
})();

const redirect = () => {
  return window.open("/login", "_self");
};

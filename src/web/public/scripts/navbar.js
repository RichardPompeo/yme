const userButtons = document.getElementById("userButtons");
const userButton = document.getElementById("userButton");
const userMenu = document.getElementById("mobile-menu");
const menuButton = document.getElementById("mobile-menu-button");

let userButtonsOpened = false;
let menuButtonOpened = false;

userButton.addEventListener("click", (onclick) => {
  if (!userButtonsOpened) {
    userButtons.className = `block origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`;
  } else if (userButtonsOpened) {
    userButtons.className = `hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`;
  }

  userButtonsOpened = !userButtonsOpened;
});

menuButton.addEventListener("click", (onclick) => {
  if (!menuButtonOpened) {
    userMenu.className = "sm:hidden";
  } else if (menuButtonOpened) {
    userMenu.className = "sm:hidden hidden";
  }

  menuButtonOpened = !menuButtonOpened;
});

(async () => {
  let user;
  let loggedUser;

  if (
    window.location.pathname === "/@" ||
    window.location.pathname === "/account/details"
  ) {
    user = await getUser();
  } else {
    user = await getUser(window.location.pathname.slice(3));
    loggedUser = await getUser();
  }

  document.getElementsByTagName("title")[0].innerText = `yMe - ${user.name}`;

  const profilePicture = document.getElementById("profile-picture");

  if (loggedUser) {
    profilePicture.src = loggedUser.avatar;
    profilePicture.alt = loggedUser.username;
  } else {
    profilePicture.src = user.avatar;
    profilePicture.alt = user.username;
  }
})();

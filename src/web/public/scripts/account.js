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

  console.log(window.location.pathname);

  if (window.location.pathname === "/@") {
    user = await getUser();
  } else {
    user = await getUser(window.location.pathname.slice(3));
  }

  document.getElementsByTagName("title")[0].innerText = `yMe - ${user.name}`;

  const profilePicture = document.getElementById("profile-picture");
  const profileImage = document.getElementById("profile-image");
  const profileName = document.getElementById("profile-name");
  const profileUsername = document.getElementById("profile-username");
  const profileBanner = document.getElementById("profile-banner");
  const profileFollowing = document.getElementById("profile-following");
  const profileFollowers = document.getElementById("profile-followers");
  const profilePosts = document.getElementById("profile-posts");
  const profileBio = document.getElementById("profile-bio");
  const followButton = document.getElementById("follow-button");
  const followButtonIcon = document.getElementById("follow-button-icon");

  setTimeout(() => {
    profilePicture.src = user.avatar;
    profilePicture.alt = user.username;
    profilePicture.className = "h-8 w-8 rounded-full";

    profileBanner.src = user.banner;
    profileBanner.alt = user.username;
    profileBanner.className =
      "absolute h-full w-full object-cover shadow-inner";

    profileImage.src = user.avatar;
    profileImage.alt = user.username;
    profileImage.className = "object-cover w-full h-full";

    profileName.innerText = user.name;
    profileName.className = "text-lg text-center font-semibold";

    profileUsername.innerText = user.username;
    profileUsername.className = "text-sm text-gray-600 text-center";

    profileBio.innerText = user.biography;
    profileBio.className =
      "p-3 bg-gray-50 rounded text-sm text-center m-6 text-gray-700";

    profilePosts.innerText = `${user.posts.length} postagens`;
    profilePosts.className =
      "text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-red-100 cursor-default rounded";

    profileFollowing.innerText = `${user.following.length} seguindo`;
    profileFollowing.className =
      "text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-red-100 cursor-default rounded";

    profileFollowers.innerText = `${user.followers.length} seguidores`;
    profileFollowers.className =
      "text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-red-600 border-red-600 hover:bg-red-600 hover:text-red-100 cursor-default rounded";

    followButton.querySelector("span").innerText = "Seguir";
    followButton.className =
      "bg-transparent bg-red-500 hover:bg-red-700 text-white border-red-600 border py-2 px-4 ml-0 md:ml-6 mt-3 rounded inline-flex items-center";
    followButtonIcon.className.baseVal = "h-4 w-4 mr-1";
  }, 3000);
})();

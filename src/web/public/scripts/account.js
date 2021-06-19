(async () => {
  let user;

  if (window.location.pathname === "/@") {
    user = await getUser();
  } else {
    user = await getUser(window.location.pathname.slice(3));
  }

  const iconsClass = `inline h-6 w-6 mr-0 text-red-500 m-2 cursor-pointer`;

  const iconsTooltip = {
    developer: `<title>${user.name} é um desenvolvedor oficial do yMe</title>`,
    verified: `<title>${user.name} é um usuário verificado do yMe</title>`,
    administrator: `<title>${user.name} é um administrador ofical do yMe</title>`,
    moderator: `<title>${user.name} é um moderador oficial do yMe</title>`,
  };

  const icons = {
    developer: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconsClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />${iconsTooltip.developer}</svg>`,
    verified: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconsClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />${iconsTooltip.verified}</svg>`,
    administrator: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconsClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />${iconsTooltip.administrator}</svg>`,
    moderator: `<svg xmlns="http://www.w3.org/2000/svg" class="${iconsClass}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />${iconsTooltip.moderator}</svg>`,
  };

  let PN = `${user.name}${
    user.roles.developer.activated ? icons.developer : ""
  }${user.roles.administrator.activated ? icons.administrator : ""}${
    user.roles.moderator.activated ? icons.moderator : ""
  }${user.roles.verified.activated ? icons.verified : ""}`;

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
    profileBanner.src = user.banner;
    profileBanner.alt = user.username;
    profileBanner.className =
      "absolute h-full w-full object-cover shadow-inner";

    profileImage.src = user.avatar;
    profileImage.alt = user.username;
    profileImage.className = "object-cover w-full h-full";

    profileName.innerHTML = PN;
    profileName.className =
      "pr-1 text-lg text-center font-semibold inline-flex items-center";

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
      "bg-transparent bg-red-500 hover:bg-red-700 text-white border-red-600 border py-2 px-4 mt-3 rounded inline-flex items-center";
    followButtonIcon.className.baseVal = "h-4 w-4 mr-1";
  }, 3000);
})();

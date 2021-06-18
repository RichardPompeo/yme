const navButton = document.getElementById("navButton");
const navOpen = document.getElementById("navOpen");
const divMobile = document.getElementById("divMobile");

navButton.addEventListener("click", (onclick) => {
  divMobile.className =
    "hidden rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden";
});

navOpen.addEventListener("click", (onclick) => {
  divMobile.className =
    "block rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden";
});

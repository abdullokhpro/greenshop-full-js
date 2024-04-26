const logOut = document.querySelector(".log-out");
let isLogin = localStorage.getItem("x - auth - token");

function checkUser() {
  if (!checkUser) {
    window.location.replace("../pages/login.html");
  }
}

checkUser();

logOut.addEventListener("click", () => {
  localStorage.clear();
  window.open("../index.html", "_self");
});

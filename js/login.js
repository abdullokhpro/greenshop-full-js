const API_URL = "https://dummyjson.com";

const signIn = document.querySelector(".header__btn__sigin");
const logInCard = document.querySelector(".log-in");
const logInClose = document.querySelector(".log-in__close");
const logInForm = document.querySelector(".log-in__form");
const userInput = document.querySelector(".log-in__text__input");
const userInputPassword = document.querySelector(".log-in__password");

signIn.addEventListener("click", () => {
  logInCard.classList.add("login-show");
});

logInClose.addEventListener("click", () => {
  logInCard.classList.remove("login-show");
});

logInForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let user = {
    username: userInput.value,
    password: userInputPassword.value,
  };

  signInn(user);
});

async function signInn(user) {
  await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("res>>>", res);
      if (res.message === "Invalid credentials") {
        return alert("username or password is incorrect");
      }

      localStorage.setItem("x-auth-token", res.token);
      window.open("../pages/admin.html", "_self");
    })
    .catch((err) => console.log("err", err));
}

// Invalid credentials

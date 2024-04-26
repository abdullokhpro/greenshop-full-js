const API__URL = "https://dummyjson.com";
const generalCard = document.querySelector(".cards");
const loading = document.querySelector(".loading");
const seeMore = document.querySelector(".card__see-more");
const selectProducts = document.querySelector("#select__products");
const searchProducts = document.querySelector(".header__form__search");

let limitCount = 12;
let multipleCount = 1;

let menu = document.querySelector(".header__hamburger");
let header = document.querySelector(".header");
let navBar = document.querySelector(".header__list");
let backTop = document.querySelector(".back-top");

window.addEventListener("scroll", function () {
  showBackTop();
  showHeaderShrink();
});

menu.addEventListener("click", function () {
  navBar.classList.toggle("header__show__list");
});

function showBackTop() {
  if (scrollY > 100) {
    backTop.classList.add("show__back-top");
  } else {
    backTop.classList.remove("show__back-top");
  }
}
function showHeaderShrink() {
  if (scrollY > 0) {
    header.classList.add("show__header__shrink");
  } else {
    header.classList.remove("show__header__shrink");
  }
}

async function fetchApi(url) {
  let data = await fetch(
    `${url}/products?limit=${limitCount * multipleCount}`,
    {
      method: "GET",
    }
  );

  data
    .json()
    .then((res) => mapApi(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
      seeMore.innerHTML = "See more";
      seeMore.removeAttribute("disabled");
    });
}

fetchApi(API__URL);

function mapApi(data) {
  let card = "";
  data.products.forEach((element) => {
    card += `
            <div class="card">
              <div class="card__top">
                <img data-id="${element.id}" class ="card__img__img" src="${element.images[0]}" alt="" />
              </div>

              <div class="card__bottom">
                <h2 class="card__title">${element.title}</h2>
                <p class="card__price">$${element.price}</p>
              </div>
            </div>
        `;
  });

  generalCard.innerHTML = card;
}

async function fetchCatagories(url) {
  let data = await fetch(`${url}/products/categories`, {
    method: "GET",
  });

  data
    .json()
    .then((res) => mapCatagories(res))
    .catch((err) => console.log(err));
}

fetchCatagories(API__URL);

async function fetchProducts(api, option, searchValue) {
  let url = "";
  if (option === "all") {
    if (searchValue) {
      url = `${api}/products/search/?q=${searchValue}`;
    } else {
      url = `${api}/products`;
    }
  } else {
    url = `${api}/products/category/${option}`;
  }

  const data = await fetch(url, {
    method: "GET",
  });

  data
    .json()
    .then((res) => mapApi(res))
    .catch((err) => console.log(err));
}

function mapCatagories(data) {
  let selectOption = `<option value="all" id="select__option">all</option>`;
  data.forEach((el) => {
    selectOption += `
      <option value="${el}" id="select__option">${el}</option>
    `;
  });

  selectProducts.innerHTML = selectOption;
}

seeMore.addEventListener("click", () => {
  multipleCount++;
  fetchApi(API__URL);
  seeMore.innerHTML = "loading...";
  seeMore.setAttribute("disabled", true);
});

generalCard.addEventListener("click", (evt) => {
  if (evt.target.className === "card__img__img") {
    let id = evt.target.dataset.id;
    // console.log(id);
    window.open(`./pages/products.html?id=${id}`, "_self");
  }
  // console.log(evt.target.className === "card__img__img");
});

function createLoading(data) {
  let loadingItem = "";

  for (let i = 0; i < data; i++) {
    loadingItem += `
        <div class="loading">
            <div class="loading__item bg__animation"></div>
            <div class="loading__title bg__animation"></div>
            <div class="loading__price bg__animation"></div>
          </div>
        `;
  }

  loading.innerHTML = loadingItem;
}

createLoading(limitCount);

selectProducts.addEventListener("change", (e) => {
  let optionValue = e.target.value;
  fetchProducts(API__URL, optionValue);
});

searchProducts.addEventListener("input", (e) => {
  let value = e.target.value.trim();
  if (value) {
    fetchProducts(API__URL, "all", value);
    select.value = "all";
  }
});

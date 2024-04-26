const API_URL = "https://dummyjson.com";
const singleCard = document.querySelector(".single__card");
const tidyImage = document.querySelector(".tidyImages");

async function fetchData(url) {
  let param = new URLSearchParams(window.location.search);
  let id = param.get("id");

  let data = await fetch(`${url}/products/${id}`);
  data
    .json()
    .then((res) => createContent(res))
    .catch((err) => console.log(err));
}

fetchData(API_URL);

function createContent(data) {
  //   console.log(data);

  singleCard.innerHTML = `
          <div class="single__card">
            <div class="single__card__img">
              <img src="${data.images[0]}" alt="" />
            </div>

            <div class="single__card__content">
              <h2 class="single__card__title">${data.title}</h2>

              <p class="single__card__text">
                ${data.description}
              </p>

              <p class="single__card__price">$${data.price}</p>
            </div>
          </div>
  `;
}

// function getImages(dataImg) {
//   let globalImages = "";
//   dataImg.images.forEach((el) => {
//     globalImages += `
//             <div class="tidyImage">
//               <img src="${el.images}" alt="" />
//             </div>
//         `;
//   });

//   tidyImage.innerHTML = globalImages;
// }

// getImages();

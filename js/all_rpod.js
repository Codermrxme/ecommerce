// let loading = document.getElementById("loading");

window.addEventListener("load", function () {
  loading.classList.add("hidden");
});

let cards = document.querySelector(".cards");

let carts = JSON.parse(localStorage.getItem("carts")) || [];
localStorage.setItem("carts", JSON.stringify(carts));
let badge = document.querySelectorAll("#badge");
badge.forEach((el) => {
  el.textContent = carts.length;
});

function renderAllProducts(products) {
  cards.innerHTML = "";
  products.map((el) => {
    cards.innerHTML += `
      <div class="hover:shadow-2xl duration-500">
          <div class="p-[20px] max-w-[500px] bg-[#FFFFFF] rounded-[10px] overflow-hidden">
              <div class="relative w-full h-[200px]">
              ${
                like.find((item) => item.id === el.id)
                  ? `
              <img onClick="removeToLike(${el.id})" id="likeBtn" class="absolute top-[10px] right-[10px] w-[30px] h-[30px] z-10 cursor-pointer shadow-lg" src="./images/like/heart-like.svg" alt="">
            `
                  : `
            <img onClick="addToLike(${el.id})" id="likeBtn" class="absolute top-[10px] right-[10px] w-[30px] h-[30px] z-10 cursor-pointer shadow-lg" src="./images/like/heart.svg" alt="">
            `
              }
                  <img class="w-full h-full object-cover" src="${
                    el.images[0]
                  }" alt="">
                  <p
                      class="absolute text-[13px] sm:text-[16px] bottom-[5px] sm:bottom-[30px] rounded-[5px] bg-[orangered] left-[5px] sm:left-[20px] text-[white]  w-[40px] sm:w-[56px] p-[5px] sm:p-[8px] text-center">
                      ${el.discount}%</p>
              </div>
              <div class="flex items-center justify-between my-[8px]">
            <h3 class="text-[16px]  text-[#606060] sm:text-[18px] line-through">${
              el.price
            }$</h3>
            <h3 class="text-[16px] sm:text-[18px] font-bold">
              ${el.price - (el.price * el.discount) / 100}$
            </h3>
          </div>
              <p class="text-[12px] sm:text-[16px] h-[53px] sm:h-[56px] overflow-hidden text-ellipsis line-clamp-[2]">${
                el.description
              }</p>
              <div class="ratings flex items-center gap-[4px] my-[8px]"></div>
              <div>
                  ${
                    carts.find((cart) => cart.id === el.id)
                      ? `
                <div class="grid grid-cols-3 ">
                  <button
                  onClick="deCrease(${el.id})"
                  class="w-full p-[7px] bg-[#ec6868ff] text-white text-[18px] font-bold flex items-center justify-center cursor-pointer hover:bg-[#891b1bff] duration-1000 rounded-[5px]">-</button>
                  <span class="w-full bg-[white] text-black text-[18px] font-bold flex items-center justify-center">
                  ${carts.find((cart) => cart.id === el.id).numbers}
                  </span>
                  <button
                    onClick="inCrease(${el.id})"
                    class="w-full bg-[#48ee48ff] text-white text-[18px] font-bold flex items-center justify-center cursor-pointer hover:bg-[#0c930cff] duration-1000 rounded-[5px]">+</button>
                </div>
              `
                      : `
                <button
                  onClick="addToCart(${el.id})"
                  class="w-full text-[13px] sm:text-[16px] py-[4px] sm:py-[8px] border-[1px] border-[#70C05B] rounded-[4px] text-[#70C05B] hover:bg-[#FF6633] hover:text-[white] hover:border-[#FF6633] duration-300 cursor-pointer">
                  В корзину
                </button>
              `
                  }
              </div>
          </div>
      </div>`;
  });

  let ratings = document.getElementsByClassName("ratings");
  let index = 0;
  products.map((el) => {
    let stars = "";
    for (let j = 1; j <= el.rating; j += 0.5) {
      if (Number.isInteger(j)) {
        stars +=
          '<img class="w-[13px] sm:w-[16px]" src="./images/general/star-solid-full.svg" alt="">';
      }
      if (j == el.rating && !Number.isInteger(j)) {
        stars +=
          '<img class="w-[13px] sm:w-[16px]" src="./images/general/star-half-solid-full.svg" alt="">';
      }
    }
    ratings[index].innerHTML += stars;
    index++;
  });
}

function addToCart(id) {
  let item = products.find((el) => el.id === id);
  item.numbers = 1;
  carts.push(item);
  localStorage.setItem("carts", JSON.stringify(carts));
  badge.forEach((el) => {
    el.textContent = carts.length;
  });
  renderAllProducts(products);
}

function inCrease(id) {
  carts = carts.map((el) => {
    if (el.id === id) {
      el.numbers += 1;
    }
    return el;
  });
  localStorage.setItem("carts", JSON.stringify(carts));
  renderAllProducts(products);
}

function deCrease(id) {
  let item = carts.find((el) => el.id === id);
  carts = carts.map((el) => {
    if (el.id === id) {
      el.numbers -= 1;
    }
    return el;
  });
  if (item.numbers === 0) {
    carts = carts.filter((el) => el.numbers > 0);
  }
  badge.forEach((el) => {
    el.textContent = carts.length;
  });

  localStorage.setItem("carts", JSON.stringify(carts));
  renderAllProducts(products);
}

renderAllProducts(products);

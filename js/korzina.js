window.addEventListener("load", function () {
  loading.classList.add("hidden");
});

let korzina = document.getElementById("korzina");
let korzinaProducts = JSON.parse(localStorage.getItem("carts")) || [];
let totalItem = document.getElementById("total-items");
let totalPrice = document.getElementById("total-price");
let totalDiscount = document.getElementById("total-discount");

// console.log(korzina, korzinaProducts);
renderProducts(korzina, korzinaProducts);

function renderProducts(korzina, korzinaProducts) {
  let container =
    typeof korzina === "string" ? document.querySelector(korzina) : korzina;

  if (!container) return;
  container.innerHTML = "";
  korzinaProducts.map((el) => {
    container.innerHTML += `
      <div class="hover:shadow-2xl duration-500 z-0 flex justify-center items-center mb-[20px]">
        <div class="p-[20px] w-full h-[150px] bg-[#FFFFFF] rounded-[10px] flex justify-between gap-[30px]">
          <div class="max-w-[30%] h-[200px] w-[300px] relative">

            <input class="w-[22px] h-[22px] absolute top-[-10px] left-[-10px]" type="checkbox">
            ${
              like.find((item) => item.id === el.id)
                ? `
              <img onClick="removeToLike(${el.id})" id="likeBtn" class="absolute top-[10px] right-[10px] w-[30px] h-[30px] z-10 cursor-pointer shadow-lg" src="./images/like/heart-like.svg" alt="">
            `
                : `
            <img onClick="addToLike(${el.id})" id="likeBtn" class="absolute top-[10px] right-[10px] w-[30px] h-[30px] z-10 cursor-pointer shadow-lg" src="./images/like/heart.svg" alt="">
            `
            }
            <img class="w-full h-[110px] object-cover rounded-xl" src="${
              el.images[0]
            }" alt="">

            <p class="relative text-[13px] sm:text-[16px] bottom-[5px] sm:bottom-[30px] rounded-[5px] bg-[orangered] left-[5px] sm:left-[20px] text-[white] w-[40px] sm:w-[56px] p-[5px] sm:p-[8px] text-center">
              ${el.discount}%
            </p>
          </div>
          

            <div class="w-full flex flex-col justify-center items-center gap-[20px]">
              <p class="text-center text-[12px] sm:text-[16px] h-[53px] sm:h-[56px] text-ellipsis">
              ${el.description}
            </p>

            <div class="flex items-center w-[100px] gap-[4px] my-[8px]">
              ${renderStars(el.rating)}
            </div>
            </div>

          
          <div class="flex items-center justify-center gap-[10px] w-[500px]">
            <button onClick="deCrease(${
              el.id
            })" class="w-full h-[40px] p-[7px] bg-[#ec6868ff] text-white text-[18px] font-bold flex items-center justify-center cursor-pointer hover:bg-[#891b1bff] duration-1000 rounded-[5px]">-</button>
            <span class="w-full h-[40px] p-[7px]  bg-[white] text-black text-[18px] font-bold flex items-center justify-center">
              ${korzinaProducts.find((cart) => cart.id === el.id).numbers}
            </span>
            <button onClick="inCrease(${
              el.id
            })" class="w-full h-[40px] p-[7px] bg-[#48ee48ff] text-white text-[18px] font-bold flex items-center justify-center cursor-pointer hover:bg-[#0c930cff] duration-1000 rounded-[5px]">+</button>
          </div>


          <div class="flex flex-col items-center justify-center gap-[10px]">
          <h3 class="text-[16px] sm:text-[18px] font-bold">
              ${el.price - (el.price * el.discount) / 100}$
            </h3>
            <h3 class="text-[16px]  text-[#606060] sm:text-[18px] line-through">${
              el.price
            }$</h3>
            
          </div>
        </div>
      </div>`;
  });
}

function inCrease(id) {
  korzinaProducts = korzinaProducts.map((el) => {
    if (el.id === id) el.numbers += 1;
    return el;
  });
  localStorage.setItem("carts", JSON.stringify(korzinaProducts));
  renderProducts(korzina, korzinaProducts);
  badge.forEach((el) => (el.textContent = korzinaProducts.length));
  funcTotalItem();
  funcTotalPrice();
  funcTotalDiscount();
}

function deCrease(id) {
  let item = korzinaProducts.find((el) => el.id === id);
  korzinaProducts = korzinaProducts.map((el) => {
    if (el.id === id) el.numbers -= 1;
    return el;
  });
  if (item.numbers <= 0) {
    korzinaProducts = korzinaProducts.filter((el) => el.numbers > 0);
  }
  badge.forEach((el) => (el.textContent = korzinaProducts.length));
  localStorage.setItem("carts", JSON.stringify(korzinaProducts));
  renderProducts(korzina, korzinaProducts);
  funcTotalItem();
  funcTotalPrice();
  funcTotalDiscount();
}

let total = 0;
let discount = 0;
let funcTotalItem = () => {
  totalItem.innerHTML = korzinaProducts.length;
};

let funcTotalDiscount = () => {
  let discount = 0;
  korzinaProducts.forEach((el) => {
    discount += ((el.price * el.discount) / 100) * el.numbers;
  });
  totalDiscount.innerHTML = discount.toFixed(2) + "$";
  renderProducts(korzina, korzinaProducts);
};

let funcTotalPrice = () => {
  let total = 0;
  korzinaProducts.forEach((el) => {
    total += (el.price - (el.price * el.discount) / 100) * el.numbers;
  });
  totalPrice.innerHTML = total.toFixed(2) + "$";
};
funcTotalItem();
funcTotalPrice();
funcTotalDiscount();

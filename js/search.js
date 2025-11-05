let loading = document.getElementById("loading");

window.addEventListener("load", function () {
  loading.classList.add("hidden");
});

let searchCards = document.getElementById("search-cards");
let isExistpro = false;

isExistpro ? "" : searchCards.classList.add("hidden");
let searchInput = document.getElementById("input");

searchInput.addEventListener("input", function (e) {
  searchCards.innerHTML = "";
  let srch = e.target.value;
  srch ? (isExistpro = true) : (isExistpro = false);
  let searchProduct = products.filter((el) =>
    el.name.toLowerCase().includes(srch.toLowerCase())
  );

  isExistpro
    ? searchCards.classList.remove("hidden")
    : searchCards.classList.add("hidden");
  searchProduct.length > 0
    ? searchProduct.map((el) => {
        searchCards.innerHTML += `
    <a href="#" class="border-[2px] border-[gray] rounded-[10px] p-[10px] flex items-center gap-[10px]">
        <img class="object-contain" width="100px" src="${el.images[0]}" alt="">
        <div>
            <h2 class="font-bold">${el.name}</h2>
            <p class="line-clamp-2">${el.description}</p>
        </div>

    </a>
    `;
      })
    : (searchCards.innerHTML =
        '<h1 class="text-[black]"> Нет такого продукта </h1>');
});

let params = new URLSearchParams(window.location.search);
let id = params.get("id");
let singlePro = products.filter((el) => el.id == id);
let productSingle = document.querySelector(".product_1");
singlePro.map((el) => {
  productSingle.innerHTML += `
        <div class="flex items-center justify-between mb-[64px]">
                    <h1 class="text-[20px] md:text-[24px] font-bold">${
                      el.description
                    }</h1>

                </div>
                <div class="ratings flex items-center gap-[4px] my-[8px] mb-[30px]">
                    
                </div>
                <div class=" flex flex-col items-center md:items-start md:grid md:grid-cols-2 gap-[40px]">
                    <div class="w-full">
                        <div>
                            <div class="images flex gap-[16px]">
                                <div class=" flex flex-col justify-between">
                                    <img class="w-[115px]" src="${
                                      el.images[0]
                                    }" alt="">
                                    <img class="w-[115px]" src="${
                                      el.images[1]
                                    }" alt="">
                                    <img class="w-[115px]" src="${
                                      el.images[2]
                                    }" alt="">
                                    <img class="w-[115px]" src="${
                                      el.images[3]
                                    }" alt="">
                                </div>
                                <img class="max-w-[600px] w-full" src="${
                                  el.images[0]
                                }" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-[18px] lg:text-[24px] mb-[6px]">${
                                  el.price
                                } $</h1>
                                <p class="text-[12px] lg:text-[16px] text-[#BFBFBF]">Обычная цена</p>
                            </div>
                            <div>
                                <h1 class="text-[24px] lg:text-[36px] font-bold">${
                                  el.price - (el.price * el.discount) / 100
                                } $</h1>
                                <div class="flex items-center gap-[8px]">
                                    <p class="text-[12px] lg:text-[16px] text-[#BFBFBF]">С картой Северяночки</p>
                                    <img src="./images/prd/info.png" alt="">
                                </div>
                            </div>

                        </div>
                        <button
                            class="mb-[24px] mx-[auto] mt-[16px] w-full lg:w-[279px] flex items-center gap-[50px] py-[14px] bg-[#FF6633] px-[16px] rounded-[4px] text-[white] text-[24px]"><img
                                src="./images/prd/shopping-cart.png" alt=""> В корзину
                        </button>
                        <table class="w-full border border-gray-200 rounded-lg overflow-hidden text-sm text-gray-700">
                            <tbody>
                                <tr class="bg-gray-100 py-[8px]">
                                    <td class="pl-[8px] text-[12px]">Бренд</td>
                                    <td class=" font-bold text-[12px] py-[8px] ">ПРОСТОКВАШИНО</td>
                                </tr>
                                <tr class=" py-[4px]">
                                    <td class="pl-[8px] text-[12px]">Страна производителя</td>
                                    <td class=" font-bold text-[12px] py-[8px]">Россия</td>
                                </tr>
                                <tr class="bg-gray-100 py-[4px]">
                                    <td class="pl-[8px] text-[12px]">Упаковка</td>
                                    <td class=" font-bold text-[12px] py-[8px]">180 г</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    `;
});

let lmnn = document.getElementsByClassName("ratings");
let index = 0;

singlePro.map((el) => {
  let check = "";
  for (let j = 1; j <= el.rating; j += 0.5) {
    if (Number.isInteger(j)) {
      check +=
        '<img class="w-[25px] sm:w-[50px]" src="./images/general/star-solid-full.svg" alt="">';
    }
    if (j == el.rating && !Number.isInteger(j)) {
      check +=
        '<img class="w-[25px] sm:w-[50px]" src="./images/general/star-half-solid-full.svg" alt="">';
    }
  }
  lmnn[index].innerHTML += check;
  index++;
});

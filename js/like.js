window.addEventListener("load", function () {
  loading.classList.add("hidden");
});

let likeIconBadge = document.querySelectorAll("#likeIconBadge");
let like = JSON.parse(localStorage.getItem("likes")) || [];

likeIconBadge.forEach((el) => {
  el.textContent = like.length;
});

localStorage.setItem("likes", JSON.stringify(like));

function addToLike(id) {
  let likeItem = products.find((el) => el.id === id);
  like.push(likeItem);
  likeIconBadge.forEach((el) => {
    el.textContent = like.length;
  });
  localStorage.setItem("likes", JSON.stringify(like));
  showProducts();
}

function removeToLike(id) {
  like = like.filter((el) => el.id !== id);
  likeIconBadge.forEach((el) => {
    el.textContent = like.length;
  });
  localStorage.setItem("likes", JSON.stringify(like));
  showProducts();
}

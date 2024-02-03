var initHeaderMenu = () => {
  var body = document.body,
    burger_btn = document.querySelector(".header__burger_btn"),
    header_menu = document.querySelector(".header__nav");

  if (body && burger_btn && header_menu) {
    burger_btn.addEventListener("click", function () {
      body.classList.toggle("lock");
      burger_btn.classList.toggle("active");
      header_menu.classList.toggle("active");
    });
  } else {
    console.error("Could not find element(s) for header menu initialization");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initHeaderMenu();
});

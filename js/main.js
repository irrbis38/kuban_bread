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

    var clearActive = () => {
      body.classList.remove("lock");
      burger_btn.classList.remove("active");
      header_menu.classList.remove("active");
    };

    var mq1300 = window.matchMedia("(max-width: 1300px)");

    var handleMQ = (e) => {
      !e.matches && clearActive();
    };

    mq1300.addEventListener("change", handleMQ);
  } else {
    console.error("Could not find element(s) for header menu initialization");
  }
};

var initIntroSlider = () => {
  var swiper = new Swiper(".intro__slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: ".intro__paggination",
      clickable: true,
    },
    autoplay: true,
  });
};

var initChangeLang = () => {
  var header_lang_btn = document.querySelector(".header__lang");
  var lang_menu = document.querySelector(".header__switch_lang");
  var labels = document.querySelectorAll(".header__label");

  header_lang_btn.addEventListener("click", () => {
    lang_menu.classList.toggle("active");
  });

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      lang_menu.classList.remove("active");
      header_lang_btn.children[0].textContent = label.dataset.lang;
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initHeaderMenu();
  initIntroSlider();
  initChangeLang();
});

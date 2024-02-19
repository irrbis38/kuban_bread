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

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".header__lang_wrapper")) {
      lang_menu.classList.remove("active");
    }
  });

  labels.forEach((label) => {
    label.addEventListener("click", () => {
      lang_menu.classList.remove("active");
      header_lang_btn.children[0].textContent = label.dataset.lang;
    });
  });
};

var doCreateMapScript = (cb) => {
  setTimeout(function () {
    var script = document.createElement("script");
    script.async = false;
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=key&lang=ru_RU";
    document.body.appendChild(script);
    script.onload = () => cb();
  }, 2000);
};

var initMap = () => {
  var init = () => {
    var coords = [45.051405, 39.00608];
    var mark_link = "images/mark.svg";

    if (ymaps) {
      var map = new ymaps.Map("contacts-map", {
        center: coords,
        zoom: 17,
      });

      var placemark = new ymaps.Placemark(
        coords,
        {},
        {
          iconLayout: "default#image",
          iconImageHref: mark_link,
          iconImageSize: [100, 100],
          iconImageOffset: [-60, -80],
        }
      );

      map.controls.remove("geolocationControl"); // удаляем геолокацию
      map.controls.remove("searchControl"); // удаляем поиск
      map.controls.remove("trafficControl"); // удаляем контроль трафика
      map.controls.remove("typeSelector"); // удаляем тип
      map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
      // map.controls.remove("zoomControl"); // удаляем контрол зуммирования
      map.controls.remove("rulerControl"); // удаляем контрол правил
      // map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)

      map.geoObjects.add(placemark);
    }
  };

  ymaps.ready(init);
};

var initForms = () => {
  var forms = Array.from(document.forms);
  var msg = document.querySelector(".msg");
  var body = document.body;
  var msg_close_buttons = Array.from(document.querySelectorAll(".msg__close"));

  var checkForm = (form, requiredElements) => {
    requiredElements.forEach((el) => {
      if (el.classList.contains("input-phone") && el.value.length < 10) {
        el.classList.add("error");
      }
    });

    var isAllInputsCorrect = !requiredElements.some((el) =>
      el.classList.contains("error")
    );

    if (isAllInputsCorrect) {
      form.reset();
      msg.classList.add("active");
      body.classList.add("lock");
    }
  };

  forms.forEach((form) => {
    var requiredElements = Array.from(form.elements).filter(
      (el) => el.required
    );
    // remove error class from element by input
    requiredElements.forEach((r_el) =>
      r_el.addEventListener("input", () => r_el.classList.remove("error"))
    );

    // add listeners for each form
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      checkForm(form, requiredElements);
    });
  });

  msg_close_buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      msg.classList.remove("active");
      body.classList.remove("lock");
    })
  );
};

// init video

var initYoutubeVideo = (videos) => {
  // generate video url
  var generateUrl = (id) => {
    var query = "?rel=0&showinfo=0&autoplay=1";
    // var query = "?ps=docs&controls=1";
    return "https://www.youtube.com/embed/" + id + query;
  };

  // create iframe element
  var createIframe = (id) => {
    var iframe = document.createElement("iframe");
    iframe.classList.add("video-iframe");
    iframe.setAttribute("src", generateUrl(id));
    iframe.setAttribute("title", "YouTube video player");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
    );

    return iframe;
  };

  // handling each video element
  videos.forEach((el) => {
    var videoHref = el.dataset.video;
    var deletedLength = "https://youtu.be/".length;

    var videoId = videoHref.substring(deletedLength, videoHref.length);

    var parent = el.parentElement;

    var videoPlayBtn = parent.querySelector(".video-play-btn");

    videoPlayBtn.addEventListener("click", () => {
      var iframe = createIframe(videoId);
      parent.querySelector(".video-preview").remove();
      el.append(iframe);
    });
  });
};

// init mask inputs
var initMaskaInput = () => {
  const { MaskInput } = Maska;
  const maskIinput = new MaskInput("[data-maska]");
};

var initModal = (btns, fullscreen) => {
  var fullscreenImg = fullscreen.querySelector(".fullscreen__img img");
  var fullscreenCloseBtn = fullscreen.querySelectorAll(".fullscreen-close");
  var body = document.body;

  fullscreenCloseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      fullscreen.classList.remove("show");
      body.classList.remove("lock");
    });
  });

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.dataset.src);
      fullscreenImg.src = btn.dataset.src;
      fullscreen.classList.add("show");
      body.classList.add("lock");
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initHeaderMenu();
  initIntroSlider();
  initChangeLang();

  var map = document.getElementById("contacts-map");
  map && doCreateMapScript(initMap);

  var forms = document.forms;
  forms.length > 0 && initForms();

  // get all video elements on the page
  var videos = Array.from(document.querySelectorAll(".video-block"));
  videos.length > 0 && initYoutubeVideo(videos);

  // init maska
  var maskedInput = document.querySelectorAll("[data-maska]");
  maskedInput && initMaskaInput();

  // init modal
  var modalOpenBtns = document.querySelectorAll(".modal-open");
  console.log(modalOpenBtns);
  var fullscreen = document.querySelector(".fullscreen");
  modalOpenBtns.length > 0 &&
    fullscreen &&
    initModal(modalOpenBtns, fullscreen);
});

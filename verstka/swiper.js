// изменения импортов.Динамический импорт:импорт произойдет при вызове функции слайдера
const swiper = new Swiper(".product__slider-thumbnails", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
// без default ошибка: swiper not constructor
const swiper2 = new Swiper(".product__slider-main", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".product__arrow_next",
    prevEl: ".product__arrow_prev",
  },
  modules: [Navigation, Thumbs],
  thumbs: {
    swiper: swiper,
  },
});

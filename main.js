import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
// import Swiper JS
// import { Navigation, Thumbs } from 'swiper/modules'
// import Swiper from 'swiper';
// import Swiper styles
// import 'swiper/css';


// изменения импортов.Динамический импорт:импорт произойдет при вызове функции слайдера
const productSlider = () => {
  // массив с промисами
  Promise.all([
    import('swiper/modules'),
    import('swiper'),
    import('swiper/css')
  ]).then(([{ Navigation, Thumbs }, Swiper]) => {
    console.dir(Swiper);
    console.dir(Thumbs);
    console.dir(Navigation);
    // без default ошибка: swiper not constructor
    const swiper = new Swiper.default(".product__slider-thumbnails", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    // без default ошибка: swiper not constructor
    const swiper2 = new Swiper.default(".product__slider-main", {
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
  });

};

const init = () => {
  productSlider();

  const router = new Navigo('/', { linksSelector: 'a[href^="/"]' });

  router
    .on("/", () => {
      console.log('На главной');
    })
    .on("/category", (obj) => {
      console.log('obj category: ', obj);
      console.log('category');
    })
    .on("/favorite", () => {
      console.log('favorite');
    })
    .on("/search", () => {
      console.log('search');
    })
    .on("/product/:id", (obj) => {
      console.log('product obj: ', obj);
    })
    .on("/cart", () => {
      console.log('cart');
    })
    .on("/order", () => {
      console.log('order');
    })
    .notFound(() => {
      // console.log(4045);
      // document.body.innerHTML = '<h2 style="text-align:center;position:absolute;top:48%;left:50%;transform:translateX(-50%)">Страница не найдена:(</h2>'
    });

  router.resolve();
};

init();
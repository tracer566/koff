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
  const params = window.location.href;
  console.log('params: ', params);

  const links = document.querySelectorAll('a');
  for (let i = 0; i < links.length; i++) {
    console.log('links[i].href', links[i].href);
  }

  const router = new Navigo(`${params}`, { linksSelector: `a[href^="${params}"]` });

  router
    .on(`${params}`, () => {
      console.log('На главной');
    })
    .on(`${params}`, (obj) => {
      console.log('obj category: ', obj);
      console.log('category');
    })
    .on(`${params}`, () => {
      console.log('favorite');
    })
    .on(`${params}`, () => {
      console.log('search');
    })
    .on(`${params}`, (obj) => {
      console.log('product obj: ', obj);
    })
    .on(`${params}`, () => {
      console.log('cart');
    })
    .on(`${params}`, () => {
      console.log('order');
    })
    .notFound(() => {
      console.log(4045);
      // document.body.innerHTML = '<h2 style="text-align:center;position:absolute;top:48%;left:50%;transform:translateX(-50%)">Страница не найдена:(</h2>'
    });

  router.resolve();
};

init();
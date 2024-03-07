import 'normalize.css';
import './style.scss';
import Navigo from 'navigo';
import { Header } from './modules/Header/Header.js';
import { Main } from './modules/Main/Main.js';
import { Footer } from './modules/Footer/Footer.js';
import { Order } from './modules/Order/Order.js';
import { ProductList } from './modules/ProductList/ProductList.js';
import { ApiService } from './services/Apiservice.js';
import { Catalog } from './modules/Catalog/Catalog';

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
    // console.dir(Swiper);
    // console.dir(Thumbs);
    // console.dir(Navigation);
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

// инициализация
const init = () => {
  // создание объекта из конструктора
  const api = new ApiService();
  console.log('api: ', api);

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  api.getProductCategories().then(catalog => {
    new Catalog().mount(new Main().element, catalog)

  });

  productSlider();

  // const newTest = new Main();
  // console.log('newTest: ', newTest);

  //при заливке на гитхаб new Navigo(`/koff/dist`)
  const router = new Navigo(`/`, { linksSelector: `a[href^="/"]` });

  router
    .on(`/`, async () => {
      console.log('На главной');
      const product = await api.getProduct();
      new ProductList().mount(new Main().element, product, 'Список всех товаров');

    }, {
      // before(done, match) {
      //   console.log('match: ', match);
      //   console.log('before:');
      //   done()
      // },
      // after(match) {
      //   console.log('after:');
      // },
      leave(done, match) {
        console.log('leave:');
        done()
      },
      already(match) {
        console.log('already:');

      },
    })
    .on(`/category`, (obj) => {
      console.log('obj category: ', obj);
      console.log('Категории');
      new ProductList().mount(new Main().element, [10, 11, 12, 22, 33, 44, 55], 'Категории');
    }, {
      leave(done, match) {
        console.log('leave:');
        done()
      },
    })
    .on(`/favorite`, (obj) => {
      console.log('obj favorite: ', obj);
      console.log('Избранное');
      new ProductList().mount(new Main().element, [11, 343, 567, 876], 'Избранное');
    }, {
      leave(done, match) {
        console.log('leave:');
        done()
      },
    })
    .on(`/search`, () => {
      console.log('search');
    })
    .on(`/product/:id`, (obj) => {
      console.log('product obj: ', obj);
    })
    .on(`/cart`, () => {
      console.log('cart');
    })
    .on(`/order`, () => {
      new Order().mount();
    })
    .notFound(() => {
      console.log('Ошибка 404');
      // document.querySelector('.main').innerHTML = `
      // '<h2 style="text-align:center;position:relative;padding:100px;left:50%;
      // transform:translateX(-50%)">Страница не найдена:(</h2>'
      // `;
      new Main().element.innerHTML = `
      <div class="content" style="text-align:center;position:relative;left:50%;
      transform:translateX(-50%);padding:100px;height:500px;">
      <h2 style="font-size:22px;margin-bottom:10px;">Страница не найдена:(</h2>
      <p style="font-size:18px;">Вы будете перенаправлены на <a href="/">главную страницу </a></p>
     <img src="#" alt="#"> 
            </div>
      `;

      setTimeout(() => {
        router.navigate('/')
      }, 8e3);

    },
      {
        leave(done, match) {
          new Main().element.innerHTML = '';
          done()
        },
      });

  router.resolve();
};

init();
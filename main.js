import 'normalize.css';
import './style.scss';
// import robots from '/img/robots.jpg';
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
  //при заливке на гитхаб new Navigo(`/koff/dist`),создание роутера
  const router = new Navigo(`/`, { linksSelector: `a[href^="/"]` });

  new Header().mount();
  new Main().mount();
  new Footer().mount();

  api.getProductCategories().then(catalog => {
    new Catalog().mount(new Main().element, catalog)
    // так как функция заканивает работу до того как карточки и их ссылки создаются
    // нужно обновить,иначе перезагрузка
    router.updatePageLinks();

  });

  productSlider();

  // const newTest = new Main();
  // console.log('newTest: ', newTest);


  router
    .on(`/`, async () => {
      console.log('На главной');
      const product = await api.getProduct();
      console.log('product: ', product);
      new ProductList().mount(new Main().element, product, 'Список всех товаров');

      // так как функция заканивает работу до того как карточки и их ссылки создаются
      // нужно обновить,иначе перезагрузка
      // router.updatePageLinks();

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
        new ProductList().unmount();
        done()
      },
      already(match) {
        console.log('already:');

      },
    })
    .on(`/category`, async ({ params: { slug } }) => {
      // console.log('obj params category: ', obj.params.slug);
      console.log('obj category slug деструктуризация: ', slug);
      console.log('Категории');
      const product = await api.getProduct();
      // debugger
      new ProductList().mount(new Main().element, product, slug);
      // так как функция заканивает работу до того как карточки и их ссылки создаются
      // нужно обновить,иначе перезагрузка
      router.updatePageLinks();
    }, {
      leave(done, match) {
        console.log('leave:');
        new ProductList().unmount();
        done()
      },
    })
    .on(`/favorite`, async (obj) => {
      console.log('obj favorite: ', obj);
      console.log('Избранное');
      const product = await api.getProduct();
      new ProductList().mount(new Main().element, product, 'Избранное');
      // так как функция заканивает работу до того как карточки и их ссылки создаются
      // нужно обновить,иначе перезагрузка
      router.updatePageLinks();
    }, {
      leave(done, match) {
        console.log('leave:');
        new ProductList().unmount();
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
      new Main().element.innerHTML = `
      <div class="content" style="text-align:center;position:relative;left:50%;
      transform:translateX(-50%);padding:100px 20px;height:600px;">
      <h2 style="font-size:22px;margin-bottom:10px;">Ошибка 404.Страница не найдена:(</h2>
     <img src="./img/robots.jpg" style="margin:15px auto;border-radius:30px;" width="400" height="400" alt="#"> 

      <p style="font-size:18px;">Вы будете перенаправлены на <a href="/">главную страницу </a>через некоторое время</p>
      </div>
      `;

      setTimeout(() => {
        router.navigate('/')
      }, 10e3);

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

// теория
// const promiseA = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('A');
//   }, 5000)
// });
// const promiseB = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('from B:');
//   }, 4000)
// });
// const promiseC = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('from C:');
//   }, 3000)
// });

// console.log('promiseA: ', promiseA);
// console.log('promiseB: ', promiseB);
// console.log('promiseC: ', promiseC);

// вызов и обработка промиса
// promiseA.then((item) => {
//   console.log('item:', item);
// })
// promiseB.then((item) => {
//   console.log(item);
// })
// promiseC.then((item) => {
//   console.log(item);
// })

// вызов и обработка ряда промисов,в then((arr))-массив,его деструктурирую
// Promise.all([promiseB, promiseA, promiseC]).then(([a, b, c]) => {
//   console.log('arr: ', a, b, c);

// });

// теория старых функций-классов
/* function Car(name = 'lada', year = 1998) {
  this.name = name,
    this.year = year,
    this.now = new Date().getFullYear();
  this.calc = function calc() {
    this.result = this.now - this.year;
    return this;
  };

};

Car.prototype.getAge = function () {
  return new Date().getFullYear() - this.year;
}

let lada = new Car().calc();
let bmv = new Car('bmv', 2000)
console.log('bmv: ', bmv);
console.log('lada: ', lada); */


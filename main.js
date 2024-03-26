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
import { Catalog } from './modules/Catalog/Catalog.js';
import { favoriteService } from './services/StorageService.js';
import { Pagination } from './features/Pagination/Pagination.js';
import { BreadCrumbs } from './features/BreadCrumbs/BreadCrumbs.js';


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

//при заливке на гитхаб new Navigo(`/koff/dist`),создание роутера
export const router = new Navigo(`/koff/dist`, { linksSelector: `a[href^="/"]` });

// инициализация
const init = () => {
  // создание объекта из конструктора
  const api = new ApiService();
  console.log('api: ', api);

  new Header().mount();
  new Main().mount();
  new Footer().mount();


  /*   api.getProductCategories().then(catalog => {
      new Catalog().mount(new Main().element, catalog)
      // так как функция заканивает работу до того как карточки и их ссылки создаются
      // нужно обновить,иначе перезагрузка
      router.updatePageLinks();
  
    }); */

  productSlider();

  router
    .on(`/`, async () => {
      new Catalog().mount(new Main().element);
      const products = await api.getProduct({ limit: 18 });
      console.log('Получил product на главной: ', products);
      new ProductList().mount(new Main().element, products, 'Список всех товаров');
      // так как функция заканивает работу до того как карточки и их ссылки создаются
      // нужно обновить,иначе перезагрузка
      router.updatePageLinks();

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
        new Catalog().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      },
    })
    .on(`/category`, async ({ params: { slug, page = 1 } }) => {
      // console.log('obj params category: ', obj.params.slug);
      new Catalog().mount(new Main().element);
      // 1 вариант
      // const product = await api.getProduct({ category: slug });
      // 2 вариант
      //можно просто {data} вместо data:products,это переименование
      const { data: products, pagination } = await api.getProduct({ category: slug, page: page, limit: 9 });

      console.log('products категории: ', products, pagination);
      // debugger

      new BreadCrumbs().mount(new Main().element, [{ text: slug }]);
      new ProductList().mount(new Main().element, products, slug);
      new Pagination()
        .mount(new ProductList().containerElement)
        .update(pagination);
      // так как функция заканивает работу до того как карточки и их ссылки создаются
      // нужно обновить,иначе перезагрузка
      router.updatePageLinks();

    }, {
      leave(done, match) {
        console.log('leave:');
        new BreadCrumbs().unmount();
        new ProductList().unmount();
        new Catalog().unmount();
        done()
      },
    })
    .on(`/favorite`, async ({ params }) => {
      new Catalog().mount(new Main().element);
      // достаю из localstorage favorite
      const favorite = new favoriteService().get();
      console.log('favorite: ', favorite);
      // передаю в запрос данных favorite параметру list
      // без join() запрос такой https://koff-api.vercel.app/api/products?list[]=19&list[]=44,
      // {data:products} вытаскивает data из переменной с объектом и переименуюет в products
      const { data: products, pagination } = await api.getProduct({
        list: favorite.join(','),
        page: params?.page || 1
      });
      console.log('products favorite: ', products);

      new BreadCrumbs().mount(new Main().element, [{ text: 'Избранное' }]);
      new ProductList().mount(new Main().element, products, 'Избранное', 'Вы ничего не добавили в избранное:( Нажмите на сердечко на любой карточке и попробуйте снова.Для возрата на список всех товаров нажмите на логотип или на любую категорию');
      // так как функция заканивает работу до того как карточки и их ссылки создаются
      // нужно обновить,иначе перезагрузка
      new Pagination().mount(new ProductList().containerElement).update(pagination);
      router.updatePageLinks();

    }, {
      leave(done, match) {
        console.log('leave:');
        new BreadCrumbs().unmount();
        new ProductList().unmount();
        new Catalog().unmount();
        done()
      },
      already(match) {
        // проверить работу
        match.route.handler(match);
      }
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
      }, 20e3);

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


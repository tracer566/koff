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
import { ProductCard } from './modules/ProductCard/ProductCard.js';
import { productSlider } from './features/ProductSlider/ProductSlider.js';
import { Cart } from './modules/Cart/Cart.js';
// import Swiper JS
// import { Navigation, Thumbs } from 'swiper/modules'
// import Swiper from 'swiper';
// import Swiper styles
// import 'swiper/css';

//при заливке на гитхаб new Navigo(`/koff/dist`),создание роутера
export const router = new Navigo(`/`, { linksSelector: `a[href^="/"]` });

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

  // productSlider();

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
        new Catalog().unmount();
        new ProductList().unmount();
        new BreadCrumbs().unmount();
        done()
      },
      already(match) {
        match.route.handler(match);
      }
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
      // отрисовка избранного
      new ProductList().mount(new Main().element, products, 'Избранное', 'Вы ничего не добавили в избранное:( Нажмите на сердечко на любой карточке и попробуйте снова.Для возрата на список всех товаров нажмите на логотип или на любую категорию');
      // так как функция заканивает работу до того как карточки и их ссылки создаются
      // нужно обновить,иначе перезагрузка

      if (favorite.length > 1) {
        new Pagination().mount(new ProductList().containerElement).update(pagination);
      };
      router.updatePageLinks();

    }, {
      leave(done, match) {
        new BreadCrumbs().unmount();
        new ProductList().unmount();
        new Catalog().unmount();
        done();
      },
      already(match) {
        // проверить работу
        match.route.handler(match);
      }
    })
    .on(`/search`, async ({ params }) => {
      // можно выше params:{q}
      console.log('search params: ', params.q);
      new Catalog().mount(new Main().element);
      const { data: products, pagination } = await api.getProduct({
        // передаю вбитую в поиск строку в getProduct
        q: params.q
      });

      new BreadCrumbs().mount(new Main().element, [{ text: 'Поиск' }]);

      new ProductList().mount(new Main().element, products, `Поиск:${params.q}`, `Ничего не найдено по запросу:${params.q}.
      Подсказка для поиска:стол,стулья,диван,пуф,либо название товара`);

      new Pagination().mount(new ProductList().containerElement).update(pagination);
      router.updatePageLinks();

    }, {
      leave(done, match) {
        new BreadCrumbs().unmount();
        new ProductList().unmount();
        new Catalog().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      }
    })
    .on(`/product/:id`, async (obj) => {
      // /product/:id
      console.log('product obj: ', obj);
      new Catalog().mount(new Main().element);
      const data = await api.getProductById(obj.data.id);
      console.log('getProductById data: ', data);

      new BreadCrumbs().mount(new Main().element, [{
        text: data.category,
        href: `/category?slug=${data.category}`,
      },
      {
        text: data.name,
      }
      ]);

      // отрисовка страницы продукта
      new ProductCard().mount(new Main().element, data);
      console.log('new ProductCard(): ', new ProductCard());
      // вызываю слайдер
      productSlider();

    }, {
      leave(done) {
        console.log('leave product page')
        new Catalog().unmount();
        new BreadCrumbs().unmount();
        new ProductCard().unmount();
        done();
      }
    })
    .on(`/cart`, async () => {
      console.log('cart');
      const cartItems = await api.getCart();
      console.log('cartItems: ', cartItems);
      new Cart().mount(new Main().element, cartItems, 'Корзина пуста.Добавьте сюда товар');
      console.log('new Cart(): ', new Cart());
    }, {
      leave(done) {
        new Cart().unmount();
        console.log('leave product page')
        done();
      }
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
     <img src="/img/robots.jpg" style="margin:15px auto;border-radius:30px;" width="400" height="400" alt="#"> 

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




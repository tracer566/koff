import axios from 'axios';
import { API_URL } from '../const.js';
import { accessKeyService } from './StorageService.js';

export class ApiService {
  #apiURL = API_URL;

  constructor() {
    // создаю новый объект из StorageService
    this.accessKeyService = new accessKeyService('accessKey');

    // получаю ключ из localstorage и сохраняю в значение this.accessKey
    this.accessKey = this.accessKeyService.get();
    this.isDownLoadAccessKey = false;

  };

  //3 получение ключа
  async getAccessKey() {
    try {
      if (!this.accessKey && !this.isDownLoadAccessKey) {
        this.isDownLoadAccessKey = true;

        const responce = await axios.get(`${this.#apiURL}api/users/accessKey`);
        // записываю ключ в класс
        this.accessKey = responce.data.accessKey;
        // отправляю ключ в localstorage
        this.accessKeyService.set(this.accessKey)
        this.isDownLoadAccessKey = false;
      }
    } catch (error) {
      this.isDownLoadAccessKey = false;
      console.log('getAccessKey error: ', error);
    }

  };

  //2 получение данных,главная функция и 1ая по записи
  async getData(pathname, params = {}) {
    // console.log('getData params: ', params);
    if (!this.accessKey) {
      await this.getAccessKey();
    }
    try {
      const responce = await axios.get(`${this.#apiURL}${pathname}`, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`
        },
        params
      });

      // data только при работе с axios
      return responce.data;
    } catch (error) {
      console.log('тут ошибка');
      console.dir(error)
      if (error.response && error.response.status === 401) {
        this.accessKey = null;
        this.accessKeyService.delete();

        return this.getData(pathname, params);
      } else {
        console.log('getData error', error);
      }

    };

  };

  //1 получение товаров
  // async getProduct(page = 1, limit = 30, list, category, search) {
  //   return await this.getData('api/products', {
  //     page,
  //     limit,
  //     list,
  //     category,
  //     search,
  //   });
  // };
  async getProduct(params) {
    return await this.getData('api/products', params);
  };

  // получение категория
  async getProductCategories() {
    return await this.getData(`api/productCategories`);
  };

  // id товара
  async getProductById(id) {
    return await this.getData(`api/products/${id}`);
  };

  /* Корзина */
  // отправка в корзину
  async postProductToCart(productId, quantity = 1) {
    if (!this.accessKey) {
      await this.getAccessKey();
    };

    try {
      const response = await axios.post(`${this.#apiURL}api/cart/products`, {
        productId,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`,
        },
      },
      );

      // data только при работе с axios
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.accessKey = null;
        this.accessKeyService.delete();
      };
      console.error('Ошибка сервиса корзины postProductToCart', error)
    };
  };

  // изменение количества товара в корзине
  async updateQuantityProductToCart(productId, quantity) {
    if (!this.accessKey) {
      await this.getAccessKey();
    };

    try {
      const response = await axios.put(`${this.#apiURL}api/cart/products`, {
        productId,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`,
        },
      },
      );

      // data только при работе с axios
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.accessKey = null;
        this.accessKeyService.delete();
      };
      console.error('Ошибка сервиса корзины.Функция changeQuantitypostProductToCart', error)
    };
  };

  // получение из корзины
  async getCart() {
    return await this.getData('api/cart');
  };

  // удаление товара из корзины
  async deleteProductFromCart(id) {
    if (!this.accessKey) {
      await this.getAccessKey();
    };

    try {
      const response = await axios.delete(`${this.#apiURL}api/cart/products/${id}`, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`,
        },
      },
      );

      // data только при работе с axios
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.accessKey = null;
        this.accessKeyService.delete();
      };
      console.error('Ошибка сервиса корзины.Функция daleteProductFromCart', error)
    };
  };


  // отправка заказа через форму в корзине
  async postOrder(data) {
    if (!this.accessKey) {
      await this.getAccessKey();
    };

    try {
      const response = await axios.post(`${this.#apiURL}api/orders`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.accessKey}`,
          },
        },
      );

      // data только при работе с axios
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.accessKey = null;
        this.accessKeyService.delete();
      };
      console.error('Ошибка сервиса postOrder', error)
    };
  };

  // получение данных после отправки заказв
  async getOrder(id) {
    return await this.getData(`api/orders/${id}`);

  };

}


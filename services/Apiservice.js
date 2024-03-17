import axios from 'axios';
import { API_URL } from '../const.js';

export class ApiService {
  #apiURL = API_URL;
  /* тестовый */
  // #kzk = 'klk';

  constructor() {

    this.accessKey = localStorage.getItem('accessKey');
    // console.log('this.accessKey: ', this.accessKey);
    this.isDownLoadAccessKey = false;

    // проверка url
    // const test2 = this.getAccessKey();
    // console.log('test2: ', test2);
    // console.log('this.#apiURL: ', this.#apiURL);

  };

  //3 получение ключа
  async getAccessKey() {
    try {
      if (!this.accessKey && !this.isDownLoadAccessKey) {
        this.isDownLoadAccessKey = true;
        // сделал объект url в него сохранил ссылку api
        // const url = new URL(this.#apiURL);
        // console.log('url: ', url);
        // url.pathname = `api/users/accessKey`;
        // const responce = await axios.get(url);

        const responce = await axios.get(`${this.#apiURL}api/users/accessKey`);
        this.accessKey = responce.data.accessKey;
        localStorage.setItem('accessKey', this.accessKey);
        this.isDownLoadAccessKey = false;
      }
    } catch (error) {
      this.isDownLoadAccessKey = false;
      console.log('getAccessKey error: ', error);
    }

  };

  //2 получение данных
  async getData(pathname, params = {}) {
    console.log('getData params: ', params);
    if (!this.accessKey) {
      await this.getAccessKey();
    }
    try {
      // можно fetch
      // сделал объект url в него сохранил ссылку api
      // const url = new URL(this.#apiURL);
      // url.pathname = pathname;

      /* с new URL() = await axios.get(url.href,*/
      const responce = await axios.get(`${this.#apiURL}${pathname}`, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`
        },
        params
      });

      return responce.data;
    } catch (error) {
      console.log('тут ошибка');
      console.dir(error)
      if (error.response && error.response.status === 401) {
        this.accessKey = null;
        localStorage.removeItem('accessKey');

        return this.getData(pathname, params);
      } else {
        console.log('getData error', error);
      }

    };

  };

  //1 получение товаров
  async getProduct(page = 1, limit = 30, list, category, search) {
    return await this.getData('api/products', {
      page,
      limit,
      list,
      category,
      search,
    });
  };

  // получение категория
  async getProductCategories() {
    return await this.getData(`api/productCategories`);
  };

  // id товара
  async getProductById() {
    return await this.getData(`api/products/${id}`);
  };
}


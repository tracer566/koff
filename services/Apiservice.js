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
  async getProductById() {
    return await this.getData(`api/products/${id}`);
  };
}


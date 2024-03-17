import { API_URL } from "../../const.js";
import { addContainer } from "../addContainer.js";
import { Card } from "../../features/Card/Card.js";

export class ProductList {
  static instance = null;

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this;

      this.element = document.createElement('section');
      this.element.classList.add('goods');
      this.containerElement = addContainer(this.element, 'goods__container');
      // console.log('this.containerElement ProductList', this.containerElement);

      // проверка
      this.isMounted = false;
      this.addEvents();
    }

    return ProductList.instance;
  }

  // монтаж элемента
  mount(parent, data, title) {
    // в parent передаю объект new Main().element 

    this.containerElement.textContent = "";
    // заголовок секции
    const titleElem = document.createElement('h2');

    titleElem.textContent = title ? title : 'Список товаров';
    titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';
    // в this elem => section => container
    this.containerElement.append(titleElem);

    // обновить список товаров,сразу действие
    this.updateListElem(data);

    // проверка
    if (this.isMounted) {
      return;
    };

    parent.append(this.element);
    this.isMounted = true;

  };

  // демонтаж элемента
  unmount() {
    this.element.remove();
    this.isMounted = false;
  };

  addEvents() {

  };
  updateListElem(data = []) {
    // обертка карточек
    const listElem = document.createElement('ul');
    listElem.classList.add('goods__list');

    // массив карточек
    const listItems = data.map(({ id, images: [image], name: title, price, }) => {
      const listItemElem = document.createElement('li');
      listItemElem.className = 'goods__item';
      listItemElem.append(new Card({ id, image, title, price }).create())

      return listItemElem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);


  };


}


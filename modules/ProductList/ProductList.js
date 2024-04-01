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
    }

    return ProductList.instance;
  }

  // монтаж элемента
  mount(parent, data, title, emptyText) {
    // в parent передаю объект new Main().element 

    this.containerElement.textContent = "";
    // заголовок секции
    const titleElem = document.createElement('h2');

    titleElem.textContent = title ? title : 'Список товаров';
    titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';
    // в this elem => section => container
    this.containerElement.append(titleElem);

    // проверка что data есть
    if (data && data.length) {
      // обновить список товаров,сразу действие
      this.updateListElem(data);
    } else {
      this.containerElement.insertAdjacentHTML('beforeend', `
      <p class="goods__empty" style="font-weigth:700;margin:70px;font-size:19px">${emptyText || 'Произошла ошибка,нет товара или нет данных о товаре на этой странице,попробуйте еще раз:(.Для возрата на главную нажмите на логотип'}</p>
      `)
    }


    // проверка,закомментить для решения проблемы со вставкой хлебных крошек
    if (this.isMounted) {
      return;
    };

    parent.append(this.element);

    // закомментить для решения проблемы со вставкой хлебных крошек
    this.isMounted = true;

  };

  // демонтаж элемента
  unmount() {
    this.element.remove();
    this.isMounted = false;
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


import { API_URL } from "../../const.js";
import { addContainer } from "../addContainer.js";

export class ProductList {
  static instance = null;

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this;

      this.element = document.createElement('section');
      this.element.classList.add('goods');
      this.containerElement = addContainer(this.element, 'goods__container');
      console.log('this.containerElement ProductList', this.containerElement);

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
  updateListElem(data = [1, 2, 3, 4, 5, 6]) {
    // обертка карточек
    const listElem = document.createElement('ul');
    listElem.classList.add('goods__list');

    // массив карточек
    const listItems = data.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.className = 'goods__item';
      listItemElem.innerHTML = this.getHTMLTemplateListItem(item);

      return listItemElem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);


  };

  getHTMLTemplateListItem({ id, name: title, price, images: [image], category }) {
    // const { id, name, price, images: [image], category } = item;

    return `
              <article class="goods__card card">
        <a class="card__link card__link_img" href="/product/321">
        <img class="card__img" src="${API_URL}${image}" alt="${title}">
        </a>

        <h3 class="card__title">
        <a class="card__link" href="/product/${id}">
        ${title}
        </a>
        </h3>

        <p class="card__price">${price.toLocaleString()}&nbsp;₽</p>
        <button class="card__btn" data-id="${id}" type="button">В корзину</button>

        <button class="card__favorite" data-id="${id}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.41331 13.8733C8.18665 13.9533 7.81331 13.9533 7.58665 13.8733C5.65331 13.2133 1.33331 10.46 1.33331 5.79332C1.33331 3.73332 2.99331 2.06665 5.03998 2.06665C6.25331 2.06665 7.32665 2.65332 7.99998 3.55998C8.67331 2.65332 9.75331 2.06665 10.96 2.06665C13.0066 2.06665 14.6666 3.73332 14.6666 5.79332C14.6666 10.46 10.3466 13.2133 8.41331 13.8733Z" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        </button>

        </article>
      `

  };

}


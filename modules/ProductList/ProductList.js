import { addContainer } from "../addContainer";

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

    // обновить список товаров
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
      listItemElem.textContent = item;

      return listItemElem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);


  };


}
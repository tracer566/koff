import { addContainer } from '../addContainer.js';
export class Cart {
  static instance = null;

  constructor() {
    if (!Cart.instance) {
      Cart.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('cart');
      this.containerElement = addContainer(this.element, 'cart__container');
      this.isMounted = false;
    };

    return Cart.instance;
  };

  async mount(parent, data, emptyText) {
    if (this.isMounted) {
      return;
    };

    // заголовок корзины
    const cartTitle = document.createElement('h2');
    cartTitle.classList.add('cart__title');
    cartTitle.textContent = 'Корзина';

    console.log('data from class Cart', data);

    // сохраняю данные
    this.cartData = data;

    // проверка что данные в корзину есть
    if (data.products && data.products.length) {
      this.renderProducts();
      this.renderPlace();
      this.renderForm();
    } else {
      this.containerElement.textContent = ``;
      this.containerElement.insertAdjacentHTML('beforeend', `
      <p class="cart__empty">${emptyText || 'Произошла ошибка,нет товара или не пришли данные на страницу корзины.Для возрата на главную нажмите на логотип и проверьте наличие интернета'}</p>
      `)

    }

    this.containerElement.append(cartTitle);

    parent.append(this.element);
    this.isMounted = true;
  };

  unmount() {
    this.element.remove();
    this.isMounted = false;
  };

  renderProducts() {
    const cartProductsList = document.createElement('ul');
    cartProductsList.classList.add('cart__products');


    /* 
     <ul class="cart__products">
    <li class="cart__product">
      <img class="cart__img" src="./img/photo.jpg" alt="Кресло с подлокотниками">
      <h3 class="cart__title-product">Кресло с подлокотниками</h3>
      <p class="cart__price">5&nbsp;000&nbsp;₽</p>
      <p class="cart__article">арт. 84348945757</p>
      <div class="cart__product-control">
        <button class="cart__product-btn">-</button>
        <p class="cart__product-count">1</p>
        <button class="cart__product-btn">+</button>
      </div>
    </li>
  </ul>
    */
  };

  renderPlace() {

  };

  renderForm() {

  };

};
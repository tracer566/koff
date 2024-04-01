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

    const cartTitle = document.createElement('h2');
    cartTitle.classList.add('cart__title');
    cartTitle.textContent = 'Корзина';

    this.containerElement.append(cartTitle);

    parent.append(this.element);
    this.isMounted = true;
  };

  unmount() {
    this.element.remove();
    this.isMounted = false;
  };

  renderProducts() {

  };

  renderPlace() {

  };

  renderForm() {

  };

};
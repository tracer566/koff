import { addContainer } from "../addContainer.js";
import { Main } from '../Main/Main.js'

export class Order {
  static instance = null;
  constructor() {
    if (!Order.instance) {
      Order.instance = this;

      this.element = document.createElement('section');
      this.element.classList.add('order');
      this.containerElement = addContainer(this.element, 'order__container');

      // проверка
      this.isMounted = false;
    }

    return Order.instance;

  };

  // монтаж элемента
  mount(parent) {
    if (this.isMounted) {
      return;
    };

    const infoOrder = this.getInfo();

    this.containerElement.append(infoOrder);
    parent.append(this.element);

    // проверка
    this.isMounted = true;

  };

  // демонтаж элемента
  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  getInfo() {
    const info = document.createElement('div');
    info.className = 'order__info';
    const btn = document.createElement('button');
    btn.classList.add('order__btn');
    btn.type = 'submit';
    btn.textContent = 'На главную';

    info.insertAdjacentHTML('beforeend', `
         <div class="order__head">
          <h2 class="order__title">Заказ успешно размещен</h2>      
        <p class="order__price">20&nbsp;000&nbsp;₽</p>
        </div>
        <p class="order__number">№43435</p>

        <div class="order__data">
          <h3 class="order__data-title">Данные доставки</h3>
        <table class="order__data-table table">
        <tr class="table__row">
        <td class="table__field">Получатель</td>
        <td class="table__value">Иванов Петр Александрович</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">Телефон</td>
        <td class="table__value">+7 (737) 346 23 00</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">E-mail</td>
        <td class="table__value">Ivanov84@gmail.com</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">Адрес доставки</td>
        <td class="table__value">Москва, ул. Ленина, 21, кв. 33</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">Способ оплаты</td>
        <td class="table__value">Картой при получении</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">Способ получения</td>
        <td class="table__value">Доставка</td>
        </tr>
        </table>
        </div>
    `)

    info.append(btn)

    return info;
  };
};




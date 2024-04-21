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
  mount(parent, data) {
    if (this.isMounted) {
      return;
    };

    const infoOrder = this.getInfo(data);

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

  getInfo(data) {
    console.log('getInfo order data: ', data);
    const info = document.createElement('div');
    info.className = 'order__info';
    const btn = document.createElement('button');
    btn.classList.add('order__btn');
    btn.type = 'submit';
    btn.textContent = 'На главную';

    let card;
    if (data.paymentType === 'card') {
      card = 'Оплата картой при получении';
    } else {
      card = 'Оплата наличными';
    };

    let delivery;
    if (data.deliveryType === "delivery") {
      delivery = 'Доставка по указанному адресу'
    } else {
      delivery = 'Самовывоз';
    }

    info.insertAdjacentHTML('beforeend', `
         <div class="order__head">
          <h2 class="order__title">Заказ успешно размещен</h2>      
        <p class="order__price">${(data.totalPrice).toLocaleString()}&nbsp;₽</p>
        </div>
        <p class="order__number">№${data.id}</p>

        <div class="order__data">
          <h3 class="order__data-title">Данные доставки</h3>
        <table class="order__data-table table">
        <tr class="table__row">
        <td class="table__field">Получатель</td>
        <td class="table__value">${data.name}</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">Телефон</td>
        <td class="table__value">${data.phone}</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">E-mail</td>
        <td class="table__value">${data.email}</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">Адрес доставки</td>
        <td class="table__value">${data.address}</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">Способ оплаты</td>
        <td class="table__value">${card}</td>
        </tr>
        <tr class="table__row">
        <td class="table__field">Способ получения</td>
        <td class="table__value">${delivery}</td>
        </tr>
        </table>
        </div>
    `)

    info.append(btn)

    return info;
  };
};




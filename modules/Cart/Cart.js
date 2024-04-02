import { addContainer } from '../addContainer.js';
import { API_URL } from '../../const.js';

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

    this.containerElement.append(cartTitle);

    console.log('data from class Cart', data);

    // сохраняю данные
    this.cartData = data;

    // проверка что данные в корзину есть
    if (data.products && data.products.length) {
      this.renderProducts(data.products);
      this.renderPlace();
      this.renderForm();
    } else {
      this.containerElement.textContent = ``;
      this.containerElement.insertAdjacentHTML('beforeend', `
      <p class="cart__empty">${emptyText || 'Произошла ошибка,нет товара или не пришли данные на страницу корзины.Для возрата на главную нажмите на логотип и проверьте наличие интернета'}</p>
      `)

    }


    parent.append(this.element);
    this.isMounted = true;
  };

  unmount() {
    this.element.remove();
    this.isMounted = false;
  };

  renderProducts() {
    const listData = this.cartData.products;
    const cartList = document.createElement('ul');
    cartList.classList.add('cart__products');

    listData.forEach(listElem => {
      const cartElem = document.createElement('li');
      cartElem.classList.add('cart__product');

      const cartImg = document.createElement('img');
      cartImg.classList.add('cart__img');
      cartImg.src = `${API_URL}${listElem.images[0]}`;
      cartImg.alt = listElem.name;

      const cartTitleProduct = document.createElement('h3');
      cartTitleProduct.classList.add('cart__title-product');
      cartTitleProduct.textContent = listElem.name;

      const cartPrice = document.createElement('p');
      cartPrice.classList.add('cart__price');
      cartPrice.innerHTML = `${(listElem.price * listElem.quantity).toLocaleString()}&nbsp;₽`

      const cartArticle = document.createElement('p');
      cartArticle.classList.add('cart__article');
      cartArticle.innerHTML = `арт. ${listElem.article}`;

      // кнопки контроля
      const cartControlWrap = document.createElement('div');
      cartControlWrap.classList.add('cart__product-control');
      // кнопка минус
      const cartBtnMinus = document.createElement('button');
      cartBtnMinus.classList.add('cart__product-btn');
      cartBtnMinus.textContent = `-`;

      // счетчик товара в корзине
      const cartCount = document.createElement('p');
      cartCount.classList.add('cart__product-count');
      cartCount.textContent = listElem.quantity;
      // кнопка плюс
      const cartBtnPlus = document.createElement('button');
      cartBtnPlus.classList.add('cart__product-btn');
      cartBtnPlus.textContent = `+`;

      cartControlWrap.append(cartBtnMinus, cartCount, cartBtnPlus)

      cartElem.append(cartImg, cartTitleProduct, cartPrice, cartArticle, cartControlWrap)
      cartList.append(cartElem);
    })

    // вставляю блоки по одному,ниже следующие вставки
    this.containerElement.append(cartList);

    /* {
    "products": [
    {
    "id": 41,
    "article": "16955704834",
    "name": "Прямой диван Монреаль",
    "price": 161902,
    "images": [
    "img//1hb45sd82asal5nl.jpg",
    "img//1hb45sd8lppsjbt2.jpg",
    "img//1hb45sd8gtf4ktpa.jpg",
    "img//1hb45sd912df8gre.jpg"
    ],
    "category": "Диваны",
    "quantity": 1,
    "productId": 41
    },
    {
    "id": 50,
    "article": "16970302064",
    "name": "Игральный стол Howard Miller Ithaca Pub & Game",
    "price": 263134,
    "images": [
    "/img//1hcgqpnvrs39evut.jpg",
    "/img//1hcgqpnvh8vhsf16.jpg",
    "/img//1hcgqpnv09qr9bko.jpg"
    ],
    "category": "Столы",
    "quantity": 1,
    "productId": 50
    }
    ],
    "totalPrice": 425036,
    "totalCount": 2
    } */
  };

  renderPlace() {
    // данные беру из объекта,я их записывал в render
    const count = this.cartData.products.length;
    const totalPrice = this.cartData.totalPrice;

    const cartPlace = document.createElement('div');
    cartPlace.classList.add('cart__place');

    const subtitle = document.createElement('h3');
    subtitle.classList.add('cart__subtitle');
    subtitle.textContent = 'Оформление';

    const info = document.createElement('div');
    info.classList.add('cart__place-info');

    const placeCount = document.createElement('p');
    placeCount.classList.add('cart__place-count');
    placeCount.textContent = `${count} товара на сумму:`

    const placePrice = document.createElement('p');
    placePrice.classList.add('cart__place-price');
    placePrice.innerHTML = `${(totalPrice).toLocaleString()}&nbsp;₽`;


    info.append(placeCount, placePrice);

    const placeDelivery = document.createElement('p');
    placeDelivery.classList.add('cart__place-delivery');
    placeDelivery.textContent = 'Доставка 0 ₽';

    const placeBtn = document.createElement('button');
    placeBtn.classList.add('cart__place-btn');
    placeBtn.type = 'submit';
    placeBtn.setAttribute('form', 'order');
    placeBtn.textContent = 'Оформить заказ';

    cartPlace.append(subtitle, info, placeDelivery, placeBtn);

    this.containerElement.append(cartPlace);
  };

  renderForm() {
    const cartForm = document.createElement('form');
    cartForm.classList.add('cart__form', 'form-order');
    cartForm.id = 'order';
    cartForm.action = '#';
    cartForm.method = 'post';

    const formTitle = document.createElement('h3');
    formTitle.className = 'cart__subtitle cart__subtitle_form-order';
    formTitle.textContent = 'Данные для доставки';

    // fieldset с инпутами
    const formFieldsetInput = document.createElement('fieldset');
    formFieldsetInput.className = 'form-order__fieldset form-order__fieldset_input';

    const inputName = document.createElement('input');
    inputName.classList.add('form-order__input');
    inputName.placeholder = 'Фамилия Имя Отчество';
    inputName.type = 'text';
    inputName.name = 'text';

    const inputPhone = document.createElement('input');
    inputPhone.classList.add('form-order__input');
    inputPhone.placeholder = 'Телефон';
    inputPhone.type = 'tel';
    inputPhone.name = 'tel';

    const inputEmail = document.createElement('input');
    inputEmail.classList.add('form-order__input');
    inputEmail.placeholder = 'E-mail';
    inputEmail.type = 'email';
    inputEmail.name = 'email';

    const inputAddress = document.createElement('input');
    inputAddress.classList.add('form-order__input');
    inputAddress.placeholder = 'Адрес доставки';
    inputAddress.type = 'text';
    inputAddress.name = 'text';

    const textarea = document.createElement('textarea');
    textarea.classList.add('form-order__textarea');
    textarea.name = 'comments';
    textarea.placeholder = 'Комментарий к заказу'

    formFieldsetInput.append(inputName, inputPhone, inputEmail, inputAddress, textarea);

    // fieldset с радио
    const formFieldsetRadioDelivery = document.createElement('fieldset');
    formFieldsetRadioDelivery.className = 'form-order__fieldset form-order__fieldset_radio';
    formFieldsetRadioDelivery.innerHTML = `
         <legend class="form-order__legend">Доставка</legend>
      <label class="form-order__label radio">
        <input class="radio__input" type="radio" name="deliveryType" value="delivery">
        Доставка
      </label>

      <label class="form-order__label radio">
        <input class="radio__input" type="radio" name="deliveryType" value="pickup">
        Самовывоз
      </label>
    `;

    // fieldset с радио
    const formFieldsetRadioPay = document.createElement('fieldset');
    formFieldsetRadioPay.className = 'form-order__fieldset form-order__fieldset_radio';
    formFieldsetRadioPay.innerHTML = `
       <legend class="form-order__legend">Оплата</legend>
      <label class="form-order__label radio">
        <input class="radio__input" type="radio" name="paymentType" value="card">
        Картой при получении
      </label>

      <label class="form-order__label radio">
        <input class="radio__input" type="radio" name="paymentType" value="cash">
        Наличными при получении
      </label>
    `;

    cartForm.append(formTitle, formFieldsetInput, formFieldsetRadioDelivery, formFieldsetRadioPay);
    this.containerElement.append(cartForm);
    /*  <form class="cart__form form-order" id="order" action="#" method="post">
    <h3 class="cart__subtitle cart__subtitle_form-order">Данные для доставки</h3>

    <fieldset class="form-order__fieldset form-order__fieldset_input">
      <input class="form-order__input" placeholder="Фамилия Имя Отчество" type="text" name="text">
      <input class="form-order__input" placeholder="Телефон" type="tel" name="tel">
      <input class="form-order__input" placeholder="E-mail" type="email" name="email">
      <input class="form-order__input" placeholder="Адрес доставки" type="text" name="text">

      <textarea class="form-order__textarea" name="comments" placeholder="Комментарий к заказу">

      </textarea>
    </fieldset>

    <fieldset class="form-order__fieldset form-order__fieldset_radio">
      <legend class="form-order__legend">Доставка</legend>
      <label class="form-order__label radio">
        <input class="radio__input" type="radio" name="deliveryType" value="delivery">
        Доставка
      </label>

      <label class="form-order__label radio">
        <input class="radio__input" type="radio" name="deliveryType" value="pickup">
        Самовывоз
      </label>
    </fieldset>

      <fieldset class="form-order__fieldset form-order__fieldset_radio">
      <legend class="form-order__legend">Оплата</legend>
      <label class="form-order__label radio">
        <input class="radio__input" type="radio" name="paymentType" value="card">
        Картой при получении
      </label>

      <label class="form-order__label radio">
        <input class="radio__input" type="radio" name="paymentType" value="cash">
        Наличными при получении
      </label>
    </fieldset>

  </form> */

  };

};
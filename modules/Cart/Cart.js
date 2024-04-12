import { addContainer } from '../addContainer.js';
import { API_URL } from '../../const.js';
import { ApiService } from '../../services/Apiservice.js';
import { debounce } from '../../debounce.js';

export class Cart {
  static instance = null;

  constructor() {
    if (!Cart.instance) {
      Cart.instance = this;
      this.element = document.createElement('section');
      this.element.classList.add('cart');
      this.containerElement = addContainer(this.element, 'cart__container');
      this.isMounted = false;
      this.debUpdateCart = debounce(this.updateCart.bind(this), 300);
    };

    return Cart.instance;
  };

  async mount(parent, data, emptyText) {
    if (this.isMounted) {
      return;
    };
    // убирает баг с накладыванием текста друг на друга(дело в гридах)
    this.containerElement.textContent = '';

    // заголовок корзины
    const cartTitle = document.createElement('h2');
    cartTitle.classList.add('cart__title');
    cartTitle.textContent = 'Корзина';

    this.containerElement.append(cartTitle);

    console.log('data from class Cart', data);

    // сохраняю данные
    this.cartData = data;

    // проверка что данные в корзине есть
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

  // обновление корзины
  updateCart(id, quantity) {
    // console.log('id, quantity: ', id, quantity);
    // console.log('Обновление корзины');
    if (quantity === 0) {
      new ApiService().deleteProductFromCart(id);
      this.cartData.products = this.cartData.products.filter(product => product.id !== id);
    } else {
      // запрашиваю новые товары
      new ApiService().updateQuantitypostProductToCart(id, quantity);
      this.cartData.products.forEach(product => {
        if (product.id === id) {
          product.quantity = quantity;
        };
      });
    }

    this.cartData.totalPrice = this.cartData.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    console.log('this.cartData.products.quantity', this.cartData.products);
    // обновляю данные визуально

    // здесь собрал все quantity товаров в массив [1,2,3,4,5]
    let countEveryProduct = this.cartData.products.map(item => item.quantity);
    // здесь их складываю
    this.sumProduct = countEveryProduct.reduce((total, current) => total + current, 0);

    this.placeCount.textContent = `${this.sumProduct} товара на сумму:`
    this.placePrice.innerHTML = `${(this.cartData.totalPrice).toLocaleString()}&nbsp;₽`;
  };

  // рендер добавленных товаров
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

      // кнопка минус,может удалить все данные о товаре
      cartBtnMinus.addEventListener('click', async () => {
        if (listElem.quantity) {
          listElem.quantity = listElem.quantity - 1;
          cartCount.textContent = listElem.quantity;
          cartPrice.innerHTML = `${(listElem.price * listElem.quantity).toLocaleString()}&nbsp;₽`;

          // удаляю карточку если убрали товар,до нуля
          if (listElem.quantity === 0) {
            let question = confirm('Удалить товар из корзины?');
            if (question) {
              cartElem.remove();
              this.debUpdateCart(listElem.id, listElem.quantity);
              return;
            } else {
              listElem.quantity = 1;
              cartCount.textContent = listElem.quantity;
              cartPrice.innerHTML = `${(listElem.price * listElem.quantity).toLocaleString()}&nbsp;₽`;
            };
          };
          // конец условия,если счетчик на нуле

          // если this.updateCart не 0,то вызываю эту функцию this.debUpdateCart = debounce(this.updateCart, 1000);
          this.debUpdateCart(listElem.id, listElem.quantity);

        };
        // конец условия счетчика

      });

      // кнопка добавить товар
      cartBtnPlus.addEventListener('click', () => {
        listElem.quantity++;
        cartCount.textContent = listElem.quantity;
        cartPrice.innerHTML = `${(listElem.price * listElem.quantity).toLocaleString()}&nbsp;₽`;
        this.debUpdateCart(listElem.id, listElem.quantity);
      });

      cartControlWrap.append(cartBtnMinus, cartCount, cartBtnPlus)

      cartElem.append(cartImg, cartTitleProduct, cartPrice, cartArticle, cartControlWrap)
      cartList.append(cartElem);
    });
    // конец foreach

    // вставляю блоки по одному,ниже следующие вставки
    this.containerElement.append(cartList);
  };

  // рендер данных о товарах
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

    this.placeCount = document.createElement('p');
    this.placeCount.classList.add('cart__place-count');
    this.placeCount.textContent = `${count} товара на сумму:`

    this.placePrice = document.createElement('p');
    this.placePrice.classList.add('cart__place-price');
    this.placePrice.innerHTML = `${(totalPrice).toLocaleString()}&nbsp;₽`;

    info.append(this.placeCount, this.placePrice);

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

  // рендер формы отправки заказа
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
    inputName.required = 'true';

    const inputPhone = document.createElement('input');
    inputPhone.classList.add('form-order__input');
    inputPhone.placeholder = 'Телефон';
    inputPhone.type = 'tel';
    inputPhone.name = 'tel';
    inputPhone.required = 'true';

    const inputEmail = document.createElement('input');
    inputEmail.classList.add('form-order__input');
    inputEmail.placeholder = 'E-mail';
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.required = 'true';

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
        <input class="radio__input" required type="radio" name="deliveryType" value="delivery">
        Доставка
      </label>

      <label class="form-order__label radio">
        <input class="radio__input" required type="radio" name="deliveryType" value="pickup">
        Самовывоз
      </label>
    `;

    // fieldset с радио
    const formFieldsetRadioPay = document.createElement('fieldset');
    formFieldsetRadioPay.className = 'form-order__fieldset form-order__fieldset_radio';
    formFieldsetRadioPay.innerHTML = `
       <legend class="form-order__legend">Оплата</legend>
      <label class="form-order__label radio">
        <input class="radio__input" required type="radio" name="paymentType" value="card">
        Картой при получении
      </label>

      <label class="form-order__label radio">
        <input class="radio__input" required type="radio" name="paymentType" value="cash">
        Наличными при получении
      </label>
    `;

    cartForm.append(formTitle, formFieldsetInput, formFieldsetRadioDelivery, formFieldsetRadioPay);
    cartForm.addEventListener('submit', e => {
      e.preventDefault();
      console.log('Отправка заказа');
    });
    this.containerElement.append(cartForm);

  };

};
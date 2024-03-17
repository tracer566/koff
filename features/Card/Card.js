import { API_URL } from "../../const.js";
import { CartButton } from "../CartButton/CartButton.js";
import { LikeButton } from "../LikeButton/LikeButton.js";

export class Card {
  constructor({ id, image, title, price }) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.price = price;
    this.CartButton = new CartButton('card__btn', 'В корзину');
    this.LikeButton = new LikeButton('card__favorite');
  }

  create() {
    const article = document.createElement('article');
    article.classList.add('goods__card', 'card');

    const cardLinkImg = document.createElement('a');
    cardLinkImg.classList.add('card__link', 'card__link_img');
    cardLinkImg.href = `/product/${this.id}`;

    const cardImg = document.createElement('img');
    cardImg.classList.add('card__img');
    cardImg.src = `${API_URL}${this.image}`;
    cardImg.alt = `${this.title}`;

    cardLinkImg.append(cardImg);

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card__info');

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card__title');

    const cardLink = document.createElement('a');
    cardLink.classList.add('card__link');
    cardLink.textContent = `${this.title}`;
    cardTitle.append(cardLink)

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card__price');
    cardPrice.innerHTML = `${this.price.toLocaleString()}&nbsp;₽`;

    const btnCart = this.CartButton.create(this.id);
    const btnFavorite = this.LikeButton.create(this.id);

    cardInfo.append(cardTitle, cardPrice);

    article.append(cardLinkImg, cardInfo, btnCart, btnFavorite);

    return article;
  }


};


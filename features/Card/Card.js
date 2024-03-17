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

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card__price');
    cardPrice.innerHTML = `${this.price.toLocaleString()}&nbsp;₽`;

    const btnCart = this.CartButton.create(this.id);
    const btnFavorite = this.LikeButton.create(this.id);

    cardInfo.append(cardTitle,cardLink,cardPrice);

    article.append(cardLinkImg, cardInfo, btnCart, btnFavorite);

    return article;
  }


};

// return `
//               <article class="goods__card card">
//         <a class="card__link card__link_img" href="/product/${this.id}">
//         <img class="card__img" src="${API_URL}${this.image}" alt="${this.title}">
//         </a>

//         <div class="card__info">
//         <h3 class="card__title">
//         <a class="card__link" href="/product/${this.id}">
//         ${this.title}
//         </a>
//         </h3>
//         <p class="card__price">${this.price.toLocaleString()}&nbsp;₽</p>
//         </div>
        
//         <button class="card__btn" data-id="${this.id}" type="button">В корзину</button>

//         <button class="card__favorite" data-id="${this.id}">
//         <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//         <path d="M8.41331 13.8733C8.18665 13.9533 7.81331 13.9533 7.58665 13.8733C5.65331 13.2133 1.33331 10.46 1.33331 5.79332C1.33331 3.73332 2.99331 2.06665 5.03998 2.06665C6.25331 2.06665 7.32665 2.65332 7.99998 3.55998C8.67331 2.65332 9.75331 2.06665 10.96 2.06665C13.0066 2.06665 14.6666 3.73332 14.6666 5.79332C14.6666 10.46 10.3466 13.2133 8.41331 13.8733Z" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
//         </svg>

//         </button>

//         </article>
//       `
import { ApiService } from "../../services/Apiservice.js";
import { Header } from "../../modules/Header/Header.js";


export class CartButton {
  constructor(className, text) {
    this.className = className;
    // this.id = id;
    this.text = text;

  }

  create(id) {
    let n = 0;

    const btn = document.createElement('button');
    btn.classList.add(this.className);
    // btn.setAttribute('data-id', `${this.id}`);
    btn.dataset.id = id;
    btn.textContent = this.text;

    btn.addEventListener('click', async () => {
      const { totalCount } = await new ApiService().postProductToCart(id);
      // console.log('data из кнопки Добавить в корзину: ', data);
      new Header().changeCount(totalCount);
    });

    return btn;

  }
}
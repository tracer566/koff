import { ApiService } from "../../services/Apiservice.js";


export class CartButton {
  constructor(className, text) {
    this.className = className;
    // this.id = id;
    this.text = text;
  }

  create(id) {
    const btn = document.createElement('button');
    btn.classList.add(this.className);
    // btn.setAttribute('data-id', `${this.id}`);
    btn.dataset.id = id;
    btn.textContent = this.text;

    btn.addEventListener('click', () => {
      new ApiService().postProductToCart(id);
    });

    return btn;

  }
}
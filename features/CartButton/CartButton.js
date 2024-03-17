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
      console.log(`Добавить товар в корзину.Нажал на кнопку с id = ${btn.dataset.id}`);
    });

    return btn;

  }
}
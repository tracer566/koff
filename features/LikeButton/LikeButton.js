import { likeSVG } from '../likeSVG/likeSVG.js'

export class LikeButton {
  constructor(className) {
    this.className = className;

  };

  create(id) {
    const btn = document.createElement('button');
    btn.classList.add(this.className);
    // btn.setAttribute('data-id', `${this.id}`);
    btn.dataset.id = id;

    likeSVG().then((svg) => {
      btn.append(svg);
    });


    btn.addEventListener('click', () => {
      console.log(`Добавить товар с id = ${btn.dataset.id} в Избранное`);
    });

    return btn;

  };
}
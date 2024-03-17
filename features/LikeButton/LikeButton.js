import { likeSVG } from '../likeSVG/likeSVG.js';
import { favoriteService } from '../../services/StorageService.js';

export class LikeButton {
  constructor(className) {
    this.className = className;
    this.favoriteService = new favoriteService();

  };

  create(id) {
    const btn = document.createElement('button');
    btn.classList.add(this.className);
    // btn.setAttribute('data-id', `${this.id}`);
    btn.dataset.id = id;

    likeSVG().then((svg) => {
      btn.append(svg);
    });

    if (this.favoriteService.check(id)) {
      btn.classList.add(`${this.className}_active`);
    };

    btn.addEventListener('click', () => {
      if (this.favoriteService.check(id)) {
        this.favoriteService.remove(id);
        btn.classList.remove(`${this.className}_active`);
      } else {
        this.favoriteService.add(id);
        btn.classList.add(`${this.className}_active`);
      };
    });

    return btn;

  };
}
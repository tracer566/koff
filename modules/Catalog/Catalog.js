import { ApiService } from "../../services/Apiservice";
import { addContainer } from "../addContainer";

export class Catalog {
  static instance = null;

  constructor() {
    if (!Catalog.instance) {
      Catalog.instance = this;
      console.log('Catalog.instance: ', Catalog.instance);

      this.element = document.createElement('nav');
      this.element.classList.add('catalog');
      this.containerElement = addContainer(this.element, "catalog__container")
      // console.log('this.containerElement catalog: ', this.containerElement);

      // проверка
      this.isMounted = false;
    }

    return Catalog.instance;
  }

  // новый метод получение данных в каталоге
  async getData() {
    this.catalogData = await new ApiService().getProductCategories();
    // для гит
    router.updatePageLinks();
  };

  // монтаж элемента
  async mount(parent) {

    if (this.isMounted) {
      return;
    };

    if (!this.catalogData) {
      await this.getData();
      this.renderListElem(this.catalogData);
    };

    parent.prepend(this.element);
    // проверка
    this.isMounted = true;

  };

  // демонтаж элемента
  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  renderListElem(data) {
    const catalogList = document.createElement('ul');
    catalogList.classList.add('catalog__list');

    const catalogItems = data.map(item => {
      return `
      <li class="catalog__item">
        <a class="catalog__link" href="/category?slug=${item}">${item}</a>
        </li>
      `;
    });

    // console.log('[...catalogItems]', [...catalogItems].join(''));
    catalogList.insertAdjacentHTML('beforeend', [...catalogItems].join(''));

    this.containerElement.append(catalogList);

  };

};



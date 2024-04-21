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
      this.containerElement = addContainer(this.element, "catalog__container");
      this.linksList = [];
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
    // router.updatePageLinks();
  };

  // монтаж элемента
  async mount(parent) {

    if (this.isMounted) {
      return this;
    };

    if (!this.catalogData) {
      await this.getData();
      this.renderListElem(this.catalogData);
    };

    parent.prepend(this.element);

    // проверка
    this.isMounted = true;
    return this;
  };

  // демонтаж элемента
  unmount() {
    console.log('Демонтаж каталога');
    this.element.remove();
    this.isMounted = false;
  }

  renderListElem(data) {
    this.containerElement.innerHTML = '';

    const catalogList = document.createElement('ul');
    catalogList.classList.add('catalog__list');

    const catalogItems = data.map(item => {
      const listElem = document.createElement('li');
      listElem.classList.add('catalog__item');

      const link = document.createElement('a');
      this.linksList.push(link);
      link.classList.add('catalog__link');
      link.href = `/category?slug=${item}&page=1`;
      link.textContent = `${item}`;

      listElem.append(link);

      return listElem;

      // return `
      // <li class="catalog__item">
      //   <a class="catalog__link" href="">${item}</a>
      //   </li>
      // `;

    });

    // console.log('[...catalogItems]', [...catalogItems].join(''));
    // catalogList.insertAdjacentHTML('beforeend', [...catalogItems].join(''));
    catalogList.append(...catalogItems)

    this.containerElement.append(catalogList);

  };

  setActiveLink(slug) {
    // debugger;
    const encodedSlug = encodeURIComponent(slug);
    this.linksList.forEach(link => {
      const linkSlug = new URL(link.href).searchParams.get('slug');
      if (encodeURIComponent(linkSlug) == encodedSlug) {
        link.classList.add('catalog__link_active');
      } else {
        link.classList.remove('catalog__link_active');
      }
    });
  }

};



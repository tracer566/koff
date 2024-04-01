import { router } from "../../main.js";
import { addContainer } from "../../modules/addContainer.js";
// import { Catalog } from "../../modules/Catalog/Catalog.js";

export class BreadCrumbs {
  static instance = null;

  constructor() {
    if (!BreadCrumbs.instance) {
      BreadCrumbs.instance = this;
      this.element = document.createElement('div');
      this.element.classList.add('breadcrumb');
      this.containerElement = addContainer(this.element);
      // решение проблемы с хлебными крошками
      this.isMounted = false;
    };
    return BreadCrumbs.instance;
  };

  // решение проблемы с хлебными крошками
  // проверка если текущий запрос аналогичен предыдущему,вернет true
  checkPrevData(data) {
    console.log('checkPrevData: ', data);
    let isSame = false;
    if (!this.prevData) {
      console.log('this.prevData пришел: ', this.prevData);
      this.prevData = data;
    };

    isSame = data.every((item, i) => {
      return item.text === this.prevData[i].text;
    });

    return isSame;
  };

  mount(parent, data) {
    // решение проблемы с хлебными крошками
    // если true в чеке и элемент смонтирован-ничего не делаем
    if (this.isMounted && this.checkPrevData(data)) {
      console.log('this.checkPrevData: ', this.checkPrevData);
      return;
    };

    // console.log('сюда');

    // если элемент смонтирован,но запрос другой,обновление данных в крошках
    if (this.isMounted) {
      console.log('this.isMounted: ', this.isMounted);
      this.render(data);
      return;
    }

    // console.log('сюда2');

    /* если элемент не смонтирован и новые данные - перерендер */
    this.render(data);
    this.isMounted = true;
    parent.append(this.element);
    router.updatePageLinks();
  };

  unmount() {
    console.log('Демонтаж хлебных крошек');
    this.element.remove();
    this.isMounted = false;

    // return false;
  };

  render(list) {
    console.log('bread list: ', list);
    this.containerElement.textContent = '';
    const listElem = document.createElement('ul');
    listElem.classList.add('breadcrumb__list');

    const breadcrumbList = [
      { text: 'Главная', href: `/` }, ...list
    ];

    const listItems = breadcrumbList.map(item => {
      const listItemsElem = document.createElement('li');
      listItemsElem.classList.add('breadcrumb__item');

      const link = document.createElement('a');
      link.classList.add('breadcrumb__link');
      link.textContent = item.text;

      if (item.href) {
        link.href = item.href;
      }

      const separator = document.createElement('span');
      separator.classList.add('breadcrumb__separator');
      separator.innerHTML = `&gt;`

      listItemsElem.append(link, separator);

      return listItemsElem;

    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }
};


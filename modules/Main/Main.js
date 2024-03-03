export class Main {
  static instance = null;

  constructor() {
    if (!Main.instance) {
      Main.instance = this;

      this.element = document.createElement('main');
      this.element.classList.add('main');

      // проверка
      this.isMounted = false;
    }

    return Main.instance;
  }

  // монтаж элемента
  mount() {
    if (this.isMounted) {
      return;
    };

    document.body.append(this.element);

    // проверка
    this.isMounted = true;

  };

  // демонтаж элемента
  unmount() {
    this.element.remove();
    this.isMounted = false;
  }


};



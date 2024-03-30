export const addContainer = (parent, className) => {
  const container = document.createElement('div');
  container.classList.add('container');
  // добавляет второй класс при наличии
  if (className) {
    container.classList.add(className);
  }

  // вставляю container в this.element = parent
  parent.append(container);

  // отдает контейнер в класс что его вызвал,будет в this
  return container;

};
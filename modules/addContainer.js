export const addContainer = (parent, className) => {
  const container = document.createElement('div');
  container.classList.add('container');
  if (className) {
    container.classList.add(className);
  }

  // вставляю container в this.element = parent
  parent.append(container);

  return container;

};
import logoImg from '/img/logo.svg'

// создать лого 1-й вариант
export class Logo {
  constructor(mainClassName) {
    this.mainClassName = mainClassName;
  }

  create() {
    const logo = document.createElement('a');
    logo.classList.add(`${this.mainClassName}__link-logo`);
    logo.href = '/';
    // const imgLogo = document.createElement('img');
    const imgLogo = new Image();
    imgLogo.classList.add(`${this.mainClassName}__logo`);
    imgLogo.src = logoImg;
    imgLogo.alt = 'Логотип сайта мебельного маркета koff';

    logo.insertAdjacentElement('beforeend', imgLogo);

    return logo;
  }
}

// создать лого 2-ой вариант
// export const getlogo = (mainClassName) => {
//   const logo = document.createElement('a');
//   logo.classList.add(`${mainClassName}__link-logo`);
//   logo.href = '/';
//   // const imgLogo = document.createElement('img');
//   const imgLogo = new Image();
//   imgLogo.classList.add(`${mainClassName}__logo`);
//   imgLogo.src = logoImg;
//   imgLogo.alt = 'Логотип сайта мебельного маркета koff';

//   logo.insertAdjacentElement('beforeend', imgLogo);

//   return logo;
// }
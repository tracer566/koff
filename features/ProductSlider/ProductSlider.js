// изменения импортов.Динамический импорт:импорт произойдет при вызове функции слайдера
export const productSlider = () => {
  // массив с промисами
  Promise.all([
    import('swiper/modules'),
    import('swiper'),
    import('swiper/css')
  ]).then(([{ Navigation, Thumbs }, Swiper]) => {
    try {
      // console.dir(Swiper);
      // console.dir(Thumbs);
      // console.dir(Navigation);
      // без default ошибка: swiper not constructor
      const swiper = new Swiper.default(".product__slider-thumbnails", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });
      // без default ошибка: swiper not constructor
      const swiper2 = new Swiper.default(".product__slider-main", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".product__arrow_next",
          prevEl: ".product__arrow_prev",
        },
        modules: [Navigation, Thumbs],
        thumbs: {
          swiper: swiper,
        },
      });
    } catch (error) {
      console.log('slider error: ', error);

    };
  });

};

// теория
// const promiseA = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('A');
//   }, 5000)
// });
// const promiseB = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('from B:');
//   }, 4000)
// });
// const promiseC = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('from C:');
//   }, 3000)
// });

// console.log('promiseA: ', promiseA);
// console.log('promiseB: ', promiseB);
// console.log('promiseC: ', promiseC);

// вызов и обработка промиса
// promiseA.then((item) => {
//   console.log('item:', item);
// })
// promiseB.then((item) => {
//   console.log(item);
// })
// promiseC.then((item) => {
//   console.log(item);
// })

// вызов и обработка ряда промисов,в then((arr))-массив,его деструктурирую
// Promise.all([promiseB, promiseA, promiseC]).then(([a, b, c]) => {
//   console.log('arr: ', a, b, c);

// });

// теория старых функций-классов
/* function Car(name = 'lada', year = 1998) {
  this.name = name,
    this.year = year,
    this.now = new Date().getFullYear();
  this.calc = function calc() {
    this.result = this.now - this.year;
    return this;
  };

};

Car.prototype.getAge = function () {
  return new Date().getFullYear() - this.year;
}

let lada = new Car().calc();
let bmv = new Car('bmv', 2000)
console.log('bmv: ', bmv);
console.log('lada: ', lada); */
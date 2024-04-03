// функция задержки запросов на сервер,запрос идет через переданное время
export const debounce = (fn, msec) => {
  let lastCall = 0;
  let lastCallTimer = 0;

  return (...args) => {
    // сюда записывается время последнего вызова
    const previousCall = lastCall;
    // console.log('previousCall: ', previousCall);
    lastCall = Date.now();

    // если время первого вызова,меньше времени msec,то очищается setTimeout и запроса не происходит,fn() не срабатывает
    if (previousCall && lastCall - previousCall <= msec) {
      clearTimeout(lastCallTimer);
    };

    // сюда передаются аргументы и время.Еще передается вызываемая функция
    lastCallTimer = setTimeout(() => fn(...args), msec);
    // console.log('lastCallTimer: ', lastCallTimer);
  };
};
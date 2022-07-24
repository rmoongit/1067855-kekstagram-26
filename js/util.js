//(https://learn.javascript.ru/task/random-int-min-max);
const randomInteger = (min, max) => {
  // случайное число от min до (max+1)
  const random = min + Math.random() * (max + 1 - min);
  if (min >= 0 && max > min) {
    return Math.floor(random);
  }
  throw new Error(`число не соответствует или ${max} больше ${min}`);
};

const getRandomArrayUniqueNumbers = (length) => {
  const numbers = [];
  for (let i = 0; i < length; i++) {
    numbers[i] = i;
  }
  for (let i = length - 1; i > 0; i--) {
    const j = randomInteger(0, i);
    const swap = numbers[j];
    numbers[j] = numbers[i];
    numbers[i] = swap;
  }
  return numbers;
};

//проверка максимальной длины строки
const checkStringLength = (string, lengthNumber = 140) => {
  //проверка параметра "string" на 'строку' и её длинну(length).
  if (typeof string !== 'string' || typeof lengthNumber !== 'number') {
    throw new Error('Строка не подходит по типу данных');
  }
  return string.length <= lengthNumber;
};
checkStringLength('check string');

//Генерирует случайный элемент массива.
// const getArrayRandomElement = (elements) => elements[randomInteger(0, elements.length - 1)];

//Нажатие на кнопку "Escape".
const escapeKey = (evt) => evt.key === 'Escape';

const stopListener = (inputArea, commentArea) => {
  inputArea.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
  commentArea.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

//Устранение дребезга
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay = 500) => {
// Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

//Создаёт блок который выводит ошибку(error)
const showMessageError = (message) => {
  const messageBlock = document.createElement('div');
  messageBlock.style.zIndex = '100';
  messageBlock.style.position = 'absolute';
  messageBlock.style.minHeight = '100px';
  messageBlock.style.border = 'dashed 2px #000';
  messageBlock.style.opacity = '0.7';
  messageBlock.style.width = '50%';
  messageBlock.style.margin = '0 auto';
  messageBlock.style.left = '0';
  messageBlock.style.right = '0';
  messageBlock.style.top = '0';
  messageBlock.style.padding = '30px 10px';
  messageBlock.style.fontSize = '20px';
  messageBlock.style.textAlign = 'center';
  messageBlock.style.color = '#000';
  messageBlock.style.backgroundColor = '#ffffff';

  messageBlock.textContent = message;
  document.body.append(messageBlock);

  setTimeout(() => {
    messageBlock.remove();
  }, 5000);
};

export {
  getRandomArrayUniqueNumbers,
  randomInteger,
  escapeKey,
  checkStringLength,
  stopListener,
  showMessageError,
  debounce
};

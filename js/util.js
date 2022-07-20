//(https://learn.javascript.ru/task/random-int-min-max);
const randomInteger = (min, max) => {
  // случайное число от min до (max+1)
  const random = min + Math.random() * (max + 1 - min);
  if (min >= 0 && max > min) {
    return Math.floor(random);
  }
  throw new Error(`число не соответствует или ${max} больше ${min}`);
};
randomInteger(1, 100);

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
const getArrayRandomElement = (elements) => elements[randomInteger(0, elements.length - 1)];

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
  getArrayRandomElement,
  randomInteger,
  escapeKey,
  checkStringLength,
  stopListener,
  showMessageError
};

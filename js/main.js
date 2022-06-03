
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

randomInteger(1, 150);

//проверка максимальной длины строки
const checkStringLength = (string, lengthNumber = 140) => {
  //проверка параметра "string" на 'строку' и её длинну(length).
  if (typeof string !== 'string' || typeof lengthNumber === 'string') {
    throw new Error('Строка не подходит по типу данных');
  }
  return string.length <= lengthNumber;
};

(checkStringLength('check string'));


//(https://learn.javascript.ru/task/random-int-min-max);

const randomInteger = (min, max) => {

  // случайное число от min до (max+1)
  const random = min + Math.random() * (max + 1 - min);
  if (min >= 0 && max > min) {
    return Math.floor(random);
  }
};

randomInteger(1, 150);

//проверка максимальной длины строки

const checkStringLength = (string, maxLengthString = 140) => {
  //проверка параметра "string" на строку
  if (string.length <= maxLengthString) {
    const checkString = string.length - maxLengthString;
    return checkString;
  } else {
    throw new Error(`Число комментариев привышает ${maxLengthString} символов`);
  }
};

checkStringLength('');

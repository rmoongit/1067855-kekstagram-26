const maxLengthComment = 140;

//(https://learn.javascript.ru/task/random-int-min-max);

const randomInteger = (min, max) => {
  // случайное число от min до (max+1)
  let random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

console.log(randomInteger(1, 100));

//проверка максимальной длины строки

const checkStringLength = (string) => {
  const checkString = string.length <= maxLengthComment;
  return checkString;
};

console.log(checkStringLength('hi'));

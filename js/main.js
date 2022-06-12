
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

const getArrayRandomElement = (elements) => elements[randomInteger(0, elements.length - 1)];

const MAX_NUMBER = 25;

const LIKES = {
  min: 15,
  max: 200,
};

const NAMES = ['Алексей', 'Иван', 'Георгий', 'Мария', 'Екатерина'];
const MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.'];
const DESCRIPTION = ['Бывало и лучше', 'Не позавидуешь', 'И вам желаю так провести лето'];
const photoId = Array.from({ length: MAX_NUMBER }, (_, index) => index + 1);

let uniqueId = 1;

//Функция  возвращает объект со значениями комментария.
const createComment = () => {
  const id = uniqueId++;
  return {
    id: id,
    avatar: `img/avatar-${randomInteger(1, 6)}.svg`,
    message: getArrayRandomElement(MESSAGE),
    name: getArrayRandomElement(NAMES),
  };
};

//Функция возвращает объект с уникальным id и генерированными комментариями.
const createObject = () => {
  const id = photoId.shift();
  return {
    id: id,
    url: `img/photos/${id}.jpg`,
    description: getArrayRandomElement(DESCRIPTION),
    likes: randomInteger(LIKES.min, LIKES.max),
    comments: Array.from({ length: randomInteger(1, 10) }, () => createComment()),
  };
};

//Функция передаёт параметр(число) и записывает в каждый элемент массива наш Объект(createObject())
const createPhoto = (countPhoto) => {
  const arr = [];

  for (let i = 0; i < countPhoto; i++) {
    arr[i] = createObject();
  }
  return arr;
};

createPhoto(25);

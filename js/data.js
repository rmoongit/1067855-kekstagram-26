// import { getArrayRandomElement,randomInteger } from './util.js';

// const MAX_NUMBER = 25;

// const LIKES = {
//   min: 15,
//   max: 200,
// };

// const NAMES = ['Алексей', 'Иван', 'Георгий', 'Мария', 'Екатерина'];
// const MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.'];
// const DESCRIPTION = ['Бывало и лучше', 'Не позавидуешь', 'И вам желаю так провести лето'];
// const photoId = Array.from({ length: MAX_NUMBER }, (_, index) => index + 1);

// let uniqueId = 1;

// //Функция  возвращает объект со значениями комментария.
// const createComment = () => {
//   const id = uniqueId++;
//   return {
//     id: id,
//     avatar: `img/avatar-${randomInteger(1, 6)}.svg`,
//     message: getArrayRandomElement(MESSAGE),
//     name: getArrayRandomElement(NAMES),
//   };
// };

// //Функция возвращает объект с уникальным id и генерированными комментариями.
// const createObject = () => {
//   const id = photoId.shift();
//   return {
//     id: id,
//     url: `photos/${id}.jpg`,
//     description: getArrayRandomElement(DESCRIPTION),
//     likes: randomInteger(LIKES.min, LIKES.max),
//     comments: Array.from({ length: randomInteger(1, 10) }, () => createComment()),
//   };
// };

// //Функция createPhoto, ожидает аргумент(число), которое задаёт количество элементов создаваемого массива.
// const createPhoto = (countPhoto) => {
//   const arr = [];

//   for (let i = 0; i < countPhoto; i++) {
//     arr[i] = createObject();
//   }
//   return arr;
// };

// export {
//   createPhoto,
// };

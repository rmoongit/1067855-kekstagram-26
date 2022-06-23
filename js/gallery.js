import { showBigPicture } from './full-size-picture.js';

const picturesList = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

//Генерирует Фотографии и подставляет нужные значение в описание Шаблона.
const generatePhotos = (photo) => {
  const fragment = document.createDocumentFragment();

  photo.forEach((photoItem) => {
    const photoElement = template.cloneNode(true);
    const {url, likes, comments} = photoItem;

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(photoElement);

    photoElement.addEventListener('click', () => {
      showBigPicture(photoItem);
    });
  });
  picturesList.append(fragment);
};

export {
  generatePhotos,
};

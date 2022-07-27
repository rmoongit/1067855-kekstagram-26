import { showBigPicture } from './full-size-picture.js';

const picturesListElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

//Генерирует Фотографии и подставляет нужные значение в описание Шаблона.
const generatePhotos = (photo) => {
  const photoFragment = document.createDocumentFragment();

  photo.forEach((photoItem) => {
    const photoElement = pictureTemplateElement.cloneNode(true);
    const {url, likes, comments} = photoItem;

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoFragment.append(photoElement);

    photoElement.addEventListener('click', () => {
      showBigPicture(photoItem);
    });
  });
  picturesListElement.append(photoFragment);
};

export {
  generatePhotos,
};

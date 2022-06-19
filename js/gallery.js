const picturesList = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

//Функция что генерирует Фотографии и подставляет нужные значение в описание Шаблона.
const generatePhotos = (photo) => {
  const fragment = document.createDocumentFragment();

  photo.forEach((value) => {
    const photoElement = template.cloneNode(true);
    const {url, likes, comments} = value;

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(photoElement);
  });
  picturesList.append(fragment);
};

export {
  generatePhotos,
};



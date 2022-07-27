
import { onClickEscapeKey } from './util.js';

const MAX_COMMENTS = 5;

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsListElement = document.querySelector('.social__comments');
const commentCountElement = document.querySelector('.social__comment-count');
const buttonLoadElement = document.querySelector('.comments-loader');

let onCommentsClick = null;

//Прячет модальное окно и убирает фиксацию с body, так же удаляет слушатели.
const closeBigPhoto = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPhotoClickEsc);
  closeButtonElement.removeEventListener('click', closeBigPhoto);
  buttonLoadElement.removeEventListener('click', onCommentsClick);
};

function onBigPhotoClickEsc (evt) {
  if(onClickEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

//Создаёт элемент и передаёт параметр массива.
const createElement = (commentsData) => {
  const element = document.createElement('li');
  const img = document.createElement('img');
  const text = document.createElement('p');

  element.classList.add('social__comment');
  text.classList.add('social__text');
  text.textContent = commentsData.message;
  img.classList.add('social__picture');
  img.src = commentsData.avatar;
  img.width = '35';
  img.height = '35';
  img.alt = commentsData.name;

  element.append(img);
  element.append(text);
  return element;
};

//Генерирует комментарии и подставляет к каждому элементу.
const renderComments = (comments) => {
  comments.forEach ((comment) => {
    const createComment = createElement(comment);
    commentsListElement.append(createComment);

    commentCountElement.querySelector('#of').textContent = `${commentsListElement.children.length } из `;
  });
};

//Добавляет новые комментарии
const addComments = (copyComments) => {
  if (copyComments.length <= MAX_COMMENTS) {
    buttonLoadElement.classList.add('hidden');
  }
  renderComments(copyComments.splice(0,MAX_COMMENTS));
};

//Генерирует новую копию и разбивает на 5.
const getNewRenderComments = (comments) => {
  const copyComments = comments.slice();
  commentsListElement.innerHTML = '';

  const getNewComments = () => {
    addComments(copyComments);
  };

  onCommentsClick = getNewComments;

  if(copyComments.length <= MAX_COMMENTS) {
    buttonLoadElement.classList.add('hidden');
    renderComments(copyComments);

  } else {
    buttonLoadElement.classList.remove('hidden');
    renderComments(copyComments.splice(0, MAX_COMMENTS));

    buttonLoadElement.addEventListener('click', onCommentsClick);
  }
};

//Показывает большое фото с переданным аргументом массива.
const showBigPicture = (data) => {
  const {url, likes, comments, description} = data;
  document.body.classList.add('modal-open');

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.focus();

  document.addEventListener('keydown', onBigPhotoClickEsc);
  closeButtonElement.addEventListener('click', closeBigPhoto);

  getNewRenderComments(comments);
};

export {
  showBigPicture,
};

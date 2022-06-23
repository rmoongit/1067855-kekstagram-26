
import { escapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');

const closePopup = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeyDown);
};

const openPopup = () => {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeyDown);
};

//Удаляет События клика при закрытии окна.
const onPopupEscKeyDown = (evt) => {
  if (escapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

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
  const commentsList = document.querySelector('.social__comments');
  commentsList.innerHTML = '';

  comments.forEach((comment) => {
    const element = createElement(comment);
    commentsList.append(element);
  });
};

//Показывает большое фото с переданным аргументом массива.
const showBigPicture = (data) => {
  const {url, likes, comments, description} = data;
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.classList.remove('hidden');

  bigPicture.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    openPopup();
  });

  closeButton.addEventListener('click', () => {
    closePopup();
  });
  renderComments(comments);
};

export {
  showBigPicture,
};

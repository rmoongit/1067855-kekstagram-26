import { generatePhotos } from './gallery.js';
import { getRandomArrayUniqueNumbers, debounce } from './util.js';

const formFiltersElement = document.querySelector('.img-filters__form');
const imgFiltersElement = document.querySelector('.img-filters');
const buttonDefaultElement = document.querySelector('#filter-default');
const buttonRandomsElement = document.querySelector('#filter-random');
const buttonDiscussedElement = document.querySelector('#filter-discussed');

imgFiltersElement.classList.remove('img-filters--inactive');

let currentFilter = buttonDefaultElement;

//Получает рандомные фотографии
const getRandomPictures = (photos) => {
  const randomUniqueNumbers = getRandomArrayUniqueNumbers(photos.length);
  const randomPictures = [];
  randomUniqueNumbers.slice(0, 10).forEach((randomNumber) => {
    randomPictures.push(photos[randomNumber]);
  });
  return randomPictures;
};
//Сравнивает количество комментариев между собой и ставит тот что больше.
const compareCommentsLength = (a, b) => b.comments.length - a.comments.length;

//Присваивает нужный фильтр по кнопке
const getFilteredPictures = (photos) => {

  switch (currentFilter) {
    case  buttonRandomsElement:
      return getRandomPictures(photos);

    case buttonDiscussedElement:
      return photos.slice().sort(compareCommentsLength);

    case buttonDefaultElement:
      return photos;

    default: return photos;
  }
};

//Прмменяет класс по нажатию на нужную кнопку, затем удалив все элементы фото генерирует новый фильтр.
const onFilterClick = (evt, photos) => {
  const pictureElements = document.querySelectorAll('.picture');
  currentFilter.classList.remove('img-filters__button--active');
  currentFilter = evt.target;
  currentFilter.classList.add('img-filters__button--active');

  pictureElements.forEach((element) => {
    element.remove();
  });
  generatePhotos(getFilteredPictures(photos));
};

//Инициализирует фильтр с переданными аргументами
const initFilter = (photos) => {
  formFiltersElement.addEventListener('click', debounce((evt) => onFilterClick(evt, photos)));
};

export {initFilter};

import { generatePhotos } from './gallery.js';
import { getRandomArrayUniqueNumbers, debounce } from './util.js';

const formFilterElement = document.querySelector('.img-filters__form');
const imgFilters = document.querySelector('.img-filters');
const buttonDefault = document.querySelector('#filter-default');
const buttonRandoms = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

imgFilters.classList.remove('img-filters--inactive');
let currentFilter = buttonDefault;

//Получает рандомные фотографии
function getRandomPictures (photos) {
  const randomUniqueNumbers = getRandomArrayUniqueNumbers(photos.length);
  const randomPictures = [];
  randomUniqueNumbers.slice(0, 10).forEach((randomNumber) => {
    randomPictures.push(photos[randomNumber]);
  });
  return randomPictures;
}
//Сравнивает количество комментариев между собой и ставит тот что больше.
const compareCommentsLength = (a, b) => b.comments.length - a.comments.length;

//Присваивает определенную функцию по нажатию на каждый фильтр.
const getFilteredPictures = (photos) => {
  if (currentFilter === buttonDefault) {
    return photos;
  }
  if(currentFilter === buttonRandoms) {
    return getRandomPictures(photos);
  }
  if(currentFilter === buttonDiscussed) {
    return photos.slice().sort(compareCommentsLength);
  }
};


//Прмменяет класс по нажатию на нужную кнопку, затем удалив все элементы фото генерирует новый фильтр.
const filter = (evt, photos) => {
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
  formFilterElement.addEventListener('click', debounce((evt)=>filter(evt, photos)));
};


export {initFilter};

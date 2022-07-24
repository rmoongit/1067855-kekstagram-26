import { generatePhotos } from './gallery.js';
import  { setUserFormSubmit } from './validate-form.js';
import { uploadPhotosModal } from './edit-form.js';
import { getDataServer } from './api.js';
import { initFilter } from'./filter-img.js';

//Проверяет валидацию формы и отправляет её.
setUserFormSubmit();

//Появления окна редактирования при выборе фото.
uploadPhotosModal();

//Генерирует с сервера Объекты(фото, комментарии).
getDataServer((photos) => {
  generatePhotos(photos);
  initFilter(photos);
});



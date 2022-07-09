import {createPhoto} from './data.js';
import { generatePhotos } from './gallery.js';
import  {checkPristine} from './validate-form.js';
import { uploadPhotosModal } from './edit-form.js';

//Принимает нужное кол-во фотографий и возвращает массив с фотографиями- указанной длины.
const photo = createPhoto(25);
generatePhotos(photo);

//Проверяет валидацию формы.
checkPristine();

//Появления окна редактирования при выборе фото.
uploadPhotosModal();

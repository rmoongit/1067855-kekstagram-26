import {createPhoto} from './data.js';
import { generatePhotos } from './gallery.js';

//Принимает нужное кол-во фотографий и возвращает массив с фотографиями- указанной длины.
const photo = createPhoto(25);

generatePhotos(photo);

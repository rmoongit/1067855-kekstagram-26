import {createPhoto} from './data.js';
import { generatePhotos } from './gallery.js';

//photoElement = Функция которая принимает в себя 25 объектов фотографий.
const photo = createPhoto(25);

generatePhotos(photo);

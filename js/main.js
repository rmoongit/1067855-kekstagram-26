import {createPhoto} from './data.js';
import { generatePhotos } from './gallery.js';
import './edit-form.js';
import  './validate-form.js';

//Принимает нужное кол-во фотографий и возвращает массив с фотографиями- указанной длины.
const photo = createPhoto(25);

generatePhotos(photo);

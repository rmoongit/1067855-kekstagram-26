import { onErrorForm } from './success-error-mesages.js';
import { showMessageError } from './util.js';

//Адрес получения наших объектов.
const GET_URL =  'https://26.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://26.javascript.pages.academy/kekstagram ';


//Получаем объекты с сервера по адресу:
const getDataServer = (data) => {
  fetch(GET_URL)
    .then((response) =>
      response.json())

    .then((photos) => data(photos))
    .catch(() => showMessageError('Загрузка не удалась, обновите страницу!'));
};

const sendDataServer = (body, success, unblock, error) => {
  fetch(POST_URL, {
    method: 'POST',
    body,
  },)

    .then((response) => {
      if (response.ok) {
        success();
        unblock();

      } else {
        onErrorForm(error);
        unblock();
      }

    })
    .catch(() => onErrorForm(error));
};

export {getDataServer, sendDataServer};



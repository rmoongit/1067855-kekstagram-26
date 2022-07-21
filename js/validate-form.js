import { checkStringLength} from './util.js';
import { sendDataServer } from './api.js';
import { closePopup } from './edit-form.js';
import { onSuccessForm, onErrorForm } from './success-error-mesages.js';

const form = document.querySelector('.img-upload__form');
const formButton = document.querySelector('.img-upload__submit');
const hashtagInput = document.querySelector('.text__hashtags');
const commentArea = document.querySelector('.text__description');

const STRING_LENGTH = 20;
const MAX_HASHTAGS = 5;

//Регулярное выражение (начинается с # и включает в себя только буквы разного регистра и цифры, длиной до 20 символов.)
const regular = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;

//Указывает присвоение классов и создание елемента Pristine.
const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text-error-text',
});

const blockSubmitButton = () => {
  formButton.disabled = true;
  formButton.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  formButton.disabled = false;
  formButton.textContent = 'Опубликовать';
};

//Отправка формы по дефолту и проверками на ошибки сервера.
const setUserFormSubmit = () => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    if (pristine.validate()) {
      blockSubmitButton();
      onSuccessForm();
      sendDataServer(formData, closePopup, unblockSubmitButton, closePopup);

    } else {
      onErrorForm(closePopup);
    }
  });
};

//Проверка на валидность регулярного выражения строки.
const checkHashtagRegExp = (string) => regular.test(string);

//Проверка на валидность каждого елемента строки.
const validHashtag = (string) => {
  if (string === '') {
    return true;
  }
  return string.split(' ').every(checkHashtagRegExp);
};
pristine.addValidator(hashtagInput, validHashtag, 'Хештег должен начинаться с # и не должен состоять из (#, @, $...), и не может содержать пробелы');

//Проверка на длину каждого элемента массива строк.
const checkHashTagLength = (string) => {
  const stringArr = string.split(' ');

  return stringArr.every((item) => item.length <= STRING_LENGTH);
};
pristine.addValidator(hashtagInput, checkHashTagLength, `Максимальная длина одного хэш-тега ${STRING_LENGTH} символов`);

//Принимает строку, приобразует в массив и проверяет больше ли длинна элемента MAX_HASHTAGS.
const checkHashTagCount = (string) => {
  const stringArr = string.split(' ');
  if (stringArr.length <= MAX_HASHTAGS) {
    return stringArr;
  }
  return false;
};
pristine.addValidator(hashtagInput, checkHashTagCount, 'Хештегов может быть не больше 5');

//Проверка на схожий хештег каждого элемента массива строк.
const checkSimilarHashTag = (string) => {
  const stringArr = string.toLowerCase().split(' ');
  return new Set(stringArr).size === stringArr.length;
};
pristine.addValidator(hashtagInput, checkSimilarHashTag, 'Один и тот же хэш-тег не может быть использован дважды;');

//Проверка длинны комментария.
pristine.addValidator(commentArea, checkStringLength, 'Комментарий не должен привышать 140 символов');

export {commentArea, hashtagInput, setUserFormSubmit};


import { checkStringLength} from './util.js';
import { sendDataServer } from './api.js';
import { onFormClose } from './edit-form.js';
import { onSuccessForm, onErrorForm } from './success-error-mesages.js';

const STRING_LENGTH = 20;
const MAX_HASHTAGS = 5;

const formElement = document.querySelector('.img-upload__form');
const formSubmitButtonElement = document.querySelector('.img-upload__submit');
const formInputElement = document.querySelector('.text__hashtags');
const formCommentElement = document.querySelector('.text__description');

//Регулярное выражение (начинается с # и включает в себя только буквы разного регистра и цифры, длиной до 20 символов.)
const regular = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;

//Указывает присвоение классов и создание елемента Pristine.
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text-error-text',
});

const blockSubmitButton = () => {
  formSubmitButtonElement.disabled = true;
  formSubmitButtonElement.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  formSubmitButtonElement.disabled = false;
  formSubmitButtonElement.textContent = 'Опубликовать';
};

//Отправка формы по дефолту и проверками на ошибки сервера.
const setUserFormSubmit = () => {

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    if (pristine.validate()) {
      blockSubmitButton();
      onSuccessForm();
      sendDataServer(formData, onFormClose, unblockSubmitButton);

    } else {
      onErrorForm(unblockSubmitButton);
    }
  });
};

//Проверка на валидность регулярного выражения строки.
const checkHashtagRegExp = (value) => regular.test(value);

//Проверка на валидность каждого елемента строки.
const checkValidHashtag = (value) => value === '' || value.split(' ').every(checkHashtagRegExp);

pristine.addValidator(formInputElement, checkValidHashtag, 'Хештег должен начинаться с # и не должен состоять из (#, @, $...), и не может содержать пробелы');

//Проверка на длину каждого элемента массива строк.
const checkHashTagLength = (value) => {
  const hashTag = value.split(' ');

  return hashTag.every((item) => item.length <= STRING_LENGTH);
};
pristine.addValidator(formInputElement, checkHashTagLength, `Максимальная длина одного хэш-тега ${STRING_LENGTH} символов`);

//Принимает строку, приобразует в массив и проверяет больше ли длинна элемента MAX_HASHTAGS.
const checkHashTagCount = (value) => {
  const hashTag = value.split(' ');
  if (hashTag.length <= MAX_HASHTAGS) {
    return hashTag;
  }
  return false;
};
pristine.addValidator(formInputElement, checkHashTagCount, 'Хештегов может быть не больше 5');

//Проверка на схожий хештег каждого элемента массива строк.
const checkSimilarHashTag = (value) => {
  const hashTag = value.toLowerCase().split(' ');
  return new Set(hashTag).size === hashTag.length;
};
pristine.addValidator(formInputElement, checkSimilarHashTag, 'Один и тот же хэш-тег не может быть использован дважды;');

//Проверка длинны комментария.
pristine.addValidator(formCommentElement, checkStringLength, 'Комментарий не должен привышать 140 символов');

export {formCommentElement, formInputElement, setUserFormSubmit};


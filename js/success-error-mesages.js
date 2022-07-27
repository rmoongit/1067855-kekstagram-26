import { isEscapeKey } from './util.js';
import { onFormClickEsc } from './edit-form.js';

const bodyElement = document.querySelector('body');
const successBlockElement = document.querySelector('#success').content;
const errorBlockElement = document.querySelector('#error').content;

//Закрите по кнопке 'Esc'.
const onErrorClickEsc = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onWindowWarningClose();
  }
};

//Закрытие окна с успешной или ошибочной отправкой.
function onWindowWarningClose () {
  const successSectionElement = document.querySelector('.success');
  const errorSectionElement = document.querySelector('.error');

  if (successSectionElement) {
    successSectionElement.remove();
  }

  if (errorSectionElement) {
    errorSectionElement.remove();
  }
  document.addEventListener('keydown', onFormClickEsc);
}

const onAreaWindowClose = (evt) => {
  if (evt.target.closest('section')) {
    onWindowWarningClose();
  }
};


//Показывает окно успешной отправки.
const onSuccessForm = () => {
  const cloneSuccessElement = successBlockElement.cloneNode(true);
  const successButtonElement = cloneSuccessElement.querySelector('.success__button');
  bodyElement.append(cloneSuccessElement);

  document.addEventListener('click', onAreaWindowClose);
  document.addEventListener('keydown', onErrorClickEsc);
  successButtonElement.addEventListener('click', onWindowWarningClose);
};

//Показывает окно ошибочной отправки.
const onErrorForm = (unblock) => {
  const cloneErrorElement = errorBlockElement.cloneNode(true);
  const errorButtonElement = cloneErrorElement.querySelector('.error__button');
  bodyElement.append(cloneErrorElement);
  unblock();

  document.addEventListener('click', onAreaWindowClose);
  document.addEventListener('keydown', onErrorClickEsc);
  errorButtonElement.addEventListener('click', onWindowWarningClose);
  document.removeEventListener('keydown', onFormClickEsc);
};

export {
  onSuccessForm,
  onErrorForm,
};

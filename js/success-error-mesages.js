import { onClickEscapeKey } from './util.js';
import { onFormClickEsc } from './edit-form.js';

const bodyElement = document.querySelector('body');
const successBlockElement = document.querySelector('#success').content;
const errorBlockElement = document.querySelector('#error').content;

//Закрите по кнопке 'Esc'.
const onErrorClickEsc = (evt) => {
  if(onClickEscapeKey(evt)) {
    evt.preventDefault();
    closeWarningWindow();
  }
};

//Закрытие окна с успешной отправкой.
function closeWarningWindow () {
  const successSection = document.querySelector('.success');
  const errorSection = document.querySelector('.error');

  if (successSection) {
    successSection.remove();
  }

  if (errorSection) {
    errorSection.remove();
  }
  document.addEventListener('keydown', onFormClickEsc);
}

const onAreaWindowClose = (evt) => {
  if (evt.target.closest('section')) {
    closeWarningWindow();
  }
};


//Показывает окно успешной отправки.
const onSuccessForm = () => {
  const cloneSuccess = successBlockElement.cloneNode(true);
  const successButton = cloneSuccess.querySelector('.success__button');
  bodyElement.append(cloneSuccess);

  document.addEventListener('click', onAreaWindowClose);
  document.addEventListener('keydown', onErrorClickEsc);
  successButton.addEventListener('click', closeWarningWindow);
};

//Показывает окно ошибочной отправки.
const onErrorForm = (unblock) => {
  const cloneError = errorBlockElement.cloneNode(true);
  const errorButton = cloneError.querySelector('.error__button');
  bodyElement.append(cloneError);
  unblock();

  document.addEventListener('click', onAreaWindowClose);
  document.addEventListener('keydown', onErrorClickEsc);
  errorButton.addEventListener('click', closeWarningWindow);
  document.removeEventListener('keydown', onFormClickEsc);
};

export {
  onSuccessForm,
  onErrorForm,
};

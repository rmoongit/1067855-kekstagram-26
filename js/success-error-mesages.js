import { escapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

//Закрите по кнопке 'Esc'.
const onCloseEsc = (evt) => {
  if(escapeKey(evt)) {
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
}

const onClickAreaCloseWindow = (evt) => {
  if (evt.target.closest('section')) {
    closeWarningWindow();
  }
};


//Показывает окно успешной отправки.
const onSuccessForm = () => {
  const cloneSuccess = templateSuccess.cloneNode(true);
  const successButton = cloneSuccess.querySelector('.success__button');
  bodyElement.append(cloneSuccess);

  document.addEventListener('click', onClickAreaCloseWindow);
  document.addEventListener('keydown', onCloseEsc);
  successButton.addEventListener('click', closeWarningWindow);
};

//Показывает окно ошибочной отправки.
const onErrorForm = (close) => {
  const cloneError = templateError.cloneNode(true);
  const errorButton = cloneError.querySelector('.error__button');
  bodyElement.append(cloneError);
  close();

  document.addEventListener('click', onClickAreaCloseWindow);
  document.addEventListener('keydown', onCloseEsc);
  errorButton.addEventListener('click', closeWarningWindow);
};

export {
  onSuccessForm,
  onErrorForm,
};

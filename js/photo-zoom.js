//Значение увеличения и уменьшения шага
const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const imgUploadScaleElement = document.querySelector('.img-upload__scale');
const scaleValueElement = imgUploadScaleElement.querySelector('.scale__control--value');
const scaleButtonDownElement = imgUploadScaleElement.querySelector('.scale__control--smaller');
const scaleButtonUpElement = imgUploadScaleElement.querySelector('.scale__control--bigger');

const scaleImgPreviewElement = document.querySelector('.img-upload__preview img');

//Возвращает число в диапазоне счисления - 10
const getScaleValue = () => parseInt(scaleValueElement.value, 10);

//Уменьшает значение scaleValue
const onScaleDown = () => {
  const {STEP, MIN} = Scale;

  scaleValueElement.value = `${getScaleValue() - STEP}%`;
  const percentValue = getScaleValue() / 100;
  scaleImgPreviewElement.style.transform = `scale(${percentValue})`;

  if (getScaleValue() <= MIN) {
    scaleValueElement.value = `${MIN }%`;
    scaleImgPreviewElement.style.transform = `scale(${getScaleValue() / 100})`;
  }
};

//Увеличивает значение scaleValue
const onScaleUp = () => {
  const {STEP, MAX} = Scale;

  scaleValueElement.value = `${getScaleValue() + STEP}%` ;
  const percentValue = getScaleValue() / 100;
  scaleImgPreviewElement.style.transform = `scale(${percentValue})`;

  if (getScaleValue() >= MAX) {
    scaleValueElement.value = `${MAX }%`;
    scaleImgPreviewElement.style.transform = `scale(${getScaleValue() / 100})`;
  }
};

const getScaleDefault = () => {
  const {MAX} = Scale;

  scaleImgPreviewElement.style.transform = `scale(${MAX / 100})`;
  scaleValueElement.value = `${MAX}%`;
  scaleValueElement.setAttribute('readonly', 'readonly');
};

//Добавляет на кнопки обработчик что вызывает функцию
const addScaleListener = () => {
  scaleButtonDownElement.addEventListener('click', onScaleDown);
  scaleButtonUpElement.addEventListener('click', onScaleUp);
};

//Удаляет на кнопки обработчик что вызывает функцию
const removeScaleListener = () => {
  scaleButtonDownElement.removeEventListener('click', onScaleDown);
  scaleButtonUpElement.removeEventListener('click', onScaleUp);
  scaleImgPreviewElement.removeAttribute = 'style';
};


export {addScaleListener, removeScaleListener, getScaleDefault};


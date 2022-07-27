const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
//effects
const sliderValueElement = document.querySelector('.effect-level__value');
const buttonsEffectElement= document.querySelectorAll('.effects__radio');
//slider
const blockEffectsElement = document.querySelector('.img-upload__effect-level');
const blockSliderElement = document.querySelector('.effect-level__slider');

//Объект эффектов.
const effects = {

  chrome: {
    effect: 'chrome',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },

  sepia: {
    effect: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },

  marvin: {
    effect: 'marvin',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },

  phobos: {
    effect: 'phobos',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },

  heat: {
    effect: 'heat',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },

};

//Создаёт сладйер со значениями 0-100 и заполняимостью от меньшего.
noUiSlider.create(blockSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

//Получить данные фильтра по value
const getSliderEffect = () => {
  blockSliderElement.noUiSlider.on('update', () => {
    sliderValueElement.value = blockSliderElement.noUiSlider.get();

    const effectsClass = imgUploadPreviewElement.className;

    switch (effectsClass) {

      case 'effects__preview--chrome':
        imgUploadPreviewElement.style.filter = `grayscale(${sliderValueElement.value})`;
        blockEffectsElement.classList.remove('hidden');
        break;

      case 'effects__preview--sepia':
        imgUploadPreviewElement.style.filter = `sepia(${sliderValueElement.value})`;
        blockEffectsElement.classList.remove('hidden');
        break;

      case 'effects__preview--marvin':
        imgUploadPreviewElement.style.filter = `invert(${sliderValueElement.value}%)`;
        blockEffectsElement.classList.remove('hidden');
        break;

      case 'effects__preview--phobos':
        imgUploadPreviewElement.style.filter = `blur(${sliderValueElement.value}px)`;
        blockEffectsElement.classList.remove('hidden');
        break;

      case 'effects__preview--heat':
        imgUploadPreviewElement.style.filter = `brightness(${sliderValueElement.value})`;
        blockEffectsElement.classList.remove('hidden');
        break;

      default:
        imgUploadPreviewElement.className = 'effects__preview--none';
        imgUploadPreviewElement.style.filter = 'none';
        blockEffectsElement.classList.add('hidden');
    }
  });
};

//Применяет фильтра с параметрами объектов по нажатию на фильтр (radio-button)
const onChangeEffect = () => {

  buttonsEffectElement.forEach((filter) => {
    const {chrome, sepia, marvin, phobos, heat} = effects;

    filter.addEventListener('click', () => {

      if(filter.matches('#effect-none') && filter.checked) {
        imgUploadPreviewElement.className = 'effects__preview--none';
        imgUploadPreviewElement.style.filter = 'none';
        blockEffectsElement.classList.add('hidden');
      }

      if(filter.matches('#effect-chrome')) {
        imgUploadPreviewElement.className = `effects__preview--${chrome.effect}`;
        blockSliderElement.noUiSlider.updateOptions({
          range: {
            min: chrome.range.min,
            max: chrome.range.max,
          },
          start: chrome.start,
          step: chrome.step,
        });
      }

      if (filter.matches('#effect-sepia')) {
        imgUploadPreviewElement.className = `effects__preview--${sepia.effect}`;
        blockSliderElement.noUiSlider.updateOptions({
          range: {
            min: sepia.range.min,
            max: sepia.range.max,
          },
          start: sepia.start,
          step: sepia.step,
        });
      }

      if (filter.matches('#effect-marvin')) {
        imgUploadPreviewElement.className = `effects__preview--${marvin.effect}`;
        blockSliderElement.noUiSlider.updateOptions({
          range: {
            min: marvin.range.min,
            max: marvin.range.max,
          },
          start: marvin.start,
          step: marvin.step,
        });
      }

      if (filter.matches('#effect-phobos')) {
        imgUploadPreviewElement.className = `effects__preview--${phobos.effect}`;
        blockSliderElement.noUiSlider.updateOptions({
          range: {
            min: phobos.range.min,
            max: phobos.range.max,
          },
          start: phobos.start,
          step: phobos.step,
        });
      }

      if (filter.matches('#effect-heat')) {
        imgUploadPreviewElement.className = `effects__preview--${heat.effect}`;
        blockSliderElement.noUiSlider.updateOptions({
          range: {
            min: heat.range.min,
            max: heat.range.max,
          },
          start: heat.start,
          step: heat.step,
        });
      }
    });
    getSliderEffect();
  });
};

export {onChangeEffect, imgUploadPreviewElement};



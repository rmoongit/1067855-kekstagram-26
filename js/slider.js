const imgUploadPreview = document.querySelector('.img-upload__preview img');

//effects
const sliderValue = document.querySelector('.effect-level__value');
const effectsRadio = document.querySelectorAll('.effects__radio');
//slider
const effectsBlockSlider = document.querySelector('.effect-level__slider');

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
noUiSlider.create(effectsBlockSlider, {
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


const intensiveEffect = () => {
  effectsBlockSlider.noUiSlider.on('update', () => {
    sliderValue.value = effectsBlockSlider.noUiSlider.get();

    const effectsClass = imgUploadPreview.className;

    switch (effectsClass) {

      case 'effects__preview--chrome':
        imgUploadPreview.style.filter = `grayscale(${sliderValue.value})`;
        effectsBlockSlider.classList.remove('visually-hidden');
        break;

      case 'effects__preview--sepia':
        imgUploadPreview.style.filter = `sepia(${sliderValue.value})`;
        effectsBlockSlider.classList.remove('visually-hidden');
        break;

      case 'effects__preview--marvin':
        imgUploadPreview.style.filter = `invert(${sliderValue.value}%)`;
        effectsBlockSlider.classList.remove('visually-hidden');
        break;

      case 'effects__preview--phobos':
        imgUploadPreview.style.filter = `blur(${sliderValue.value}px)`;
        effectsBlockSlider.classList.remove('visually-hidden');
        break;

      case 'effects__preview--heat':
        imgUploadPreview.style.filter = `brightness(${sliderValue.value})`;
        effectsBlockSlider.classList.remove('visually-hidden');
        break;

      default:
        imgUploadPreview.className = 'effects__preview--none';
        imgUploadPreview.style.filter = 'none';
        effectsBlockSlider.classList.add('visually-hidden');
    }
  });
};

//Применяет фильтра с параметрами объектов по нажатию на фильтр (radio-button)
const onChangeEffect = () => {

  effectsRadio.forEach((filter) => {
    const {chrome, sepia, marvin, phobos, heat} = effects;

    filter.addEventListener('click', () => {

      if(filter.matches('#effect-none') && filter.checked) {
        imgUploadPreview.className = 'effects__preview--none';
        imgUploadPreview.style.filter = 'none';
        effectsBlockSlider.classList.add('visually-hidden');
      }

      if(filter.matches('#effect-chrome')) {
        imgUploadPreview.className = `effects__preview--${chrome.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: chrome.range.min,
            max: chrome.range.max,
          },
          start: chrome.start,
          step: chrome.step,
        });
      }

      if (filter.matches('#effect-sepia')) {
        imgUploadPreview.className = `effects__preview--${sepia.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: sepia.range.min,
            max: sepia.range.max,
          },
          start: sepia.start,
          step: sepia.step,
        });
      }

      if (filter.matches('#effect-marvin')) {
        imgUploadPreview.className = `effects__preview--${marvin.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: marvin.range.min,
            max: marvin.range.max,
          },
          start: marvin.start,
          step: marvin.step,
        });
      }

      if (filter.matches('#effect-phobos')) {
        imgUploadPreview.className = `effects__preview--${phobos.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: phobos.range.min,
            max: phobos.range.max,
          },
          start: phobos.start,
          step: phobos.step,
        });
      }

      if (filter.matches('#effect-heat')) {
        imgUploadPreview.className = `effects__preview--${heat.effect}`;
        effectsBlockSlider.noUiSlider.updateOptions({
          range: {
            min: heat.range.min,
            max: heat.range.max,
          },
          start: heat.start,
          step: heat.step,
        });
      }
    });
    intensiveEffect();
  });
};

export {onChangeEffect, imgUploadPreview};



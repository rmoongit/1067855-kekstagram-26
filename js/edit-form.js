import { escapeKey, stopListener } from './util.js';
import {hashtagInput, commentArea} from './validate-form.js';
import {addScalingClick, removeScalingClick, scaleDefault} from './photo-zoom.js';
import { onChangeEffect} from './slider.js';


const file = document.querySelector('#upload-file');

const img = document.querySelector('.img-upload__overlay');
const closeButton = img.querySelector('#upload-cancel');

const closePopup = () => {
  img.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closePopupEsc);
  closeButton.removeEventListener('click', closePopup);
  file.value = '';
  hashtagInput.value = '';
  commentArea.value = '';
  removeScalingClick();
};

function closePopupEsc (evt) {
  if(escapeKey(evt)) {
    closePopup();
  }
}

const uploadPhotosModal = () => {
  file.addEventListener('change', (evt) => {

    if(evt.target.value) {
      img.classList.remove('hidden');
      document.body.classList.add('modal-open');

      closeButton.addEventListener('click', closePopup);
      document.addEventListener('keydown', closePopupEsc);
    }
    stopListener(hashtagInput, commentArea);
    scaleDefault();
    addScalingClick();
    onChangeEffect();
  });
};

export {uploadPhotosModal};



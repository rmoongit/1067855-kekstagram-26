import { escapeKey, stopListener } from './util.js';
import {hashtagInput, commentArea,} from './validate-form.js';
import {addScalingClick, removeScalingClick, scaleDefault} from './photo-zoom.js';
import { onChangeEffect, imgUploadPreview} from './slider.js';

const fileChooser = document.querySelector('#upload-file');
const img = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview img');
const closeButton = img.querySelector('#upload-cancel');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const resetForm = () => {
  fileChooser.value = '';
  hashtagInput.value = '';
  commentArea.value = '';
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.className = 'effects__preview--none';
};

const closePopup = () => {
  img.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', closePopupEsc);
  closeButton.removeEventListener('click', closePopup);
  resetForm();
  removeScalingClick();
};

function closePopupEsc (evt) {
  if(escapeKey(evt)) {
    closePopup();
  }
}

const uploadPhotosModal = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const fileNameMatches = FILE_TYPES.some((element) => fileName.endsWith(element));

    if(fileNameMatches) {
      imgPreview.src = URL.createObjectURL(file);
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

export {uploadPhotosModal, closePopup};



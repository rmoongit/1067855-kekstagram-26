import { isEscapeKey, stopListener } from './util.js';
import {formInputElement, formCommentElement,} from './validate-form.js';
import {addScaleListener, removeScaleListener, getScaleDefault} from './photo-zoom.js';
import { onChangeEffect, imgUploadPreviewElement} from './slider.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('#upload-file');
const imgElement = document.querySelector('.img-upload__overlay');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const closeImgButtonElement = imgElement.querySelector('#upload-cancel');

const resetForm = () => {
  fileChooserElement.value = '';
  formInputElement.value = '';
  formCommentElement.value = '';
  imgUploadPreviewElement.style.filter = 'none';
  imgUploadPreviewElement.className = 'effects__preview--none';
};

const onFormClose = () => {
  imgElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onFormClickEsc);
  closeImgButtonElement.removeEventListener('click', onFormClose);
  resetForm();
  removeScaleListener();
};

function onFormClickEsc (evt) {
  if(isEscapeKey(evt)) {
    onFormClose();
  }
}

const uploadPhotosModal = () => {
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const fileNameMatches = FILE_TYPES.some((element) => fileName.endsWith(element));

    if(fileNameMatches) {
      imgPreviewElement.src = URL.createObjectURL(file);
      imgElement.classList.remove('hidden');
      document.body.classList.add('modal-open');

      closeImgButtonElement.addEventListener('click', onFormClose);
      document.addEventListener('keydown', onFormClickEsc);
    }

    stopListener(formInputElement, formCommentElement);
    getScaleDefault();
    addScaleListener();
    onChangeEffect();
  });
};

export {uploadPhotosModal, onFormClose, onFormClickEsc};



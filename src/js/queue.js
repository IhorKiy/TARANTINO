import { refs } from './refs';
import storage from './storage';
import { getGenresNames } from './getGenresNames';
import insertCardMarkup from './cardMarkup';
import Notiflix from 'notiflix';

const gallery = refs.libraryContainer;
const queue = storage.loadFromQueue() || [];

if (refs.queueBtn) {
  refs.queueBtn.addEventListener('click', showQueue);
}

function showQueue() {
  if (!queue || !queue.length) {
    Notiflix.Notify.failure('Oops, empty!');
    return;
  } else {
    insertCardMarkup(queue, gallery);
  }
}

import { refs } from './refs';
import {
  buttonWatchedRefs,
  buttonQueueRefs,
  fWatched,
  fQueue,
  closeButtonRemoveListener,
} from './modalMovie';
import showQueue from './queue';
import insertCardMarkup from './cardMarkup';
import storage from './storage';

const overlay = refs.overLay;
const modal = refs.modal;
// * const overlay = document.querySelector('.overlay');
// * const modal = document.querySelector('.modal');

// window.removeEventListener('scroll', e => {
//   window.scrollTo(0,0);
// });

window.addEventListener('keydown', e => {
  if (modal.classList.contains('active')) {
    handleKeyDown(e);
    // closeButtonRemoveListener();
  }
});

overlay.addEventListener('click', e => {
  handleClick(e);
  // closeButtonRemoveListener();
});

const handleKeyDown = e => {
  if (e.code === 'Escape') {
    modal.classList.remove('active');
    overlay.classList.remove('active');

    // if (refs.queueBtn.classList.contains('library__nav-btn--queue')) {
    //   const queue = storage.loadFromQueue() || [];
    //   insertCardMarkup(queue, refs.libraryContainer);
    // }

    // showQueue();
  }
};

const handleClick = e => {
  if (e.currentTarget == e.target) {
    modal.classList.remove('active');
    overlay.classList.remove('active');

    // if (refs.queueBtn.classList.contains('library__nav-btn--queue')) {
    //   const queue = storage.loadFromQueue() || [];
    //   insertCardMarkup(queue, refs.libraryContainer);
    // }

    // showQueue();
  }
};

// const onCloseCrose = document.querySelector('.button-close');
// onCloseCrose.addEventListener('click', e => {
//   crossClick(e);
// });

// const crossClick = e => {
//   modal.classList.remove('active');
//   overlay.classList.remove('active');
// };

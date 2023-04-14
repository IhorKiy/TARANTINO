export { buttonWatchedRefs, buttonQueueRefs, fWatched, fQueue };

// import { insertCardMarkup } from './cardMarkup';
// import ApiMovie from './serviseAPI';
// import { apiMovie } from './serviseAPI';
import storage from './storage';
// import { load } from './storage';
// import cardMarkup from './cardMarkup';
// import onFirstRender from './onFirstRender';
import { getGenresNames } from './getGenresNames';
import imagePlaceholder from '../images/image-placeholder.png';
// import {
//   isWatched,
//   isQueue,
//   fWatched,
//   fQueue,
//   addToWatched,
//   removeFromWatched,
// } from './modal_button_storage';
// import { refs } from './refs';

// const filmCardRefs = document.querySelector('.card__container');
const modalRefs = document.querySelector('.modal');
const overlayRefs = document.querySelector('.overlay');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
// const movieContainer = document.querySelector('.card__container');
const movieContainer = document.querySelector('.home__container');
libraryBtn = document.querySelector('.header__nav-btn--lib');
const movieContainerLibrary = document.querySelector(
  '.library__container'
  // '.card__container--library'
);

// movieContainer.addEventListener('click', openModalMovie);
if (movieContainer) {
  movieContainer.addEventListener('click', openModalMovie);
}

if (movieContainerLibrary) {
  movieContainerLibrary.addEventListener('click', openModalMovie);
}

// filmCardRefs.addEventListener('click', openModalMovie);
// console.log(filmCardRefs);
const addWatched = 'ADD TO WATCHED';
const removeWatched = 'REMOVE FROM WATCHED';
const addQueue = 'ADD TO QUEUE';
const removeQueue = 'REMOVE FROM QUEUE';
const buttonWatchedRefs = document.querySelector('.watched');
const buttonQueueRefs = document.querySelector('.queue');

// export function closeButtonRemoveListener() {
//   buttonWatchedRefs.removeEventListener('click', fWatched);
//   buttonQueueRefs.removeEventListener('click', fQueue);
// }

let saveDataMovie = {};

function openModalMovie(event) {
  event.preventDefault();

  openModalView();

  const movies = storage.load('current');

  movieData = movies.find(
    movie => movie.id === Number(event.target.closest('.film_card').id)
  );
  const moviesArr = window.localStorage.getItem('wathedArr');
  let parsedMovies = JSON.parse(moviesArr);

  let textButtonWatched = '';
  let textButtonQueue = '';
  function isWatched(movieData, parsedMovies) {
    if (parsedMovies.findIndex(movie => movie.id === movieData.id) < 0) {
      textButtonWatched = addWatched;
      return textButtonWatched;
    } else {
      return (textButtonWatched = removeWatched);
    }
  }
  // ==== QUEUE ====

  const queuryArr = window.localStorage.getItem('queueArr');
  // console.log(queuryArr);
  let parsedMoviesQery = JSON.parse(queuryArr);
  // console.log(parsedMoviesQery);
  function isQueue(movieData, parsedMoviesQery) {
    if (parsedMoviesQery.findIndex(movie => movie.id === movieData.id) < 0) {
      textButtonQueue = addQueue;
      return textButtonQueue;
    } else {
      return (textButtonQueue = removeQueue);
    }
  }
  // ====

  isWatched(movieData, parsedMovies);
  isQueue(movieData, parsedMoviesQery);

  renderMovieDataToModal(movieData, textButtonWatched, textButtonQueue);
  const buttonWatchedRefs = document.querySelector('.watched');
  const buttonQueueRefs = document.querySelector('.queue');
  buttonWatchedRefs.addEventListener('click', fWatched);
  buttonQueueRefs.addEventListener('click', fQueue);

  saveDataMovie = movieData;

  function fWatched(event) {
    if (event.target.textContent === 'ADD TO WATCHED') {
      let addToWatchedData = localStorage.getItem('wathedArr');
      addToWatchedData = JSON.parse(addToWatchedData);
      addToWatchedData.push(movieData);
      localStorage.setItem('wathedArr', JSON.stringify(addToWatchedData));
      event.target.textContent = 'REMOVE FROM WATCHED';
    } else {
      let removeWatchedData = localStorage.getItem('wathedArr');
      removeWatchedData = JSON.parse(removeWatchedData);
      removeWatchedData = removeWatchedData.filter(
        ({ id }) => id !== movieData.id
      );
      localStorage.setItem('wathedArr', JSON.stringify(removeWatchedData));
      event.target.textContent = 'ADD TO WATCHED';

      if (refs.watchedBtn.classList.contains('active')) {
        const watched = storage.loadFromWatched() || [];
        insertCardMarkup(watched, refs.libraryContainer);
        return;
      }
    }
  }
  // ==== Queue function ====
  function fQueue(event) {
    if (event.target.textContent === 'ADD TO QUEUE') {
      let addToQueueData = localStorage.getItem('queueArr');
      addToQueueData = JSON.parse(addToQueueData);
      addToQueueData.push(movieData);
      localStorage.setItem('queueArr', JSON.stringify(addToQueueData));
      event.target.textContent = 'REMOVE FROM QUEUE';
    } else {
      let removeQueueData = localStorage.getItem('queueArr');
      removeQueueData = JSON.parse(removeQueueData);
      removeQueueData = removeQueueData.filter(({ id }) => id !== movieData.id);
      localStorage.setItem('queueArr', JSON.stringify(removeQueueData));
      event.target.textContent = 'ADD TO QUEUE';

      // if (libraryBtn.classList.contains('active')) {
      //   const queue = storage.loadFromQueue() || [];
      //   insertCardMarkup(queue, refs.libraryContainer);
      //   // event.target.textContent = 'ADD TO WATCHED';
      //   return;
      // }
    }
  }
  // ====
  return movieData;
}

export default saveDataMovie;

function renderMovieDataToModal(
  {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genre_ids,
    overview,
  },
  textButtonWatched,
  textButtonQueue
) {
  const genresData = getGenresNames(genre_ids);
  modalRefs.innerHTML = `
    <div class="modal__poster-box">
      <img class="modal__poster" src="${
        poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : imagePlaceholder
      }" alt="${title}"  />

    </div>
    <div class="modal__film-descr">
      <h2 class="modal__film-name">${title}</h2>
      <ul class="modal__film-info-list">
        <li class="modal__film-info-item">
          <p class="madal__film-info">Vote / Votes</p>
          <p class="modal__film-info-value">
            <span class="modal__film-info-value--color">${vote_average}</span> / ${vote_count}
          </p>
        </li>
        <li class="modal__film-info-item">
          <p class="madal__film-info">Popularity</p>
          <p class="modal__film-info-value">${popularity}</p>
        </li>
        <li class="modal__film-info-item">
          <p class="madal__film-info">Original Title</p>
          <p class="modal__film-info-value">${original_title}</p>
        </li>
        <li class="modal__film-info-item">
          <p class="madal__film-info">Genre</p>
          <p class="modal__film-info-value">${genresData}</p>
        </li>
      </ul>
      <h3 class="modal__film-about">ABOUT</h3>
      <p class="modal__film-plot">${overview}
      </p>
      <ul class="modal__film-btn-List">
        <li class="modal__film-btn-item">
          <button type="button" class="modal__film-btn watched">${textButtonWatched}</button>
        </li>
        <li class="modal__film-btn-item">
          <button type="button" class="modal__film-btn queue">${textButtonQueue}</button>
        </li>
      </ul>
    </div>

  `;
}

function openModalView() {
  modalRefs.classList.add('active');
  overlayRefs.classList.add('active');
}

// Експорт данних по фільмам для обміну між local storage звернення: modalMovie.movies()
// export {
//   movies, // масив фільмів за ключем 'current' що приходять з local storage з load
//   movieData, // дані поточного фільма який обрали
// };

// 1. Відкриття модалки по натисканню на movie card
// 2. Fetch
// 3. Render
// 4. Підключення buttons 'add to watch' та 'add to queue'
// 5. При натисканні на buttons 'add to watch', має бути змінено
// текстовий контент на 'remove to watch'
// 6. При закритті/відкритті модалки має відображатись поточний стан кнопки add/remove
// 7. При закритті модалки необхідно перемальовувати вміст бібліотеки

// ============ функціонал для buttons ==========

// function onButtonAddWatched() {
//   buttonWatchedRefs.classList.toggle('to-turn-on');
//   buttonWatchedRefs.textContent = 'ADD TO';
//   buttonWatchedRefs.classList.toggle('to-turn-on');
//   buttonWatchedRefs.textContent = 'REMOVE FROM WATCHED';
// }

// function onButtonAddQueue() {
//   buttonQueueRefs.classList.remove('to-turn-on');
//   buttonQueueRefs.textContent = 'ADD TO';
//   buttonQueueRefs.classList.add('to-turn-on');
//   buttonQueueRefs.textContent = 'REMOVE FROM QUEUE';
// }

// const buttonWatchedRefs = document.querySelector('.modal__film-btn watched');
// const buttonQueueRefs = document.querySelector('.modal__film-btn queue');

// buttonWatchedRefs = document.querySelector('.modal__film-btn watched');
// buttonQueueRefs = document.querySelector('.modal__film-btn queue');
// buttonWatchedRefs.addEventListener('click', onButtonAddWatched);
// console.log(buttonWatchedRefs);
// buttonQueueRefs.addEventListener('click', onButtonAddQueue);

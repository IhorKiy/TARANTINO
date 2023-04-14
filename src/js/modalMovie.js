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
import { refs } from './refs';

// const filmCardRefs = document.querySelector('.card__container');
const modalRefs = document.querySelector('.modal');
const overlayRefs = document.querySelector('.overlay');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const watchedBtnAdd = document.querySelector('.library__nav-btn--watched');
// const movieContainer = document.querySelector('.card__container');
const movieContainer = document.querySelector('.home__container');
// libraryBtn = document.querySelector('.header__nav-btn--lib');
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

  const movieData = movies.find(
    movie => movie.id === Number(event.target.closest('.film_card').id)
  );
  // const moviesArr = window.localStorage.getItem('wathedArr');
  // let parsedMovies = JSON.parse(moviesArr);
  let  parsedMovies = storage.loadFromWatched();

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

  //const queuryArr = window.localStorage.getItem('queueArr');
  // console.log(queuryArr);
  // let let parsedMoviesQery = JSON.parse(queuryArr);
  let parsedMoviesQery = storage.loadFromQueue();
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
      // let addToWatchedData = localStorage.getItem('wathedArr');
      // addToWatchedData = JSON.parse(addToWatchedData);
      const addToWatchedData = storage.loadFromWatched();
      addToWatchedData.push(movieData);
      // localStorage.setItem('wathedArr', JSON.stringify(addToWatchedData));
      storage.saveToWatched(addToWatchedData);
      event.target.textContent = 'REMOVE FROM WATCHED';
    } else {
      // let removeWatchedData = localStorage.getItem('wathedArr');
      // removeWatchedData = JSON.parse(removeWatchedData);
      let removeWatchedData = storage.loadFromWatched();
      removeWatchedData = removeWatchedData.filter(
        ({ id }) => id !== movieData.id
      );
      // localStorage.setItem('wathedArr', JSON.stringify(removeWatchedData));
      storage.saveToWatched(removeWatchedData);
      event.target.textContent = 'ADD TO WATCHED';

      if (
        refs.libraryBtn.classList.contains('current') &&
        watchedBtnAdd.classList.contains('active')
      ) {
        // const moviesArr = window.localStorage.getItem('wathedArr');
        // let parsedMovies = JSON.parse(moviesArr);
        let parsedMovies = storage.loadFromWatched();
        if (parsedMovies.length < 1) {
          refs.libraryContainer.innerHTML = '';
        }
        renderLibraryCards(parsedMovies, refs.libraryContainer);
        return;
      }
    }
  }
  // ==== Queue function ====
function fQueue(event) {
  if (event.target.textContent === 'ADD TO QUEUE') {
    // let addToQueueData = localStorage.getItem('queueArr');
    // addToQueueData = JSON.parse(addToQueueData);
    let addToQueueData = storage.loadFromQueue();
    addToQueueData.push(movieData);
    // localStorage.setItem('queueArr', JSON.stringify(addToQueueData));
    storage.saveToQueue(addToQueueData);
    event.target.textContent = 'REMOVE FROM QUEUE';
  } else {
    // let removeQueueData = localStorage.getItem('queueArr');
    // removeQueueData = JSON.parse(removeQueueData);
    let removeQueueData = storage.loadFromQueue();
    removeQueueData = removeQueueData.filter(({ id }) => id !== movieData.id);
    //localStorage.setItem('queueArr', JSON.stringify(removeQueueData));
    storage.saveToQueue(addToQueueData);
    event.target.textContent = 'ADD TO QUEUE';
    // console.log(libraryBtn.classList.contains('current'));
    // const container = document.querySelector('#container'); // выберите контейнер

    if (
      refs.libraryBtn.classList.contains('current') ||
      refs.addToQueueBtn.classList.contains('current')
    ) {
      // const queuryArr = window.localStorage.getItem('queueArr');
      // // console.log(queuryArr);
      // let parsedMoviesQery = JSON.parse(queuryArr);
      let parsedMoviesQery = storage.loadFromQueue();
      console.log(parsedMoviesQery.length);
      if (parsedMoviesQery.length < 1) {
        refs.libraryContainer.innerHTML = '';
      }
      renderLibraryCards(parsedMoviesQery, refs.libraryContainer);
      return;
    }
  }
}
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

function renderLibraryCards(parsedMoviesQery, ref) {
  const cardMarkup = parsedMoviesQery
    .map(
      ({ id, title, release_date, poster_path, genre_ids, first_air_date }) => {
        const getGenreNames = getGenresNames(genre_ids);
        const movieData = {
          release_date,
          first_air_date,
        };
        let releaseDate = '';
        if (movieData.release_date) {
          releaseDate = movieData.release_date.slice(0, 4);
        } else if (movieData.first_air_date) {
          releaseDate = movieData.first_air_date.slice(0, 4);
        }
        return `
        <li id=${id} class=film_card>
        <div class=img__wrapper><img class=film_poster src=https://image.tmdb.org/t/p/original${poster_path} width= 50 height= 50 alt= ${title}/></div>
        <div class="film_info">
        <p class=film_name>${title}</p>
        <p class=film_genre>${getGenreNames} <span class=line>|<span> ${releaseDate}</p>
                </div>

        </li>`;
      }
    )
    .join('');
  //  const LibaCont = document.querySelector('.library__container');
  ref.innerHTML = cardMarkup;
  return;
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

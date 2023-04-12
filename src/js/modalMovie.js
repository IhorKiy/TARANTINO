import { insertCardMarkup } from './cardMarkup';
import ApiMovie from './serviseAPI';
import { apiMovie } from './serviseAPI';
import storage from './storage';
import { load } from './storage';
import cardMarkup from './cardMarkup';
import onFirstRender from './onFirstRender';
import { getGenresNames } from './getGenresNames';
import imagePlaceholder from '../images/image-placeholder.png';

// const filmCardRefs = document.querySelector('.film__card');
const modalRefs = document.querySelector('.modal');
const overlayRefs = document.querySelector('.overlay');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const movieContainer = document.querySelector('.card__container');

// filmCardRefs.addEventListener('click', openModalMovie);
movieContainer.addEventListener('click', openModalMovie);
// console.log(filmCardRefs);

// async
function openModalMovie(event) {
  event.preventDefault();

  // event.target.parentNode.id;
  // console.log(event.target.closest('.film_card').id);

  // if (event.target.parentNode.contains('id')) {
  //   const id = e.target.dataset.id;
  // }

  // if (
  //   event.target.nodeName === 'P' &&
  //   event.target.classList.contains('film-name')
  // ) {
  //   const title = event.target.textContent;
  // }
  // if (
  //   event.target.nodeName === 'P' &&
  //   event.target.classList.contains('film-genre')
  // ) {
  //   title = event.target.previousElementSibling.textContent;
  // }
  // if (event.target.nodeName === 'IMG') {
  //   title =
  //     event.target.parentNode.nextElementSibling.firstElementChild.textContent;
  // } else return;
  // console.log(title);

  openModalView();

  const movies = storage.load('current');
  console.log(movies);
  // const movieData = movies.find(movie => movie.title === title);

  const movieData = movies.find(
    movie => movie.id === Number(event.target.closest('.film_card').id)
  );
  console.log(movieData);

  renderMovieDataToModal(movieData);
}

function renderMovieDataToModal({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  genre_ids,
  overview,
}) {
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
          <button type="button" class="modal__film-btn watched">ADD TO WATCHED</button>
        </li>
        <li class="modal__film-btn-item">
          <button type="button" class="modal__film-btn queue">ADD TO QUEUE</button>
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
export {
  movies, // масив фільмів за ключем 'current' що приходять з local storage з load
  movieData, // дані поточного фільма який обрали
};

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

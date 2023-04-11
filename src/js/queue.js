import storage from './storage';
import { getGenresNames } from './getGenresNames';

const refs = {
  library: document.querySelector('.card__container--library'),
  queueBtn: document.querySelector('.library__nav-btn--queue'),
};

const queue = storage.loadFromQueue() || [];

// refs.queueBtn.addEventListener('click', showQueue);

function showQueue() {
  if (!queue || !queue.length) {
    refs.library.innerHTML = `
      <li class="nothing">
        <img src="" alt="There's nothing to see here" />
      </li>`;
    return;
  }

  const data = queue
    .map(item => {
      const {
        title = '',
        release_date = '',
        poster_path = '',
        genre_ids = [],
        first_air_date = '',
      } = item;

      const getGenreNames = getGenresNames(genre_ids);

      const movieData = {
        release_date: release_date || '',
        first_air_date: first_air_date || '',
      };

      let releaseYear = '';
      if (movieData.release_date) {
        releaseYear = movieData.release_date.slice(0, 4);
      } else if (movieData.first_air_date) {
        releaseYear = movieData.first_air_date.slice(0, 4);
      }

      return `
        <li class="film_card">
          <img class="film_poster" src="https://image.tmdb.org/t/p/original${poster_path}" width="50" height="50" alt="${title}">
          <p class="film_name">${title}</p>
          <p class="movie_genre">${getGenreNames} ${releaseYear}</p>
        </li>
      `;
    })
    .join('');
  

  refs.library.innerHTML = data;
}




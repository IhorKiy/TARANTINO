import { refs } from './refs';
import storage from './storage';
import { getGenresNames } from './getGenresNames';
import insertCardMarkup from './cardMarkup';
import Notiflix from 'notiflix';

// const watchedBtn = document.querySelector('.library__nav-btn--watched');
// const gallery = document.querySelector('.card__container--library');
// const watchedBtn = refs.watchedBtn;
// const gallery = refs.libraryContainer;
const movies = storage.loadFromWatched();

if (refs.watchedBtn) {
  refs.watchedBtn.addEventListener('click', showWatched);
}

function showWatched() {
  if (!movies || movies.length === 0) {
    Notiflix.Notify.failure('Oops, empty!');
  } else {
    refs.queueBtn.classList.remove('active');
    refs.watchedBtn.classList.add('active');
    const moviesArr = window.localStorage.getItem('wathedArr');
    let parsedMovies = JSON.parse(moviesArr);

    renderLibraryCards(parsedMovies, refs.libraryContainer);
  }
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

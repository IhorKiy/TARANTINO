import { refs } from './refs';
import storage from './storage';
import { getGenresNames } from './getGenresNames';
import insertCardMarkup from './cardMarkup';
import Notiflix from 'notiflix';

// const gallery = refs.libraryContainer;
const queue = storage.loadFromQueue() || [];

if (refs.queueBtn) {
  refs.queueBtn.addEventListener('click', showQueue);
}

export function showQueue() {
  if (!queue || !queue.length) {
    Notiflix.Notify.failure('Queue empty!');
    return;
  } else {
    refs.queueBtn.classList.add('active');
    refs.watchedBtn.classList.remove('active');
    // console.log(refs.queueBtn);
    // console.log(refs.libraryBtn);
    // insertCardMarkup(queue, gallery);
    const queuryArr = window.localStorage.getItem('queueArr');
    // console.log(queuryArr);
    let parsedMoviesQery = JSON.parse(queuryArr);

    if (parsedMoviesQery.length < 1) {
      refs.libraryContainer.innerHTML = '';
    }
    renderLibraryCards(parsedMoviesQery, refs.libraryContainer);
    // console.log();
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

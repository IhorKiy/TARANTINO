import { getGenresNames } from './getGenresNames';
import { refs } from './refs';
// const movieContainer = document.querySelector('.card__container');
const movieContainer = document.querySelector('.home__container');

const insertCardMarkup = (movies, container) => {
  const cardMarkup = movies
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

  container.innerHTML = cardMarkup;
};

export default insertCardMarkup;

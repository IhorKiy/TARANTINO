import { getGenresNames } from './getGenresNames';

const movieContainer = document.querySelector('.card__container');

const insertCardMarkup = movies => {
  const cardMarkup = movies
    .map(({ title, release_date, poster_path, genre_ids, first_air_date }) => {
      const getGenreNames = getGenresNames(genre_ids);

      const movieData = {
        release_date,
        first_air_date,
      };
      let releaseDate;
      if (movieData.release_date) {
        releaseDate = movieData.release_date;
      } else if (movieData.first_air_date) {
        releaseDate = movieData.first_air_date;
      }
      return `
    <li class=film_card>
    <div class=img__wrapper><img class=film_poster src=https://image.tmdb.org/t/p/original${poster_path} width= 50 height= 50 alt= ${title}/></div>
    <div class="film_info">
    <p class=film_name>${title}</p>
    <p class=film_genre>${getGenreNames} ${releaseDate.slice(0, 4)}</p>
            </div>
   
    </li>`;
    })
    .join('');

  movieContainer.innerHTML = cardMarkup;
};

export default insertCardMarkup;

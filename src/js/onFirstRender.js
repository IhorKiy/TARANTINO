import { apiMovie } from './serviseAPI';
import { getGenresNames } from './getGenresNames';

const movieContainer = document.querySelector('.card__container');
window.addEventListener('load', onLoad);

async function onLoad(e) {
  e.preventDefault();
  if (!window.localStorage.getItem('genres')) {
    try {
      const { genres } = await apiMovie.fetchGenres();

      const genresToSave = genres.reduce((acc, { id, name }) => {
        acc[id] = name;
        return acc;
      }, {});
      window.localStorage.setItem('genres', JSON.stringify(genresToSave));
    } catch (error) {}
  }
  try {
    const { results } = await apiMovie.fetchAllMovie();
    insertCardMarkup(results);
  } catch (error) {
    console.log(error);
  }
}

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
  <img class=film_poster src=https://image.tmdb.org/t/p/original${poster_path} width= 50 height= 50 alt= ${title}/>
  <p class=film_name>${title}</p>
  <p class=movie-gener>${getGenreNames}${releaseDate.slice(0, 4)}</p>
  </li>`;
    })
    .join('');

  movieContainer.innerHTML = cardMarkup;
};

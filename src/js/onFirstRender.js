import { apiMovie } from './serviseAPI';
import insertCardMarkup from './cardMarkup'

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
    const { results } = await apiMovie.fetchAllMovie(1);
    insertCardMarkup(results);
  } catch (error) {
    console.log(error);
  }
}
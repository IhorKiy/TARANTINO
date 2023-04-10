import { apiMovie } from './serviseAPI';
import insertCardMarkup from './cardMarkup';
import Loader from './loader';

const loader = new Loader();

window.addEventListener('load', onLoad);

async function onLoad(e) {
  e.preventDefault();
  loader.enable();
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
    console.log(results);
    insertCardMarkup(results);
  } catch (error) {
    console.log(error);
  }
  finally {
    loader.disable();
  }

}
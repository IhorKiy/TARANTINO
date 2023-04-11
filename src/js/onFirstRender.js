import { apiMovie } from './serviseAPI';
import insertCardMarkup from './cardMarkup'
import storage from './storage';

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
    const { page, results, total_pages } = await apiMovie.fetchAllMovie(1);
    storage.saveCurrentPage(results);
    storage.savePage(page);
    storage.saveTotalPages(total_pages);
    insertCardMarkup(results, movieContainer);
  } catch (error) {
    console.log(error);
  }
}
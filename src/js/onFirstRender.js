import { apiMovie } from './serviseAPI';
import insertCardMarkup from './cardMarkup';
import insertSliderMarkup from './sliderMarkup';
import storage from './storage';
import { refs } from "./refs";

const movieContainer = refs.cardContainer;

window.addEventListener('load', onLoad);

async function onLoad(e) {
  e.preventDefault();
  if (!storage.loadGenres()) {
  //if (!window.localStorage.getItem('genres')) {
    try {
      const { genres } = await apiMovie.fetchGenres();

      const genresToSave = genres.reduce((acc, { id, name }) => {
        acc[id] = name;
        return acc;
      }, {});
     // window.localStorage.setItem('genres', JSON.stringify(genresToSave));
      storage.saveGenres(genresToSave);
    } catch (error) {}
  }
  try {
    const { results } = await apiMovie.fetchAllMovie(1);
    
    insertSliderMarkup(results)
  } catch (error) {
    console.log(error);
  }
  try {
    const { page, results, total_pages } = await apiMovie.fetchAllMovie(2);
    storage.saveCurrentPage(results);
    storage.savePage(page);
    storage.saveTotalPages(total_pages);
    // insertSliderMarkup(results)
    insertCardMarkup(results, movieContainer);
  } catch (error) {
    console.log(error);
  }
}
ку
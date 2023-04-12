import { apiMovie } from './serviseAPI';
import insertCardMarkup from './cardMarkup';
import insertSliderMarkup from './sliderMarkup';
import storage from './storage';
import { refs } from './refs';
import Paginator from './paginator';
import Loader from './loader';

const paginator = new Paginator();

const loader = new Loader();

paginator.pagination.addEventListener('click', onClickPagination);

export function onClickPagination(e) {
  paginator.getNumber(e);
  loader.enable();
  render(paginator.currentPage);
}

async function render(page) {
  const { results } = await apiMovie.fetchAllMovie(page);
  insertCardMarkup(results, movieContainer);
  loader.disable();
}

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
    const { results } = await apiMovie.fetchAllMovie(paginator.currentPage + 1);

    insertSliderMarkup(results);
  } catch (error) {
    console.log(error);
  }
  try {
    const { page, results, total_pages } = await apiMovie.fetchAllMovie(
      paginator.currentPage
    );
    storage.saveCurrentPage(results);
    storage.savePage(page);
    storage.saveTotalPages(total_pages);
    paginator.totalPages = total_pages - 1;
    // insertSliderMarkup(results)
    insertCardMarkup(results, movieContainer);
    paginator.makeMarkup();
  } catch (error) {
    console.log(error);
  }
}

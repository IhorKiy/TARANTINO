import { apiMovie } from './serviseAPI';
import insertCardMarkup from './cardMarkup'
import storage from './storage';
import { movieContainer } from './cardMarkup';
import Paginator from './paginator';

const a = new Paginator();


window.addEventListener('load', onLoad);
a.pagination.addEventListener('click', e => {
  console.log(e);
  a.getNumber(e);
  console.log(a);

})

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
    const { page, results, total_pages } = await apiMovie.fetchAllMovie(a.currentPage);
    storage.saveCurrentPage(results);
    storage.savePage(page);
    storage.saveTotalPages(total_pages);
    a.totalPages = total_pages;
    // a.totalPages
    a.makeMarkup();
    a.getNumber(a.pagination);
    console.log(a);
    insertCardMarkup(results, movieContainer);
  } catch (error) {
    console.log(error);
  }
}
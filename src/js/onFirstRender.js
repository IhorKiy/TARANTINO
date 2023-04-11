import { apiMovie } from './serviseAPI';
import insertCardMarkup from './cardMarkup'
import storage from './storage';
import { movieContainer } from './cardMarkup';
import Paginator from './paginator';

const a = new Paginator();


window.addEventListener('load', onLoad);

const searchForm = document.querySelector('.header__form');
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  a.refresh();
});

a.pagination.addEventListener('click', e => {
   
  const nextPage = a.getNumber(e);
  if (nextPage) {
 
    async function secondLoad(pages) {
      const { page, results, total_pages } = await apiMovie.fetchAllMovie(pages);
      insertCardMarkup(results, movieContainer);
    }

    secondLoad(nextPage);
  }
  

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
    // storage.saveCurrentPage(results);
    // storage.savePage(page);
    // storage.saveTotalPages(total_pages);
    a.totalPages = total_pages;
    insertCardMarkup(results, movieContainer);
    a.makeMarkup();
    
  } catch (error) {
    console.log(error);
  }
}
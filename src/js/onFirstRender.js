export let LANG = "en-EN";

import { apiMovie } from './serviseAPI';
import insertCardMarkup from './cardMarkup';
import insertSliderMarkup from './sliderMarkup';
import storage from './storage';
import { refs } from './refs';
import Paginator from './paginator';
import Loader from './loader';
import { getGenresNames } from './getGenresNames';

const paginator = new Paginator();

const loader = new Loader();

if (paginator.pagination) {
  paginator.pagination.addEventListener('click', onClickPagination);
}
export function onClickPagination(e) {
  paginator.getNumber(e);
  loader.enable();
  render(paginator.currentPage);
}

async function render(page) {
  const { results } = await apiMovie.fetchAllMovie(page);
  storage.saveCurrentPage(results);
  insertCardMarkup(results, movieContainer);
  loader.disable();
}

const movieContainer = refs.cardContainer;

window.addEventListener('load', onLoad);
 
//********вибір мови
if (refs.switch) {
  refs.switch.addEventListener("click", onChecked);
}
function  onChecked(e) {
  let element = e.currentTarget;
  if (element.checked) {
    LANG = "ru-RU";
   
  }
  else LANG = "en-EN";
  console.log("LANG from onFirstRender ",LANG);
  
}
//************************* */
async function onLoad(e) {
  e.preventDefault();
   if (refs.libraryBtn.classList.contains('current')) {
    const getLibraryData = localStorage.getItem('queueArr');
    const getLibraryDataParse = JSON.parse(getLibraryData);

    const cardMarkup = getLibraryDataParse
      .map(
        ({
          id,
          title,
          release_date,
          poster_path,
          genre_ids,
          first_air_date,
        }) => {
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
    const LibaCont = document.querySelector('.library__container');
    LibaCont.innerHTML = cardMarkup;
    return;
  }
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
    const { results } = await apiMovie.fetchMovieWeek(1);

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
    paginator.totalPages = total_pages;
    if (!localStorage.getItem('wathedArr')) {
      localStorage.setItem('wathedArr', JSON.stringify([]));
    }
    if (!localStorage.getItem('queueArr')) {
      localStorage.setItem('queueArr', JSON.stringify([]));
    }
    // insertSliderMarkup(results)

    insertCardMarkup(results, movieContainer);
    paginator.makeMarkup();
  } catch (error) {
    console.log(error);
  }
}

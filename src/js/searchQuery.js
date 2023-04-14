import { apiMovie } from './serviseAPI';
import insertCardMarkup from './cardMarkup';
import storage from './storage';
import { Notify } from 'notiflix';
import Loader from './loader';
import Paginator from './paginator';

const loader = new Loader();
let userValue = '';
const form = document.querySelector('.header__form');
const input = form.querySelector(`input`);
const list = document.querySelector(`.home__container`);
const slider = document.querySelector(`.top-slider__section`);
const paginatorQuery = new Paginator();

form.addEventListener(`submit`, onSearch);

function getQueryData(e) {
  console.log('here');
  
  let nowPage = paginatorQuery.getNumber(e);
  if (nowPage) {
    async function fetchByQueryFropmPag(value, page) {
      try {
        const res = await apiMovie.searchMovieByQuery(value, page);
        console.log(page);

        if (res.results.length === 0) {
          loader.disable();
          return Notify.failure(`Sorry, no movies were found for your search.`);
        }
        storage.saveCurrentPage(res.results);
        storage.savePage(page);
        insertCardMarkup(res.results, list);
        ifPosterOfMovieIsNotFound();

        loader.disable();
        paginatorQuery.makeMarkup();
      } catch (error) {
        console.log(error);
      }
    }

    fetchByQueryFropmPag(userValue, paginatorQuery.currentPage);
  }
}

function onSearch(e) {
  e.preventDefault();

  userValue = e.currentTarget.elements.searchQuery.value.trim();

  if (userValue === '') {
    return Notify.info(`The input field cannot be empty!`);
    return;
  }

  loader.enable();

  fetchByQuery(userValue, 1);

  paginatorQuery.pagination.addEventListener('click', getQueryData);

  input.addEventListener('change', e => {
    console.log(e.target.value);
    if (e.target.value !== '') {
      return;
    }
    window.location.href = './index.html';
  });
}

async function fetchByQuery(value, page) {
  try {
    const res = await apiMovie.searchMovieByQuery(value, page);

    if (res.results.length === 0) {
      loader.disable();
      return Notify.failure(`Sorry, no movies were found for your search.`);
    }

    paginatorQuery.totalPages = res.total_pages;
    storage.saveCurrentPage(res.results);
    storage.savePage(page);

    slider.style.display = `none`;

    insertCardMarkup(res.results, list);
    ifPosterOfMovieIsNotFound();

    loader.disable();
    paginatorQuery.pagination.innerHTML = '';

    paginatorQuery.makeMarkup();
  } catch (error) {
    
  }
}

// if poster of film is not found
function ifPosterOfMovieIsNotFound() {
  const filmPostersNodeList = document.querySelectorAll(`.film_poster`);
  const massiveOfFilmPosters = Array.from(filmPostersNodeList);
  massiveOfFilmPosters.map(e => {
    if (e.src === `https://image.tmdb.org/t/p/originalnull`) {
      e.src = `https://img.freepik.com/premium-vector/movie-neon-sign-bright-signboard-light-banner-movie-time-logo-neon-emblem-vector-illustration_191108-314.jpg?w=2000`;
    }
  });
}


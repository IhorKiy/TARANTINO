import ApiMovie, { apiMovie } from "./serviseAPI";
import insertCardMarkup from './cardMarkup';
import { Notify } from "notiflix";
import Loader from "./loader";

const loader = new Loader()

const form = document.querySelector('.header__form')
const input = form.querySelector(`input`)
const list = document.querySelector(`.card__container`)
const slider = document.querySelector(`.top-slider__section`)


form.addEventListener(`submit`, onSearch) 

function onSearch(e) {
  e.preventDefault()

  const value = e.currentTarget.elements.searchQuery.value.trim()
  apiMovie.query = value

  if(input.value === '') {
    return Notify.info(`The input field cannot be empty!`)
  }

  loader.enable()
  fetchMovie()
}

function fetchMovie(e) {
  apiMovie.searchMovieByQuery().then(data => {
  
    if(data.results.length === 0) {
      loader.disable()
      return Notify.failure(`Sorry, no movies were found for your search.`)
    }

    slider.style.display = `none`
    insertCardMarkup(data.results, list)
    ifPosterOfMovieIsNotFound()
    loader.disable()
  })
}


// if poster of film is not found
function ifPosterOfMovieIsNotFound() {
  const filmPostersNodeList = document.querySelectorAll(`.film_poster`)
    const massiveOfFilmPosters = Array.from(filmPostersNodeList)
    massiveOfFilmPosters.map(e => {
      if(e.src === `https://image.tmdb.org/t/p/originalnull`) {
        e.src = `https://img.freepik.com/premium-vector/movie-neon-sign-bright-signboard-light-banner-movie-time-logo-neon-emblem-vector-illustration_191108-314.jpg?w=2000`
      }
    })
}
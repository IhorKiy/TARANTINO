import ApiMovie, { apiMovie } from "./serviseAPI";
import { getGenresNames } from './getGenresNames';
import insertCardMarkup from './cardMarkup'
import storage from './storage';


const form = document.querySelector('.header__form')
const input = form.querySelector(`input`)
const list = document.querySelector(`.card__container`)

form.addEventListener(`submit`, onSearch) 

function onSearch(e) {
  e.preventDefault()

  apiMovie.query = e.currentTarget.elements.searchQuery.value.trim()

  if(input.value === '') {
    return alert(`error`)
  }

  fetchMovie()
}


function fetchMovie(e) {
  apiMovie.searchMovieByQuery().then(data => {
    console.log(data)

    insertCardMarkup(data.results, list)
  })
}

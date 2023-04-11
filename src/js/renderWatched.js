import { refs } from "./refs";
import storage from './storage';
import { getGenresNames } from './getGenresNames';
import { insertCardMarkup } from './cardMarkup';
import Notiflix from 'notiflix';


// const watchedBtn = document.querySelector('.library__nav-btn--watched');
// const gallery = document.querySelector('.card__container--library'); 
const watchedBtn = refs.watchedBtn;
const gallery = refs.libraryContainer;
const movies = storage.loadFromWatched();

watchedBtn.addEventListener('click', showWatched);

function showWatched() {
    if (!storage.loadFromWatched()) {
        Notiflix.Notify.failure('Oops, empty!');
    }
    else {
        insertCardMarkup(movies, gallery);
        }
    }
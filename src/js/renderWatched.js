import storage from './storage';
import { getGenresNames } from './getGenresNames';
const watchedBtn = document.querySelector('.library__nav-btn--watched');
const gallery = document.querySelector('.card__container--library'); 

watchedBtn.addEventListener('click', showWatched);

function showWatched() {
    if (!storage.loadFromWatched()) {
        console.log('oops, empty!');
    }
    else {
        const renderCard = storage.loadFromWatched().map(({ title, release_date, poster_path, genre_ids }) => { 
        const getGenreNames = getGenresNames(genre_ids);


            return ` <li class="film__card">
          <img src="https://image.tmdb.org/t/p/original${poster_path}" alt=${title} class="film_poster">
            <div class="film_info">
               <p class="film_name">${title}</p>         
               <p class="film_gener">${getGenreNames}|${release_date.slice(0, 4)}</p>      
            </div>
         </li>`

        }).join('');
        gallery.innerHTML = renderCard;
        }
    }
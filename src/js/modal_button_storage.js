import {movieData } from "./modalMovie";
import storage from "./storage";
import { refs } from "./refs";
import Notiflix from 'notiflix';

//чарівні рядки)
const addWatched = "ADD TO WATCHED";
const removeWatched = "REMOVE FROM WATCHED";
const addQueue = "ADD TO QUEUE";
const removeQueue = "REMOVE FROM QUEUE";


const movie = movieData;
console.log("movie from movieData", movie);
console.log("refs.addToWatchedBtn ", refs.addToWatchedBtn);
console.log("refs.addToQueueBtn ", refs.addToQueueBtn );
//************************************* */

//перевіряє чи Є цей movie в сховищі WATCHED і дає кнопці відповіний напис
export function isWatched(movie,btn){
    const movies = storage.load(WATCHED_KEY) ||  [];
    if (!movies.includes(movie)) {
        btn.textContent = addWatched;
        return true;
    }
    else btn.textContent = removeWatched; 
    return false;
}
//перевіряє чи Є цей movie в сховищі QUEUE і дає кнопці відповіний напис?
export function isQueue(movie,btn) {
    const movies = storage.load(QUEUE_KEY) ||  [];
    if (!movies.includes(movie)) {
        btn.textContent = addQueue; //чи додавати відповідний клас?
        return true;
    }
    else btn.textContent = removeQueue; //чи додавати відповідний клас?
    return false;
}
export { isWatched, isQueue };
//при відкритті модалки перевіряємо чи movie Є в сховищі по
//по ключах в масивах WATCHED/QUEUE і даємо відповідний напис на кнопках
//ВИКЛИКАЮТЬСЯ В modalMovie Костею
// isWatched(movie, refs.addToWatchedBtn);
// isQueue(movie, refs.addToQueueBtn);
//в залежності що написано на кнопках => різні функції fWatched, fQueue на лісенери
let fWatched, fQueue;

if (refs.btnWatched.textContent === addWatched) {
    fWatched = addToWatched; //тіло функціїї
} else {
    fWatched = removeFromWatched; //тіло функціїї
}
if (refs.btnQueue.textContent === addQueue) {
    fQueue = addToQueue;//тіло функціїї
} else {
    fQueue = removeFromQueue;//тіло функціїї
}
//вішаємо лісенери на кнопки і функціі для них
refs.addToWatchedBtn.addEventListener("click", fWatched);

refs.addToQueueBtn.addEventListener("click", fQueue);   

//при натисненні ADD TO WATCHED додаємо movie в localStorage якщо там його нема
function addToWatched(movie,btn) { //btn це ref на кнопку в модалці  WATChED
    const movies = storage.load(WATCHED_KEY) ||  [];
    if (!movies.includes(movie) && btn.textContent === addWatched) { //
        movies.push(movie);
        storage.save(WATCHED_KEY, movies);
        if (isWatched(movie, refs.addToWatchedBtn)) Notiflix.Notify.info(`${movie.title} has been added to WATCHED `);
    } else Notiflix.Notify.failure(`Ooops! ${movie.title} is in WATCHED yet`);
}

//при натисненні REMOVE FROM WATCHED видаляємо з localStorage якщо він там  є
function removeFromWatched (movie,btn){ //btn це ref на кнопку в модалці  WATChED
    const movies = storage.load(WATCHED_KEY) ||  [];
    if (movies.includes(movie) && btn.textContent === removeWatched) {
        movies = movies.filter(({ id }) => id !== movie.id)
        storage.save(WATCHED_KEY, movies);
        if (!isWatched(movie, refs.addToWatchedBtn)) Notiflix.Notify.info(`${movie.title} has been removed from WATCHED `);
    } else Notiflix.Notify.failure('`Ooops! ${movie.title} is still in WATCHED ');
}

//при натисненні ADD TO QUEUE додаємо в localStorage якщо там його нема
function addToQueue(movie,btn) { //btn це ref на кнопку в модалці   QUEUE 
    const movies = storage.load(QUEUE_KEY) ||  [];
    if (!movies.includes(movie) && btn.textContent === addQueue) {
        movies.push(movie);
        storage.save(QUEUE_KEY, movies);
         if (isQueue(movie, refs.addToQueueBtn)) Notiflix.Notify.info(`${movie.title} has been added to QUEUE `);
    } else Notiflix.Notify.failure(`Ooops! ${movie.title} is in QUEUE yet`);
}

//при натисненні REMOVE FROM QUEUE видаляємо з localStorage якщо він там  є перевіряєемо textContent кнопки чи там REMOVE FROM QUEUE
function removeFromQueue (movie,btn){ //btn це ref на кнопку в модалці  QUEUE
    const movies = storage.load(QUEUE_KEY) ||  [];
    if (movies.includes(movie) &&  btn.textContent === removeQueue) {
        movies = movies.filter(({ id }) => id !== movie.id)
        storage.save(QUEUE_KEY, movies);
         if (!isQueue(movie, refs.addToQueueBtn)) Notiflix.Notify.info(`${movie.title} has been removed from QUEUE `);
    } else Notiflix.Notify.failure('`Ooops! ${movie.title} is still in QUEUE ');
}
//чи щось потрібно пеерендирити при закритті модалки ???
//при закритті модалки чи потрібно знімати лісенери?
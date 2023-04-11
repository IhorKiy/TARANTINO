//import  movie чекаю  від Кості
//import { refs, movie } from "./modal-movie";
import storage from "./storage";
import {addToWatchedBtn,addToQueueBtn} from "./refs";
//addToWatchedBtn
//чарівні рядки)
const addWatched = "ADD TO WATCHED";
const removeWatched = "REMOVE FROM WATCHED";
const addQueue = "ADD TO QUEUE";
const removeQueue = "REMOVE FROM QUEUE";

//****тимчасово поки нема звідки export refs на кнопки */
const refs={
    addToWatchedBtn: "",
    addToQueueBtn: "",
}
const movie = {};
//************************************* */

//перевіряє чи Є цей movie в сховищі WATCHED і дає кнопці відповіний напис
function isWatched(movie,btn){
    const movies = storage.load(WATCHED_KEY);
    if (!movies.includes(movie)) {
         btn.textContent = addWatched;  //чи додавати відповідний клас
    }
     else btn.textContent = removeWatched; //чи додавати відповідний клас?
}
//перевіряє чи Є цей movie в сховищі QUEUE і дає кнопці відповіний напис?
function isQueue(movie,btn) {
    const movies = storage.load(QUEUE_KEY);
    if (!movies.includes(movie)) {
         btn.textContent = addQueue; //чи додавати відповідний клас?
    }
     else btn.textContent = removeQueue; //чи додавати відповідний клас?
}
//при відкритті модалки перевіряємо чи movie Є в сховищі по 
//по ключах в масивах WATCHED/QUEUE і даємо відповідний напис на кнопках
isWatched(movie, addToWatchedBtn);
isQueue(movie, addToQueueBtn);
//в залежності що написано на кнопках => різні функції fWatched, fQueue на лісенери
let fWatched, fQueue;

if (refs.btnWatched.textContent === addWatched) {
    fWatched = addToWatched;
} else {
    fWatched = removeFromWatched;
}
if (refs.btnQueue.textContent === addQueue) {
    fQueue = addToQueue;
} else {
    fQueue = removeFromQueue;
}
//вішаємо лісенери на кнопки і функціі для них
addToWatchedBtn.addEventListener("click", fWatched);
addToQueueBtn.addEventListener("click", fQueue);   

//при натисненні ADD TO WATCHED додаємо movie в localStorage якщо там його нема
function addToWatched(movie,btn) { //btn це ref на кнопку в модалці  WATChED
    const movies = storage.load(WATCHED_KEY);
    if (!movies.includes(movie) && btn.textContent === addWatched) { //
        movies.push(movie);
        storage.save(WATCHED_KEY, movies);
        btn.textContent = removeWatched;
    } else console.log('Цей фільм вже є в watched або кнопка НЕ ADD!');
}

//при натисненні REMOVE FROM WATCHED видаляємо з localStorage якщо він там  є
function removeFromWatched (movie,btn){ //btn це ref на кнопку в модалці  WATChED
    const movies = storage.load(WATCHED_KEY);
    if (movies.includes(movie) && btn.textContent === removeWatched) {
        movies = movies.filter(({ id }) => id !== movie.id)
        storage.save(WATCHED_KEY, movies);
         btn.textContent = addWatched;
    } else console.log('Цього фільма нема в watched або кнопка НЕ REMOVE!');
}

//при натисненні ADD TO QUEUE додаємо в localStorage якщо там його нема
function addToQueue(movie,btn) { //btn це ref на кнопку в модалці   QUEUE 
    const movies = storage.load(QUEUE_KEY);
    if (!movies.includes(movie) && btn.textContent === addQueue) {
        movies.push(movie);
        storage.save(QUEUE_KEY, movies);
         btn.textContent = removeQueue;
    } else console.log('Цей фільм вже є в queue або кнопка НЕ  ADD!');
}

//при натисненні REMOVE FROM QUEUE видаляємо з localStorage якщо він там  є перевіряєемо textContent кнопки чи там REMOVE FROM QUEUE
function removeFromQueue (movie,btn){ //btn це ref на кнопку в модалці  QUEUE
    const movies = storage.load(QUEUE_KEY);
    if (movies.includes(movie) &&  btn.textContent === removeQueue) {
        movies = movies.filter(({ id }) => id !== movie.id)
        storage.save(QUEUE_KEY, movies);
         btn.textContent = addQueue;
    } else console.log('Цього фільма нема в queue або кнопка НЕ REMOVE!');
}
//чи щось потрібно пеерендирити при закритті модалки ???
//при закритті модалки чи потрібно знімати лісенери?
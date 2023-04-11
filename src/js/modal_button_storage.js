//import  movie чекаю  від Кості
//import  movie  from "./modal-movie";
import  storage  from "./storage";
import {refs} from "./refs";
//import { movieData } from './modalMovie';
//чарівні рядки)
const addWatched = "ADD TO WATCHED";
const removeWatched = "REMOVE FROM WATCHED";
const addQueue = "ADD TO QUEUE";
const removeQueue = "REMOVE FROM QUEUE";

//const movie = movieData;
//************************************* */
//console.log(refs.addToWatchedBtn);
//перевіряє чи Є цей КЛІКНУТИЙ movie в сховищі WATCHED і дає кнопці відповіний напис
export function isWatched(movie,btn){
    const movies = storage.loadFromWatched();
    if (!movies.includes(movie)) {
        //console.log("btn ",btn);
         btn.textContent = addWatched;  //чи додавати відповідний клас
    }
    else btn.textContent = removeWatched; //чи додавати відповідний клас?
   
}
//перевіряє чи Є цей КЛІКНУТИЙ movie в сховищі QUEUE і дає кнопці відповіний напис?
export function isQueue(movie,btn) {
    const movies = storage.loadFromQueue();
    if (!movies.includes(movie)) {
         btn.textContent = addQueue; 
    }
    else btn.textContent = removeQueue; 
    
}
//при відкритті модалки перевіряють чи movie Є/НЕМА в сховищі по по ключах WATCHED/QUEUE
// і додають відповідний напис на кнопках
// isWatched(movie, refs.addToWatchedBtn); // віддала Кості викликати при відкритті модалки 
// isQueue(movie, refs.addToQueueBtn);     //віддала Кості викликати при відкритті модалки

//в залежності що написано на кнопках => різні функції fWatched, fQueue на лісенери
let fWatched, fQueue;
console.log(refs.btnWatched);
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
refs.addToWatchedBtn.addEventListener("click", fWatched);
refs.addToQueueBtn.addEventListener("click", fQueue);   

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
        movies = movies.filter(({ id }) => id !== movie.id);
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

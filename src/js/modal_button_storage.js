import { refs, movie } from "./modal-movie";
import storage from "./storage";
//чарівні рядки)
const addWatched = "ADD TO WATCHED";
const removeWatched = "REMOVE FROM WATCHED";
const addQueue = "ADD TO QUEUE";
const removeQueue = "REMOVE FROM QUEUE";

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
//при відкритті модалки перевіряємо чи movie Є в сховищі
// в масивах WATCHED/QUEUE і даємо відповідний напис на кнопках
isWatched(movie, refs.btnWatched);
isQueue(movie, refs.btnQueue);
//в залежності що написано на кнопках => різні функції на лісенери
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
refs.btnWatched.addEventListener("click", fWatched);
refs.btnQueue.addEventListener("click", fQueue);   

//const посилання на кнопку = document.querySelector("click", addToWatched)
//при натисненні ADD TO WATCHED додаємо movie в localStorage якщо там його нема
function addToWatched(movie,btn) { //btn це ref на кнопку в модалці фільма,  фільма,яка відповідає за його ознаку WATChED
    const movies = storage.load(WATCHED_KEY);
    if (!movies.includes(movie) && btn.textContent === addWatched) { //
        movies.push(movie);
        storage.save(WATCHED_KEY, movies);
        btn.textContent = removeWatched;
    } else console.log('Цей фільм вже є в watched або кнопка НЕ ADD!');
}
//const посилання на кнопку = document.querySelector("click", removeFromWatched) це посилання на addToWatched але перевіряєемо textContent кнопки чи там REMOVE FROM WATCHED
//при натисненні REMOVE FROM WATCHED видаляємо з localStorage якщо він там  є
function removeFromWatched (movie,btn){ //btn це ref на кнопку в модалці  фільма,яка відповідає за його ознаку WATChED
    const movies = storage.load(WATCHED_KEY);
    if (movies.includes(movie) && btn.textContent === removeWatched) {
        movies = movies.filter(({ id }) => id !== movie.id)
        storage.save(WATCHED_KEY, movies);
         btn.textContent = addWatched;
    } else console.log('Цього фільма нема в watched або кнопка НЕ REMOVE!');
}

//const посилання на кнопку = document.querySelector("click", addToQueue)
//при натисненні ADD TO QUEUE додаємо в localStorage якщо там його нема
function addToQueue(movie,btn) { //btn це ref на кнопку в модалці  фільма,яка відповідає за його ознаку QUEUE 
    const movies = storage.load(QUEUE_KEY);
    if (!movies.includes(movie) && btn.textContent === addQueue) {
        movies.push(movie);
        storage.save(QUEUE_KEY, movies);
         btn.textContent = removeQueue;
    } else console.log('Цей фільм вже є в queue або кнопка НЕ  ADD!');
}
//const посилання на кнопку = document.querySelector("click", removeFromQueue) то саме що ADD TO QUEUE
//при натисненні REMOVE FROM QUEUE видаляємо з localStorage якщо він там  є перевіряєемо textContent кнопки чи там REMOVE FROM QUEUE
function removeFromQueue (movie,btn){ //btn це ref на кнопку в модалці фільма, яка відповідає за його ознаку QUEUE
    const movies = storage.load(QUEUE_KEY);
    if (movies.includes(movie) &&  btn.textContent === removeQueue) {
        movies = movies.filter(({ id }) => id !== movie.id)
        storage.save(QUEUE_KEY, movies);
         btn.textContent = addQueue;
    } else console.log('Цього фільма нема в queue або кнопка НЕ REMOVE!');
}
//чи щось потрібно пеерендирити при закритті модалки ???
//при закритті модалки чи потрібно знімати лісенери?
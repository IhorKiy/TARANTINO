import { refs, movie } from "./modal-movie";
import storage from "./storage";
const addWatched = "ADD TO WATCHED";
const removeWatched = "REMOVE FROM WATCHED";
const addQueue = "ADD TO QUEUE";
const removeQueue = "REMOVE FROM QUEUE";

function isWatched(movie,btn){
    const movies = storage.load(WATCHED_KEY);
    if (!movies.includes(movie)) {
         btn.textContent = addWatched;  //чи додавати відповідний клас
    }
     else btn.textContent = removeWatched; //чи додавати відповідний клас
}
//перевіряємо чи є в списку QUEUE міняємо напис на кнопці
function isQueue(movie,btn) {
    const movies = storage.load(QUEUE_KEY);
    if (!movies.includes(movie)) {
         btn.textContent = addQueue; //чи додавати відповідний клас
    }
     else btn.textContent = removeQueue; //чи додавати відповідний клас
}
//при відкритті модалки перевіряємо чи movie є в сховищі
//перевіряємо чи є в масивах WATCHED/QUEUE міняємо напис на кнопках
isWatched(movie, refs.btnWatched);
isQueue(movie, refs.btnQueue);
//в залежності що написано на кнопках то різні функції на лісенери
let fWatched, fQueue;

if (refs.btnWatched.textContent === addWatched) {
    fWatched = storage.addToWatched;
} else { fWatched = storage.removeFromWatched; }
if (refs.btnQueue.textContent === addQueue) {
    fQueue = storage.addToQueue;
} else {
    fQueue = storage.removeFromQueue;
}
//вішаємо лісенери на кнопки і функціі для них
refs.btnWatched.addEventListener("click", fWatched);
refs.btnQueue.addEventListener("click", fQueue);   
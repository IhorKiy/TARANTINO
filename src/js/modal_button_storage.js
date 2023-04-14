// import { movieData } from './modalMovie';
import storage from './storage';
import { refs } from './refs';
import saveDataMovie from './modalMovie';

//чарівні рядки)
const addWatched = 'ADD TO WATCHED';
const removeWatched = 'REMOVE FROM WATCHED';
const addQueue = 'ADD TO QUEUE';
const removeQueue = 'REMOVE FROM QUEUE';

const movie = saveDataMovie;

// console.log('movie from movieData', movie);
// console.log('refs.addToWatchedBtn ', refs.addToWatchedBtn);
// console.log('refs.addToQueueBtn ', refs.addToQueueBtn);
//************************************* */
// const movies = window.localStorage.getItem('current');
// const parsedMovies = JSON.parse(movies);
// console.log(parsedMovies);

// const savedSettings = localStorage.getItem('settings');
// const parsedSettings = JSON.parse(savedSettings);
// console.log(parsedSettings);
//перевіряє чи Є цей movie в сховищі WATCHED і дає кнопці відповіний напис
export function isWatched(movie, event) {
  // const movies = storage.loadFromWatched();
  const movies = window.localStorage.getItem('current');
  const parsedMovies = JSON.parse(movies);
  console.log(parsedMovies);

  if (parsedMovies.findIndex(film => film.id === movie.id)) {
    event.target.textContent = removeWatched;
  } else event.target.textContent = removeWatched;
  //   console.log(movies);
  //   movies.findIndex(movie => console.log(movie));
  console.log('знайшли муві', event.target.textContent);
}
//перевіряє чи Є цей movie в сховищі QUEUE і дає кнопці відповіний напис?
export function isQueue(movie, event) {
  const movies = window.localStorage.getItem('current');
  const parsedMovies = JSON.parse(movies);
  // const movies = storage.loadFromQueue();
  // console.log(movies);
  if (parsedMovies.findIndex(film => film.id === movie.id)) {
    event.target.textContent = addQueue; //чи додавати відповідний клас?
  } else event.target.textContent = removeQueue;
  console.log('знайшли муві', event.target.textContent); //чи додавати відповідний клас?
}
//при відкритті модалки перевіряємо чи movie Є в сховищі по
//по ключах в масивах WATCHED/QUEUE і даємо відповідний напис на кнопках
//ВИКЛИКАЮТЬСЯ В modalMovie Костею
// isWatched(movie, refs.addToWatchedBtn);
// isQueue(movie, refs.addToQueueBtn);
//в залежності що написано на кнопках => різні функції fWatched, fQueue на лісенери

// export let fWatched, fQueue;

// if (refs.addToWatchedBtn) {
//   if (refs.addToWatchedBtn.textContent === addWatched) {
//     console.log(refs.addToWatchedBtn.textContent);
//     fWatched = addToWatched;
//   } else {
//     fWatched = removeFromWatched;
//   }
// }
// if (refs.addToQueueBtn) {
//   if (refs.addToQueueBtn.textContent === addQueue) {
//     fQueue = addToQueue;
//   } else {
//     fQueue = removeFromQueue;
//   }
// }

//вішаємо лісенери на кнопки і функціі для них
// if (refs.addToWatchedBtn) {
//   refs.addToWatchedBtn.addEventListener('click', fWatched);
// }
// if (refs.addToQueueBtn) {
//   refs.addToQueueBtn.addEventListener('click', fQueue);
// }

//при натисненні ADD TO WATCHED додаємо movie в localStorage якщо там його нема
export function addToWatched(movie, event) {
  //btn це ref на кнопку в модалці  WATChED
  const movies = storage.load(WATCHED_KEY);
  if (
    movies.some(film => film.id === movie.id) &&
    event.target.textContent === addWatched
  ) {
    //
    movies.push(movie);
    storage.save(WATCHED_KEY, movies);
    event.target.textContent = removeWatched;
  } else console.log('Цей фільм вже є в watched або кнопка НЕ ADD!');
}

//при натисненні REMOVE FROM WATCHED видаляємо з localStorage якщо він там  є
export function removeFromWatched(movie, btn) {
  //btn це ref на кнопку в модалці  WATChED
  const movies = storage.load(WATCHED_KEY);
  if (movies.includes(movie) && btn.textContent === removeWatched) {
    movies = movies.filter(({ id }) => id !== movie.id);
    storage.save(WATCHED_KEY, movies);
    btn.textContent = addWatched;
  } else console.log('Цього фільма нема в watched або кнопка НЕ REMOVE!');
}

//при натисненні ADD TO QUEUE додаємо в localStorage якщо там його нема
function addToQueue(movie, btn) {
  //btn це ref на кнопку в модалці   QUEUE
  const movies = storage.load(QUEUE_KEY);
  if (!movies.includes(movie) && btn.textContent === addQueue) {
    movies.push(movie);
    storage.save(QUEUE_KEY, movies);
    btn.textContent = removeQueue;
  } else console.log('Цей фільм вже є в queue або кнопка НЕ  ADD!');
}

//при натисненні REMOVE FROM QUEUE видаляємо з localStorage якщо він там  є перевіряєемо textContent кнопки чи там REMOVE FROM QUEUE
function removeFromQueue(movie, btn) {
  //btn це ref на кнопку в модалці  QUEUE
  const movies = storage.load(QUEUE_KEY);
  if (movies.includes(movie) && btn.textContent === removeQueue) {
    movies = movies.filter(({ id }) => id !== movie.id);
    storage.save(QUEUE_KEY, movies);
    btn.textContent = addQueue;
  } else console.log('Цього фільма нема в queue або кнопка НЕ REMOVE!');
}
//чи щось потрібно пеерендирити при закритті модалки ???
//при закритті модалки чи потрібно знімати лісенери?
// =============
// // import { movieData } from './modalMovie';
// import storage from './storage';
// import { refs } from './refs';
// import saveDataMovie from './modalMovie';

// //чарівні рядки)
// const addWatched = 'ADD TO WATCHED';
// const removeWatched = 'REMOVE FROM WATCHED';
// const addQueue = 'ADD TO QUEUE';
// const removeQueue = 'REMOVE FROM QUEUE';

// const movie = saveDataMovie;

// // console.log('movie from movieData', movie);
// // console.log('refs.addToWatchedBtn ', refs.addToWatchedBtn);
// // console.log('refs.addToQueueBtn ', refs.addToQueueBtn);
// //************************************* */
// // const movies = window.localStorage.getItem('current');
// // const parsedMovies = JSON.parse(movies);
// // console.log(parsedMovies);

// // const savedSettings = localStorage.getItem('settings');
// // const parsedSettings = JSON.parse(savedSettings);
// // console.log(parsedSettings);
// //перевіряє чи Є цей movie в сховищі WATCHED і дає кнопці відповіний напис
// export function isWatched(movie, event) {
//   // const movies = storage.loadFromWatched();
//   const movies = window.localStorage.getItem('current');
//   const parsedMovies = JSON.parse(movies);
//   console.log(parsedMovies);
//   //   if (!movies.includes(movie)) {
//   //     btn.textContent = addWatched;
//   //   } else btn.textContent = removeWatched;

//   if (movies.map(film => console.log(film))) {
//     event.target.textContent = addWatched;
//   } else event.target.textContent = removeWatched;
//   //   console.log(movies);
//   //   movies.findIndex(movie => console.log(movie));
//   console.log('знайшли муві', event.target.textContent);
// }
// //перевіряє чи Є цей movie в сховищі QUEUE і дає кнопці відповіний напис?
// export function isQueue(movie, event) {
//   const movies = storage.loadFromQueue();
//   console.log(movies);
//   if (movies.findIndex(movie => movie.id === movie.id) < 0) {
//     event.target.textContent = addQueue; //чи додавати відповідний клас?
//   } else event.target.textContent = removeQueue; //чи додавати відповідний клас?
// }
// //при відкритті модалки перевіряємо чи movie Є в сховищі по
// //по ключах в масивах WATCHED/QUEUE і даємо відповідний напис на кнопках
// //ВИКЛИКАЮТЬСЯ В modalMovie Костею
// // isWatched(movie, refs.addToWatchedBtn);
// // isQueue(movie, refs.addToQueueBtn);
// //в залежності що написано на кнопках => різні функції fWatched, fQueue на лісенери
// export let fWatched, fQueue;

// if (refs.addToWatchedBtn) {
//   if (refs.addToWatchedBtn.textContent === addWatched) {
//     fWatched = addToWatched;
//   } else {
//     fWatched = removeFromWatched;
//   }
// }
// if (refs.addToQueueBtn) {
//   if (refs.addToQueueBtn.textContent === addQueue) {
//     fQueue = addToQueue;
//   } else {
//     fQueue = removeFromQueue;
//   }
// }

// //вішаємо лісенери на кнопки і функціі для них
// // if (refs.addToWatchedBtn) {
// //   refs.addToWatchedBtn.addEventListener('click', fWatched);
// // }
// // if (refs.addToQueueBtn) {
// //   refs.addToQueueBtn.addEventListener('click', fQueue);
// // }

// //при натисненні ADD TO WATCHED додаємо movie в localStorage якщо там його нема
// function addToWatched(movie, btn) {
//   //btn це ref на кнопку в модалці  WATChED
//   const movies = storage.load(WATCHED_KEY);
//   if (!movies.includes(movie) && btn.textContent === addWatched) {
//     //
//     movies.push(movie);
//     storage.save(WATCHED_KEY, movies);
//     btn.textContent = removeWatched;
//   } else console.log('Цей фільм вже є в watched або кнопка НЕ ADD!');
// }

// //при натисненні REMOVE FROM WATCHED видаляємо з localStorage якщо він там  є
// function removeFromWatched(movie, btn) {
//   //btn це ref на кнопку в модалці  WATChED
//   const movies = storage.load(WATCHED_KEY);
//   if (movies.includes(movie) && btn.textContent === removeWatched) {
//     movies = movies.filter(({ id }) => id !== movie.id);
//     storage.save(WATCHED_KEY, movies);
//     btn.textContent = addWatched;
//   } else console.log('Цього фільма нема в watched або кнопка НЕ REMOVE!');
// }

// //при натисненні ADD TO QUEUE додаємо в localStorage якщо там його нема
// function addToQueue(movie, btn) {
//   //btn це ref на кнопку в модалці   QUEUE
//   const movies = storage.load(QUEUE_KEY);
//   if (!movies.includes(movie) && btn.textContent === addQueue) {
//     movies.push(movie);
//     storage.save(QUEUE_KEY, movies);
//     btn.textContent = removeQueue;
//   } else console.log('Цей фільм вже є в queue або кнопка НЕ  ADD!');
// }

// //при натисненні REMOVE FROM QUEUE видаляємо з localStorage якщо він там  є перевіряєемо textContent кнопки чи там REMOVE FROM QUEUE
// function removeFromQueue(movie, btn) {
//   //btn це ref на кнопку в модалці  QUEUE
//   const movies = storage.load(QUEUE_KEY);
//   if (movies.includes(movie) && btn.textContent === removeQueue) {
//     movies = movies.filter(({ id }) => id !== movie.id);
//     storage.save(QUEUE_KEY, movies);
//     btn.textContent = addQueue;
//   } else console.log('Цього фільма нема в queue або кнопка НЕ REMOVE!');
// }
// //чи щось потрібно пеерендирити при закритті модалки ???
// //при закритті модалки чи потрібно знімати лісенери?

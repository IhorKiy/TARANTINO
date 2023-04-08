//export const apiMovie = new ApiMovie;
import ApiMovie from "./serviseAPI";
//const apiMovie = new ApiMovie;
import { apiMovie } from "./serviseAPI";
//console.log(apiMovie);
//ключі для сховища
const CURRENT_KEY = "current"; //тут масив зафетчиних фільмів
const WATCHED_KEY = "watched"; //тут масив переглянутих фільмів
const QUEUE_KEY = "queue";     //тут масив фільмів для майьутнього перегляду
const GENRES_KEY = "genres";   //тут масив жанрів
//перетворює value в JSON формат і записує в key locaStorage
const save = (key, value) => {
  try {
    // console.log("from save try")
    const serializedState = JSON.stringify(value); //value перетворює в JSON формат,тобто обгортає всі ключі в ""
    localStorage.setItem(key, serializedState);//в localStorage стіорює пару key зі значенням serializedState
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};
//витягає з locaStorage key і перетворює в JS 
const load = key => {
  try {
    // console.log("from load try");
    const serializedState = localStorage.getItem(key); //витягає value для key з localStorage
    return serializedState === null ? undefined : JSON.parse(serializedState); //парсить це value в JS обєкт 
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};
//видаляє key з locaStorage
const remove = key => {
  try {
      return localStorage.removeItem(key); //прибирає значення для key з  localStorage
    } catch (error) {
      console.error("Get state error: ", error.message);
    }
}
//наступний код треба  повставляти в інші файли
//перед load,save,remove ставити storage.

//в index коли submit  разово фетчить і записує масив жанрів в localStorage
function saveGenres() {
    //*******ЖАНРИ******
    //записуємо  масив жанрів в localStorage якщо його ще нема  в  GENRES 
    let arrayGenres = load(GENRES_KEY);//витягуємо з localStorage масив жанрів [{id=12,name="adventure"},{}...]
    if (arrayGenres === [] || !arrayGenres || arrayGenres === {}) {
        apiMovie.fetchGenres()
            .then((data) => {
                const genres = data.genres;
                save(GENRES_KEY, genres);
        
            })
            .catch((error) => console.log(error.message));
    }
}
//saveGenres(); //записуюємо користувачу в localStorage список жанрів
function loadGenres() {
    const arrayGenres = load(GENRES_KEY);
    console.log("from loadGenres",arrayGenres);
    return arrayGenres;
 }
//loadGenres();
// при загрузці сторінки очищуємо current в localStorage  і записуємо масив трендових фільмів заданої сторінки
function saveTrendMovies(page) {
    remove(CURRENT_KEY);
    apiMovie.fetchAllMovie(page)
        .then((data) => {
           // console.log("data from saveTrendMovies page ",page,data.results);
            save(CURRENT_KEY, data.results);
        })
        .catch((error) => console.log(error.message));
}   
//saveTrendMovies(1);
//весь масив сторінки трендових фільмів можна завантажити з current localStorage
function loadTrendMovies() {
    const movies = load(CURRENT_KEY); 
    console.log("from loadTrendMovies",movies);
    return movies;
}   
//loadTrendMovies();

// ****** при ПАГІНАЦІЇ записуємо масив 20 фільмів в localStorage*******

function saveCurrentPage(data) {
    remove(CURRENT_KEY);
    save(CURRENT_KEY, data);
}
//для рендеринга витягаємо масив фільмів з localStorage
function loadCurrentPage() {
    const arrayMovies = load(CURRENT_KEY);
    console.log("from loadCurrentPage",arrayMovies)
    return arrayMovies;
}
// mylibrary
//const посилання на кнопку = document.querySelector("click", addToWatched)
//при натисненні ADD TO WATCHED додаємо в localStorage якщо там його нема
function addToWatched(movie) {
    const movies = load(WATCHED_KEY);
    if (!movies.includes(movie)) {
        movies.push(movie);
        save(WATCHED_KEY,movies);
    } else console.log('Цей фільм вже є в watched!');
}
//при натисненні REMOVE FROM WATCHED видаляємо з localStorage якщо він там  є
function removeFromWatched (movie){
    const movies = load(WATCHED_KEY);
    if (movies.includes(movie)) {
        movies = movies.filter(({ id }) => id !== movie.id)
        save(WATCHED_KEY, movies);
    } else console.log('Цього фільма нема в watched!');
}
// при натисненні на кнопку WATCHED 
//витягаємо  масив фільмів для рендерінга з localStorage(watched)
function loadFromWatched() {
    const movies = load(WATCHED_KEY);
    return movies;
}
//const посилання на кнопку = document.querySelector("click", addToQueue)
//при натисненні ADD TO QUEUE додаємо в localStorage якщо там його нема
function addToQueue(movie) {
    const movies = load(QUEUE_KEY);
    if (!movies.includes(movie)) {
        movies.push(movie);
        save(QUEUE_KEY,movies);
    } else console.log('Цей фільм вже є в queue!');
}
//при натисненні REMOVE FROM QUEUE видаляємо з localStorage якщо він там  є
function removeFromQueue (movie){
    const movies = load(QUEUE_KEY);
    if (movies.includes(movie)) {
        movies = movies.filter(({ id }) => id !== movie.id)
        save(QUEUE_KEY, movies);
    } else console.log('Цього фільма нема в queue!');
}
///при натисненні кнопки QUEUE витягаємо
//витягаємо  масив фільмів для рендерінга з localStorage(queue)
function loadFromQueue() {
    const movies = load(QUEUE_KEY);
    return movies;
}

//виводить на зовні для тих програм ,що мають import  storage from './storage'
//звертатись до  цих функцій storage.назва_функції
export default { 
  saveGenres,
  loadGenres,
  saveTrendMovies,
  loadTrendMovies,
  saveCurrentPage,
  loadCurrentPage,
  addToWatched,
  removeFromWatched,
  loadFromWatched,
  addToQueue,
  removeFromQueue,
  loadFromQueue,
};



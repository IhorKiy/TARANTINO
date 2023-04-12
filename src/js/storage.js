
import ApiMovie from "./serviseAPI";
import { apiMovie } from "./serviseAPI";
//console.log(apiMovie);
//ключі для сховища

const PAGE_KEY = "page";       //номер поточної сторінки
const TOTAL_KEY = "total_pages";     //кількість сторінок після запиту
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
function saveGenres(genres) {
    //*******ЖАНРИ******
    //записуємо перероблений масив жанрів в localStorage якщо його ще нема  в  GENRES 
      save(GENRES_KEY, genres);
 }
//saveGenres(); //записуюємо користувачу в localStorage список жанрів
function loadGenres() {
  return load(GENRES_KEY);
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
   // console.log("from storage.loadTrendMovies",movies);
    return movies;
}   
//loadTrendMovies();

// ****** для ПАГІНАЦІЇ записуємо кількість сторінок, номер поточної сторінки
function saveTotalPages(number) {
    save(TOTAL_KEY, number);
}   
//витягуємо кількість сторінок
function loadTotalPages() {
    load(TOTAL_KEY);
} 

//
function savePage(page) {
  save(PAGE_KEY, page)   
  }

function loadPage() {
  load(PAGE_KEY);
}

//записуємо масив 20 фільмів в localStorage*******
function saveCurrentPage(data) { 
    remove(CURRENT_KEY);
    save(CURRENT_KEY, data); //???data.results
}
//для рендеринга витягаємо масив фільмів з localStorage
function loadCurrentPage() {
    const arrayMovies = load(CURRENT_KEY);
    console.log("from loadCurrentPage",arrayMovies)
    return arrayMovies;
}

// при натисненні на кнопку WATCHED 
//витягаємо  масив фільмів для рендерінга з localStorage(watched)
function loadFromWatched() {
    const movies = load(WATCHED_KEY);
    return movies;
}

//при натисненні кнопки QUEUE витягаємо (треба поилання на кнопку)
//витягаємо  масив фільмів для рендерінга з localStorage(queue)
function loadFromQueue() {
    const movies = load(QUEUE_KEY);
    return movies;
}

//виводить на зовні для тих програм ,що мають import  storage from './storage'
//звертатись до  цих функцій так: storage.saveGenres()/storage.loadGenres()......
export default { 
    save, //storage.save(key,value) записує в key value(JSON) /під капотом setItem/stringify/try/catch
    load, //storage.load(key) витягає JS з key /під капотом getItem/parse/try/catch
    remove, //storage.remove(key) видаляє key /під капотом removeItem/try/catch
  saveGenres,  //storage.saveGenres() при завнтаженні сторінки функція фетчить масив жанрів і записує в сховище
  loadGenres,  //storage.loadGenres() витягає масив жанрів зі сховища
  saveTotalPages,//storage.saveTotalPages записує кількість сторінок запита
  loadTotalPages,//storage.loadTotalPages витягає кількість сторінок запита
  savePage,      //storage.savePage записує номер иекучої сторінки
  loadPage,    //storage.loadPage  витягує номер иекучої сторінки
  saveTrendMovies, //storage.saveTrendMovies(page) зафетчить вказану сторінку трендових фільмів і запише її в сховище
  loadTrendMovies, //storage.loadTrendMovies() для рендерігна  поверне масив трендових фільмів  зі сховища 
  saveCurrentPage, //storage.saveCurrentPage(data)  той хто фетчить той має додати масив фільмів(data) в сховище 
  loadCurrentPage, //storage.loadCurrentPage() хто рендерить текучу сторінку ,той бере масив фільмів зі сховища
  loadFromWatched,   //storage.loadFromWatched() коли натиснули WATCHED використовуємо для рендера сторінки в MyLibrary 
  loadFromQueue,   //storage.loadFromQueue() коли натиснули QUEUE використовуємо для рендера сторінки в MyLibrary 
};



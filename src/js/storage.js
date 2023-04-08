
import ApiMovie from "./serviseAPI";
export default { //виводить на зовні для тих програм ,що мають import  storage from './storage'
  save,
  load,
  remove,
  CURRENT_KEY,
  WATCHED_KEY,
  QUEUE_KEY,
  GENRES_KEY
   };

const CURRENT_KEY = "current";
const WATCHED_KEY = "watched";
const QUEUE_KEY = "queue";
const GENRES_KEY = "genres";

const save = (key, value) => {
  try {
    // console.log("from save try")
    const serializedState = JSON.stringify(value); //value перетворює в JSON формат,тобто обгортає всі ключі в ""
    localStorage.setItem(key, serializedState);//в localStorage стіорює пару key зі значенням serializedState
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    // console.log("from load try");
    const serializedState = localStorage.getItem(key); //витягає value для key з localStorage
    return serializedState === null ? undefined : JSON.parse(serializedState); //парсить це value в JS обєкт 
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const remove = key => {
  try {
      return localStorage.removeItem(key); //прибирає значення для key з  localStorage
    } catch (error) {
      console.error("Get state error: ", error.message);
    }
}
//наступний код треба  повставляти в інші файли
const apiMovie = new ApiMovie;

//в index коли submit ФОРМИ пошуку 
//*******ЖАНРИ******
//записуємо  масив жанрів в localStorage якщо його ще нема  в  GENRES 
if (!storage.load(GENRES_KEY)) {
    const genres = apiMovie.fetchGenres();
    storage.save(GENRES_KEY, genres);
}
//витягуємо з localStorage масив жанрів
const arrayGenres = storage.load(GENRES);//[{id=5,name=""}]

//*******ТЕКУЧА СТОРІНКА********
//спочатку очищуємо current в localStorage  і записуємо масив фільмів 1шої сторінки
storage.remove(CURRENT_KEY);
const movies = apiMovie.fetchAllMovie(1); //цей рядок в функції onSubmit
storage.save(CURRENT_KEY, movies)

//******в ПАГІНАЦІЇ фетчимо сторінку page*******
 movies = apiMovie.fetchAllMovie(page);
//записуємо в localStorage(current) масив фільмів page сторінки 
storage.save(CURRENT_KEY, movies);

//наступне в mylibrary 
// при натисненні на кнопку WATCHED 
//витягаємо з localStorage(watched) масив фільмів для рендерінга
const arrayWatched = storage.load(WATCHED_KEY);
//в модалці з фільмом 
//при натисненні кнопки ADD TO WATCHED записуємо фільм в localStorage(watched)
storage.save(WATCHED_KEY, movie);

//при натисненні кнопки QUEUE витягаємо з localStorage(queue) масив фільмів для рендерінга
const arrayQueue =storage.load(QUEUE_KEY);
//в модалці з фільмом 
//при натисненні кнопки ADD TO QUEUE записуємо фільм в queue
storage.save(QUEUE_KEY, movie);



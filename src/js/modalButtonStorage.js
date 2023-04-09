import { refs, movie } from "./modal-movie";
import storage from "./storage";
const addWatched = "ADD TO WATCHED";
const removeWatched = "REMOVE FROM WATCHED";
const addQueue = "ADD TO QUEUE";
const removeQueue = "REMOVE FROM QUEUE";
//при відкритті модалки перевіряємо чи movie є в сховищі

isWatched(movie, refs.btnWatched);
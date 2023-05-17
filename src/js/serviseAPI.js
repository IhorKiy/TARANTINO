import axios from 'axios';
import { refs } from './refs';
import { LANG } from './onFirstRender';

 

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class ApiMovie {
  #API_KEY = '4e109f7b4b6a0194008b1b4e8c435cc1';
  query = '';
  genres = [];

 

  async fetchMovieWeek(page) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language : LANG,
      page: page,

    });

    try {
      const { data } = await axios('/trending/movie/week', { params });
      return data;
    } catch (error) {
      console.error('Oops, something wrong: ', error.message);
    }
  }

  async fetchAllMovie(page) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language : LANG,
      page: page,
    });

    try {
      const { data } = await axios('/trending/movie/day', { params });
      return data;
    } catch (error) {
      console.error('Oops, something wrong: ', error.message);
    }
  }

  async searchMovieByQuery(query, page) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language : LANG,
      query: query,
      page: page,
    });

    const { data } = await axios('/search/movie', { params });
    console.log(...params);
    return data;
  }

  async fetchMovieById(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language : LANG,
    });

    const { data } = await axios(`/movie/${id}`, { params });
    return data;
  }

  async fetchTrailerById(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      language : LANG,
    });

    try {
      const { data } = await axios(`/movie/${id}/videos`, { params });
      return data;
    } catch (error) {
      console.error('Sorry, no trailer for this movie: ', error.message);
    }
  }

  async fetchGenres() {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
       language : "ru-RU",
    });

    const { data } = await axios('/genre/movie/list', { params });
    this.genres = data.genres;
    return data;
  }
}

export const apiMovie = new ApiMovie();

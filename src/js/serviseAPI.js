import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class ApiMovie {
  #API_KEY = '4e109f7b4b6a0194008b1b4e8c435cc1';
  query = '';
  genres = [];

  async fetchAllMovie(page) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      page: page,
    });

    try {
      const { data } = await axios('/trending/movie/day', { params });
      return data;
    } catch (error) {
      console.error('Oops, something wrong: ', error.message);
    }
  }

  async searchMovieByQuery(page) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
      query: this.query,
      page: page,
    });

    const { data } = await axios('/search/movie', { params });
    return data;
  }

  async fetchMovieById(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
    });

    const { data } = await axios(`/movie/${id}`, { params });
    return data;
  }

  async fetchTrailerById(id) {
    const params = new URLSearchParams({
      api_key: this.#API_KEY,
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
    });

    const { data } = await axios('/genre/movie/list', { params });
    this.genres = data.genres;
    return data;
  }
}




export const getGenresNames = ids => {
    const savedGenres = JSON.parse(window.localStorage.getItem('genres'));
    const genresNames = Object.entries(savedGenres)
      .filter(([key]) => ids.includes(parseInt(key)))
      .map(([_, value]) => value);
    return genresNames;
  };

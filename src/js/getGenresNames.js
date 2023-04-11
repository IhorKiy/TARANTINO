import storage from './storage.js'
export const getGenresNames = ids => {
    const savedGenres = storage.loadGenres();
    let genresNames = Object.entries(savedGenres)
      .filter(([key]) => ids.includes(parseInt(key)))
      .map(([_, value]) => value);
      if(genresNames.length > 3) {
        return genresNames = [genresNames[0], genresNames[1], 'Other']
       }
    return genresNames;
  };

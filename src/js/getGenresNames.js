
export const getGenresNames = ids => {
    const savedGenres = JSON.parse(window.localStorage.getItem('genres'));
    let genresNames = Object.entries(savedGenres)
      .filter(([key]) => ids.includes(parseInt(key)))
      .map(([_, value]) => value);
      if(genresNames.length > 3) {
        return genresNames = [genresNames[0], genresNames[1], 'Other']
       }
    return genresNames;
  };


const sliderContainer = document.querySelector('.top-slider__wrapper');

const insertSliderMarkup = movies => {
  
  const cardMarkup = movies
    .map(({ poster_path, id }) => {
      return `
      <div class= swiper-slide top-slide><img class=top-slider__image data-id =${id} src=https://image.tmdb.org/t/p/original${poster_path}
       width=100 height=100/></div>`
    })
    .join('');

    sliderContainer.innerHTML = cardMarkup;
};

export default insertSliderMarkup;
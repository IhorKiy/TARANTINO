import { apiMovie } from './serviseAPI';

const sliderBar = document.querySelector('.top-slider__wrapper');
const modalTrailer = document.querySelector('.overlay--trailer');

sliderBar.addEventListener('click', e => {
  //   console.log(e.target.parentNode.classList.contains('swiper-slide-active'));
  //   //   //   console.log(sliderBar.children);
  if (e.target === e.currentTarget) {
    return;
  }
  if (e.target.parentNode.classList.contains('swiper-slide-active')) {
    fetchTrailers(e.target.dataset.id);
  }
});

async function fetchTrailers(id) {
  try {
    const video = await apiMovie.fetchTrailerById(id);
    console.log(video.results[0].key);
    modalTrailer.innerHTML = `(
    <iframe
      class="iframe"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/${video.results[0].key}?rel=0&showinfo=0&autoplay=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>`;
    modalTrailer.classList.add('active');
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('keydown', e => {
  if (modalTrailer.classList.contains('active')) {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        modalTrailer.classList.remove('active');
        modalTrailer.innerHTML = '';
      }
    }
    handleKeyDown(e);
  }
});

modalTrailer.addEventListener('click', e => {
  function handleClickTrailer(e) {
    if (e.currentTarget === e.target) {
      modalTrailer.classList.remove('active');
      modalTrailer.innerHTML = '';
    }
  }
  handleClickTrailer(e);
});

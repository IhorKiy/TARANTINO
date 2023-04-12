import Swiper, { EffectCoverflow } from "swiper";
import '../../node_modules/swiper/swiper.scss';

const topMovies = new Swiper('[data-swiper="top"]', {
  modules: [EffectCoverflow],
  effect:'coverflow',
  coverflowEffect: {
    rotate: 40,
    modifier: 1,
  },
  touchEventsTarget: 'wrapper',
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 10,
  loop:true,
  initialSlide: 3,

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.5,

    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2.5,
  
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 3,

    },
    928: {
      slidesPerView: 3.5,

    },
    1280: {
      slidesPerView: 4.5,

    }
  }
});



const container = document.querySelector('.top-slider__section');
const sliderImage = document.querySelector('.top-slider__wrapper');

window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;

  container.style.backgroundPositionY = `${scrollPosition * 0.1}px`;
});


sliderImage.addEventListener('wheel', function(e) {
  e.preventDefault();

  if (e.deltaY < 0) {
    topMovies.slidePrev();
  } else if (e.deltaY > 0) {
    topMovies.slideNext();
  }
});
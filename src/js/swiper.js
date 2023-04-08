import Swiper, { Keyboard, Autoplay } from 'swiper';
import '../../node_modules/swiper/swiper.scss';

const swiper = new Swiper('[data-swiper="gallery"]', {
  modules: [Keyboard, Autoplay],
  keyboard: {
    enabled: true,
  },
  loop: true,
  autoplay: {
    delay: 5000,
  },
  speed: 1000,
});

export default swiper;
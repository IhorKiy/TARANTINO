export default class Loader {
  constructor() {
    this.overlay = document.querySelector('.loader__overlay');
    this.loader = document.querySelector('.loader');
  }

  enable() {
    this.overlay.classList.remove('is-hidden');
    this.loader.classList.add('loader--on');
  }

  disable() {
    this.overlay.classList.add('is-hidden');
    this.loader.classList.remove('loader--on');
  }
}


// export default function toggleLoader(isLoading) {
//   const overlay = document.querySelector('.loader__overlay');
//   const loader = document.querySelector('.loader');

//   if (isLoading) {
//     overlay.classList.remove('is-hidden');
//     loader.classList.add('loader--on');
//   } else {
//     overlay.classList.add('is-hidden');
//     loader.classList.remove('loader--on');
//   }
// }
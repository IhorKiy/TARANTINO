export default class Loader {
  constructor() {
    this.loaderElement = document.querySelector(".preloader");
    this.disable();
  }

  enable() {
    this.loaderElement.classList.remove("is-hidden");
  }

  disable() {
    this.loaderElement.classList.add("is-hidden");
  }
}
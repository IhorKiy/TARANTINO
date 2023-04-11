import { refs } from "./refs";

 (() => {
  // const refs = {
  //   openModalBtn: document.querySelector("[data-modal-open]"),
  //   closeModalBtn: document.querySelector("[data-modal-close]"),
  //   modal: document.querySelector("[data-modal]"),
 
  // };

  refs.dataModalOpen.addEventListener("click", openModal);
  refs. dataModalClose.addEventListener("click", closeModal);

  function openModal() {
    refs.modal.classList.toggle("is-hidden");
    document.body.style.overflow = 'hidden';
    refs.modal.style.overflow = 'scroll';
  }
  function closeModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();


const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

const CloseModalByEsc = onCloseBtnModal();
const closeModalByClick = onCloseClickModal();

function onCloseBtnModal() {
  window.addEventListener('keydown', e => {
    if (modal.classList.contains('active')) {
      handleKeyDown(e);
    }
  });
}

function onCloseClickModal() {
  overlay.addEventListener('click', e => {
    handleClick(e);
  });
}

const handleKeyDown = e => {
  if (e.code === 'Escape') {
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
};

const handleClick = e => {
  if (e.currentTarget == e.target) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
};

export default { CloseModalByEsc, closeModalByClick };

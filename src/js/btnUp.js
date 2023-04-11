const btn = document.querySelector('.button-thumb');

export function scrollFunction() {
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    btn.style.visibility = 'visible';
  } else {
    btn.style.visibility = 'hidden';
  }
}

window.addEventListener('scroll', scrollFunction);

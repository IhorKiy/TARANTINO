export default class Paginator {
  constructor() {
    this.pagination = document.querySelector('.pagination');
    this.pages = [1, 2, 3, 4, 5];
    this.totalPages = 0;
    this.currentPage = 1;
    this.previousPage = 0;
  }

  makeMarkup() {
    let markup = '';

    if (this.currentPage > this.pages[2] && this.totalPages !== this.pages[4] && this.currentPage > this.previousPage) {
      this.pages.push(this.pages[4] + 1);
      this.pages.shift( );
    }

    if (this.currentPage < this.pages[2] && this.pages[0] !== 1 && this.currentPage < this.previousPage) {
      this.pages.unshift(this.pages[0] - 1);
      this.pages.pop();
    }

    this.pages.forEach(page => {
      
      if (page === this.currentPage) {
        markup += `<li class="current">${page}</li>`;
      } else {
        markup += `<li>${page}</li>`;
      }

    });

    if (this.totalPages > 5 && this.totalPages > this.pages[4]) {
      markup = markup + `<li class="more">...</li><li class="more">${this.totalPages}</li>`;
    }

    if (this.totalPages > 5 && this.currentPage > 3) {
      markup = `<li class="more">1</li><li class="more">...</li>` + markup;
    }

    this.pagination.innerHTML = `<li>Prev</li>${markup}<li>Next</li>`;
  }

  getNumber(event) {
    const action = event.target.outerText;

    if (action === 'Next' && this.currentPage < this.totalPages) {
      this.previousPage = this.currentPage;
      this.currentPage += 1;
      this.makeMarkup();
      return this.currentPage;
    }

    if (action === 'Prev' && this.currentPage > 1) {
      this.previousPage = this.currentPage;
      this.currentPage -= 1;
      this.makeMarkup();
      return this.currnetPage;
    }

  }


};
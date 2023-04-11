// Інструкція!
// 1. Імпортувати класс Paginator, створити екземпляр та зберегти в змінну;
// 2. Створити слухач подій і повісити його на назва-змінної-екземпляру.pagination, з аргументом "click";
// 3. У властивість назва-змінної-екземпляру.totalPages вписати кількісить сторінок;
// 4. Разом з рендеренгом контенту сторінки викликати метод назва-змінної-екземпляру.makeMarkup();
// 5. Дадати функцію-обробник до слухача з пункту 2;
// 6. Всередині функції-обробника викликати метод назва-змінної-екземплярую.getNumber() і паредати йому об'єкт події, як аргумент;
// 7. Метод getNumber() повертає номер сторінки або null, ящо користувач натиснув на "...";
// 8. Виконати повторний рендер контенту сторінки, яку обрав користувач;



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
      return this.currentPage;
    }

    return null;
  }


};
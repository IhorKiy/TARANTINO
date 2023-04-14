!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function() {

   const modalButtons = document.querySelectorAll('.footer-js-open-modal'),
         over     = document.querySelector('.footer-js-overlay-modal'),
         closeButtons = document.querySelectorAll('.footer-js-modal-close');


   modalButtons.forEach(function(item){
      item.addEventListener('click', function(e) {
         e.preventDefault();

         const modalId = this.getAttribute('data-modal'),
            modalElem = document.querySelector('.footer2-modal[data-modal="' + modalId + '"]');
            modalElem.classList.add('active-footer');
            over.classList.add('active-footer');
      });

   }); 

   closeButtons.forEach(function(item){

      item.addEventListener('click', function(e) {
         const parentModal = this.closest('.footer2-modal');

         parentModal.classList.remove('active-footer');
         over.classList.remove('active-footer');
      });

   });

   // document.body.addEventListener('keyup', function (e) {
   //    const key = e.keyCode;

   //    if (key == 27) {
         
      
   //          document.querySelector('.footer2-modal.active-footer').classList.remove('active-footer');
   //          document.querySelector('.over').classList.remove('active-footer');
   //       };
   //    }, false);


   // over.addEventListener('click', function() {
   //       document.querySelector('.footer2-modal.active-footer').classList.remove('active-footer');
   //       this.classList.remove('active-footer');
   //    });

});









// копія
// !function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

// document.addEventListener('DOMContentLoaded', function() {

//    var modalButtons = document.querySelectorAll('.js-open-modal'),
//          overlay      = document.querySelector('.js-overlay-modal'),
//          closeButtons = document.querySelectorAll('.js-modal-close');


//    modalButtons.forEach(function(item){
//       item.addEventListener('click', function(e) {
//          e.preventDefault();

//          var modalId = this.getAttribute('data-modal'),
//              modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

         
//          modalElem.classList.add('active-footer');
//          overlay.classList.add('active-footer');
//       });

//    });

//    closeButtons.forEach(function(item){

//       item.addEventListener('click', function(e) {
//          var parentModal = this.closest('.modal');

//          parentModal.classList.remove('active-footer');
//          overlay.classList.remove('active-footer');
//       });

//    });

//    // document.body.addEventListener('keyup', function (e) {
//    //    var key = e.keyCode;

//    //    if (key == 27) {

//    //          document.querySelector('.modal.active-footer').classList.remove('active-footer');
//    //          document.querySelector('.overlay').classList.remove('active-footer');
//    //       };
//    //    }, false);


//    overlay.addEventListener('click', function() {
//          document.querySelector('.modal.active-footer').classList.remove('active-footer');
//          this.classList.remove('active-footer');
//       });

// });

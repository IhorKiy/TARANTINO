!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequired7c6=a),a("RX4Re"),a("4Ib9m"),a("kvC6y"),a("jzQFI"),a("kqwSa"),a("i8KXY"),a("925RR"),a("cYjYj");var o=a("bpxeT"),i=a("2TvXO"),s=a("kqwSa"),l=a("7iFtI"),c=a("jzQFI"),u=a("6JpON"),d=a("kvC6y"),p=a("cYjYj"),f=new(0,d.default),v="",w=document.querySelector(".header__form"),m=w.querySelector("input"),g=document.querySelector(".home__container"),y=document.querySelector(".top-slider__section"),h=new(0,p.default);function b(t){if(console.log("here"),h.getNumber(t)){function r(){return(r=e(o)(e(i).mark((function t(r,n){var a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.apiMovie.searchMovieByQuery(r,n);case 3:if(a=e.sent,console.log(n),0!==a.results.length){e.next=8;break}return f.disable(),e.abrupt("return",u.Notify.failure("Sorry, no movies were found for your search."));case 8:c.default.saveCurrentPage(a.results),c.default.savePage(n),(0,l.default)(a.results,g),x(),f.disable(),h.makeMarkup(),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0);case 19:case"end":return e.stop()}}),t,null,[[0,16]])})))).apply(this,arguments)}!function(e,t){r.apply(this,arguments)}(v,h.currentPage)}}function k(){return(k=e(o)(e(i).mark((function t(r,n){var a;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.apiMovie.searchMovieByQuery(r,n);case 3:0===(a=e.sent).results.length&&(f.disable(),console.log("Sorry, no movies were found for your search.")),h.totalPages=a.total_pages,c.default.saveCurrentPage(a.results),c.default.savePage(n),y.style.display="none",(0,l.default)(a.results,g),x(),f.disable(),h.pagination.innerHTML="",h.makeMarkup(),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0);case 19:case"end":return e.stop()}}),t,null,[[0,16]])})))).apply(this,arguments)}function x(){var e=document.querySelectorAll(".film_poster");Array.from(e).map((function(e){"https://image.tmdb.org/t/p/originalnull"===e.src&&(e.src="https://img.freepik.com/premium-vector/movie-neon-sign-bright-signboard-light-banner-movie-time-logo-neon-emblem-vector-illustration_191108-314.jpg?w=2000")}))}w.addEventListener("submit",(function(e){if(e.preventDefault(),""===(v=e.currentTarget.elements.searchQuery.value.trim()))return u.Notify.info("The input field cannot be empty!");f.enable(),function(e,t){k.apply(this,arguments)}(v,1),h.pagination.addEventListener("click",b),m.addEventListener("change",(function(e){console.log(e.target.value),""===e.target.value&&(window.location.href="./index.html")}))}));var _=a("e1ad9"),L=new(0,_.default)('[data-swiper="top"]',{modules:[_.EffectCoverflow],effect:"coverflow",coverflowEffect:{rotate:40,modifier:1},touchEventsTarget:"wrapper",centeredSlides:!0,slidesPerView:1,spaceBetween:10,loop:!0,initialSlide:3,breakpoints:{320:{slidesPerView:1.5},480:{slidesPerView:2.5},768:{slidesPerView:3},928:{slidesPerView:3.5},1280:{slidesPerView:4.5}}}),T=document.querySelector(".top-slider__section"),S=document.querySelector(".top-slider__wrapper");window.addEventListener("scroll",(function(){var e=window.pageYOffset;T.style.backgroundPositionY="".concat(.1*e,"px")})),S.addEventListener("wheel",(function(e){e.preventDefault(),e.deltaY<0?L.slidePrev():e.deltaY>0&&L.slideNext()})),a("8rNA5"),a("8AEpj");o=a("bpxeT"),i=a("2TvXO"),s=a("kqwSa");var E=document.querySelector(".top-slider__wrapper"),q=document.querySelector(".overlay--trailer");function P(){return(P=e(o)(e(i).mark((function t(r){var n;return e(i).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.apiMovie.fetchTrailerById(r);case 3:n=e.sent,console.log(n.results[0].key),q.innerHTML='(\n    <iframe\n      class="iframe"\n      width="560"\n      height="315"\n      src="https://www.youtube.com/embed/'.concat(n.results[0].key,'?rel=0&showinfo=0&autoplay=1"\n      title="YouTube video player"\n      frameborder="0"\n      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n      allowfullscreen\n    ></iframe>'),q.classList.add("active"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),t,null,[[0,9]])})))).apply(this,arguments)}E.addEventListener("click",(function(e){e.target!==e.currentTarget&&e.target.parentNode.classList.contains("swiper-slide-active")&&function(e){P.apply(this,arguments)}(e.target.dataset.id)})),window.addEventListener("keydown",(function(e){if(q.classList.contains("active")){"Escape"===e.code&&(q.classList.remove("active"),q.innerHTML="")}})),q.addEventListener("click",(function(e){var t;(t=e).currentTarget===t.target&&(q.classList.remove("active"),q.innerHTML="")})),a("6RoaF")}();
//# sourceMappingURL=index.fb5b2d36.js.map

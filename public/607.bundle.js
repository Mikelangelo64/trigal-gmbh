"use strict";(self.webpackChunktrigal_gmbh=self.webpackChunktrigal_gmbh||[]).push([[607],{3607:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=n(5706);o(n(5479)).default.pageLoad.onLoad((function(){(0,r.init)()}))},4317:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var o=n(8784);t.default=function(){var e=document.querySelectorAll(".accordion");0!==e.length&&e.forEach((function(e){!function(e,t){var n=e.querySelectorAll(".accordion__item");if(0!==n.length){var r=".accordion__summary";t&&(r=".accordion__label"),n.forEach((function(e){var t=e.querySelector("".concat(r)),n=e.querySelector(".accordion__details");if(t&&n){var i=n.querySelector(".accordion__description");if(i){var a=new o.Timeline({duration:400});a.addCallback("progress",(function(e){var t=e.easing,o=1===e.progress?"auto":"".concat(i.clientHeight*t,"px");n.style.height=o,n.style.opacity="".concat(t)})),t.addEventListener("click",(function(){e.classList.toggle("_active"),a.progress>0?a.reverse():a.play()}))}}}))}}(e,"true"===e.dataset.isLabelClick)}))}},6128:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(8012));t.default=function(e,t){var n=Array.from(document.querySelectorAll(".anchor"));0!==n.length&&n.forEach((function(n){(0,r.default)(n,e,t)}))}},8012:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var o=e.dataset.goto;if(o){var r=document.querySelector("".concat(o));r&&e.addEventListener("click",(function(e){e.preventDefault(),function(e){0!==e.length&&e.forEach((function(e){var t=e.timeline,n=e.openButtons;t&&t.progress>0&&(t.reverse(),n.forEach((function(e){e.classList.remove("_opened")})))}))}(n),window.scrollTo({top:r.offsetTop-t,behavior:"smooth"})}))}}},5843:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.callback,o=e.wait,r=void 0===o?250:o,i=e.isImmediate,a=void 0!==i&&i;return function(){var e=a&&!t;clearTimeout(t),t=setTimeout((function(){t=void 0,n()}),r),e&&n()}}},5479:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var o=new(n(8784).Application)({tablet:1199,phone:899,prefix:"v-",resizeDebounce:100,easing:[.25,.1,.25,1]});t.default=o},5706:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.init=void 0;var r=o(n(4317)),i=o(n(6128)),a=o(n(5479)),s=o(n(9059)),l=o(n(4597)),c=o(n(8237)),u=o(n(8932)),d=o(n(469));t.init=function(){(0,u.default)(),a.default.isMobile||(0,c.default)(),(0,d.default)(),(0,r.default)();var e=(0,s.default)();(0,i.default)(0,e);var t=document.querySelectorAll("form");0!==t.length&&t.forEach((function(t){t.addEventListener("submit",(function(n){n.preventDefault();var o=Array.from(t.querySelectorAll("input, textarea"));e.forEach((function(e){var t=e.timeline,n=e.isThanks;e.isError,n?(null==t||t.play(),0!==o.length&&o.forEach((function(e){var t=e;console.log(t,t.value),t.value=""}))):(null==t||t.reverse(),setTimeout((function(){var e,t;null===(e=document.querySelector("html"))||void 0===e||e.classList.add("lock"),null===(t=document.querySelector("body"))||void 0===t||t.classList.add("lock")}),300))}))}))})),(0,l.default)()}},9059:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(4915));t.default=function(){var e=document.querySelectorAll(".popup");if(0===e.length)return[];var t=[];return e.forEach((function(e){var n=new r.default(e);t.push(n)})),t.forEach((function(e){e.initOpen(t)})),t}},7846:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var o=n(8784);t.default=function(e,t,n,r,i){if(e&&t&&n){var a=new o.Timeline({duration:600,easing:[.25,.1,.25,1]});return a.addCallback("start",(function(){var t,n;a.isReversed||(e.classList.contains("popup-search")||(null===(t=document.querySelector("html"))||void 0===t||t.classList.add("lock"),null===(n=document.querySelector("body"))||void 0===n||n.classList.add("lock")),e.classList.add("_opened"),i&&i.play())})),a.addCallback("progress",(function(o){var i=o.progress,a=o.easing;!function(e){var t=e.progress,n=e.easing,o=e.parent,r=e.overlay,i=e.scroll,a=e.additional;if(o&&((s=o).style.display="".concat(t>0?"flex":"none"),o.classList.contains("popup-header-modal")?s.style.opacity="".concat(t):s.style.opacity="".concat(t>0?1:0)),r&&((s=r).style.opacity="".concat(n)),i){var s=i;o.classList.contains("popup-search")||(s.style.opacity="".concat(n)),o.classList.contains("popup-menu")?s.style.transform="translateX(".concat(100*(1-n),"%)"):o.classList.contains("popup-header-modal")?s.style.transform="translateY(".concat(2*(n-1),"rem)"):s.style.transform="translateY(".concat(2*(1-n),"rem)")}a&&((s=a).style.opacity="".concat(n),o.classList.contains("popup-menu")?s.style.transform="translateX(".concat(100*(1-n),"%)"):s.style.transform="translateY(".concat(2*(1-n),"rem)"))}({parent:e,scroll:t,overlay:n,progress:i,easing:a,additional:r})})),a.addCallback("end",(function(){var t,n;a.isReversed&&(null===(t=document.querySelector("html"))||void 0===t||t.classList.remove("lock"),null===(n=document.querySelector("body"))||void 0===n||n.classList.remove("lock"),e.classList.remove("_opened"),i&&i.pause())})),a}}},4915:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=n(7560),i=o(n(7846)),a=o(n(5843)),s=function(){function e(e,t){var n=this;this._isThanks=!1,this._isError=!1,this._closeButtons=[],this._openButtons=[],this._parent=e,this._callback=t,this._name=e.dataset.popupname,this._scroll=this._parent.querySelector(".popup__scroll"),this._overlay=this._parent.querySelector(".popup__overlay"),this._wrapper=this._parent.querySelector(".popup__wrapper"),this._additional=this._parent.querySelector(".popup__additional"),this._video=this._parent.querySelector(".video"),this._name&&this._scroll&&this._overlay&&this._wrapper&&(this._isThanks="_popup-thanks"===this._name,this._isError="_popup-error"===this._name,this._timeline=(0,i.default)(this._parent,this._scroll,this._overlay,this._additional,this._video),this._openButtons=Array.from(document.querySelectorAll('[data-popup="'.concat(this._name,'"]'))),this._closeButtons=Array.from(this._parent.querySelectorAll(".popup__close, .popup__button")),0!==this._closeButtons.length&&this._closeButtons.forEach((function(e){e&&e.addEventListener("click",(function(){var e;null===(e=n._timeline)||void 0===e||e.reverse()}))})),(0,r.useOutsideClick)(this._wrapper,(function(){var e,t,o,r;n._parent.classList.contains("_opened")&&(null===(e=n._timeline)||void 0===e||e.reverse(),null===(t=document.querySelector("html"))||void 0===t||t.classList.remove("lock"),null===(o=document.querySelector("body"))||void 0===o||o.classList.remove("lock"),null===(r=n._video)||void 0===r||r.pause())})),(0,r.useOnEscape)((function(){var e,t,o,r;n._parent.classList.contains("_opened")&&(null===(e=n._timeline)||void 0===e||e.reverse(),null===(t=document.querySelector("html"))||void 0===t||t.classList.remove("lock"),null===(o=document.querySelector("body"))||void 0===o||o.classList.remove("lock"),null===(r=n._video)||void 0===r||r.pause())})))}return Object.defineProperty(e.prototype,"parent",{get:function(){return this._parent},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this._name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isThanks",{get:function(){return this._isThanks},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isError",{get:function(){return this._isError},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"scroll",{get:function(){return this._scroll},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"overlay",{get:function(){return this._overlay},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"additional",{get:function(){return this._additional},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"wrapper",{get:function(){return this._wrapper},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"video",{get:function(){return this._video},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"timeline",{get:function(){return this._timeline},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"closeButtons",{get:function(){return this._closeButtons},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"openButtons",{get:function(){return this._openButtons},enumerable:!1,configurable:!0}),e.prototype.initOpen=function(e){var t=this;0!==e.length&&this._openButtons&&this._openButtons.forEach((function(n){n.addEventListener("click",(function(n){var o;n.preventDefault(),e.forEach((function(e){var n;e.parent.classList.contains("_opened")&&e.name!==t._name&&(null===(n=e.timeline)||void 0===n||n.reverse())})),null===(o=t._timeline)||void 0===o||o.play()}))}))},e.prototype.onWindowResize=function(e){this._callback=e,window.addEventListener("resize",(0,a.default)({callback:e}))},e}();t.default=s},7560:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useOnEscape=t.useOutsideClick=void 0,t.useOutsideClick=function(e,t){document.addEventListener("mousedown",(function(n){e.contains(null==n?void 0:n.target)||1!==n.which||t()}))},t.useOnEscape=function(e){window.addEventListener("keydown",(function(t){27===t.keyCode&&e()}))}},4597:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(5479)),i=n(7560);t.default=function(){var e=document.querySelectorAll(".dropdown.desktop");0!==e.length&&e.forEach((function(e){if(r.default.isMobile)return e.addEventListener("click",(function(){e.classList.add("viewed")})),void(0,i.useOutsideClick)(e,(function(){e.classList.remove("viewed")}));e.addEventListener("mouseenter",(function(){e.classList.add("viewed")})),e.addEventListener("mouseleave",(function(){e.classList.remove("viewed")}))}))}},8237:function(e,t,n){var o=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&o(t,e,n);return r(t,e),t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=a(n(5843)),l=a(n(1168)),c=a(n(861)),u=i(n(5383)),d=a(n(5020)),f=a(n(8767));t.default=function(){var e=document.querySelectorAll(".scroll-container");0!==e.length&&e.forEach((function(e){var t=e.querySelector(".scroll-container__wrapper"),n=e.querySelectorAll(".scroll-container__item");if(t&&0!==n.length){var o={isCanScrollUp:!1,isCanScrollDown:!1,isCanScrolling:!0,isNavigationEvent:!1,scrollingIndex:0,timelines:[],duration:600},r=(0,l.default)({wrapperProp:t,itemArray:n,state:o});o.timelines=r,(0,f.default)(n),(0,u.changeInnerItemPosition)(n),(0,d.default)(e,t,n,o),(0,c.default)(e,t,n,o),window.addEventListener("resize",(0,s.default)({callback:function(){(0,f.default)(n),(0,u.changeInnerItemPosition)(n),(0,u.default)(t,o.scrollingIndex)}}))}}))}},1168:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=n(8784),i=o(n(5479));t.default=function(e){var t=e.wrapperProp,n=e.itemArray,o=e.state,a=t,s=[];return n.forEach((function(e,t){var l=new r.Timeline({duration:o.duration,easing:[1,1,0,0]});l.addCallback("progress",(function(e){var n=e.easing;a.style.transform="translateY(".concat(-1*(i.default.viewport.height*t+i.default.viewport.height*n),"px)")})),l.addCallback("start",(function(){o.isNavigationEvent||(l.isReversed?e.classList.add("active"):e.classList.remove("active"))})),l.addCallback("end",(function(){o.isNavigationEvent||(l.isReversed?n.forEach((function(e){e.classList.remove("active")})):n[o.scrollingIndex].classList.add("active"))})),s.push(l)})),s}},861:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var o=n(8784);t.default=function(e,t,n,r){var i=function(e,t){var n=[],o=document.createElement("div");return o.classList.add("scroll-container-navigation"),t.forEach((function(e){var t=document.createElement("button");t.classList.add("scroll-container-navigation__button"),e.classList.contains("active")&&t.classList.add("active"),n.push(t),o.appendChild(t)})),e.appendChild(o),{wrapperDom:o,buttons:n}}(e,n).buttons,a=t,s=r;i.forEach((function(e,t){!function(e,t,n,o,r){e.timelines[o].addCallback("progress",(function(n){var o=n.progress;e.isNavigationEvent||(r.classList.add("progress"),t.forEach((function(e){e.classList.add("progress")})),0!==o&&1!==o||(r.classList.remove("progress"),t.forEach((function(e){e.classList.remove("progress")}))))})),e.timelines[o].addCallback("start",(function(){e.isNavigationEvent||(e.timelines[o].isReversed?t[o].classList.add("active"):t[o].classList.remove("active"))})),e.timelines[o].addCallback("end",(function(){e.isNavigationEvent||(e.timelines[o].isReversed?t.forEach((function(e){e.classList.remove("active")})):t[e.scrollingIndex].classList.add("active"))}))}(s,i,0,t,a),e.addEventListener("click",(function(e){e.preventDefault(),s.isNavigationEvent=!0;var r=t-s.scrollingIndex,l=s.scrollingIndex;if(s.scrollingIndex=t,0!==r){var c=[];r>0?(s.timelines.forEach((function(e,n){var i=e;if(!(n<l||n>=t)){var a=new o.Timeline({duration:s.duration/r,easing:[.25,.1,.25,1],shouldDestroyOnEnd:!0});a.addCallback("progress",(function(e){var t=e.progress;i.progress=t})),c.push(a)}})),c.forEach((function(e,o,r){0===o&&(e.addCallback("start",(function(){s.isCanScrolling=!1,i[l].classList.remove("active"),n[l].classList.remove("active"),a.classList.add("progress"),i.forEach((function(e){e.classList.add("progress")})),n.forEach((function(e){e.classList.add("progress")}))})),e.play()),r[o+1]?e.addCallback("end",(function(){r[o+1].play()})):e.addCallback("end",(function(){s.isCanScrolling=!0,s.isNavigationEvent=!1,i[t].classList.add("active"),n[t].classList.add("active"),a.classList.remove("progress"),i.forEach((function(e){e.classList.remove("progress")})),n.forEach((function(e){e.classList.remove("progress")}))}))}))):(s.timelines.forEach((function(e,n){var i=e;if(!(n<t||n>=l)){var a=new o.Timeline({duration:s.duration/Math.abs(r),easing:[.25,.1,.25,1],shouldDestroyOnEnd:!0});a.addCallback("progress",(function(e){var t=e.progress;i.progress=1-t})),c.push(a)}})),c.slice().reverse().forEach((function(e,o,r){0===o&&(e.addCallback("start",(function(){s.isCanScrolling=!1,i[l].classList.remove("active"),n[l].classList.remove("active"),a.classList.add("progress"),i.forEach((function(e){e.classList.add("progress")})),n.forEach((function(e){e.classList.add("progress")}))})),e.play()),r[o+1]?e.addCallback("end",(function(){r[o+1].play()})):e.addCallback("end",(function(){s.isCanScrolling=!0,s.isNavigationEvent=!1,i[t].classList.add("active"),n[t].classList.add("active"),a.classList.remove("progress"),i.forEach((function(e){e.classList.remove("progress")})),n.forEach((function(e){e.classList.remove("progress")}))}))})))}}))}))}},5383:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.changeInnerItemPosition=void 0;var r=o(n(5479));t.changeInnerItemPosition=function(e){e.forEach((function(e){var t=e.children[0];e.getBoundingClientRect().height>t.getBoundingClientRect().height?(e.classList.add("centered"),e.classList.remove("with-scroll")):(e.classList.remove("centered"),e.classList.add("with-scroll"))}))},t.default=function(e,t){e.style.transform="translate(0, ".concat(-1*r.default.viewport.height*t,"px)")}},5020:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(5479));t.default=function(e,t,n,o){var i=o;n[i.scrollingIndex].classList.add("active"),n[i.scrollingIndex].classList.contains("with-scroll")&&document.body.classList.add("scrollable"),n.forEach((function(e){!function(e,t){var n=e.children[0],o=t;n&&e.addEventListener("wheel",(function(){if(e.classList.contains("centered"))return o.isCanScrollDown=!0,void(o.isCanScrollUp=!0);if(!e.classList.contains("active"))return o.isCanScrollDown=!1,void(o.isCanScrollUp=!1);var t=n.getBoundingClientRect(),i=r.default.viewport.height;Math.floor(t.bottom)<=i?o.isCanScrollDown=!0:(o.isCanScrollDown=!1,t.top>=0?o.isCanScrollUp=!0:o.isCanScrollUp=!1)}))}(e,i)})),e.addEventListener("wheel",(function(e){i.isCanScrolling&&(i.timelines.forEach((function(e,t){i.isNavigationEvent||(t!==i.scrollingIndex?t===i.scrollingIndex-1&&1===e.progress&&(e.addCallback("start",(function(){i.isCanScrolling=!0}),{isOnce:!0}),e.addCallback("end",(function(){i.isCanScrolling=!1}),{isOnce:!0})):0===e.progress&&(e.addCallback("start",(function(){i.isCanScrolling=!1}),{isOnce:!0}),e.addCallback("end",(function(){i.isCanScrolling=!0}),{isOnce:!0})))})),function(e,t,n){var o=t;o.isNavigationEvent=!1,e.deltaY<0?0!==o.scrollingIndex&&o.isCanScrollUp&&(o.scrollingIndex-=1,o.timelines[o.scrollingIndex].reverse()):e.deltaY>0&&o.scrollingIndex<n.length-1&&o.isCanScrollDown&&(o.scrollingIndex+=1,o.timelines[o.scrollingIndex-1].play()),n[o.scrollingIndex].classList.contains("with-scroll")?document.body.classList.add("scrollable"):document.body.classList.remove("scrollable")}(e,i,n))}))}},8767:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(5479));t.default=function(e){e.forEach((function(e,t){var n=e.querySelectorAll(".v-scrollbar");0!==n.length&&n.forEach((function(e){e.style.transform="translate(0, ".concat(r.default.viewport.height*t,"px)")}))}))}},8932:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=n(8784),i=o(n(5479));t.default=function(){var e,t;return i.default.isMobile||(e=new r.ScrollBar({container:window}),0!==(t=document.querySelectorAll(".scroll-container")).length&&t.forEach((function(e){var t=e.querySelectorAll(".scroll-container__item"),n=e.querySelector(".scroll-container__wrapper");0!==t.length&&n&&t.forEach((function(e){return new r.ScrollBar({container:e})}))}))),e}},469:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(7036));t.default=function(){var e=[];return function(e){var t=document.querySelectorAll(".products");0!==t.length&&t.forEach((function(t,n){var o=(0,r.default)({container:t,className:"products",config:{allowTouchMove:!0,slidesPerView:1,slidesPerGroup:1,spaceBetween:28}});if(o){var i={name:"products-".concat(n),slider:o};e.push(i)}}))}(e),e}},7036:function(e,t,n){var o=this&&this.__assign||function(){return o=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},o.apply(this,arguments)},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(7652)),a=n(4097);t.default=function(e){var t=e.container,n=e.className,r=e.isThumb,s=void 0!==r&&r,l=e.thumb,c=void 0===l?void 0:l,u=e.config,d=e.paginationType,f=void 0===d?"bullets":d,p=e.renderBullets;if(t&&n){var v=t.querySelector(".".concat(n,"-slider").concat(s?"-thumb":"",".swiper"))||null;if(v){var h=t.querySelector(".".concat(n,"-slider-pagination")),_=t.querySelector(".".concat(n,"-slider").concat(s?"-thumb":"","-controls .").concat(n,"-slider-prev")),m=t.querySelector(".".concat(n,"-slider").concat(s?"-thumb":"","-controls .").concat(n,"-slider-next"));return new i.default(v,o({modules:[a.Navigation,a.Thumbs,a.Pagination,a.EffectFade,a.Autoplay,a.Manipulation],thumbs:{swiper:c},pagination:{el:h,clickable:!0,type:f,renderBullet:p},navigation:{nextEl:m,prevEl:_},slidesPerView:1,spaceBetween:30},u))}}}}}]);
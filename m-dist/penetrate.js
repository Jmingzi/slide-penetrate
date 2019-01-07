exports.penetrate=function(e){var t={};function l(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,l),o.l=!0,o.exports}return l.m=e,l.c=t,l.d=function(e,t,r){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(r,o,function(t){return e[t]}.bind(null,o));return r},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l(l.s=0)}([function(e,t,l){"use strict";l.r(t);const r={topics:[],add(e,t,l,r={}){this.topics.push({target:e,event:t,fn:l}),e.addEventListener(t,l,r)},removeAll(){this.topics.forEach(e=>{e.target.removeEventListener(e.event,e.fn)})},preventDefault(e){e.preventDefault()}};t.default={data:()=>({containerElem:null,containerElemHeight:0,scrollElem:null,scrollElemHeight:0,scrollElemScrollTop:0,startY:0}),computed:{isScrollTop(){return 0===this.scrollElemScrollTop},isScrollBottom(){return!!this.scrollElem&&this.scrollElemScrollTop+this.scrollElemHeight===this.containerElemHeight}},directives:{penetrate:{bind(e,t,l){const o=l.context,{contentPanelClass:n,scrollElemClass:s,containerElemClass:i}=t.value;if(r.add(e,"touchmove",r.preventDefault),!o.scrollElem&&(o.scrollElem=o.getChildByClass(e,s),!o.scrollElem))throw new Error("scrollElemClass 不存在");if(r.add(o.scrollElem,"scroll",e=>{o.scrollElemScrollTop=e.target.scrollTop},{passive:!0}),r.add(o.scrollElem,"touchstart",e=>{o.handleStart.call(o,e)}),r.add(o.scrollElem,"touchmove",e=>{e.stopPropagation(),o.handleMove.call(o,e)}),!o.containerElem&&(o.containerElem=o.getChildByClass(o.scrollElem,i),!o.containerElem))throw new Error("containerElemClass 不存在")},inserted(e,t,l){const r=l.context;r.scrollElemHeight=r.scrollElem.offsetHeight,r.containerElemHeight=r.containerElem.offsetHeight},unbind(e,t,l){const o=l.context;r.removeAll(),o.resetAll.call(o)}}},methods:{resetAll(){this.containerElem=null,this.containerElemHeight=0,this.scrollElem=null,this.scrollElemHeight=0,this.scrollElemScrollTop=0,this.startY=0},preventDefault(e){e.preventDefault()},getChildByClass(e,t){if(e.childNodes&&e.childNodes.length){const l=e.childNodes;for(let e=0;e<l.length;e++){if(l[e].classList&&l[e].classList.contains(t))return l[e];if(l[e].classList){const r=this.getChildByClass(l[e],t);if(r)return r}}}},handleStart(e){this.startY=e.touches[0].screenY},handleMove(e){const t=e.touches[0].screenY;let l;t>this.startY?(this.startY=t,l="down"):t<this.startY&&(this.startY=t,l="up"),("up"===l&&this.isScrollBottom||"down"===l&&this.isScrollTop)&&e.preventDefault()}}}}]);
//# sourceMappingURL=penetrate.js.map
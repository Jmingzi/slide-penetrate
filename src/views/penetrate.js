(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["penetrate"] = factory();
	else
		root["penetrate"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/views/scroll.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/views/scroll.js":
/*!*****************************!*\
  !*** ./src/views/scroll.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import 'core-js/modules/_array-from-iterable'
const event = {
  topics: [],

  add(target, event, fn, options = {}) {
    this.topics.push({
      target,
      event,
      fn
    });
    target.addEventListener(event, fn, options);
  },

  removeAll() {
    this.topics.forEach(item => {
      item.target.removeEventListener(item.event, item.fn);
    });
  },

  preventDefault(e) {
    e.preventDefault();
  }

};
/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      // contentPanelElem: null,
      containerElem: null,
      containerElemHeight: 0,
      scrollElem: null,
      scrollElemHeight: 0,
      scrollElemScrollTop: 0,
      startY: 0
    };
  },

  computed: {
    isScrollTop() {
      return this.scrollElemScrollTop === 0;
    },

    isScrollBottom() {
      return this.scrollElem ? this.scrollElemScrollTop + this.scrollElemHeight === this.containerElemHeight : false;
    }

  },
  directives: {
    penetrate: {
      bind(el, binding, vnode) {
        const self = vnode.context;
        const {
          contentPanelClass,
          scrollElemClass,
          containerElemClass
        } = binding.value;
        event.add(el, 'touchmove', event.preventDefault); // 初始化节点
        // if (!self.contentPanelElem) {
        //   self.contentPanelElem = self.getChildByClass(el, contentPanelClass)
        //   if (!self.contentPanelElem) throw new Error('contentPanelClass 不存在')
        // }
        // event.add(self.contentPanelElem, 'touchmove', event.preventDefault)

        if (!self.scrollElem) {
          self.scrollElem = self.getChildByClass(el, scrollElemClass);
          if (!self.scrollElem) throw new Error('scrollElemClass 不存在');
        } // self.scrollElemHeight = self.scrollElem.offsetHeight


        event.add(self.scrollElem, 'scroll', e => {
          self.scrollElemScrollTop = e.target.scrollTop;
        }, {
          passive: true
        });
        event.add(self.scrollElem, 'touchstart', e => {
          self.handleStart.call(self, e);
        });
        event.add(self.scrollElem, 'touchmove', e => {
          e.stopPropagation();
          self.handleMove.call(self, e);
        });

        if (!self.containerElem) {
          self.containerElem = self.getChildByClass(self.scrollElem, containerElemClass);
          if (!self.containerElem) throw new Error('containerElemClass 不存在');
        } // self.containerElemHeight = self.containerElem.offsetHeight

      },

      inserted(el, binding, vnode) {
        const self = vnode.context;
        self.scrollElemHeight = self.scrollElem.offsetHeight;
        self.containerElemHeight = self.containerElem.offsetHeight;
      },

      unbind(el, binding, vnode) {
        const self = vnode.context;
        event.removeAll();
        self.resetAll.call(self);
      }

    }
  },
  methods: {
    resetAll() {
      // this.contentPanelElem = null
      this.containerElem = null;
      this.containerElemHeight = 0;
      this.scrollElem = null;
      this.scrollElemHeight = 0;
      this.scrollElemScrollTop = 0;
      this.startY = 0;
    },

    preventDefault(e) {
      e.preventDefault();
    },

    getChildByClass(parent, childClass) {
      if (parent.childNodes && parent.childNodes.length) {
        const childs = parent.childNodes;

        for (let i = 0; i < childs.length; i++) {
          if (childs[i].classList && childs[i].classList.contains(childClass)) {
            return childs[i];
          } else if (childs[i].classList) {
            const item = this.getChildByClass(childs[i], childClass);

            if (item) {
              return item;
            }
          }
        }
      }
    },

    handleStart(e) {
      this.startY = e.touches[0].screenY;
    },

    handleMove(e) {
      const moveY = e.touches[0].screenY;
      let dir;

      if (moveY > this.startY) {
        this.startY = moveY;
        dir = 'down';
      } else if (moveY < this.startY) {
        this.startY = moveY;
        dir = 'up';
      } // console.log(dir, `this.isScrollBottom ${this.isScrollBottom}`, `this.isScrollTop ${this.isScrollTop}`)


      if (dir === 'up' && this.isScrollBottom || dir === 'down' && this.isScrollTop) {
        // console.log('禁止滚动')
        e.preventDefault();
      }
    }

  }
});

/***/ })

/******/ });
});
//# sourceMappingURL=penetrate.js.map

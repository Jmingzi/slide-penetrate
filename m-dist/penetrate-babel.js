(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "core-js/modules/_array-from-iterable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("core-js/modules/_array-from-iterable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._arrayFromIterable);
    global.scroll = mod.exports;
  }
})(this, function (_exports, _arrayFromIterable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var event = {
    topics: [],
    add: function add(target, event, fn) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      this.topics.push({
        target: target,
        event: event,
        fn: fn
      });
      target.addEventListener(event, fn, options);
    },
    removeAll: function removeAll() {
      this.topics.forEach(function (item) {
        item.target.removeEventListener(item.event, item.fn);
      });
    },
    preventDefault: function preventDefault(e) {
      e.preventDefault();
    }
  };
  var _default = {
    data: function data() {
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
      isScrollTop: function isScrollTop() {
        return this.scrollElemScrollTop === 0;
      },
      isScrollBottom: function isScrollBottom() {
        return this.scrollElem ? this.scrollElemScrollTop + this.scrollElemHeight === this.containerElemHeight : false;
      }
    },
    directives: {
      penetrate: {
        bind: function bind(el, binding, vnode) {
          var self = vnode.context;
          var _binding$value = binding.value,
              contentPanelClass = _binding$value.contentPanelClass,
              scrollElemClass = _binding$value.scrollElemClass,
              containerElemClass = _binding$value.containerElemClass;
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


          event.add(self.scrollElem, 'scroll', function (e) {
            self.scrollElemScrollTop = e.target.scrollTop;
          }, {
            passive: true
          });
          event.add(self.scrollElem, 'touchstart', function (e) {
            self.handleStart.call(self, e);
          });
          event.add(self.scrollElem, 'touchmove', function (e) {
            e.stopPropagation();
            self.handleMove.call(self, e);
          });

          if (!self.containerElem) {
            self.containerElem = self.getChildByClass(self.scrollElem, containerElemClass);
            if (!self.containerElem) throw new Error('containerElemClass 不存在');
          } // self.containerElemHeight = self.containerElem.offsetHeight

        },
        inserted: function inserted(el, binding, vnode) {
          var self = vnode.context;
          self.scrollElemHeight = self.scrollElem.offsetHeight;
          self.containerElemHeight = self.containerElem.offsetHeight;
        },
        unbind: function unbind(el, binding, vnode) {
          var self = vnode.context;
          event.removeAll();
          self.resetAll.call(self);
        }
      }
    },
    methods: {
      resetAll: function resetAll() {
        // this.contentPanelElem = null
        this.containerElem = null;
        this.containerElemHeight = 0;
        this.scrollElem = null;
        this.scrollElemHeight = 0;
        this.scrollElemScrollTop = 0;
        this.startY = 0;
      },
      preventDefault: function preventDefault(e) {
        e.preventDefault();
      },
      getChildByClass: function getChildByClass(parent, childClass) {
        if (parent.childNodes && parent.childNodes.length) {
          var childs = parent.childNodes;

          for (var i = 0; i < childs.length; i++) {
            if (childs[i].classList && childs[i].classList.contains(childClass)) {
              return childs[i];
            } else if (childs[i].classList) {
              var item = this.getChildByClass(childs[i], childClass);

              if (item) {
                return item;
              }
            }
          }
        }
      },
      handleStart: function handleStart(e) {
        this.startY = e.touches[0].screenY;
      },
      handleMove: function handleMove(e) {
        var moveY = e.touches[0].screenY;
        var dir;

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
  };
  _exports.default = _default;
});

//# sourceMappingURL=penetrate-babel.js.map
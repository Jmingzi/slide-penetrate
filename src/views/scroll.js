const event = {
  topics: [],

  add(target, event, fn, options = {}) {
    this.topics.push({
      target,
      event,
      fn
    })
    target.addEventListener(event, fn, options)
  },

  removeAll() {
    this.topics.forEach(item => {
      item.target.removeEventListener(item.event, item.fn)
    })
  },

  preventDefault(e) {
    e.preventDefault()
  }
}

export default {
  data() {
    return {
      // contentPanelElem: null,
      containerElem: null,
      containerElemHeight: 0,
      scrollElem: null,
      scrollElemHeight: 0,
      scrollElemScrollTop: 0,
      startY: 0
    }
  },

  computed: {
    isScrollTop() {
      return this.scrollElemScrollTop === 0
    },

    isScrollBottom() {
      return this.scrollElem
        ? this.scrollElemScrollTop + this.scrollElemHeight === this.containerElemHeight
        : false
    }
  },

  directives: {
    penetrate: {
      bind(el, binding, vnode) {
        const self = vnode.context
        const { contentPanelClass, scrollElemClass, containerElemClass } = binding.value
        event.add(el, 'touchmove', event.preventDefault)

        // 初始化节点
        // if (!self.contentPanelElem) {
        //   self.contentPanelElem = self.getChildByClass(el, contentPanelClass)
        //   if (!self.contentPanelElem) throw new Error('contentPanelClass 不存在')
        // }
        // event.add(self.contentPanelElem, 'touchmove', event.preventDefault)

        if (!self.scrollElem) {
          self.scrollElem = self.getChildByClass(el, scrollElemClass)
          if (!self.scrollElem) throw new Error('scrollElemClass 不存在')
        }
        // self.scrollElemHeight = self.scrollElem.offsetHeight
        event.add(self.scrollElem, 'scroll', e => {
          self.scrollElemScrollTop = e.target.scrollTop
        }, { passive: true })

        event.add(self.scrollElem, 'touchstart', e => {
          self.handleStart.call(self, e)
        })

        event.add(self.scrollElem, 'touchmove', e => {
          e.stopPropagation()
          self.handleMove.call(self, e)
        })

        if (!self.containerElem) {
          self.containerElem = self.getChildByClass(self.scrollElem, containerElemClass)
          if (!self.containerElem) throw new Error('containerElemClass 不存在')
        }
        // self.containerElemHeight = self.containerElem.offsetHeight
      },

      inserted(el, binding, vnode) {
        const self = vnode.context
        self.scrollElemHeight = self.scrollElem.offsetHeight
        self.containerElemHeight = self.containerElem.offsetHeight
      },

      unbind(el, binding, vnode) {
        const self = vnode.context
        event.removeAll()
        self.resetAll.call(self)
      }
    }
  },

  methods: {
    resetAll() {
      // this.contentPanelElem = null
      this.containerElem = null
      this.containerElemHeight = 0
      this.scrollElem = null
      this.scrollElemHeight = 0
      this.scrollElemScrollTop = 0
      this.startY = 0
    },

    preventDefault(e) {
      e.preventDefault()
    },

    getChildByClass(parent, childClass) {
      if (parent.childNodes && parent.childNodes.length) {
        const childs = Array.from(parent.childNodes)
        for (let i = 0; i < childs.length; i++) {
          if (childs[i].classList && childs[i].classList.contains(childClass)) {
            return childs[i]
          } else if (childs[i].classList) {
            const item = this.getChildByClass(childs[i], childClass)
            if (item) {
              return item
            }
          }
        }
      }
    },

    handleStart(e) {
      this.startY = e.touches[0].screenY
    },

    handleMove(e) {
      const moveY = e.touches[0].screenY
      let dir
      if (moveY > this.startY) {
        this.startY = moveY
        dir = 'down'
      } else if (moveY < this.startY) {
        this.startY = moveY
        dir = 'up'
      }
      // console.log(dir, `this.isScrollBottom ${this.isScrollBottom}`, `this.isScrollTop ${this.isScrollTop}`)
      if (
        dir === 'up' && this.isScrollBottom ||
        dir === 'down' && this.isScrollTop
      ) {
        // console.log('禁止滚动')
        e.preventDefault()
      }
    }
  }
}

<template>
  <div class="home">
    <div class="home__top">
      <div v-for="(item, i) in list" :key="i" class="home__item">{{ i + 1 }} - {{ item }}</div>
    </div>
    <div class="home__bottom">
      <a href="javascript:;" @click="show = true">无限制列表</a>
      <a href="javascript:;" @click="show2 = true">有限制列表</a>
    </div>

    <div
      v-if="show"
      class="modal"
      @click="show = false"
    >
      <div class="modal__content">
        <div class="modal__content--title">无限制列表</div>
        <div class="modal__content--wrap">
          <div class="modal__content--scroll">
            <div v-for="(item, i) in list" :key="i" class="modal__item">{{ i + 1 }} - {{ item }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="show2"
      class="modal"
      @click="show2 = false"
      v-penetrate="{
        scrollElemClass: 'modal__content--wrap',
        containerElemClass: 'modal__content--scroll'
      }"
    >
      <div class="modal__content">
        <div class="modal__content--title">有限制列表</div>
        <div class="modal__content--wrap">
          <div class="modal__content--scroll">
            <div v-for="(item, i) in list" :key="i" class="modal__item">{{ i + 1 }} - {{ item }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scroll from './scroll'

export default {
  name: 'home',

  mixins: [scroll],

  data() {
    return {
      list: (new Array(20)).fill('this is nothing'),
      show: false,
      show2: false
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
  .home
    &__top
       position absolute
       top 0
       bottom 60px
      width 100%
       overflow auto
       // overflow hidden
       -webkit-overflow-scrolling touch
      // overscroll-behavior none
    &__item
      line-height 50px
      border-bottom 1px #f2f2f2 solid
    &__bottom
      position absolute
      bottom 0
      width 100%
      height 60px
      background-color #eee

  .modal
    position fixed
    width 100%
    top 0
    bottom 0
    background-color rgba(0,0,0,.5)
    &__content
      position absolute
      width 300px
      height 200px
      background-color #fff
      top 50%
      left 50%
      transform translate(-50%,-50%)
      &--title
        line-height 50px
      &--wrap
        position absolute
        top 50px
        width 100%
        bottom 0
        overflow: auto
        -webkit-overflow-scrolling touch
    &__item
      line-height 30px
      border-bottom 1px #f2f2f2 solid
</style>

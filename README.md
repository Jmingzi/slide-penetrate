## Vue移动端滑动穿透解决方案

扫码查看demo

<img src="./qrcode-demo.png" width=200px>

适用场景

- 弹窗遮罩内滚动
- 穿透到body滚动
- 穿透到body内的局部滚动

### template结构

```html
<div class="modal__content--wrap">
  <div class="modal__content--scroll">
    <div v-for="(item, i) in list" :key="i" class="modal__item">{{ i + 1 }} - {{ item }}</div>
  </div>
</div>
```

为一个三层结构，`modal__content--wrap`提供滚动容器，`modal__content--scroll`提供滚动高度

当然还需要在最外层遮罩上绑定指令

```html
<div
  class="modal"
  v-penetrate="{
    scrollElemClass: 'modal__content--wrap',
    containerElemClass: 'modal__content--scroll'
  }"
>
  ...
</div>
```

## 使用

```
npm i vue-penetrate -S
```

```js
import penetrate from 'vue-penetrate'

export default {
  mixins: [penetrate]
}
```





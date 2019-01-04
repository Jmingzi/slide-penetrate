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

## 问题

1. 通过babel直接编译转化为`commonjs`后的结果依旧包含`require(/Users/yangming/.../node_modules/)`，如何解决？
2. 通过webpack打包`commonjs`，始终会注入`core-js`的引入，为`156kb`，如何解决？
3. 通过`vue-cli-service build --target lib --name a.js`打包后也仍然包含`core-js`，为`60.55kb`，比webpack小



## Vue移动端滑动穿透解决方案

扫码查看demo

<img src="./qrcode.png" width=200px>

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

## 总结

导出成包有2个步骤

- 先将代码转成es5的风格，依赖的部分只是将`import` => `require`，因为babel不会处理模块依赖
- 再用webpack解析依赖，也可以用[externals](https://webpack.docschina.org/configuration/externals/)字段，排除包的注入

即使只引入了一个`Array.from`方法，也会额外注入将近20kb的依赖，这是不值得的，在一些小的包中，可以将这些作为[externals](https://webpack.docschina.org/configuration/externals/)字段选项注入。

通过`externals`引入的包在打包后会被解析为`require(bundle-name)`，那其实和babel的作用是一致的，那么很多时候我们可以考虑直接用babel来转化，因为babel也支持`modules`

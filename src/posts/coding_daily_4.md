---
title: "[代码日记] 上手实践webpack、babel"
author: NriotHrreion
categories:
- "代码日记"
tags:
- "开发"
- "javascript"
excerpt: "为了实践webpack、 babel等模块的配置, 我给自己写了一个utils"
date: 2022-04-17
---

Webpack和Babel这两个工具非常好用, 但是要用好还是有点难度的. 于是我做了个`nriot-utils`给我自己.

为了完成它, 我专门跟着官网的教程走了一遍, 顺便还装了`ts-loader`来加载Typescript代码.

虽然`nriot-utils`非常简单, 只有那几个功能, 但是在对Webpack的配置上我还是花了很多时间. 你可以在这个博客的任何一个地方打开浏览器Devtools, 然后输入`NUtils`, 就可以尝试`nriot-utils`了（因为博客引入了它）

![img1.png](/img/img1.png)

## 安装 & 使用

```cmd
npm i nriot-utils --save
```

```js
const { NUtils } = require("nriot-utils");

// 获取随机数
NUtils.getRandom();
// 删除数组中的某一项
NUtils.arrayItemDelete([1, 2, 3], 2); // [1, 2]
// 将数组中某一项移到最后一位
NUtils.arrayItemToLast([1, 2, 3], 0); // [2, 3, 1]
// 对比两个对象是否相同
NUtils.isObjectEqual({a: 1}, {a: 1}); // true
// 睡觉
NUtils.sleep(1000); // Sleep for 1000ms (1s)

// 调用WASM (wasm变量中存储的是test.wasm中导出的函数)
const fs = require("fs");
(async function() {
    var wasm = await new NUtils.WASM(fs.readFileSync("test.wasm")).getWASMInstance();
    // ...
})();
```

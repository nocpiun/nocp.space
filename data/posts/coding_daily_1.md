---
title: "[代码日记] 为nodejs.org网站源码提PR"
author: NriotHrreion
categories:
- "代码日记"
tags:
- "开发"
- "网站"
- "javascript"
excerpt: "网站链接: [nodejs.org](https://nodejs.org)<br><br>最近我在Github上给nodejs.org的网站源码提了一个[Pull Request](https://github.com/nodejs/nodejs.org/pull/4139), 大致内容是添加网页深色模式. 所以你如果在浏览器开启了深色模式, 那么你访问nodejs.org时就能看到我添加的样式."
date: 2021-10-12
---

网站链接: [nodejs.org](https://nodejs.org)

最近我在Github上给nodejs.org的网站源码提了一个[Pull Request](https://github.com/nodejs/nodejs.org/pull/4139), 大致内容是添加网页深色模式. 所以你如果在浏览器开启了深色模式, 那么你访问nodejs.org时就能看到我添加的样式.

我发出PR之后, 很快就有管理员来审核. PR合并之后, 他们还有人来帮优化我原本写的样式.

就在昨天, 有个人来这里提了一个[issue](https://github.com/nodejs/nodejs.org/issues/4167), 说切换到深色模式之后, 网站内跳转页面时会闪烁一下.

于是我把这个bug修复, 并重新提了一个[Pull Request](https://github.com/nodejs/nodejs.org/pull/4174).

修复这个bug的思路是: 想办法让那段深色模式的js脚本在css加载之前被加载.

我具体这么做: 新建一个js文件, 把切换深色模式的脚本写进去, 而原本写那段脚本的地方留下一些必须要在css和dom加载之后才执行的代码(添加点击事件之类的), 最后在`<head>`标签中添加这个新js的引入.

---
title: "[代码日记] Calcium源码仓库喜提20stars"
author: NriotHrreion
categories:
- "代码日记"
tags:
- "开发"
- "javascript"
excerpt: "还记得我写的那个计算器吗？它现在已经获得了20个star了"
date: 2024-01-21
---

最近，Calcium源码仓库来参观的人越来越多了，star也是涨了挺多，让它一跃成为了我star数最多的仓库。这个数字与其他的大项目比起来仍然不值一提，但这也算是我的一小步成就了。随着star的不断增加，fork数也涨到了4个，尽管那些来fork的人都没有对代码进行任何修改，但这也算对我的一种肯定。

当下的Calcium功能已经较为齐全，但仍然有许多的不足和bug，以及一些一直以来的“屎山”——虽然我在不断地克服。

提到屎山，就不得不让我想到那个计算器输入框的代码。输入框组件的代码一直都比较抽象，甚至于有的地方随着代码量不断增多变得越来越难以阅读和维护。这次，我想为输入框添加一个字符高亮的功能（就是给诸如变量、函数之类的字符着色），结果我发现这部分的代码过于难以修改，所以我就重写了这里的一部分代码，增加了[`InputContext`](https://github.com/nocpiun/calcium/blob/fcdbe1823dd9c5c35eb3912c47b70bcddf60b703/src/components/InputBox.tsx#L197)，用来管理输入的字符。

但是，毕竟这个类里面存储的字符并不是组件的state，所以在这些字符发生改变的时候，组件并不会自动重新渲染。因此，我需要增加一个机制，让它能自动检测字符发生改动然后刷新组件。下面是我想到的几个解决方案：

### ProxyObject

这是我最开始想到的解决方案，因为`ProxyObject`可以通过代理的方式监听对象内部属性的改变，进而进行对应的操作，而不需要借助`Emitter`事件系统。但这不知道为什么，在有的时候，字符改动的时候它会莫名其妙地拦截这个改动，进而使这个改动失效。

### Setter

这是我之后想到的另一个解决方案，因为`Setter`的写法会更加简单易懂。但相应地，它就需要借助`Emitter`事件系统。那么，为什么`ProxyObject`不需要`Emitter`，而`Setter`就需要呢？这正是因为前者是在外部监听属性变化的，而后者恰恰相反。

有了解决方案之后，我就添加了下面的[代码](https://github.com/nocpiun/calcium/blob/fcdbe1823dd9c5c35eb3912c47b70bcddf60b703/src/components/InputBox.tsx#L201-L212)：

```ts
private _symbolList: InputSymbol[] = [];

public get symbolList(): typeof this._symbolList {
    return this._symbolList;
}

public set symbolList(newValue: typeof this._symbolList) {
    this._symbolList = newValue;
    /**
     * Manually emit the event that makes `InputBox` component being updated forcedly,
     * so that the value in the input box will be consistent with `symbolList`.
     */
    Emitter.get().emit("symbol-list-update");
}
```

原理很简单，我就不解释了。

## InputContext的作用

原本没有`InputContext`的时候，所有字符的管理和操作都得靠输入框组件来完成，甚至由于字符存储的方式（原本是[以`string`存储的](https://github.com/nocpiun/calcium/blob/e6ffa0788b9008bc4b44fc218edff74567d486d6/src/components/InputBox.tsx#L18)，现在以`string[]`来存储），字符的操作也更加复杂。现在有了InputContext之后，就可以把一些常用的操作封装成方法，接着就只要简单调用这些方法就能完成先前复杂的操作了。

## 小结

Calcium达到20stars之际，我写的代码仍然存在许多问题需要解决，就如上文提到的输入框组件的问题。因此我还需要更加努力地提升技术力，进而让这个计算器更加强大，让它的代码更加完备。

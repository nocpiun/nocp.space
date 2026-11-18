---
title: 一个控制台小游戏
author: NriotHrreion
tags:
- "冒险游戏"
- "开发"
- "javascript"
date: 2020-09-23
---

这是一个很粗糙控制台游戏.

如果你好奇这个游戏的操作原理, 那么你可以去这个工程的 [Github仓库](https://github.com/NriotHrreion/Console-game) 看看, 或者继续往下看.

## 原理

在源代码 **lib.js** 中, 你可以在 `setCommand()` 方法中找到下面的代码:

```javascript
// command 是要设置的指令名称
// func 要执行的指令程序
setCommand(command, func) {
    window[command] = command; // 将指令名称设为全局变量
    Object.defineProperty(window, command, { // 设置 getter
        get: func,
        enumerable: true
    });
}
```

**代码解释**

将要设置的指令定义为全局变量, 接着为这个全局变量设置getter.

这样, 当你在控制台输入指令时, getter便会执行刚刚设置的程序.

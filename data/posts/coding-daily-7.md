---
title: "[代码日记] 编译运行VSCode源码"
author: NriotHrreion
categories:
- "代码日记"
tags:
- "开源"
- "javascript"
- "vscode"
excerpt: "编译运行VSCode源码过程中的一些事"
date: 2024-02-19
---

我以前曾经尝试去编译运行Chromium内核的源码，但屡次失败，于是想挑个软一点的柿子捏，打算编译运行VSCode。不过VSCode我之前也尝试过几次，但都失败了。而这几天我再次挑战VSCode源码编译，终于成功了。这篇文章记录了我从开始到成功编译的过程和遇到的问题，**其中所记录的操作过程包含我的误操作和漏操作，在文章后面有问题的解释和解决，请不要重蹈我的覆辙**。

## 准备工作

首先，我找到了微软官方给出的[VSCode编译运行指南](https://github.com/microsoft/vscode/wiki/How-to-Contribute)，并开始准备工作。

由于我电脑的系统是Windows，所以根据指南，我检查了我电脑上安装的，编译VSCode所必须的软件：**Git**、**Node.js**、**Yarn 1**、**Python**。接着，我看到文档中写道：

```md
if you install Node on your system using the Node installer from the Node.JS page then ensure that you have installed the 'Tools for Native Modules'. Everything should work out of the box then.
```

意思就是说，如果你是使用Node.js官方给的安装器安装的Node.js，那么你需要确保你有在安装时勾选并下载“Tools for Native Modules”，接下来的很多东西都是在此基础上运作的。因为我当时安装Node.js的时候没有勾选那个选项，所以我就去[Node.js官网](https://nodejs.org)重新下载安装了Node.js。

## 下载源码

这步简单！先fork[VSCode源码仓库](https://github.com/microsoft/vscode)，然后运行

```bash
git clone https://github.com/{你的GitHub名称}/vscode.git
```

但是由于源码仓库体积过大，git下载了一会就罢工了，然后抛出错误：

```txt
RPC failed; curl 92 HTTP/2 stream 0 was not closed cleanly: CANCEL (err 8)
```

于是我执行下面的指令解决了报错（在下载完源码仓库之后，把`HTTP/1.1`改成`HTTP/2`再执行一遍这个指令即可恢复）

```bash
git config --global http.version HTTP/1.1
```

接着，我又得到一个错误：

```txt
RPC failed; curl 18 transfer closed with outstanding read data remaining
```

查了各大网站之后得到一个解决方案，那就是先浅下载，然后再进行深度下载。执行下面的指令

```bash
git clone https://github.com/{你的GitHub名称}/vscode.git --depth 1
cd vscode
git fetch --unshallow
```

那么源码到此就下载完成了。

## 安装依赖

官方文档给出的安装依赖指令是

```bash
yarn
```

运行了之后，只要前文提到的那些必须软件你装好了（尤其是Python）基本就没什么问题。这一步我没有遇到什么问题。

## 编译

接下来到了最关键的一步，编译代码。官方给出的编译指令是

```bash
yarn watch
```

或是用VSCode打开源码文件夹，然后同时按下`Ctrl`+`Shift`+`B`（MacOS是`CMD`+`Shift`+`B`）。

但是这一步就没那么顺利了，我运行后立刻就看到报错：

```txt
Error: Cannot find module 'ternary-stream'
```

于是我想当然地就运行了

```bash
yarn add ternary-stream
```

但结果却得到另一个报错：

```txt
Error: Cannot find module 'vscode-gulp-watch'
```

那当然就是

```bash
yarn add vscode-gulp-watch
```

奇怪的是，接下来我再次得到刚刚`Error: Cannot find module 'ternary-stream'`的报错——好家伙，搁着死循环了是吧！又是查遍了各大网站，我发现，这个问题的根源在于我没有装好C++依赖，原因是我漏读了官方文档中的一些内容。

官方文档在前面写道：

```md
..., add the following components corresponding to the architecture you are building for (x64/ARM/ARM64) and restart your build session

- MSVC Spectre-mitigated libs (latest)
- C++ ATL for latest build tools with Spectre Mitigations
- C++ MFC for latest build tools with Spectre Mitigations
```

所以，我照着文档将里面提到的这3个C++依赖装好，重新运行了`yarn watch`。但本以为这次将顺利执行，结果我又撞上了另一个报错：

```txt
Unhandled Rejection at: Promise Promise {
  <rejected> Error: bad export type for `tree_sitter_typescript_external_scanner_create`: undefined
      at ...
      at ...
      at ...
      at ...
      at ...
} reason: Error: bad export type for `tree_sitter_typescript_external_scanner_create`: undefined
    at ...
    at ...
    at ...
    at ...
    at ...
```

于是，我将报错复制下来，粘贴到搜索框去搜索，可惜我没有找到什么相关的信息，除了这个VSCode源码仓库的[issue](https://github.com/microsoft/vscode/issues/166265#issuecomment-1361662887)。由于信息太少了，我就只好自己摸索，在这里卡了很久。最后，我发现这个报错与Node.js版本有关，但我明明是去官网下载的**最新版`20.11.1`**，怎么会出问题呢？

而问题就出在这！我再次打开文档，查看前面的段落，发现文档中有提到Node.js的版本号必须符合`>=18.15.x and <19`。所以我又一次重新安装了Node.js，将版本从`20.11.1`退回到`18.16.0`。

最后再次运行`yarn watch`，成功！

## 运行

官方给出的运行指令是

```bash
# Windows
./scripts/code.bat
# MacOS & Linux
./scripts/code.sh
```

只要你前面的`yarn watch`成功执行，那么这一步应该也不会出什么问题。

## 修改代码 & 调试

首先，用VSCode打开源码的根目录文件夹，然后从侧边栏进入“运行和调试”。

![打开“运行和调试”](/static/blog/img23.png)

然后点击上面的“开始调试”按钮，就可以开始修改和调试代码了。

![点击“开始调试”按钮](/static/blog/img24.png)

## 小结

这次编译运行VSCode过程中的许多曲折其实是因为我没有认真阅读文档，这恰恰说明了文档中的每一个字都不是多余的，阅读的时候不能随意落下某些段落或者内容，虽然报错有时是不可避免的，但对文档多留个心眼也可以大大节约精力和时间成本。

---
title: "[代码日记] PR经历记录"
author: NriotHrreion
categories:
- "代码日记"
tags:
- "开发"
- "网站"
- "javascript"
excerpt: "上一篇代码日记里, 有个人来提了一个issue, 反馈了网站内深色模式下跳转页面闪烁的问题.<br><br>于是我迅速提交了一个修复这个bug的PR, 不久之后就被合并了."
date: 2021-10-15
---

上一篇代码日记里, 有个人来提了一个[issue](https://github.com/nodejs/nodejs.org/issues/4167), 反馈了网站内深色模式下跳转页面闪烁的问题.

于是我迅速提交了一个修复这个bug的PR, 不久之后就被合并了.

在Github中, Pull Request里其实也藏着挺多东西的:

首先, 提交PR前你需要先Fork然后下载源码. 这里要用`git clone https://github.com/your_name/repo_name`指令下载源码, 因为这么做的话系统会自动生成`.git`文件夹, 方便后面的提交操作.

接着, 修改源码, 通过`git push`提交代码.

然后在Github进入你Fork到的仓库中, 此时你应该能看到你刚刚提交的东西(如果没看到, 那你应该好好检查一下上面的步骤), 点击Pull Requests, 创建一个新的PR即可.

最后你就可以在官方仓库的Pull Requests里看到你提交的PR了.

顺带一提, 提交了PR之后你首先要等的是reviewer来审核通过你的代码, 最后才能被合并. **还有, 不要提交错误或者垃圾PR, 这样会浪费reviewer们的时间!!**

---
title: ICraft开发日志-3
author: NriotHrreion
categories:
- "ICraft开发日志"
tags:
- "开发"
- "ICraft"
excerpt: "今天又对ICraft做了一些小更新."
date: 2021-09-18
---

今天又对ICraft做了一些小更新.

首先是游戏内的快捷键, 快捷键功能本来很早就想做的, 但因为各种原因拖到了现在才做.

其次是游戏内左上角的那个图标. 那里原本是用于显示存档的图标的, 但是我觉得没什么用, 于是就用ICraft的图标稍微改一下, 替换了上去.

最后是"检查更新"的功能. 我以前在关于页面放了一个"检查更新"的链接, 链接的地址是到[ICraft的Releases列表](https://github.com/NriotHrreion/ICraft-App/releases). 现在我觉得这个"检查更新"就应该点击之后直接检查, 而不是让用户自己手动去检查.

我通过调用Github API来实现"检查更新"的功能. Github API中, 可以查询一个仓库的Releases列表, 于是我就调用这个API, 获取列表的第一个值, 并且用当前的版本号与这个值的版本号作比较, 以此实现这个功能.

以上就是这次的改动.

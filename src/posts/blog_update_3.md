---
title: "[博客更新] 现已支持RSS Feed"
author: NriotHrreion
tags:
- "公告"
- "博客"
- "网站"
excerpt: "NBlog现已支持**RSS Feed**订阅"
date: 2024-02-23
---

作为一个博客，RSS Feed是必不可少的，但自从全面重写了博客之后，NBlog就不支持RSS Feed了。所以，今天我再次更新博客，让博客重新支持RSS Feed。

但是，要从何下手呢？既然要在构建整个网站的时候生成feed文件，那就得对Webpack配置进行一些修改了。我写了一个Webpack插件，用这个插件在构建网站的时候读取博客里所有的文章，然后生成feed文件。如果你也想使用Webpack配置RSS Feed，那么你就可以直接使用我写好的插件，稍微进行一些配置即可。

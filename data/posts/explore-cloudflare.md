---
title: 探索 Cloudflare
author: NriotHrreion
tags: 
- "博客"
- "网站"
- "Cloudflare"
excerpt: "既然我已经把博客从Next.js迁移到了vinext，为什么不把整个博客连同其他服务一起搬到Cloudflare呢？本文记录探索Cloudflare的一些收获，包括迁移的过程和IP优选"
date: 2026-08-19
---

在不久前，我就将这个博客从Next.js迁移到了[vinext](https://vinext.dev)，顺便把原先的eslint替换成了oxlint。然而，我发现Codex在帮我迁移博客的时候，还添加了一个叫做`nitro`的包。经过了解，我发现这个包是用来把vinext打包的Cloudflare Worker产物转换为Netlify可部署的产物的。

经过一番调查，我发现我之前使用的托管平台Netlify是同类产品中，中国大陆访问速度最慢的，而Cloudflare是相对更快的平台。那既然如此，为何不直接把博客给部署到Cloudflare上呢？

## 迁移到 Cloudflare

Cloudflare的产品和DNS服务有强绑定的关系，所以迁移的第一步就是把我的域名解析改到Cloudflare上，用Cloudflare来管理我的域名。

接下来，我让Codex把`nitro`移除，把项目设置成可以直接部署到Cloudflare的状态，接着在Cloudflare Workers页面导入Github仓库，直接开始部署。部署成功后把域名绑定上来就可以了，打开域名旁边的橙云还能享受Cloudflare的全球CDN代理服务。

## CDN 代理

域名旁边的那个橙云图标就是Cloudflare CDN代理的开关，通过CDN代理就可以提升网站的访问速度。

![域名旁的橙云](/static/blog/explore-cloudflare-1.png)

当我们访问网站的时候，浏览器会向DNS服务器询问网站域名指向的资源在哪，得到的可能是一串IP地址（A记录或AAAA记录），也有可能是一个域名（CNAME记录）。如果我关闭橙云，那么Cloudflare的DNS接到请求后就会直接把我事先设置好的解析记录返回给浏览器，浏览器拿着这条记录再继续去访问网站。此时，浏览器就是直接向网站发起连接，不经过Cloudflare中转。

但网站的服务器可能和用户隔了十万八千里的地理距离，如果直接连接，访问速度就会很慢。这时如果打开橙云，让连接经过Cloudflare CDN代理，那么访问速度就会有很大提升。

启用CDN代理后，浏览器向DNS服务器请求到的就不再是我设置的解析记录了，而是Cloudflare的Anycast IP地址。此时，浏览器发起的请求就会先经过离你地理位置最近的Cloudflare边缘服务器中转，再到达目标网站。而Cloudflare CDN通常会对网站进行缓存，所以在命中缓存的情况下，访问请求甚至不会经过目标网站，而是直接由CDN返回资源。

### Anycast

通常，一个IP地址对应一台服务器或一个机房（也就是Unicast），而Cloudflare的Anycast就允许一个IP根据地理位置指向不同的服务器。比如：同一个`104.x.x.x`的Cloudflare IP，在香港会访问到香港的边缘服务器，在新加坡会访问到新加坡的边缘服务器，在洛杉矶会访问到洛杉矶的边缘服务器。

## IP 优选？

Cloudflare虽然在中国大陆也有部署CDN服务器，但普通免费用户是无法接触到这些境内速度高的服务器的，所以在中国大陆访问由Cloudflare代理的网站，速度可能不会有提升，甚至会下降，但这很大一部分原因是因为Cloudflare把你的请求路由到了距离你比较远的境外边缘服务器。如果能找到用户所在位置访问速度较快的境外边缘服务器，然后通过某种方式让Cloudflare把请求路由到那台服务器上，网站访问速度就能得到很大提升。而这也就是**IP优选**的由来。

刚接触这个概念的时候，其实我不太清楚IP优选的原理是什么，只知道它解决了CDN路由的问题。但没关系，先开始做吧！

### 开始配置

我先用[Itdog 在线ping工具](https://itdog.cn/ping)测了一下当前的访问速度：

![IP优选前的网站访问速度](/static/blog/explore-cloudflare-2.png)

可以看到，大部分地区的最低延迟都在101-200ms，不算太高，但也不低。

0. IP优选需要事先准备两个域名，一个用作网站的域名绑定，另一个用作IP优选。我这里除了`nocp.space`，还有一个闲置的`nocpiun.net`域名，这样`nocpiun.net`就可以给IP优选用了。

1. 在Cloudflare仪表板中进入`nocpiun.net > DNS > 记录`，添加一条`origin.nocpiun.net`的AAAA记录，指向`100::`这个占位IP，然后**启用橙云**。

![添加origin解析记录](/static/blog/explore-cloudflare-3.png)

2. 接着再添加一条`fast.nocpiun.net`的记录，指向IP优选的地址，然后**关闭橙云**。这里的IP优选地址可以在网上找找，民间有很多IP优选服务，可以直接把这条记录CNAME指向一条你喜欢的优选服务地址。此处我选用了[`cf.090227.xyz`](https://cf.090227.xyz)。

![添加优选IP解析记录](/static/blog/explore-cloudflare-4.png)

> [!warning]
> 这里一定要关闭橙云，否则IP优选就没有意义了。

3. 进入`nocpiun.net > SSL/TLS > 自定义主机名`，绑定支付方式，开通Cloudflare for SaaS，然后将`origin.nocpiun.net`设为回退源。

![设置回退源](/static/blog/explore-cloudflare-5.png)

4. 点击“添加自定义主机名”，填入`nocp.space`（即你的主域名），然后根据Cloudflare的提示完成域名验证，显示两个“有效”就是添加成功了。

![添加自定义主机](/static/blog/explore-cloudflare-6.png)
![添加成功](/static/blog/explore-cloudflare-7.png)

5. 在`计算 > Workers 和 Pages`中找到站点Worker，然后解绑原本绑定的`nocp.space`域名。

6. 在`nocpiun.net > Workers 路由`中添加路由，将路由`nocp.space/*`指向站点Worker。

![设置Workers路由](/static/blog/explore-cloudflare-8.png)

7. 最后，在`nocp.space > DNS > 记录`中添加CNAME记录，把`nocp.space`指向`fast.nocpiun.net`，并**关闭橙云**。

![将主站域名指向IP优选域名](/static/blog/explore-cloudflare-9.png)

这样一来，IP优选就配好了。再次打开测速工具，可以看到网站访问速度有很大提升：

![IP优选后的网站访问速度](/static/blog/explore-cloudflare-10.png)

---

### 原理

我们知道配置IP优选之前，访问网站的路径是：

```
nocp.space --> Cloudflare CDN --> 站点 Worker
```

我们的目的是拦截Cloudflare自动的Anycast，让流量去走速度更优的边缘节点，然而Cloudflare只支持橙云的开启/关闭，不允许直接设置优选IP。所以我们很容易就能想到下面的路径：

```
nocp.space -(CNAME)-> cf.090227.xyz -(IP优选)-> Cloudflare CDN --> 站点 Worker
```

但这样一来，流量经过优选IP到达Cloudflare的时候，Cloudflare就不知道把请求发向哪里了。

所以我们可以引入另一个域名`nocpiun.net`，然后在这个域名内配置Workers路由，让Cloudflare知道要把请求导向哪个地方。

```
nocp.space -(CNAME)-> fast.nocpiun.net -(CNAME)-> cf.090227.xyz -(IP优选)->
Cloudflare CDN -(Workers路由)-> 站点 Worker
```

这条路径已经很接近我们上面的配置了，但这样仍然存在一个问题：`nocp.space`和`nocpiun.net`是两个不同的域名，在Cloudflare内属于不同的区域（Zone），`nocp.space`的请求经过`nocpiun.net`域名的中转时，Cloudflare会因为不是同一个Zone而拦截请求。

所以下面的操作就是点睛之笔：利用Cloudflare for SaaS这项功能让`nocpiun.net`这个Zone能够允许`nocp.space`的请求。

#### Cloudflare for SaaS

这项功能原本并非用于IP优选，而是让部署在Cloudflare的网络服务平台能够为自己的客户添加自定义主机名。这样的需求其实很常见，比如Github Pages默认的域名是`<username>.github.io`，但你也可以绑定自己的域名，让自己的域名CNAME解析到`<username>.github.io`，这样别人就可以通过你的自定义域名访问到你的网页，还能顺带享受Github提供的SSL证书。

而Cloudflare for SaaS在IP优选中起到的作用就是让本域名的Zone能够认领其他不是来自这个Zone的域名，允许被添加的域名不被Cloudflare拦截。

用户自定义域名的请求到达Cloudflare后会经过路由，发送到对应的站点；如果没找到对应的站点，就发送到“回退源”。所以上面配置的步骤中还添加了一个回退源`origin.nocpiun.net`，指向一个占位的IP`100::`。这个回退源并不会真正接收请求，只是用于占位而已。

#### 为什么不能开橙云？

上面的步骤中还有提到两处地方不能开橙云，这是因为我们需要拦截Cloudflare的自动Anycast路由，让它走我们的优选IP，如果打开橙云，请求就会先经过Anycast到Cloudflare，然后再到达优选IP，相当于多绕了一次远路。

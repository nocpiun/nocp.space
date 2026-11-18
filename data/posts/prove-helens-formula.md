---
title: "证明海伦公式"
author: NriotHrreion
tags:
- "数学"
excerpt: "很早就想尝试了, 今天就来挑战一下吧!"
date: 2023-02-04
---

很早就想尝试了, 今天就来挑战一下吧!

### 什么是海伦公式?

设平面内有一个三角形ABC, 其三边边长分别为a、b、c, 则该三角形的面积可以由下面的公式求得:

$$S=\sqrt{p(p-a)(p-b)(p-c)}$$

其中, p为三角形周长的一半, 即

$$p=\frac{a+b+c}{2}$$

### 证明

设平面内有一个三角形ABC, 其三边边长分别为AB=a、BC=b、AC=c

作AD⊥BC, 设AD=h, CD=x

由勾股定理, 得

$$c^2-x^2=h^2$$

$$BD=\sqrt{a^2-h^2}$$

因为

$$b-BD=CD=x$$

所以

$$x=b-\sqrt{a^2-h^2}$$

$$b-x=\sqrt{a^2-h^2}$$

$$b^2-2bx+x^2=a^2-h^2$$

得

$$h^2=a^2-b^2+2bx-x^2$$

又因为

$$h^2=c^2-x^2$$

所以

$$a^2-b^2+2bx-x^2=c^2-x^2$$

$$a^2-b^2+2bx=c^2$$

$$2bx=c^2-a^2+b^2$$

得

$$x=\frac{c^2-a^2+b^2}{2b}$$

将其代入 $h^2=c^2-x^2$ 中, 得

$$h=\sqrt{c^2-(\frac{c^2-a^2+b^2}{2b})^2}$$

接着, 由三角形面积公式, 得

$$S=\frac{1}{2}b\sqrt{c^2-(\frac{c^2-a^2+b^2}{2b})^2}$$

化简:

$$S=\sqrt{\frac{b^2}{4}(c+\frac{c^2-a^2+b^2}{2b})(c-\frac{c^2-a^2+b^2}{2b})}$$

$$=\sqrt{\frac{b^2}{4}(\frac{2cb+c^2-a^2+b^2}{2b})(\frac{2cb-c^2+a^2-b^2}{2b})}$$

$$=\sqrt{\frac{b^2}{4}[\frac{(b+c)^2-a^2}{2b}][\frac{a^2-(b-c)^2}{2b}]}$$

$$=\sqrt{\frac{1}{4}\times\frac{(b+c+a)(b+c-a)}{2}\times\frac{(a+b-c)(a-b+c)}{2}}$$

$$=\sqrt{\frac{a+b+c}{2}\times\frac{b+c-a}{2}\times\frac{a+b-c}{2}\times\frac{a-b+c}{2}}$$

$$=\sqrt{\frac{a+b+c}{2}\times\frac{a+b+c-2a}{2}\times\frac{a+b+c-2c}{2}\times\frac{a+b+c-2b}{2}}$$

$$=\sqrt{\frac{a+b+c}{2}\times(\frac{a+b+c}{2}-a)(\frac{a+b+c}{2}-c)(\frac{a+b+c}{2}-b)}$$

即

$$S=\sqrt{p(p-a)(p-b)(p-c)}$$

其中

$$p=\frac{a+b+c}{2}$$

证毕.

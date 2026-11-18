---
title: "高等数学笔记 13 - 曲线积分"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-16
---

## 第一型曲线积分（对弧长）

对于一根弯曲铁丝 $L:\begin{cases}x=x(t)\\ y=y(t)\end{cases}$，$t\in[a,b]$，其不同位置的质量为 $f(x,y)$，则其总质量为

$$
\int\limits_L f(x,y)\text{d}l=\int_a^bf(x(t),y(t))\sqrt{[x'(t)]^2+[y'(t)]^2}\text{d}t
$$

对于铁丝 $L:y=f(x)$，$x\in[a,b]$，则 $L:\begin{cases}x=x\\ y=f(x)\end{cases}$，那么

$$
\int\limits_L f(x,y)\text{d}l=\int_a^bf(x,f(x))\sqrt{1+[f'(x)]^2}\text{d}x
$$

## 第二型曲线积分（对坐标）

在风场中，$x$，$y$ 方向的风力分别为 $P(x,y)$，$Q(x,y)$，人走过的路径 $L:\begin{cases}x=x(t)\\ y=y(t)\end{cases}$，$t\in[a,b]$，则风力对人做的功为

$$
\int\limits_L P(x,y)\text{d}x+Q(x,y)\text{d}y=\int_a^b[P(x(t),y(t))\frac{\text{d}x}{\text{d}t}+Q(x(t),y(t))\frac{\text{d}y}{\text{d}t}]\text{d}t
$$

对于路径 $L:y=f(x)$，$x\in[a,b]$，则 $L:\begin{cases}x=x\\ y=f(x)\end{cases}$，那么

$$
\int\limits_L P(x,y)\text{d}x+Q(x,y)\text{d}y=\int_a^b[P(x,f(x))+Q(x,f(x))\frac{\text{d}y}{\text{d}x}]\text{d}x
$$

## 格林公式

设 $L$ 是一封闭曲线，逆时针，$L$ 所围区域记作 $D$，则

$$
\oint\limits_L P(x,y)\text{d}x+Q(x,y)\text{d}y=\iint\limits_D(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y})\text{d}x\text{d}y
$$

#### 例题 1

计算曲线积分 $\int_L xy\text{d}x$，其中 $L$ 是 $y^2=x$ 上从 $(1,-1)$ 到点 $(1,1)$ 的一段弧。

可得 $\overgroup{AO}:y=-\sqrt x$，$x$ 从1到0；$\overgroup{OB}:y=\sqrt x$，$x$ 从0到1，则

$$
\begin{split}
  I&=\int_{AO}xy\text{d}x+\int_{OB}xy\text{d}x\\
  &=-\int_1^0x\sqrt x\text{d}x+\int_0^1x\sqrt x\text{d}x\\
  &=2\int_0^1x\sqrt x\text{d}x\\
  &=2(\frac{2}{5}x^{\frac{5}{2}})\bigg|_0^1\\
  &=\frac{4}{5}
\end{split}
$$

> [!warning]
> 这一题的积分后面原本就是 $\text{d}x$，不需要乘上 $\sqrt{[x'(t)]^2+[y'(t)]^2}$ 来进行 $\text{d}s$ 到 $\text{d}x$ 的转换。

#### 例题 2

设 $L$ 是一不过原点的光滑封闭曲线，逆时针方向，计算 $\oint_L\frac{x\text{d}y-y\text{d}x}{x^2+y^2}$。

1. 找 $P$，$Q$

按照

$$
\oint_L P\text{d}x+Q\text{d}y
$$

观察积分式，可得

$$
P(x,y)=-\frac{y}{x^2+y^2}
$$

$$
Q(x,y)=\frac{x}{x^2+y^2}
$$

2. 求偏导

> [!tip]
> 按照**后对前偏，前对后偏**计算偏导数。

$$
\frac{\partial Q}{\partial x}=\frac{-x^2+y^2}{(x^2+y^2)^2}
$$

$$
\frac{\partial P}{\partial y}=\frac{-x^2+y^2}{(x^2+y^2)^2}
$$

3. 代入格林公式

由于分母不能为0，所以该函数有奇点 $(0,0)$，即原点。

- 若 $D$ 不包含原点，则

$$
\begin{split}
  I&=\iint\limits_D(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y})\text{d}x\text{d}y\\
  &=0
\end{split}
$$

- 若 $D$ 包含原点，则补充曲线 $C:x^2+y^2=r^2$，那么

$$
I=\oint_C\frac{x\text{d}y-y\text{d}x}{x^2+y^2}
$$

引入极坐标参数方程 $\begin{cases}x=r\cos\theta\\ y=r\sin\theta\end{cases}$，代入原式

$$
\begin{split}
  I&=\int_0^{2\pi}\frac{r^2\text{d}\theta}{r^2}\\
  &=\int_0^{2\pi}\text{d}\theta\\
  &=2\pi
\end{split}
$$

> [!tip]
> 即使奇点变了位置，只要式子形状都类似 $\frac{x\text{d}y-y\text{d}x}{x^2+y^2}$，那么最后积分结果就还是 $2\pi$。

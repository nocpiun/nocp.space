---
title: "高等数学笔记 12 - 三重积分"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-16
---

立体几何 $V$ 的质量为

$$
\iiint\limits_V f(x,y,z)\text{d}x\text{d}y\text{d}z
$$

> [!tip]
> 立体几何 $V$ 的体积 $V=\iiint_V\text{d}x\text{d}y\text{d}z$

## 对称性

- 若 $V$ 关于 $xOy$ 平面对称，上半部分记作 $V_1$，那么

$$
\iiint\limits_V f(x,y,z)\text{d}x\text{d}y\text{d}z=
\begin{cases}
  2\iiint_{V_1} f(x,y,z)\text{d}x\text{d}y\text{d}z & f(x,y,z)=f(x,y,-z)\\
  0 & f(x,y,z)=-f(x,y,-z)
\end{cases}
$$

- 若 $V$ 关于 $xOz$ 平面或 $yOz$ 平面对称，同理。

- 若 $V$ 的方程中将 $x$，$y$，$z$ 互换后 $V$ 不变，那么

$$
\iiint\limits_V f(x,y,z)\text{d}x\text{d}y\text{d}z=\iiint\limits_V f(y,z,x)\text{d}x\text{d}y\text{d}z=\iiint\limits_V f(z,x,y)\text{d}x\text{d}y\text{d}z
$$

- 若 $V$ 的方程中将 $x$，$y$ 互换后 $V$ 不变，那么

$$
\iiint\limits_V f(x,y,z)\text{d}x\text{d}y\text{d}z=\iiint\limits_V f(y,x,z)\text{d}x\text{d}y\text{d}z
$$

## 直角坐标系下的三重积分

![先一后二](/static/notes/math12-1.png)

$$
\iiint\limits_V f(x,y,z)\text{d}x\text{d}y\text{d}z=\iint\limits_D\text{d}x\text{d}y\int_{z_1(x,y)}^{z_2(x,y)}f(x,y,z)\text{d}z
$$

![先二后一](/static/notes/math12-2.png)

$$
\iiint\limits_V f(x,y,z)\text{d}x\text{d}y\text{d}z=\int_c^d\text{d}z\iint\limits_{D_{xy}}f(x,y,z)\text{d}x\text{d}y
$$

#### 例题

计算三重积分 $\iiint_V x\text{d}x\text{d}y\text{d}z$，其中 $V$ 由三坐标平面及平面 $x+2y+z=1$ 所围。

令 $x=y=0$，代入平面方程中，求得平面与z轴的交点坐标为 $(0,0,1)$，同理求得该平面与 $x$，$y$ 轴交点坐标分别为 $(1,0,0)$，$(0,\frac{1}{2},0)$

则

$$
\begin{split}
  I&=\int_0^1\text{d}z\iint\limits_{D_{xy}}x\text{d}x\text{d}y\\
  &=\int_0^1\text{d}z\int_0^{1-z}\text{d}x\int_0^{\frac{1-x-z}{2}}x\text{d}y\\
  &=\int_0^1\text{d}z\int_0^{1-z}(xy)\bigg|_0^{\frac{1-x-z}{2}}\text{d}x\\
  &=\int_0^1\text{d}z\int_0^{1-z}\frac{1}{2}(-x^2+(1-z)x)\text{d}x\\
  &=-\frac{1}{2}\int_0^1(\frac{1}{3}x^3-\frac{1-z}{2}x^2)\bigg|_0^{1-z}\text{d}z\\
  &=-\frac{1}{2}\int_0^1(\frac{1}{3}(1-z)^3-\frac{1}{2}(1-z)^3)\text{d}z\\
  &=\frac{1}{12}\int_0^1(1-z)^3\text{d}z\\
  &=\frac{1}{12}(-\frac{1}{4}(1-z)^4)\bigg|_0^1\\
  &=\frac{1}{48}
\end{split}
$$

## 球坐标替换

![球坐标替换示意图](/static/notes/math12-3.png)

如图，令

$$
\begin{cases}
  x=r\sin\phi\cos\theta\\
  y=r\sin\phi\sin\theta\\
  z=r\cos\phi
\end{cases}
$$

则即为球坐标替换。

进行球坐标替换后，原三重积分可化为

$$
\iiint\limits_V f(x,y,z)\text{d}x\text{d}y\text{d}z=\iiint\limits_V f(r\sin\phi\cos\theta,r\sin\phi\sin\theta,r\cos\phi)\boxed{r^2\sin\phi}\text{d}r\text{d}\phi\text{d}\theta
$$

## 柱坐标替换

![柱坐标替换示意图](/static/notes/math12-4.png)

如图，令

$$
\begin{cases}
  x=r\cos\theta\\
  y=r\sin\theta\\
  z=z
\end{cases}
$$

则即为柱坐标替换。

进行柱坐标替换后，原三重积分可化为

$$
\iiint\limits_V f(x,y,z)\text{d}x\text{d}y\text{d}z=\iiint\limits_V f(r\cos\theta,r\sin\theta,z)\boxed r\text{d}r\text{d}\theta\text{d}z
$$

#### 例题

计算三重积分 $\iiint_V z\text{d}x\text{d}y\text{d}z$，其中 $V$ 由 $z=x^2+y^2$ 及平面 $z=4$ 围成。

使用柱坐标替换，令

$$
\begin{cases}
  x=r\cos\theta\\
  y=r\sin\theta\\
  z=z
\end{cases}
$$

则

$$
\begin{split}
  I&=\iiint_V zr\text{d}r\text{d}\theta\text{d}z\\
  &=\int_0^4\text{d}z\iint_{D_{xy}}zr\text{d}r\text{d}\theta\\
  &=\int_0^4\text{d}z\int_0^{2\pi}\text{d}\theta\int_0^{\sqrt z}zr\text{d}r\\
  &=\int_0^4\text{d}z\int_0^{2\pi}(\frac{1}{2}zr^2)\bigg|_0^{\sqrt z}\text{d}\theta\\
  &=\frac{1}{2}\int_0^4\text{d}z\int_0^{2\pi}z^2\text{d}\theta\\
  &=\frac{1}{2}\int_0^4(z^2\theta)\bigg|_0^{2\pi}\text{d}z\\
  &=\pi\int_0^4z^2\text{d}z\\
  &=\pi(\frac{1}{3}z^3)\bigg|_0^4\\
  &=\frac{64}{3}\pi
\end{split}
$$

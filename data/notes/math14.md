---
title: "高等数学笔记 14 - 曲面积分"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-16
---

## 第一型曲面积分（对面积）

对于一片弯曲铁片 $S:z=z(x,y)$，$(x,y)\in D$，其不同位置的质量为 $f(x,y,z)$，则其总质量为

$$
\iint\limits_S f(x,y,z)\text{d}S=\iint\limits_D f(x,y,z(x,y))\sqrt{1+(\frac{\partial z}{\partial x})^2+(\frac{\partial z}{\partial y})^2}\text{d}x\text{d}y
$$

## 第二型曲面积分（对坐标）

在磁场中，$x$，$y$，$z$ 方向的磁感应强度分别为 $P(x,y,z)$，$Q(x,y,z)$，$R(x,y,z)$，设曲面 $S:z=z(x,y)$，$S$ 在 $xOy$ 或 $yOz$ 平面的投影为 $D$，则该曲面的磁通量为

$$
\iint\limits_S R(x,y,z)\text{d}x\text{d}y=\iint\limits_D R(x,y,z(x,y))\text{d}x\text{d}y
$$

$$
\iint\limits_S P(x,y,z)\text{d}y\text{d}z=\iint\limits_D P(x(y,z),y,z)\text{d}y\text{d}z
$$

## 高斯公式

设封闭光滑曲面 $S$ 所围立体几何区域为 $V$，方向取外侧，$P$，$Q$，$R$ 在 $V$ 上连续且有连续的一阶偏导数，则

$$
\oiint\limits_S P\text{d}y\text{d}z+Q\text{d}x\text{d}z+R\text{d}x\text{d}y=\iiint\limits_V(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z})\text{d}x\text{d}y\text{d}z
$$

#### 例题 1

计算 $\iint_S xyz\text{d}x\text{d}y$，其中 $S$ 是球面 $x^2+y^2+z^2=1$ 在 $x\geq0$，$y\geq0$ 的部分，方向取外侧。

以 $xOy$ 平面为界，把 $S$ 分为上下两部分 $S_1$，$S_2$，则

$$
\begin{split}
  I&=\iint\limits_{S_1}xyz\text{d}x\text{d}y+\iint\limits_{S_2}xyz\text{d}x\text{d}y\\
  &=\iint\limits_D xy\sqrt{1-x^2-y^2}\text{d}x\text{d}y-\iint\limits_D-xy\sqrt{1-x^2-y^2}\text{d}x\text{d}y\\
  &=2\iint\limits_D xy\sqrt{1-x^2-y^2}\text{d}x\text{d}y
\end{split}
$$

使用参考方程，令 $\begin{cases}x=r\cos\theta\\ y=r\sin\theta\end{cases}$，则

$$
I=2\int_0^{\frac{\pi}{2}}\text{d}\theta\int_0^1r^2\sin\theta\cos\theta\sqrt{1-r^2}r\text{d}r
$$

令 $r=\sin\phi$，可得

$$
\begin{split}
  I&=2\int_0^{\frac{\pi}{2}}\sin\theta\cos\theta\text{d}\theta\int_0^{\frac{\pi}{2}}\sin^3\phi\cos^2\phi\text{d}\phi\\
  &=2\int_0^{\frac{\pi}{2}}\sin\theta\cos\theta\text{d}\theta\int_0^{\frac{\pi}{2}}\sin^3\phi(1-\sin^2\phi)\text{d}\phi\\
  &=2\int_0^{\frac{\pi}{2}}\sin\theta\cos\theta\text{d}\theta(\int_0^{\frac{\pi}{2}}\sin^3\phi\text{d}\phi-\int_0^{\frac{\pi}{2}}\sin^5\phi\text{d}\phi)\\
  &=2\int_0^{\frac{\pi}{2}}\sin\theta\cos\theta\text{d}\theta(\frac{2}{3}-\frac{4}{5}\cdot\frac{2}{3})\\
  &=\frac{2}{15}\int_0^{\frac{\pi}{2}}2\sin\theta\cos\theta\text{d}\theta\\
  &=\frac{2}{15}\int_0^{\frac{\pi}{2}}\sin2\theta\text{d}\theta\\
  &=\frac{2}{15}(-\frac{1}{2}\cos2\theta)\bigg|_0^{\frac{\pi}{2}}\\
  &=\frac{2}{15}
\end{split}
$$

#### 例题 2

计算 $\oiint_S(x-y)\text{d}x\text{d}y+(y-z)x\text{d}y\text{d}z$，其中 $S$ 由柱面 $x^2+y^2=1$ 及 $z=0$ 和 $z=3$ 所围的外侧。

$$
\begin{split}
  I&=\iiint\limits_V[\frac{\partial(x-y)}{\partial z}+\frac{\partial(xy-xz)}{\partial x}]\text{d}x\text{d}y\text{d}z\\
  &=\iiint\limits_V(y-z)\text{d}x\text{d}y\text{d}z\\
  &=\int_0^3\text{d}z\iint\limits_D(y-z)\text{d}x\text{d}y
\end{split}
$$

对柱面使用参数方程，令 $\begin{cases}x=r\cos\theta\\ y=r\sin\theta\end{cases}$，则

$$
\begin{split}
  I&=\int_0^3\text{d}z\int_0^{2\pi}\text{d}\theta\int_0^1(r\sin\theta-z)r\text{d}r\\
  &=\int_0^3\text{d}z\int_0^{2\pi}(\frac{1}{3}\sin\theta r^3-\frac{1}{2}zr^2)\bigg|_0^1\text{d}\theta\\
  &=\int_0^3\text{d}z\int_0^{2\pi}(\frac{1}{3}\sin\theta-\frac{1}{2}z)\text{d}\theta\\
  &=\int_0^3(-\frac{1}{3}\cos\theta-\frac{1}{2}z\theta)\bigg|_0^{2\pi}\text{d}z\\
  &=-\pi\int_0^3z\text{d}z\\
  &=-\pi(\frac{1}{2}z^2)\bigg|_0^3\\
  &=-\frac{9}{2}\pi
\end{split}
$$

#### 例题 3

(_南京邮电大学2023-2024期末考试_) 计算 $\iint_\Sigma(x^3+az^2)\text{d}y\text{d}z+(y^3+ax^2)\text{d}z\text{d}x+(z^3+ay^2)\text{d}x\text{d}y$，其中 $\Sigma$ 为上半球面 $z=\sqrt{a^2-x^2-y^2}\;(a>0)$ 的上侧。

由于 $\Sigma$ 不是闭合曲面，令 $\Sigma_1:x^2+y^2\leq a^2,z=0$ 将其补全为 $\Sigma+\Sigma_1$，然后使用闭合曲面积分

$$
\begin{split}
  \oiint\limits_{\Sigma+\Sigma_1}
  &=\iiint\limits_V(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z})\text{d}x\text{d}y\text{d}z\\
  &=\iiint\limits_V(3x^2+3y^2+3z^2)\text{d}x\text{d}y\text{d}z\\
  &=3\iiint\limits_V(x^2+y^2+z^2)\text{d}x\text{d}y\text{d}z\\
  &=3\int_0^{2\pi}\text{d}\theta\int_0^\frac{\pi}{2}\text{d}\phi\int_0^a(r^2\sin^2\phi\cos^2\theta+r^2\sin^2\phi\sin^2\theta+r^2\cos^2\phi)r^2\sin\phi\text{d}r\\
  &=3\int_0^{2\pi}\text{d}\theta\int_0^\frac{\pi}{2}\sin\phi\text{d}\phi\int_0^ar^4\text{d}r\\
  &=3\int_0^{2\pi}\text{d}\theta\int_0^\frac{\pi}{2}\sin\phi\text{d}\phi(\frac{1}{5}r^5)\bigg|_0^a\\
  &=\frac{3}{5}a^5\int_0^{2\pi}\text{d}\theta\int_0^\frac{\pi}{2}\sin\phi\text{d}\phi\\
  &=\frac{3}{5}a^5\int_0^{2\pi}\text{d}\theta\\
  &=\frac{6\pi a^5}{5}\\
\end{split}
$$

计算底面 $\Sigma_1$ 的积分

$$
\begin{split}
  &\iint\limits_{\Sigma_1}(z^3+ay^2)\text{d}x\text{d}y\\
  &=-\iint\limits_D(z^3+ay^2)\text{d}x\text{d}y\\
  &=-\iint\limits_D ay^2\text{d}x\text{d}y\\
  &=-a\int_0^{2\pi}\text{d}\theta\int_0^ar^3\sin^2\theta\text{d}r\\
  &=-a\int_0^{2\pi}\sin^2\theta\text{d}\theta(\frac{1}{4}r^4)\bigg|_0^a\\
  &=-\frac{a^5}{4}\int_0^{2\pi}\sin^2\theta\text{d}\theta\\
  &=-\frac{a^5}{4}\cdot4\int_0^\frac{\pi}{2}\sin^2\theta\text{d}\theta\\
  &=-a^5\cdot\frac{1}{2}\cdot\frac{\pi}{2}\\
  &=-\frac{\pi a^5}{4}
\end{split}
$$

将闭合曲面积分中的底面积分减去，即可得到原积分

$$
\iint\limits_\Sigma=\oiint\limits_{\Sigma+\Sigma_1}-\iint\limits_{\Sigma_1}=\frac{6\pi a^5}{5}+\frac{\pi a^5}{4}=\frac{29\pi a^5}{20}
$$

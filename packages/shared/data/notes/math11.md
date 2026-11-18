---
title: "高等数学笔记 11 - 二重积分"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-15
---

曲面 $f(x,y)$ 与 $xOy$ 平面上的区域 $D$ 之间的立体几何体积为

$$
\iint\limits_D f(x,y)\text{d}x\text{d}y
$$

> [!tip]
> 区域 $D$ 的面积 $S_D=\iint_D\text{d}x\text{d}y$

## 对称性

- 若 $D$ 关于 $y$ 轴对称，右半部分记作 $D_1$，那么

$$
\iint\limits_D f(x,y)\text{d}x\text{d}y=
\begin{cases}
  2\iint_{D_1}f(x,y)\text{d}x\text{d}y & f(x,y)=f(-x,y)\\
  0 & f(x,y)=-f(-x,y)
\end{cases}
$$

- 若 $D$ 关于 $x$ 轴对称，同理。

- 若 $D$ 关于 $y=x$ 对称，那么

$$
\iint\limits_D f(x,y)\text{d}x\text{d}y=\iint\limits_D f(y,x)\text{d}x\text{d}y
$$

## 直角坐标系下的二重积分

![x-型区域](/static/notes/math11-1.png)

$$
\iint\limits_D f(x,y)\text{d}x\text{d}y=\int_a^b\text{d}x\int_{\phi_1(x)}^{\phi_2(x)}f(x,y)\text{d}y
$$

![y-型区域](/static/notes/math11-2.png)

$$
\iint\limits_D f(x,y)\text{d}x\text{d}y=\int_c^d\text{d}y\int_{\psi_1(y)}^{\psi_2(y)}f(x,y)\text{d}x
$$

#### 例题

求二重积分 $\iint_D(2x+y)\text{d}x\text{d}y$，其中 $D$ 是由 $y=x$，$y=3$，$xy=1$ 所围区域。

先画出积分区域 $D$。

![区域 $D$](/static/notes/math11-3.png)

观察得该区域为y-型区域。

则

$$
\begin{split}
  &\iint\limits_D (2x+y)\text{d}x\text{d}y\\
  &=\int_1^3\text{d}y\int_{\frac{1}{y}}^{y}(2x+y)\text{d}x\\
  &=\int_1^3(x^2+yx)\bigg|_{\frac{1}{y}}^y\text{d}y\\
  &=\int_1^3(2y^2-\frac{1}{y^2}-1)\text{d}y\\
  &=(\frac{2}{3}y^3+\frac{1}{y}-y)\bigg|_1^3\\
  &=18+\frac{1}{3}-3-\frac{2}{3}\\
  &=\frac{44}{3}
\end{split}
$$

## 极坐标系下的二重积分

令 $\begin{cases}x=r\cos\theta\\ y=r\sin\theta\end{cases}$，$\theta\in(\theta_1,\theta_2)$，$r\in(r_1(\theta),r_2(\theta))$

![极坐标系区域](/static/notes/math11-4.png)

$$
\iint\limits_D f(x,y)\text{d}x\text{d}y=\int_{\theta_1}^{\theta_2}\text{d}\theta\int_{r_1(\theta)}^{r_2(\theta)}f(r\cos\theta,r\sin\theta)\boxed r\text{d}r
$$

> [!tip]
> 极坐标系二重积分适用于被积函数包含 $x^2+y^2$ 或积分区域是圆的一部分的情况。

#### 例题

求二重积分 $\iint_D\frac{1}{\sqrt{1-x^2-y^2}}\text{d}x\text{d}y$，其中 $D=\{(x,y)|x^2+y^2\leq1\}$。

使用极坐标系下的二重积分求解

$$
\begin{split}
  &\iint\limits_D\frac{1}{\sqrt{1-x^2-y^2}}\text{d}x\text{d}y\\
  &=\int_0^{2\pi}\text{d}\theta\int_0^1\frac{r}{\sqrt{1-r^2}}\text{d}r\\
  &=\int_0^{2\pi}(-\sqrt{1-r^2})\bigg|_0^1\text{d}\theta\\
  &=\int_0^{2\pi}\text{d}\theta\\
  &=2\pi
\end{split}
$$

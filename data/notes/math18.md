---
title: "高等数学笔记 18 - 洛朗级数"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-25
---

若函数 $f(z)$ 在圆环域 $r<|z-\alpha|<R$ 内处处解析，则

$$
f(z)=\sum^{+\infty}_{n=-\infty}C_n(z-z_0)^n
$$

其中，$C_n$ 为洛朗展开系数，大小为

$$
C_n=\frac{1}{2\pi i}\oint\limits_C\frac{f(\xi)}{(\xi-z_0)^{n+1}}\text{d}\xi
$$

#### 例题 1

将 $f(z)=\frac{1}{(z-1)(z-2)}$ 在区域 $0<|z-1|<1$ 展开成洛朗级数。

$$
\begin{split}
  f(z)&=\frac{1}{z-1}\cdot\frac{1}{(z-1)-1}\\
  &=\frac{1}{1-z}\cdot\frac{1}{1-(z-1)}\\
\end{split}
$$

由常见的幂级数展开式可知

$$
\frac{1}{1-z'}=\sum^\infty_{n=0}z'^n
$$

令 $z'=z-1$，则 $0<z'<1$，故可得

$$
\begin{split}
  f(z)&=\frac{1}{1-z}\sum^\infty_{n=0}(z-1)^n\\
  &=-\frac{1}{z-1}\sum^\infty_{n=0}(z-1)^n\\
  &=-\sum^\infty_{n=0}(z-1)^{n-1}
\end{split}
$$

#### 例题 2

(_南京邮电大学2023-2024期末考试_) 将 $f(z)=\frac{1}{(z-2)(z-3)}$ 在区域 $1<|z-3|<+\infty$ 内展开成洛朗级数。

$$
\begin{split}
  f(z)&=\frac{1}{(z-3)+1}\cdot\frac{1}{z-3}\\
  &=\frac{1}{1+\frac{1}{z-3}}\cdot\frac{1}{(z-3)^2}
\end{split}
$$

因为 $1<|z-3|<+\infty$，所以 $0<|\frac{1}{z-3}|<1$。

由常见幂级数展开式可知

$$
\frac{1}{1+z'}=\sum^\infty_{n=0}(-1)^nz'^n
$$

令 $z'=\frac{1}{z-3}$，则 $0<z'<1$，故可得

$$
\begin{split}
  f(z)&=\frac{1}{(z-3)^2}\sum^\infty_{n=0}(-1)^n\bigg(\frac{1}{z-3}\bigg)^n\\
  &=\sum^\infty_{n=0}(-1)^n\bigg(\frac{1}{z-3}\bigg)^{n+2}\\
  &=\sum^\infty_{n=0}(-1)^n(z-3)^{-n-2}
\end{split}
$$

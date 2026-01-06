---
title: "高等数学笔记 3 - 连续与间断"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-01-06
---

## 连续性

<div align="center">

$\lim\_{x \to x\_0}f(x)=f(x\_0)$ $\Harr$ $f(x)$ 在 $x=x\_0$ 处连续

</div>

#### 例题

若 $f(x)=\begin{cases}a+bx^2 & x\leq 0\\\\\frac{\sin bx}{x} & x>0\end{cases}$ 在 $x=0$ 处连续，求 $a,b$ 的关系

由 $f(x)$ 在 $x=0$ 处连续，可得

$$\lim\_{x \to 0^+}f(x)=\lim\_{x \to 0^-}f(x)=f(0)=a$$

当 $x>0$ 时， $f(x)=\frac{\sin bx}{x}$，所以有

$$\lim\_{x \to 0^+}\frac{\sin bx}{x}=a$$

使用等价无穷小 $\sin bx \sim bx$

$$
\begin{split}
  \lim\_{x \to 0^+}\frac{bx}{x}&=a\\\\
  b&=a
\end{split}
$$

故 $a,b$ 的关系为

$$\boxed{a=b}$$

## 间断点

间断点是不连续的点 (一般为无定义点、分段点)

- **可去间断点**： $\lim\_{x \to x\_0^+}f(x)=\lim\_{x \to x\_0^-}f(x)\neq f(x\_0)$
- **跳跃间断点**： $\lim\_{x \to x\_0^+}f(x)\neq\lim\_{x \to x\_0^-}f(x)$
- **无穷间断点**： $\lim\_{x \to x\_0^+}=\infty$ 或 $\lim\_{x \to x\_0^-}=\infty$
- **振荡间断点**： 如 $\sin\frac{1}{x}$ 或 $\cos\frac{1}{x}$ 在 $x=0$ 处

#### 例题

求函数 $f(x)=\frac{x-x^3}{\sin\pi x}$ 的可去间断点个数

$$
\begin{split}
  f(x)&=\frac{x-x^3}{\sin\pi x}\\\\
  &=\frac{x(1-x^2)}{\sin\pi x}\\\\
  &=\frac{x(1-x)(1+x)}{\sin\pi x}
\end{split}
$$

当分母为 $0$ 时， $x=0,\plusmn 1, \plusmn 2,...$；当分子为 $0$ 时， $x=0,1,-1$

当 $x=0$ 时

$$\lim\_{x \to 0}f(x)=\lim\_{x \to 0}\frac{x-x^3}{\sin\pi x}$$

使用等价无穷小 $\sin\pi x \sim\pi x$

$$
\begin{split}
  \lim\_{x \to 0}f(x)&=\lim\_{x \to 0}\frac{x-x^3}{\pi x}\\\\
  &=\lim\_{x \to 0}\frac{1-x^2}{\pi}\\\\
  &=\frac{1}{\pi}
\end{split}
$$

所以 $x=0$ 是 $f(x)$ 的可去间断点之一

当 $x=1$ 时

> [!tip]
> 当极限中存在**非0因子**时，要先把它求出来，如此处的 $x$

$$
\begin{split}
  \lim\_{x \to 1}f(x)&=\lim\_{x \to 1}\frac{x(1-x^2)}{\sin\pi x}\\\\
  &=\lim\_{x \to 1}\frac{1-x^2}{\sin\pi x}\\\\
  &=\lim\_{x \to 1}\frac{-2x}{\pi\cos\pi x}\\\\
  &=\frac{2}{\pi}
\end{split}
$$

所以 $x=1$ 是 $f(x)$ 的可去间断点之一

当 $x=-1$ 时

$$
\begin{split}
  \lim\_{x \to -1}f(x)&=\lim\_{x \to -1}\frac{x(1-x^2)}{\sin\pi x}\\\\
  &=\lim\_{x \to -1}\frac{x^2-1}{\sin\pi x}\\\\
  &=\lim\_{x \to -1}\frac{2x}{\pi\cos\pi x}\\\\
  &=\frac{2}{\pi}
\end{split}
$$

所以 $x=-1$ 是 $f(x)$ 的可去间断点之一

由于当分子为 $0$ 时， $x$ 仅可能为 $0,1,-1$，因此当分母为 $0$，且 $x$ 为其他值时，分子不为 $0$，不是可去间断点，而是无穷间断点

故 $f(x)$ 有三个可去间断点

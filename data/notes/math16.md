---
title: "高等数学笔记 16 - 幂级数"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-17
---

## Abel引理

若 $\sum_{n=1}^\infty a_nx^n$ 在 $x=x_0$ 处收敛，则幂级数 $\sum_{n=1}^\infty a_nx^n$ 在 $x\in(-x_0,x_0)$ 上均收敛。

若 $\sum_{n=1}^\infty a_nx^n$ 在 $x=x_0$ 处发散，则幂级数 $\sum_{n=1}^\infty a_nx^n$ 在 $x\in(-\infty,-x_0)\cup(x_0,+\infty)$ 上均发散。

## 求收敛区间

对于下面的幂级数

$$
\sum_{n=1}^\infty a_nx^n
$$

求其收敛区间时先求下面的极限

$$
\lim_{n\to\infty}\bigg|\frac{a_{n+1}}{a_n}\bigg|=l
$$

则该级数的收敛半径为

$$
R=\frac{1}{l}
$$

收敛区间为 $(-R,R)$。

特别地，当 $l=0$，则 $R=+\infty$；当 $l=+\infty$，则 $R=0$。

对于收敛域，则需分别求该级数在 $x=-R$ 和 $x=R$ 处的收敛情况，最后再得出收敛域。

> [!info]
> 比如，该级数在 $x=-R$ 处收敛，在 $x=R$ 处发散，则其收敛域为 $[-R,R)$。

---

对于下面的幂级数

$$
\sum_{n=1}^\infty a_n(x-x_0)^n
$$

求其收敛区间时先求下面的极限

$$
\lim_{n\to\infty}\bigg|\frac{a_{n+1}}{a_n}\bigg|=l
$$

则该级数的收敛半径为

$$
R=\frac{1}{l}
$$

收敛区间可看作 $(x-x_0)\in(-R,R)$，即 $x\in(x_0-R,x_0+R)$。

---

对于下面的幂级数

$$
\sum_{n=1}^\infty a_nx^{2n}
$$

求其收敛区间时先求下面的极限

- 根式判别法：

$$
\lim_{n\to\infty}\sqrt[n]{|a_nx^{2n}|}=r(x)
$$

- 比式判别法：

$$
\lim_{n\to\infty}\frac{a_{n+1}x^2}{a_n}=r(x)
$$

最后令 $r(x)<1$，解出范围即可。

#### 例题 1

求幂级数 $\sum_{n=1}^\infty\frac{(2n)!}{(n!)^2}x^{2n}$ 的收敛半径。

要求该幂级数，先求下面的极限：

$$
\begin{split}
  &\lim_{n\to+\infty}\bigg|\frac{(2n+2)!}{((n+1)!)^2}\cdot\frac{(n!)^2}{(2n)x^2!}\cdot x^2\bigg|\\
  &=\lim_{n\to+\infty}\bigg|\frac{(2n+1)(2n+2)}{(n+1)^2}\cdot x^2\bigg|\\
  &=2\lim_{n\to+\infty}\bigg|\frac{2n+1}{n+1}\cdot x^2\bigg|\\
  &=2x^2\lim_{n\to+\infty}\frac{2n+1}{n+1}\\
  &=4x^2\\
\end{split}
$$

求收敛区间

$$
\begin{split}
  4x^2&<1\\
  x^2&<\frac{1}{4}
\end{split}
$$

可得 $x\in(-\frac{1}{2},\frac{1}{2})$，则收敛半径为

$$
\boxed{
  R=\frac{1}{2}
}
$$

#### 例题 2

求幂级数 $\sum_{n=1}^\infty\frac{(x-1)^n}{n2^n}$ 的收敛域。

要求该幂级数，先求下面的极限：

$$
\begin{split}
  &\lim_{n\to+\infty}\bigg|\frac{n2^n}{(n+1)2^{n+1}}\bigg|\\
  &=\lim_{n\to+\infty}\frac{n2^n}{(n+1)2^{n+1}}\\
  &=\frac{1}{2}\lim_{n\to+\infty}\frac{n}{n+1}\\
  &=\frac{1}{2}
\end{split}
$$

可得收敛半径为

$$
R=2
$$

则收敛区间为 $(1-2,1+2)$，即 $(-1,3)$。

在 $x=-1$ 处时

$$
\sum_{n=1}^\infty\frac{(-2)^n}{n2^n}=\sum_{n=1}^\infty\frac{(-1)^n}{n}
$$

可得该幂级数在 $x=-1$ 处收敛。

在 $x=3$ 处时

$$
\sum_{n=1}^\infty\frac{2^n}{n2^n}=\sum_{n=1}^\infty\frac{1}{n}
$$

可得该幂级数在 $x=3$ 处发散。

故该幂级数的收敛域为 $[-1,3)$。

## 幂级数展开

<div class="grid-2">

$$
e^x=\sum_{n=0}^\infty\frac{x^n}{n!},x\in(-\infty,+\infty)
$$

$$
\ln(1+x)=\sum_{n=0}^\infty\frac{(-1)^n}{n+1}x^{n+1},x\in(-1,1]
$$

$$
\sin x=\sum_{n=1}^\infty\frac{(-1)^{n+1}}{(2n-1)!}x^{2n-1},x\in(-\infty,+\infty)
$$

$$
\cos x=\sum_{n=0}^\infty\frac{(-1)^n}{(2n)!}x^{2n},x\in(-\infty,+\infty)
$$

$$
\frac{1}{1-x}=\sum_{n=0}^\infty x^n,x\in(-1,1)
$$

$$
\frac{1}{1+x}=\sum_{n=0}^\infty(-1)^nx^n,x\in(-1,1)
$$

</div>

#### 例题

将函数 $f(x)=\frac{3x}{2+x^2}$ 展开成 $x$ 的幂级数，并指出收敛区间。

$$
\begin{split}
  f(x)&=\frac{3x}{2+x^2}\\
  &=3x\cdot\frac{1}{2+x^2}\\
  &=\frac{3x}{2}\cdot\frac{1}{1+\frac{x^2}{2}}\\
  &=\frac{3x}{2}\sum_{n=0}^\infty(-1)^n\bigg(\frac{x^2}{2}\bigg)^n\\
\end{split}
$$

收敛区间为 $\frac{x^2}{2}\in(-1,1)$，即 $x\in(-\sqrt2,\sqrt2)$。

## 幂级数的两个性质

$$
\bigg(\sum_{n=1}^\infty a_nx^n\bigg)'=\sum_{n=1}^\infty a_n(x^n)'=\sum_{n=1}^\infty na_nx^{n-1}
$$

$$
\int_0^t\sum_{n=1}^\infty a_nx^n\text{d}x=\sum_{n=1}^\infty a_n\int_0^tx^n\text{d}x=\sum_{n=1}^\infty\frac{a_n}{n+1}t^{n+1}
$$

#### 例题 1

求幂级数 $\sum_{n=0}^\infty\frac{x^{n+1}}{n+1}$ 的和函数。

设 $f(x)=\sum_{n=0}^\infty\frac{x^{n+1}}{n+1}$，则

$$
\begin{split}
  f'(x)&=\bigg(\sum_{n=0}^\infty\frac{x^{n+1}}{n+1}\bigg)'\\
  &=\sum_{n=0}^\infty\bigg(\frac{x^{n+1}}{n+1}\bigg)'\\
  &=\sum_{n=0}^\infty x^n\\
  &=\frac{1}{1-x}
\end{split}
$$

则

$$
f(x)=\int\frac{1}{1-x}\text{d}x=-\ln(1-x)+C
$$

即

$$
\boxed{
  f(x)=-\ln(1-x)
}
$$

#### 例题 2

求幂级数 $\sum_{n=1}^\infty nx^{n-1}$ 的和函数。

设 $f(x)=\sum_{n=1}^\infty nx^{n-1}$

$$
\begin{split}
  \int f(x)\text{d}x&=\int\sum_{n=1}^\infty nx^{n-1}\text{d}x\\
  &=\sum_{n=1}^\infty\int nx^{n-1}\text{d}x\\
  &=\sum_{n=1}^\infty x^n\\
  &=\frac{1}{1-x}-1\\
  &=\frac{x}{1-x}
\end{split}
$$

则

$$
\begin{split}
  f(x)&=(\int f(x)\text{d}x)'\\
  &=(\frac{x}{1-x})'\\
  &=\frac{1}{(1-x)^2}
\end{split}
$$

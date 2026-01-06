---
title: "高等数学笔记 2 - 数列极限"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-01-05
---

## 放缩法 + 夹逼准则

对于数列 $\lbrace x_n\rbrace$， $z_n \leq x_n \leq y_n$，且 $\lim_{n \to \infty}y_n=\lim_{n \to \infty}z_n=A$, 则有 $\lim_{n \to \infty}x_n=A$

#### 例题

设数列 $x_n=\frac{1}{n^2+n+1}+\frac{2}{n^2+n+2}+...+\frac{n}{n^2+n+n}$，求 $\lim_{n \to \infty}x_n$

通过放缩法易得

$$\frac{1}{n^2+n+n}+\frac{2}{n^2+n+n}+...+\frac{n}{n^2+n+n}\leq x_n\leq\frac{1}{n^2+n+1}+\frac{2}{n^2+n+1}+...+\frac{n}{n^2+n+1}$$

$$\frac{1+2+...+n}{n^2+2n}\leq x_n\leq\frac{1+2+...+n}{n^2+n+1}$$

$$\frac{(1+n)n}{2(n^2+2n)}\leq x_n\leq\frac{(1+n)n}{2(n^2+n+1)}$$

通过抹去法可得

$$
\begin{split}
  &\lim_{n \to \infty}\frac{(1+n)n}{2(n^2+2n)}\\
  &=\lim_{n \to \infty}\frac{n^2}{2n^2}\\
  &=\frac{1}{2}
\end{split}
$$

同理

$$\lim_{n \to \infty}\frac{(1+n)n}{2(n^2+n+1)}=\frac{1}{2}$$

所以

$$\lim_{n \to \infty}\frac{(1+n)n}{2(n^2+2n)}=\lim_{n \to \infty}\frac{(1+n)n}{2(n^2+n+1)}=\frac{1}{2}$$

故

$$\boxed{\lim_{n \to \infty}x_n=\frac{1}{2}}$$

## 单调有界原理

> [!tip]
> 当数列由递推式给定时使用

若数列 $\lbrace a_n\rbrace$ 满足：
- $\lbrace a_n\rbrace$ 单调递增，且 $\lbrace a_n\rbrace \leq M$ (有上界)
- $\lbrace a_n\rbrace$ 单调递减，且 $\lbrace a_n\rbrace \geq L$ (有下界)

则可推出 $\lim_{n \to \infty}a_n$ 存在

#### 例题

设 $a_1=6$， $a_n=\sqrt{6+a_{n-1}}$， $n=2,3,...$。(1) 证明： $\lim_{n \to \infty}a_n$ 存在；(2) 求 $\lim_{n \to \infty}a_n$

(1)

由 $\lbrace a_n\rbrace$ 的递推式可得

$$
\begin{split}
  a_n-a_{n-1}&=\sqrt{6+a_{n-1}}-\sqrt{6+a_{n-2}}\\
  &=\frac{a_{n-1}-a_{n-2}}{\sqrt{6+a_{n-1}}+\sqrt{6+a_{n-2}}}
\end{split}
$$

由于 $\sqrt{6+a_{n-1}}+\sqrt{6+a_{n-2}}>0$，所以 $a_n-a_{n-1}$ 与 $a_{n-1}-a_{n-2}$ 同号

由 $a_1=6$，可得 $a_2=\sqrt{6+a_1}=\sqrt{12}<\sqrt{36}=a_1$，所以 $\lbrace a_n\rbrace$ 是一个单调递减数列

由递推式可知， $a_n>0$ (有下界)，所以 $\lim_{n \to \infty}a_n$ 存在

(2)

由递推式可得

$$
\begin{split}
  \lim_{n \to \infty}a_n&=\sqrt{6+\lim_{n \to \infty}a_{n-1}}\\
  \lim_{n \to \infty}a_n&=\sqrt{6+\lim_{n \to \infty}a_n}\\
\end{split}
$$

令 $t=\lim_{n \to \infty}a_n$，则 $t>0$

$$
\begin{split}
  t&=\sqrt{6+t}\\
  t^2&=6+t\\
  t^2-t-6&=0
\end{split}
$$

解得 $t=3$ 或 $t=-2$ (舍去)

故

$$\boxed{\lim_{n \to \infty}a_n=t=3}$$

---
title: "高等数学笔记 2 - 数列极限"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-01-05
---

## 放缩法 + 夹逼准则

对于数列 $\lbrace x\_n\rbrace$， $z\_n \leq x\_n \leq y\_n$，且 $\lim\_{n \to \infty}y\_n=\lim\_{n \to \infty}z\_n=A$, 则有 $\lim\_{n \to \infty}x\_n=A$

#### 例题

设数列 $x\_n=\frac{1}{n^2+n+1}+\frac{2}{n^2+n+2}+...+\frac{n}{n^2+n+n}$，求 $\lim\_{n \to \infty}x\_n$

通过放缩法易得

$$\frac{1}{n^2+n+n}+\frac{2}{n^2+n+n}+...+\frac{n}{n^2+n+n}\leq x\_n\leq\frac{1}{n^2+n+1}+\frac{2}{n^2+n+1}+...+\frac{n}{n^2+n+1}$$

$$\frac{1+2+...+n}{n^2+2n}\leq x\_n\leq\frac{1+2+...+n}{n^2+n+1}$$

$$\frac{(1+n)n}{2(n^2+2n)}\leq x\_n\leq\frac{(1+n)n}{2(n^2+n+1)}$$

通过抹去法可得

$$
\begin{split}
  &\lim\_{n \to \infty}\frac{(1+n)n}{2(n^2+2n)}\\\\
  &=\lim\_{n \to \infty}\frac{n^2}{2n^2}\\\\
  &=\frac{1}{2}
\end{split}
$$

同理

$$\lim\_{n \to \infty}\frac{(1+n)n}{2(n^2+n+1)}=\frac{1}{2}$$

所以

$$\lim\_{n \to \infty}\frac{(1+n)n}{2(n^2+2n)}=\lim\_{n \to \infty}\frac{(1+n)n}{2(n^2+n+1)}=\frac{1}{2}$$

故

$$\lim\_{n \to \infty}x\_n=\frac{1}{2}$$

## 单调有界原理

若数列 $\lbrace a\_n\rbrace$ 满足：
- $\lbrace a\_n\rbrace$ 单调递增，且 $\lbrace a\_n\rbrace \leq M$ (有上界)
- $\lbrace a\_n\rbrace$ 单调递减，且 $\lbrace a\_n\rbrace \geq L$ (有下界)

则可推出 $\lim\_{n \to \infty}a\_n$ 存在

**用法**：当数列由递推式给定时使用

#### 例题

设 $a\_1=6$， $a\_n=\sqrt{6+a\_{n-1}}$， $n=2,3,...$。(1) 证明： $\lim\_{n \to \infty}a\_n$ 存在；(2) 求 $\lim\_{n \to \infty}a\_n$

(1)

由 $\lbrace a\_n\rbrace$ 的递推式可得

$$
\begin{split}
  a\_n-a\_{n-1}&=\sqrt{6+a\_{n-1}}-\sqrt{6+a\_{n-2}}\\\\
  &=\frac{a\_{n-1}-a\_{n-2}}{\sqrt{6+a\_{n-1}}+\sqrt{6+a\_{n-2}}}
\end{split}
$$

由于 $\sqrt{6+a\_{n-1}}+\sqrt{6+a\_{n-2}}>0$，所以 $a\_n-a\_{n-1}$ 与 $a\_{n-1}-a\_{n-2}$ 同号

由 $a\_1=6$，可得 $a\_2=\sqrt{6+a\_1}=\sqrt{12}<\sqrt{36}=a\_1$，所以 $\lbrace a\_n\rbrace$ 是一个单调递减数列

由递推式可知， $a\_n>0$ (有下界)，所以 $\lim\_{n \to \infty}a\_n$ 存在

(2)

由递推式可得

$$
\begin{split}
  \lim\_{n \to \infty}a\_n&=\sqrt{6+\lim\_{n \to \infty}a\_{n-1}}\\\\
  \lim\_{n \to \infty}a\_n&=\sqrt{6+\lim\_{n \to \infty}a\_n}\\\\
\end{split}
$$

令 $t=\lim\_{n \to \infty}a\_n$，则 $t>0$

$$
\begin{split}
  t&=\sqrt{6+t}\\\\
  t^2&=6+t\\\\
  t^2-t-6&=0
\end{split}
$$

解得 $t=3$ 或 $t=-2$ (舍去)

故

$$\lim\_{n \to \infty}a\_n=t=3$$

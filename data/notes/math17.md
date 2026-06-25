---
title: "高等数学笔记 17 - 傅里叶级数"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-25
---

对于函数 $f(x),x\in[-l,l]$，其傅里叶展开式为

$$
f(x)\sim S(x)=\frac{a_0}{2}+\sum^\infty_{n=1}(a_n\cos\frac{n\pi x}{l}+b_n\sin\frac{n\pi x}{l})
$$

其中

$$
a_0=\frac{1}{l}\int_{-l}^lf(x)\text{d}x
$$

$$
a_n=\frac{1}{l}\int_{-l}^lf(x)\cos\frac{n\pi x}{l}\text{d}x
$$

$$
b_n=\frac{1}{l}\int_{-l}^lf(x)\sin\frac{n\pi x}{l}\text{d}x
$$

## 狄利克雷收敛定律

对于 $f(x)$ 与其傅里叶展开 $S(x)$：
- 若 $f(x)$ 在 $x=x_0$ 连续，则 $S(x_0)=f(x_0)$
- 若 $f(x)$ 在 $x=x_0$ 间断，则 $S(x_0)=\frac{1}{2}[f(x_0^+)+f(x_0^-)]$

在求 $S(x_0)$ 时，如果 $x_0$ 不在定义好的区间中，则需要进行**奇延拓**或**偶延拓**。如果函数的傅里叶展开式中仅含 $\sin$，那么就选择奇延拓；如果仅含 $\cos$，那么就选择偶延拓。

奇延拓就是把给定函数的定义域按奇函数拓展到 $\Reals$，偶延拓同理。

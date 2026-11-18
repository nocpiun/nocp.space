---
title: "高等数学笔记 15 - 常数项无穷级数"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-17
---

## P级数

$$
\sum_{n=1}^\infty\frac{1}{n^P}
$$

当 $P>1$ 时收敛，$P\leq1$ 时发散。

## <boxed>正项级数</boxed>敛散性判断

### 比较原则

可以使用**比较原则**来判断正项级数的敛散性。

若 $u_n\leq v_n$（某一项之后成立也可以），则

$$
\sum_{n=1}^\infty v_n 收敛 \longrightarrow \sum_{n=1}^\infty u_n 收敛
$$

$$
\sum_{n=1}^\infty u_n 发散 \longrightarrow \sum_{n=1}^\infty v_n 发散
$$

> [!tip]
> 大收小收，小散大散。

比较原则的极限形式为：

令 $\lim_{n\to\infty}\frac{v_n}{u_n}=C$，则：

- 若 $C=0$

$$
\sum_{n=1}^\infty u_n 收敛 \longrightarrow \sum_{n=1}^\infty v_n 收敛
$$

$$
\sum_{n=1}^\infty v_n 发散 \longrightarrow \sum_{n=1}^\infty u_n 发散
$$

- 若 $C\in(0,+\infty)$，则 $\sum_{n=1}^\infty u_n$ 与 $\sum_{n=1}^\infty v_n$ 同敛态。

- 若 $C=+\infty$

$$
\sum_{n=1}^\infty v_n 收敛 \longrightarrow \sum_{n=1}^\infty u_n 收敛
$$

$$
\sum_{n=1}^\infty u_n 发散 \longrightarrow \sum_{n=1}^\infty v_n 发散
$$

### 比式判别法与根式判别法

令 $\lim_{n\to\infty}\frac{u_{n+1}}{u_n}=C$ 或 $\lim_{n\to\infty}\sqrt[n]{u_n}=C$，则：

- 若 $C<1$，则 $\sum_{n=1}^\infty u_n$ 收敛。
- 若 $C>1$，则 $\sum_{n=1}^\infty u_n$ 发散。

### 积分判别法

若 $f(x)$ 是一非负递减函数，则 $\sum_{n=1}^\infty f(n)$ 与 $\int_1^{+\infty}f(x)\text{d}x$ 同敛态。

## <boxed>交错级数</boxed>敛散性判断

若 $u_n$ 单调递减趋于0，则 $\sum_{n=1}^\infty(-1)^nu_n$ 收敛（_莱布尼茨判别法_）

> [!tip]
> 若 $\sum_{n=1}^\infty u_n$ 收敛，则 $\lim_{n\to\infty}u_n=0$。<br>
> 反之，若 $\lim_{n\to\infty}u_n\neq0$，则 $\sum_{n=1}^\infty u_n$ 发散。

### 条件收敛与绝对收敛

- 若 $\sum_{n=1}^\infty u_n$ 收敛，但 $\sum_{n=1}^\infty |u_n|$ 发散，则称 $\sum_{n=1}^\infty u_n$ **条件收敛**。
- 若 $\sum_{n=1}^\infty |u_n|$ 收敛，则称 $\sum_{n=1}^\infty u_n$ **绝对收敛**。

#### 例题

判断下列级数的敛散性。

(1) $\sum_{n=1}^\infty\frac{1}{\sqrt{n(n+1)}}$

由于

$$
\frac{1}{\sqrt{n(n+1)}}\geq\frac{1}{\sqrt{(n+1)(n+1)}}=\frac{1}{n+1}
$$

且根据P级数可知 $\sum_{n=1}^\infty\frac{1}{n+1}$ 发散

故该级数发散。

(2) $\sum_{n=1}^\infty\frac{\sin n}{n^2}$

由于

$$
\bigg|\frac{\sin n}{n^2}\bigg|\leq\frac{1}{n^2}
$$

且根据P级数可知 $\sum_{n=1}^\infty\frac{1}{n^2}$ 收敛

可得 $\sum_{n=1}^\infty|\frac{\sin n}{n^2}|$ 收敛。

故 $\sum_{n=1}^\infty\frac{\sin n}{n^2}$ 绝对收敛。

(3) $\sum_{n=1}^\infty(-1)^n\frac{1}{2^n}(1+\frac{1}{n})^{n^2}$

由于

$$
\begin{split}
  &\lim_{n\to+\infty}\frac{1}{2^n}(1+\frac{1}{n})^{n^2}\\
  &=\lim_{n\to+\infty}\frac{1}{2^n}e^{n^2\ln(1+\frac{1}{n})}\\
  &=\lim_{n\to+\infty}\frac{1}{2^n}e^{n^2(\frac{1}{n}-\frac{1}{2n^2}+o(\frac{1}{n^2}))}\\
  &=\lim_{n\to+\infty}\frac{e^{n-\frac{1}{2}+o(1)}}{2^n}\\
  &=+\infty\\
  &\neq0
\end{split}
$$

故该级数发散。

(4) $\sum_{n=1}^\infty(\frac{n}{2n+1})^n$

由于

$$
\begin{split}
  &\lim_{n\to+\infty}\sqrt[n]{(\frac{n}{2n+1})^n}\\
  &=\lim_{n\to+\infty}\frac{n}{2n+1}\\
  &=\frac{1}{2}\\
  &<1
\end{split}
$$

故该级数收敛。

(5) $\sum_{n=1}^\infty\frac{(-1)^n}{n}$

由于 $\frac{1}{n}$ 在 $[1,+\infty)$ 上单调递减趋于0

故该级数收敛。

但又因为 $\sum_{n=1}^\infty|\frac{(-1)^n}{n}|=\sum_{n=1}^\infty\frac{1}{n}$ 发散，所以该级数条件收敛。

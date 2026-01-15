---
title: "线性代数与解析几何笔记 3 - 向量组的线性相关性"
author: NriotHrreion
tags:
- "期末"
- "线代"
date: 2026-01-08
---

## 判别线性相关性 (数字型)

- 对于两个向量：

<div align="center">

两个向量 $\alpha_1$ 与 $\alpha_2$ 对应成比例 $\Harr$ $\alpha_1$ 与 $\alpha_2$ 相关 $\xLeftrightarrow{方阵}$ $|\alpha_1,\alpha_2|=0$

</div>

- 对于多个向量：

<div align="center">

多个向量 $\alpha_1,\alpha_2,...,\alpha_m$ 相关 $\begin{cases}\xLeftrightarrow{方阵}|\alpha_1,\alpha_2,...,\alpha_m|=0\\\xLeftrightarrow{}r(\alpha_1,\alpha_2,...,\alpha_m)<m\end{cases}$

</div>

<br>

<div align="center">

多个向量 $\alpha_1,\alpha_2,...,\alpha_m$ 无关 $\begin{cases}\xLeftrightarrow{方阵}|\alpha_1,\alpha_2,...,\alpha_m|\neq0\\\xLeftrightarrow{}r(\alpha_1,\alpha_2,...,\alpha_m)=m\end{cases}$

</div>

#### 例题 1

求下列向量组的相关性

$$
\alpha_1=
\begin{pmatrix}
  2\\5
\end{pmatrix},
\alpha_2=
\begin{pmatrix}
  -1\\3
\end{pmatrix}
$$

- **方法 1**：

<div align="center">

$\alpha_1$ 与 $\alpha_2$ 不成比例 $\Rarr$ 无关

</div>

- **方法 2**：

$$
|\alpha_1,\alpha_2|=
\begin{vmatrix}
  2 & -1\\
  5 & 3
\end{vmatrix}=11\neq0
\Rarr 无关
$$

- **方法 3**：

$$
(\alpha_1,\alpha_2)=
\begin{pmatrix}
  2 & -1\\
  5 & 3
\end{pmatrix}
\xrightarrow{r_2-\frac{5}{2}r_1}
\begin{pmatrix}
  2 & -1\\
  0 & \frac{11}{2}
\end{pmatrix}
\Rarr r(\alpha_1,\alpha_2)=2 \Rarr 无关
$$

#### 例题 2

求下列向量组的相关性

$$
\alpha_1=
\begin{pmatrix}
  1\\-2\\3
\end{pmatrix},
\alpha_2=
\begin{pmatrix}
  0\\2\\-5
\end{pmatrix},
\alpha_3=
\begin{pmatrix}
  -1\\0\\2
\end{pmatrix}
$$

- **方法 1**：

$$
|\alpha_1,\alpha_2,\alpha_3|=
\begin{vmatrix}
  1  & 0  & -1\\
  -2 & 2  & 0 \\
  3  & -5 & 2
\end{vmatrix}
\xlongequal{c_3+c_1}
\begin{vmatrix}
  1  & 0  & 0 \\
  -2 & 2  & -2\\
  3  & -5 & 5
\end{vmatrix}
$$

$$
\xlongequal{c_3+c_2}
\begin{vmatrix}
  1  & 0  & 0\\
  -2 & 2  & 0\\
  3  & -5 & 0
\end{vmatrix}
=0 \Rarr 相关
$$

- **方法 2**：

$$
(\alpha_1,\alpha_2,\alpha_3)=
\begin{pmatrix}
  1  & 0  & -1\\
  -2 & 2  & 0 \\
  3  & -5 & 2
\end{pmatrix}
\xrightarrow[r_2+2r_1]{r_3-3r_1}
\begin{pmatrix}
  1 & 0  & -1\\
  0 & 2  & -2\\
  0 & -5 & 5
\end{pmatrix}
$$

$$
\xrightarrow{r_3+\frac{5}{2}r_2}
\begin{pmatrix}
  1 & 0 & -1\\
  0 & 2 & -2\\
  0 & 0 & 0
\end{pmatrix}
\Rarr r(\alpha_1,\alpha_2,\alpha_3)=2<3 \Rarr 相关
$$

#### 例题 3

已知下列向量

$$
\alpha_1=
\begin{pmatrix}
  6\\ a+1\\3
\end{pmatrix},
\alpha_2=
\begin{pmatrix}
  a\\2\\-2
\end{pmatrix},
\alpha_3=
\begin{pmatrix}
  a\\1\\0
\end{pmatrix}
$$

问：(1) 当 $a$ 为何值时， $\alpha_1$ 与 $\alpha_2$ 相关；(2) 当 $a$ 为何值时，三个向量无关

(1)

因为 $\alpha_1$ 与 $\alpha_2$ 相关，所以 $\alpha_1$ 与 $\alpha_2$ 对应成比例，有

$$\frac{6}{a}=\frac{a+1}{2}=-\frac{3}{2}$$

解得

$$\boxed{a=-4}$$

(2)

因为 $\alpha_1,\alpha_2,\alpha_3$ 无关，所以有

$$
|\alpha_1,\alpha_2,\alpha_3|=
\begin{vmatrix}
  6   & a  & a\\
  a+1 & 2  & 1\\
  3   & -2 & 0
\end{vmatrix}\neq0
$$

$$
\begin{vmatrix}
  6   & a  & a\\
  a+1 & 2  & 1\\
  3   & -2 & 0
\end{vmatrix}
\xlongequal{r_1-ar_2}
\begin{vmatrix}
  -a^2-a+6 & -a & 0\\
  a+1      & 2  & 1\\
  3        & -2 & 0
\end{vmatrix}
$$

通过第2行第3列的代数余子式展开

$$
=1\cdot(-1)^{2+3}
\begin{vmatrix}
  -a^2-a+6 & -a\\
  3        & -2
\end{vmatrix}
=-(2a-3)(a+4)\neq0
$$

故

$$\boxed{a\neq\frac{3}{2},a\neq-4}$$

## 判别线性相关性 (抽象型)

遇到复杂的抽象向量，可以将其拆成简单的抽象向量与一个数字型向量相乘，比如：

$$
(\alpha_1-\alpha_2,2\alpha_2-\alpha_3,\alpha_1+\alpha_2+\alpha_3)=
(\alpha_1,\alpha_2,\alpha_3)
\begin{pmatrix}
  1  & 0  & 1\\
  -1 & 2  & 1\\
  0  & -1 & 1
\end{pmatrix}
$$

- 若 $(\beta_1,\beta_2,\beta_3)=(\alpha_1,\alpha_2,\alpha_3)\cdot C$，且 $\alpha_1,\alpha_2,\alpha_3$ 无关，则

<div align="center">

$|C|=0$ $(\neq0)$ $\Harr$ $\beta_1,\beta_2,\beta_3$ 相关 (无关)

</div>

> [!tip]
> - 无关组 * 可逆阵 = 无关
> - 无关组 * 不可逆阵 = 相关

- 若向量组 $\alpha_1,\alpha_2,\alpha_3$ 可以被另一向量组 $\beta_1,\beta_2$ 的线性组合表示，则向量组 $\alpha_1,\alpha_2,\alpha_3$ 线性相关

#### 例题

设 $\alpha_1,\alpha_2,\alpha_3$ 线性无关，求向量组 $\alpha_1-\alpha_2,\alpha_2-\alpha_3,\alpha_3-2\alpha_1$ 的相关性

易得

$$
(\alpha_1-\alpha_2,\alpha_2-\alpha_3,\alpha_3-2\alpha_1)=
(\alpha_1,\alpha_2,\alpha_3)
\begin{pmatrix}
  1  & 0  & -2\\
  -1 & 1  & 0 \\
  0  & -1 & 1
\end{pmatrix}
$$

$$
\begin{vmatrix}
  1  & 0  & -2\\
  -1 & 1  & 0 \\
  0  & -1 & 1
\end{vmatrix}
\xlongequal{r_3+r_2}
\begin{vmatrix}
  1  & 0 & -2\\
  -1 & 1 & 0 \\
  -1 & 0 & 1
\end{vmatrix}
\xlongequal[r_3+r_1]{r_2+r_1}
\begin{vmatrix}
  1 & 0 & -2\\
  0 & 1 & -2\\
  0 & 0 & -1
\end{vmatrix}=-1\neq0
$$

所以数字矩阵可逆

由于 $\alpha_1,\alpha_2,\alpha_3$ 线性无关，且数字矩阵可逆，故原向量组无关

## 极大无关组

极大无关组一般取行阶梯形矩阵中拐弯处所在的列向量，极大无关组的数量等于秩

#### 例题

已知下列向量

$$
\alpha_1=
\begin{pmatrix}
  1\\2\\1\\3
\end{pmatrix},
\alpha_2=
\begin{pmatrix}
  4\\-1\\-5\\-6
\end{pmatrix},
\alpha_3=
\begin{pmatrix}
  1\\-3\\-4\\-7
\end{pmatrix}
$$

求 $(\alpha_1,\alpha_2,\alpha_3)$ 的秩与一个极大无关组

$$
(\alpha_1,\alpha_2,\alpha_3)=
\begin{pmatrix}
  1 & 4  & 1 \\
  2 & -1 & -3\\
  1 & -5 & -4\\
  3 & -6 & -7
\end{pmatrix}
\xlongequal[r_4-3r_1]{\substack{r_2-2r_1\\ r_3-r_1}}
\begin{pmatrix}
  1 & 4   & 1 \\
  0 & -9  & -5\\
  0 & -9  & -5\\
  0 & -18 & -10
\end{pmatrix}
$$

$$
\xlongequal[r_4-2r_2]{r_3-r_2}
\begin{pmatrix}
  1 & 4  & 1 \\
  0 & -9 & -5\\
  0 & 0  & 0 \\
  0 & 0  & 0
\end{pmatrix}
$$

故可得

$$\boxed{r(\alpha_1,\alpha_2,\alpha_3)=2}$$

且 $(\alpha_1,\alpha_2,\alpha_3)$ 有两个极大无关组 (取拐弯处在原向量组中对应的列向量)

$$
\boxed{\alpha_1,\alpha_2}
$$

---
title: "线性代数与解析几何笔记 2 - 矩阵"
author: NriotHrreion
tags:
- "期末"
- "线代"
date: 2026-01-06
---

## 单位矩阵

$$
E_{2\times 2}=
\begin{pmatrix}
  1 & 0\\
  0 & 1
\end{pmatrix},
E_{3\times 3}=
\begin{pmatrix}
  1 & 0 & 0\\
  0 & 1 & 0\\
  0 & 0 & 1
\end{pmatrix},
E_{4\times 4}=
\begin{pmatrix}
  1 & 0 & 0 & 0\\
  0 & 1 & 0 & 0\\
  0 & 0 & 1 & 0\\
  0 & 0 & 0 & 1
\end{pmatrix}
$$

> [!tip]
> 任何矩阵乘以对应的单位矩阵都会等于它自己

## 矩阵的乘法

$$
A_{2\times 2}=
\begin{pmatrix}
  a & b\\
  c & d
\end{pmatrix},
B_{2\times 3}=
\begin{pmatrix}
  e & f & g\\
  h & m & n
\end{pmatrix}
$$

$$
AB=
\begin{pmatrix}
  ae+bh & af+bm & ag+bn\\
  ce+dh & cf+dm & cg+dn
\end{pmatrix}
=C_{2\times 3}
$$

矩阵乘法的规则为“前行后列”分别相乘再相加

> [!warning]
> 矩阵相乘的合法性为**内标相等**，若内标不相等，则两矩阵无法相乘

#### 例题

设 $A=\begin{pmatrix}1 & 2 & 3\end{pmatrix},B=\begin{pmatrix}3\\2\\1\end{pmatrix}$，求：(1) $AB$；(2) $BA$

(1)

$$AB=1\times 3+2\times 2+3\times 1=\boxed{10}$$

(2)

$$
BA=
\begin{pmatrix}
  3\times 1 & 3\times 2 & 3\times 3\\
  2\times 1 & 2\times 2 & 2\times 3\\
  1\times 1 & 1\times 2 & 1\times 3
\end{pmatrix}
=
\boxed{
  \begin{pmatrix}
    3 & 6 & 9\\
    2 & 4 & 6\\
    1 & 2 & 3
  \end{pmatrix}
}
$$

> [!tip]
> 1. 矩阵的乘法不具有交换律，即 $AB\neq BA$
> 2. 矩阵的乘法满足分配律，即 $A(B+C)=AB+AC$

## 逆矩阵

<div align="center">

对方阵 $A,B$，若 $AB=E$ （或 $BA=E$） $\Rarr$ $A,B$ 互为逆矩阵，记作 $A^{-1}=B,B^{-1}=A$

</div>

### 凑定义法 (针对抽象矩阵)

#### 例题

设方阵 $A$ 满足 $A^2-A-2E=0$，求 $(A+2E)^{-1}$

根据凑定义法，我们需要凑出 $(A+2E)M=E$，则这里的 $M$ 为待求的 $(A+2E)^{-1}$

$$
\begin{split}
  A^2-A-2E&=0\\
  A^2+2A-3A-2E&=0\\
  A(A+2E)-3A-2E&=0\\
  A(A+2E)-3A-6E+4E&=0\\
  A(A+2E)-3(A+2E)&=-4E\\
  (A+2E)(A-3E)&=-4E\\
  (A+2E)\cdot (-\frac{1}{4})(A-3E)&=E
\end{split}
$$

则可得

$$\boxed{(A+2E)^{-1}=(-\frac{1}{4})(A-3E)}$$

### 行变换法 (针对数字矩阵)

$$(A|E)\xrightarrow{\text{多次行变换}}(E|A^{-1})$$

#### 例题

求 $A=\begin{pmatrix}3 & 2 & 1\\3 & 1 & 5\\3 & 2 & 3\end{pmatrix}$ 的逆矩阵 $A^{-1}$

通过行变换法求解，先写出对应的增广矩阵 $(A|E)$

$$
(A|E)=
\left(
  \begin{array}{ccc|ccc}
    3 & 2 & 1 & 1 & 0 & 0\\
    3 & 1 & 5 & 0 & 1 & 0\\
    3 & 2 & 3 & 0 & 0 & 1
  \end{array}
\right)
$$

对 $(A|E)$ 进行变换

$$
\left(
  \begin{array}{ccc|ccc}
    3 & 2 & 1 & 1 & 0 & 0\\
    3 & 1 & 5 & 0 & 1 & 0\\
    3 & 2 & 3 & 0 & 0 & 1
  \end{array}
\right)
\xrightarrow[r_3-r_1]{r_2-r_1}
\left(
  \begin{array}{ccc|ccc}
    3 & 2  & 1 & 1  & 0 & 0\\
    0 & -1 & 4 & -1 & 1 & 0\\
    0 & 0  & 2 & -1 & 0 & 1
  \end{array}
\right)
$$

$$
\xrightarrow{r_1+2r_2}
\left(
  \begin{array}{ccc|ccc}
    3 & 0  & 9 & -1 & 2 & 0\\
    0 & -1 & 4 & -1 & 1 & 0\\
    0 & 0  & 2 & -1 & 0 & 1
  \end{array}
\right)
\xrightarrow[r_2\cdot(-1)]{r_1\cdot \frac{1}{3}}
\left(
  \begin{array}{ccc|ccc}
    1 & 0 & 3  & -\frac{1}{3} & \frac{2}{3} & 0\\
    0 & 1 & -4 & 1            & -1          & 0\\
    0 & 0 & 2  & -1           & 0           & 1
  \end{array}
\right)
$$

$$
\xrightarrow{r_2+2r_3}
\left(
  \begin{array}{ccc|ccc}
    1 & 0 & 3 & -\frac{1}{3} & \frac{2}{3} & 0\\
    0 & 1 & 0 & -1           & -1          & 2\\
    0 & 0 & 2 & -1           & 0           & 1
  \end{array}
\right)
\xrightarrow{r_3\cdot \frac{1}{2}}
\left(
  \begin{array}{ccc|ccc}
    1 & 0 & 3 & -\frac{1}{3} & \frac{2}{3} & 0\\
    0 & 1 & 0 & -1           & -1          & 2\\
    0 & 0 & 1 & -\frac{1}{2} & 0           & \frac{1}{2}
  \end{array}
\right)
$$

$$
\xrightarrow{r_1-3r_3}
\left(
  \begin{array}{ccc|ccc}
    1 & 0 & 0 & -\frac{7}{6} & \frac{2}{3} & -\frac{3}{2}\\
    0 & 1 & 0 & -1           & -1          & 2           \\
    0 & 0 & 1 & -\frac{1}{2} & 0           & \frac{1}{2}
  \end{array}
\right)
$$

可得

$$
\boxed{
  A^{-1}=
  \begin{pmatrix}
    -\frac{7}{6} & \frac{2}{3} & -\frac{3}{2}\\
    -1           & -1          & 2           \\
    -\frac{1}{2} & 0           & \frac{1}{2}
  \end{pmatrix}
}
$$

### “两调一除” (针对二阶数字矩阵)

若 $A=\begin{pmatrix}a & b\\ c & d\end{pmatrix}$，且 $|A|\neq 0$，则可得逆矩阵

$$
A^{-1}=\frac{1}{|A|}
\begin{pmatrix}
  d  & -b\\
  -c & a
\end{pmatrix}
$$

#### 例题

求 $A=\begin{pmatrix}1 & 4\\-1 & 2\end{pmatrix}$ 的逆矩阵 $A^{-1}$

由矩阵 $A$ 可得

$$
|A|=
\begin{vmatrix}
  1 & 4\\
  -1 & 2
\end{vmatrix}
=6\neq 0
$$

故

$$
A^{-1}=\frac{1}{6}
\begin{pmatrix}
  2 & -4\\
  1 & 1
\end{pmatrix}
=
\boxed{
  \begin{pmatrix}
    \frac{1}{3} & -\frac{2}{3}\\
    \frac{1}{6} & \frac{1}{6}
  \end{pmatrix}
}
$$

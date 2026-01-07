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

## 矩阵方程

$$AX=B \Rarr X=A^{-1}B$$

$$XA=B \Rarr X=BA^{-1}$$

$$AXB=C \Rarr X=A^{-1}CB^{-1}$$

#### 例题 1

求解矩阵方程

$$
\begin{pmatrix}
  2 & 5\\
  1 & 3
\end{pmatrix}
X=
\begin{pmatrix}
  4 & -6\\
  2 & 1
\end{pmatrix}
$$

由 $AX=B \Rarr X=A^{-1}B$ 可得

$$
\begin{split}
  X&=
  \begin{pmatrix}
    2 & 5\\
    1 & 3
  \end{pmatrix}^{-1}
  \begin{pmatrix}
    4 & -6\\
    2 & 1
  \end{pmatrix}\\
  X&=
  \begin{pmatrix}
    3  & -5\\
    -1 & 2
  \end{pmatrix}
  \begin{pmatrix}
    4 & -6\\
    2 & 1
  \end{pmatrix}\\
  X&=
  \boxed{
    \begin{pmatrix}
      2 & -23\\
      0 & 8
    \end{pmatrix}
  }
\end{split}
$$

#### 例题 2

求解矩阵方程

$$
X
\begin{pmatrix}
  2 & 1  & -1\\
  2 & 1  & 0\\
  1 & -1 & 1
\end{pmatrix}
=
\begin{pmatrix}
  1 & -1 & 3\\
  4 & 3  & 2
\end{pmatrix}
$$

由 $XA=B \Rarr X=BA^{-1}$ 可得

$$
X=
\begin{pmatrix}
  1 & -1 & 3\\
  4 & 3  & 2
\end{pmatrix}
\begin{pmatrix}
  2 & 1  & -1\\
  2 & 1  & 0\\
  1 & -1 & 1
\end{pmatrix}^{-1}
$$

由于 $\begin{vmatrix}2 & 1 & -1\\2 & 1 & 0\\1 & -1 & 1\end{vmatrix}=3\neq 0$，故可通过行变换法求式中的逆矩阵

$$
\left(
  \begin{array}{ccc|ccc}
    2 & 1  & -1 & 1 & 0 & 0\\
    2 & 1  & 0  & 0 & 1 & 0\\
    1 & -1 & 1  & 0 & 0 & 1
  \end{array}
\right)
\xrightarrow{r_1+r_3}
\left(
  \begin{array}{ccc|ccc}
    3 & 0  & 0 & 1 & 0 & 1\\
    2 & 1  & 0 & 0 & 1 & 0\\
    1 & -1 & 1 & 0 & 0 & 1
  \end{array}
\right)
$$

$$
\xrightarrow[r_3+r_2]{r_1\cdot\frac{1}{3}}
\left(
  \begin{array}{ccc|ccc}
    1 & 0 & 0 & \frac{1}{3} & 0 & \frac{1}{3}\\
    2 & 1 & 0 & 0           & 1 & 0          \\
    3 & 0 & 1 & 0           & 1 & 1
  \end{array}
\right)
\xrightarrow[r_3-3r_1]{r_2-2r_1}
\left(
  \begin{array}{ccc|ccc}
    1 & 0 & 0 & \frac{1}{3}  & 0 & \frac{1}{3} \\
    0 & 1 & 0 & -\frac{2}{3} & 1 & -\frac{2}{3}\\
    0 & 0 & 1 & -1           & 1 & 0
  \end{array}
\right)
$$

所以原方程可化为

$$
\begin{split}
  X&=
  \begin{pmatrix}
    1 & -1 & 3\\
    4 & 3  & 2
  \end{pmatrix}
  \begin{pmatrix}
    \frac{1}{3}  & 0 & \frac{1}{3} \\
    -\frac{2}{3} & 1 & -\frac{2}{3}\\
    -1           & 1 & 0
  \end{pmatrix}\\
  X&=
  \boxed{
    \begin{pmatrix}
      -2           & 2 & 1\\
      -\frac{8}{3} & 5 & -\frac{2}{3}
    \end{pmatrix}
  }
\end{split}
$$

## 伴随矩阵

矩阵 $A$ 的伴随矩阵记作 $A^*$，有如下性质

$$AA^*=A^*A=|A|\cdot E$$

$$A^*=|A|\cdot A^{-1} \Harr A^{-1}=\frac{A^*}{|A|}$$

#### 例题

设矩阵 $X$ 满足 $A^*X=A^{-1}B+2X$，其中，$A=\begin{pmatrix}1 & 1 & -1\\-1 & 1 & 1\\1 & -1 & 1\end{pmatrix}$， $B=\begin{pmatrix}1 & 1\\1 & 0\\0 & 0\end{pmatrix}$

将方程左右同时左乘 $A$

$$
\begin{split}
  AA^*X&=AA^{-1}B+2AX\\
  |A|EX&=B+2AX\\
  (|A|E-2A)X&=B
\end{split}
$$

因为 $|A|=4$，所以

$$
\begin{split}
  (4E-2A)X&=B\\
  X&=(4E-2A)^{-1}B\\
  X&=
  \begin{pmatrix}
    2  & -2 & 2 \\
    2  & 2  & -2\\
    -2 & 2  & 2
  \end{pmatrix}^{-1}
  \begin{pmatrix}
    1 & 1\\
    1 & 0\\
    0 & 0
  \end{pmatrix}\\
  X&=
  \begin{pmatrix}
    \frac{1}{4} & \frac{1}{4} & 0          \\
    0           & \frac{1}{4} & \frac{1}{4}\\
    \frac{1}{4} & 0           & \frac{1}{4}
  \end{pmatrix}
  \begin{pmatrix}
    1 & 1\\
    1 & 0\\
    0 & 0
  \end{pmatrix}\\
  X&=
  \boxed{
    \frac{1}{4}
    \begin{pmatrix}
      2 & 1 \\
      1 & -1\\
      1 & 0
    \end{pmatrix}
  }
\end{split}
$$

## 方阵的行列式

方阵的行列式有如下性质

$$|A^{-1}|=\frac{1}{|A|}$$

$$|A^\text{T}|=|A|$$

$$|kA_{n\times n}|=k^n|A|$$

$$|A^*_{n\times n}|=|A|^{n-1}$$

> [!warning]
> **常见错误**： $|A+B|\neq|A|+|B|$

#### 例题

设 $A_{3\times 3}$， $|A|=\frac{1}{2}$，求 $|(3A)^{-1}-2A^*|$

> [!tip]
> 见 $A^*$，想公式 $A^*=|A|\cdot A^{-1}$

$$
\begin{split}
  |(3A)^{-1}-2A^*|&=|(3A)^{-1}-2|A|\cdot A^{-1}|\\
  &=|(3A)^{-1}-A^{-1}|\\
  &=|\frac{1}{3}A^{-1}-A^{-1}|\\
  &=|-\frac{2}{3}A^{-1}|\\
  &=(-\frac{2}{3})^3|A^{-1}|\\
  &=-\frac{8}{27}\cdot\frac{1}{|A|}\\
  &=\boxed{-\frac{16}{27}}
\end{split}
$$

## 矩阵的秩

若矩阵中每一行的首个非0元素所在的列比下一行的首个非0元素所在的列都靠前，则称该矩阵为行阶梯形矩阵

利用行初等变换法将矩阵 $A$ 化为行阶梯形矩阵 $B$，则矩阵 $A$ 的秩为 $B$ 中非0行的行数，记作 $r(A)$

#### 例题 1

设 $A=\begin{pmatrix}3 & 1 & 0 & 2\\1 & -1 & 2 & -1\\1 & 3 & -4 & 4\end{pmatrix}$，求 $r(A)$

> [!tip]
> 此处行初等变换法与三角形法求行列式的变换路径相似

$$
\begin{pmatrix}
  3 & 1  & 0  & 2 \\
  1 & -1 & 2  & -1\\
  1 & 3  & -4 & 4
\end{pmatrix}
\xrightarrow{r_1\harr r_2}
\begin{pmatrix}
  1 & -1 & 2  & -1\\
  3 & 1  & 0  & 2 \\
  1 & 3  & -4 & 4
\end{pmatrix}
$$

$$
\xrightarrow[r_3-r_1]{r_2-3r_1}
\begin{pmatrix}
  1 & -1 & 2  & -1\\
  0 & 4  & -6 & 5 \\
  0 & 4  & -6 & 5
\end{pmatrix}
\xrightarrow{r_3-r_2}
\begin{pmatrix}
  1 & -1 & 2  & -1\\
  0 & 4  & -6 & 5 \\
  0 & 0  & 0  & 0
\end{pmatrix}
$$

由于最后的矩阵中，非0行数为 $2$，故

$$\boxed{r(A)=2}$$

#### 例题 2

设 $A=\begin{pmatrix}1 & -2 & 3k\\-1 & 2k & -3\\ k & -2 & 3\end{pmatrix}$，问 $k$ 为何值时，可使：(1) $r(A)=1$；(2) $r(A)=2$；(3) $r(A)=3$

$$
\begin{pmatrix}
  1  & -2 & 3k\\
  -1 & 2k & -3\\
  k  & -2 & 3
\end{pmatrix}
\xrightarrow[r_3-kr_1]{r_2+r_1}
\begin{pmatrix}
  1 & -2     & 3k    \\
  0 & 2(k-1) & 3(k-1)\\
  0 & 2(k-1) & -3(k^2-1)
\end{pmatrix}
$$

$$
\xrightarrow{r_3-r_2}
\begin{pmatrix}
  1 & -2     & 3k    \\
  0 & 2(k-1) & 3(k-1)\\
  0 & 0      & -3(k-1)(k+2)
\end{pmatrix}
$$

当 $r(A)=1$ 时，可得

$$
\begin{cases}
  2(k-1)=0\\
  3(k-1)=0\\
  -3(k-1)(k+2)=0
\end{cases}
\Rarr\boxed{k=1}
$$

当 $r(A)=2$ 时，可得

$$
\begin{cases}
  2(k-1)\neq 0\\
  3(k-1)\neq 0\\
  -3(k-1)(k+2)=0
\end{cases}
\Rarr\boxed{k=-2}
$$

当 $r(A)=3$ 时，可得

$$\boxed{k\in (-\infty,-2)\cup(-2,1)\cup(1,+\infty)}$$

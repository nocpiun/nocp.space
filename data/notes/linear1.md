---
title: "线性代数与解析几何笔记 1 - 行列式"
author: NriotHrreion
tags:
- "期末"
- "线代"
date: 2026-01-05
---

## 二阶行列式计算

$$
\begin{vmatrix}
  a\_{11} & a\_{12}\\\\
  a\_{21} & a\_{22}
\end{vmatrix}
=a\_{11}a\_{22}-a\_{12}a\_{21}
$$

## 行列式的性质

- **倍加性质**：行列式的某行（或某列）的 $k$ 倍加到另一行（或列），行列式的值不变
- **提公因子**：行列式中某行（或某列）的所有元素的公因子可以提到行列式外面
- **行列交换**：交换行列式的某两行（或某两列），行列式的值变号

### 三角形行列式

> [!tip]
> 利用三角形法计算行列式时，若第一行第一列元素不是 $1$，可以先通过行列交换将其变为 $1$，再化为三角形

- 上三角行列式

$$
\begin{vmatrix}
  a\_{11} & a\_{12} & ... & a\_{1n}\\\\
  0       & a\_{22} & ... & a\_{2n}\\\\
  ...     &         & ... & ...    \\\\
  0       & ...     & 0   & a\_{nn}
\end{vmatrix}
=a\_{11}a\_{22}...a\_{nn}
$$

- 下三角行列式

$$
\begin{vmatrix}
  a\_{11} & 0       & ... & 0  \\\\
  a\_{21} & a\_{22} &     & ...\\\\
  ...     & ...     & ... & 0  \\\\
  a\_{n1} & a\_{n2} & ... & a\_{nn}
\end{vmatrix}
=a\_{11}a\_{22}...a\_{nn}
$$

#### 例题 1

求四阶行列式

$$
D=
\begin{vmatrix}
  3  & 1  & -1 & 2 \\\\
  -5 & 1  & 3  & -4\\\\
  2  & 0  & 1  & -1\\\\
  1  & -5 & 3  & -3
\end{vmatrix}
$$

$$
\xlongequal{c\_1 \harr c\_2}-
\begin{vmatrix}
  1  & 3  & -1 & 2 \\\\
  1  & -5 & 3  & -4\\\\
  0  & 2  & 1  & -1\\\\
  -5 & 1  & 3  & -3
\end{vmatrix}
\xlongequal[r\_4+5r\_1]{r\_2-r\_1}-
\begin{vmatrix}
  1  & 3  & -1 & 2 \\\\
  0  & -8 & 4  & -6\\\\
  0  & 2  & 1  & -1\\\\
  0  & 16 & -2 & 7
\end{vmatrix}
$$

$$
\xlongequal{r\_4+2r\_2}-
\begin{vmatrix}
  1  & 3  & -1 & 2 \\\\
  0  & -8 & 4  & -6\\\\
  0  & 2  & 1  & -1\\\\
  0  & 0  & 6  & -5
\end{vmatrix}
\xlongequal{r\_2 \harr r\_3}
\begin{vmatrix}
  1  & 3  & -1 & 2 \\\\
  0  & 2  & 1  & -1\\\\
  0  & -8 & 4  & -6\\\\
  0  & 0  & 6  & -5
\end{vmatrix}
$$

$$
\xlongequal{r\_3+4r\_2}
\begin{vmatrix}
  1  & 3  & -1 & 2  \\\\
  0  & 2  & 1  & -1 \\\\
  0  & 0  & 8  & -10\\\\
  0  & 0  & 6  & -5
\end{vmatrix}
=2
\begin{vmatrix}
  1  & 3  & -1 & 2  \\\\
  0  & 2  & 1  & -1 \\\\
  0  & 0  & 4  & -5 \\\\
  0  & 0  & 6  & -5
\end{vmatrix}
$$

$$
\xlongequal{r\_4-\frac{3}{2}r\_3}2
\begin{vmatrix}
  1  & 3  & -1 & 2  \\\\
  0  & 2  & 1  & -1 \\\\
  0  & 0  & 4  & -5 \\\\
  0  & 0  & 0  & \frac{5}{2}
\end{vmatrix}
=2\cdot 1\cdot 2\cdot 4\cdot\frac{5}{2}=40
$$

#### 例题 2

求三阶行列式

$$
D=
\begin{vmatrix}
  x & a & a\\\\
  a & x & a\\\\
  a & a & x
\end{vmatrix}
$$

$$
\xlongequal{c\_1+c\_2+c\_3}
\begin{vmatrix}
  x+2a & a & a\\\\
  x+2a & x & a\\\\
  x+2a & a & x
\end{vmatrix}
=(x+2a)
\begin{vmatrix}
  1 & a & a\\\\
  1 & x & a\\\\
  1 & a & x
\end{vmatrix}
$$

$$
\xlongequal[r\_3-r\_1]{r\_2-r\_1}(x+2a)
\begin{vmatrix}
  1 & a   & a\\\\
  0 & x-a & 0\\\\
  0 & 0   & x-a
\end{vmatrix}
$$

$$=(x+2a)(x-a)^2$$

## 范德蒙行列式计算

$$
\begin{vmatrix}
  1      & 1      & 1\\\\
  x\_1   & x\_2   & x\_3\\\\
  x\_1^2 & x\_2^2 & x\_3^2\\\\
\end{vmatrix}
=(x\_2-x\_1)(x\_3-x\_1)(x\_3-x\_2)
$$

1. 第一行（或列）的元素均为 $1$；
2. 每一行（或列）的元素均为等比数列，且公比元素在第二行（或列）；
3. 其结果为公比元素作差（下标大的减去下标小的）再相乘。

#### 例题

求三阶行列式

$$
D=
\begin{vmatrix}
  b+c & a+c & a+b\\\\
  a   & b   & c  \\\\
  a^2 & b^2 & c^2
\end{vmatrix}
$$

$$
\xlongequal{r\_1+r\_2}
\begin{vmatrix}
  a+b+c & a+b+c & a+b+c\\\\
  a     & b     & c    \\\\
  a^2   & b^2   & c^2
\end{vmatrix}
=(a+b+c)
\begin{vmatrix}
  1   & 1   & 1\\\\
  a   & b   & c\\\\
  a^2 & b^2 & c^2
\end{vmatrix}
$$

$$=(a+b+c)(b-a)(c-a)(c-b)$$

## 爪型行列式计算

1. 首先将主对角线第 $2 \sim n$ 个元素化为 $1$ (提公因子)；
2. 再将其化为三角形行列式。

#### 例题 1

求四阶行列式

$$
D=
\begin{vmatrix}
  a\_1 & 1    & 1    & 1\\\\
  1    & a\_2 & 0    & 0\\\\
  1    & 0    & a\_3 & 0\\\\
  1    & 0    & 0    & a\_4
\end{vmatrix}
$$

$$
=a\_2a\_3a\_4
\begin{vmatrix}
  a\_1           & 1 & 1 & 1\\\\
  \frac{1}{a\_2} & 1 & 0 & 0\\\\
  \frac{1}{a\_3} & 0 & 1 & 0\\\\
  \frac{1}{a\_4} & 0 & 0 & 1
\end{vmatrix}
$$

$$
\xlongequal{r\_1-r\_2-r\_3-r\_4}a\_2a\_3a\_4
\begin{vmatrix}
  a\_1-\frac{1}{a\_2}-\frac{1}{a\_3}-\frac{1}{a\_4} & 0 & 0 & 0\\\\
  \frac{1}{a\_2}                                    & 1 & 0 & 0\\\\
  \frac{1}{a\_3}                                    & 0 & 1 & 0\\\\
  \frac{1}{a\_4}                                    & 0 & 0 & 1
\end{vmatrix}
$$

$$=a\_2a\_3a\_4(a\_1-\frac{1}{a\_2}-\frac{1}{a\_3}-\frac{1}{a\_4})$$

#### 例题 2

求四阶行列式

$$
D=
\begin{vmatrix}
  a\_1 & 2    & 3    & 4\\\\
  1    & a\_2 & 0    & 0\\\\
  1    & 0    & a\_3 & 0\\\\
  1    & 0    & 0    & a\_4
\end{vmatrix}
$$

$$
=a\_2a\_3a\_4
\begin{vmatrix}
  a\_1           & 2 & 3 & 4\\\\
  \frac{1}{a\_2} & 1 & 0 & 0\\\\
  \frac{1}{a\_3} & 0 & 1 & 0\\\\
  \frac{1}{a\_4} & 0 & 0 & 1
\end{vmatrix}
$$

$$
\xlongequal{r\_1-2r\_2-3r\_3-4r\_4}a\_2a\_3a\_4
\begin{vmatrix}
  a\_1-\frac{2}{a\_2}-\frac{3}{a\_3}-\frac{4}{a\_4} & 0 & 0 & 0\\\\
  \frac{1}{a\_2}                                    & 1 & 0 & 0\\\\
  \frac{1}{a\_3}                                    & 0 & 1 & 0\\\\
  \frac{1}{a\_4}                                    & 0 & 0 & 1
\end{vmatrix}
$$

$$=a\_2a\_3a\_4(a\_1-\frac{2}{a\_2}-\frac{3}{a\_3}-\frac{4}{a\_4})$$

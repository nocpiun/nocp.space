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
  a_{11} & a_{12}\\
  a_{21} & a_{22}
\end{vmatrix}
=a_{11}a_{22}-a_{12}a_{21}
$$

## 行列式的性质

- **倍加性质**：行列式的某行（或某列）的 $k$ 倍加到另一行（或列），行列式的值不变
- **提公因子**：行列式中某行（或某列）的所有元素的公因子可以提到行列式外面
- **行列交换**：交换行列式的某两行（或某两列），行列式的值变号
- **拆和**：当行列式某行（或某列）的元素为两数之和时，行列式可分解为两个行列式之和
- 当行列式某行（或某列）为 $0$，则此行列式等于 $0$
- 当行列式某两行（或某两列）的元素成比例，则此行列式等于 $0$

### 三角形行列式

> [!tip]
> 利用三角形法计算行列式时，若第一行第一列元素不是 $1$，可以先通过行列交换将其变为 $1$，再化为三角形

- 上三角行列式

$$
\begin{vmatrix}
  a_{11} & a_{12} & ... & a_{1n}\\
  0      & a_{22} & ... & a_{2n}\\
  ...    &        & ... & ...   \\
  0      & ...    & 0   & a_{nn}
\end{vmatrix}
=a_{11}a_{22}...a_{nn}
$$

- 下三角行列式

$$
\begin{vmatrix}
  a_{11} & 0      & ... & 0  \\
  a_{21} & a_{22} &     & ...\\
  ...    & ...    & ... & 0  \\
  a_{n1} & a_{n2} & ... & a_{nn}
\end{vmatrix}
=a_{11}a_{22}...a_{nn}
$$

#### 例题 1

求四阶行列式

$$
D=
\begin{vmatrix}
  3  & 1  & -1 & 2 \\
  -5 & 1  & 3  & -4\\
  2  & 0  & 1  & -1\\
  1  & -5 & 3  & -3
\end{vmatrix}
$$

$$
\xlongequal{c_1 \harr c_2}-
\begin{vmatrix}
  1  & 3  & -1 & 2 \\
  1  & -5 & 3  & -4\\
  0  & 2  & 1  & -1\\
  -5 & 1  & 3  & -3
\end{vmatrix}
\xlongequal[r_4+5r_1]{r_2-r_1}-
\begin{vmatrix}
  1  & 3  & -1 & 2 \\
  0  & -8 & 4  & -6\\
  0  & 2  & 1  & -1\\
  0  & 16 & -2 & 7
\end{vmatrix}
$$

$$
\xlongequal{r_4+2r_2}-
\begin{vmatrix}
  1  & 3  & -1 & 2 \\
  0  & -8 & 4  & -6\\
  0  & 2  & 1  & -1\\
  0  & 0  & 6  & -5
\end{vmatrix}
\xlongequal{r_2 \harr r_3}
\begin{vmatrix}
  1  & 3  & -1 & 2 \\
  0  & 2  & 1  & -1\\
  0  & -8 & 4  & -6\\
  0  & 0  & 6  & -5
\end{vmatrix}
$$

$$
\xlongequal{r_3+4r_2}
\begin{vmatrix}
  1  & 3  & -1 & 2  \\
  0  & 2  & 1  & -1 \\
  0  & 0  & 8  & -10\\
  0  & 0  & 6  & -5
\end{vmatrix}
=2
\begin{vmatrix}
  1  & 3  & -1 & 2  \\
  0  & 2  & 1  & -1 \\
  0  & 0  & 4  & -5 \\
  0  & 0  & 6  & -5
\end{vmatrix}
$$

$$
\xlongequal{r_4-\frac{3}{2}r_3}2
\begin{vmatrix}
  1  & 3  & -1 & 2  \\
  0  & 2  & 1  & -1 \\
  0  & 0  & 4  & -5 \\
  0  & 0  & 0  & \frac{5}{2}
\end{vmatrix}
=2\cdot 1\cdot 2\cdot 4\cdot\frac{5}{2}=\boxed{40}
$$

#### 例题 2

求三阶行列式

$$
D=
\begin{vmatrix}
  x & a & a\\
  a & x & a\\
  a & a & x
\end{vmatrix}
$$

$$
\xlongequal{c_1+c_2+c_3}
\begin{vmatrix}
  x+2a & a & a\\
  x+2a & x & a\\
  x+2a & a & x
\end{vmatrix}
=(x+2a)
\begin{vmatrix}
  1 & a & a\\
  1 & x & a\\
  1 & a & x
\end{vmatrix}
$$

$$
\xlongequal[r_3-r_1]{r_2-r_1}(x+2a)
\begin{vmatrix}
  1 & a   & a\\
  0 & x-a & 0\\
  0 & 0   & x-a
\end{vmatrix}
$$

$$=\boxed{(x+2a)(x-a)^2}$$

## 范德蒙行列式计算

$$
\begin{vmatrix}
  1     & 1     & 1    \\
  x_1   & x_2   & x_3  \\
  x_1^2 & x_2^2 & x_3^2\\
\end{vmatrix}
=(x_2-x_1)(x_3-x_1)(x_3-x_2)
$$

1. 第一行（或列）的元素均为 $1$；
2. 每一行（或列）的元素均为等比数列，且公比元素在第二行（或列）；
3. 其结果为公比元素作差（下标大的减去下标小的）再相乘。

#### 例题

求三阶行列式

$$
D=
\begin{vmatrix}
  b+c & a+c & a+b\\
  a   & b   & c  \\
  a^2 & b^2 & c^2
\end{vmatrix}
$$

$$
\xlongequal{r_1+r_2}
\begin{vmatrix}
  a+b+c & a+b+c & a+b+c\\
  a     & b     & c    \\
  a^2   & b^2   & c^2
\end{vmatrix}
=(a+b+c)
\begin{vmatrix}
  1   & 1   & 1\\
  a   & b   & c\\
  a^2 & b^2 & c^2
\end{vmatrix}
$$

$$=\boxed{(a+b+c)(b-a)(c-a)(c-b)}$$

## 爪型行列式计算

1. 首先将主对角线第 $2 \sim n$ 个元素化为 $1$ (提公因子)；
2. 再将其化为三角形行列式。

#### 例题 1

求四阶行列式

$$
D=
\begin{vmatrix}
  a_1 & 1   & 1   & 1\\
  1   & a_2 & 0   & 0\\
  1   & 0   & a_3 & 0\\
  1   & 0   & 0   & a_4
\end{vmatrix}
$$

$$
=a_2a_3a_4
\begin{vmatrix}
  a_1           & 1 & 1 & 1\\
  \frac{1}{a_2} & 1 & 0 & 0\\
  \frac{1}{a_3} & 0 & 1 & 0\\
  \frac{1}{a_4} & 0 & 0 & 1
\end{vmatrix}
$$

$$
\xlongequal{r_1-r_2-r_3-r_4}a_2a_3a_4
\begin{vmatrix}
  a_1-\frac{1}{a_2}-\frac{1}{a_3}-\frac{1}{a_4} & 0 & 0 & 0\\
  \frac{1}{a_2}                                 & 1 & 0 & 0\\
  \frac{1}{a_3}                                 & 0 & 1 & 0\\
  \frac{1}{a_4}                                 & 0 & 0 & 1
\end{vmatrix}
$$

$$=\boxed{a_2a_3a_4(a_1-\frac{1}{a_2}-\frac{1}{a_3}-\frac{1}{a_4})}$$

#### 例题 2

求四阶行列式

$$
D=
\begin{vmatrix}
  a_1 & 2   & 3   & 4\\
  1   & a_2 & 0   & 0\\
  1   & 0   & a_3 & 0\\
  1   & 0   & 0   & a_4
\end{vmatrix}
$$

$$
=a_2a_3a_4
\begin{vmatrix}
  a_1           & 2 & 3 & 4\\
  \frac{1}{a_2} & 1 & 0 & 0\\
  \frac{1}{a_3} & 0 & 1 & 0\\
  \frac{1}{a_4} & 0 & 0 & 1
\end{vmatrix}
$$

$$
\xlongequal{r_1-2r_2-3r_3-4r_4}a_2a_3a_4
\begin{vmatrix}
  a_1-\frac{2}{a_2}-\frac{3}{a_3}-\frac{4}{a_4} & 0 & 0 & 0\\
  \frac{1}{a_2}                                 & 1 & 0 & 0\\
  \frac{1}{a_3}                                 & 0 & 1 & 0\\
  \frac{1}{a_4}                                 & 0 & 0 & 1
\end{vmatrix}
$$

$$=\boxed{a_2a_3a_4(a_1-\frac{2}{a_2}-\frac{3}{a_3}-\frac{4}{a_4})}$$

## 余子式 / 代数余子式

$$
D=
\begin{vmatrix}
  a_{11} & a_{12} & a_{13}\\
  a_{21} & a_{22} & a_{23}\\
  a_{31} & a_{32} & a_{33}
\end{vmatrix}
$$

其中，元素 $a_{ij}$ 的余子式为去掉 $a_{ij}$ 所在的行和列后得到的行列式，记作 $M_{ij}$

元素 $a_{ij}$ 的代数余子式则为 $(-1)^{i+j}\cdot M_{ij}$，记作 $A_{ij}$，即 $A_{ij}=(-1)^{i+j}M_{ij}$

### 行列式展开定理

$$
D=
\begin{vmatrix}
  a_{11} & a_{12} & ... & a_{1n}\\
  a_{21} & a_{22} & ... & a_{2n}\\
  ...    & ...    &     & ...   \\
  a_{n1} & a_{n2} & ... & a_{nn}
\end{vmatrix}
=\sum_{i=1}^{n}a_{ri}A_{ri}
=\sum_{j=1}^{n}a_{jc}A_{jc} (r=1,2,...,n) (c=1,2,...,n)
$$

#### 例题 1

求三阶行列式

$$
D=
\begin{vmatrix}
  1  & 2 & 3\\
  2  & 0 & 0\\
  -1 & 3 & 4
\end{vmatrix}
$$

由于第二行的 $0$ 较多，所以可以对其使用展开定理

$$
\begin{split}
  D&=2\cdot A_{21}\\
  &=2\cdot (-1)^3\cdot M_{21}\\
  &=-2
  \begin{vmatrix}
    2 & 3\\
    3 & 4
  \end{vmatrix}\\
  &=-2\cdot (-1)\\
  &=\boxed{2}
\end{split}
$$

#### 例题 2

$$
D=
\begin{vmatrix}
  3  & 1  & -1 & 2 \\
  -5 & 1  & 3  & -4\\
  2  & 0  & 1  & -1\\
  1  & -5 & 3  & -3
\end{vmatrix}
$$

求 $A_{31}+3A_{32}-2A_{33}+2A_{34}$

> [!tip]
> 此处可以用代数余子式前面的系数把行列式中对应的元素替换掉，得到一个新的行列式，则新行列式的值为待求值

$$
A_{31}+3A_{32}-2A_{33}+2A_{34}=
\begin{vmatrix}
  3  & 1  & -1 & 2 \\
  -5 & 1  & 3  & -4\\
  1  & 3  & -2 & 2 \\
  1  & -5 & 3  & -3
\end{vmatrix}
=\boxed{24}
$$

## 拉普拉斯公式

$$
D=
\begin{vmatrix}
  a_1 & a_2 & 0   & 0  \\
  a_3 & a_4 & 0   & 0  \\
  c_3 & c_4 & b_1 & b_2\\
  c_3 & c_4 & b_3 & b_4\\
\end{vmatrix}
=
\begin{vmatrix}
  a_1 & a_2\\
  a_3 & a_4
\end{vmatrix}
\cdot
\begin{vmatrix}
  b_1 & b_2\\
  b_3 & b_4
\end{vmatrix}
$$

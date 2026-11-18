---
title: "线性代数与解析几何笔记 6 - 二次型"
author: NriotHrreion
tags:
- "期末"
- "线代"
date: 2026-01-11
---

## 二次型矩阵

二次型矩阵的三要素：

1. $A^{\text{T}}=A$
2. $A$ 的主对角线元素为平方项的系数
3. $A$ 的其它元素为交叉项系数的一半

#### 例题 1

写出下列二次型 $f(x_1,x_2)=2x_1^2-x_2^2+6x_1x_2$ 的矩阵

$$
f(x_1,x_2)=2x_1^2-x_2^2+6x_1x_2=
(x_1,x_2)
\begin{pmatrix}
  2 & 3\\
  3 & -1
\end{pmatrix}
\begin{pmatrix}
  x_1\\ x_2
\end{pmatrix}
$$

#### 例题 2

写出下列二次型 $f(x_1,x_2,x_3)=x_1^2+3x_2^2-x_3^2+2x_1x_2+2x_1x_3-3x_2x_3$ 的矩阵

> [!tip]
> 交叉项 $2x_1x_2$ 可以写成 $x_1x_2+x_2x_1$，则可理解为第1行第2列和第2行第1列填原系数的一半，即 $1$，其它项同理

$$
\begin{split}
  f(x_1,x_2,x_3)&=x_1^2+3x_2^2-x_3^2+2x_1x_2+2x_1x_3-3x_2x_3\\
  &=(x_1,x_2,x_3)
  \begin{pmatrix}
    1 & 1            & 1           \\
    1 & 3            & -\frac{3}{2}\\
    1 & -\frac{3}{2} & -1
  \end{pmatrix}
  \begin{pmatrix}
    x_1\\ x_2\\ x_3
  \end{pmatrix}
\end{split}
$$

#### 例题 3

已知二次型 $f(x_1,x_2,x_3)=5x_1^2+5x_2^2+cx_3^2-2x_1x_2+6x_1x_3-6x_2x_3$ 的秩为 $2$，求 $c$

易得其二次型矩阵为

$$
A=
\begin{pmatrix}
  5  & -1 & 3 \\
  -1 & 5  & -3\\
  3  & -3 & c
\end{pmatrix}
$$

对矩阵进行初等行变换得到行阶梯形矩阵

$$
\begin{pmatrix}
  5  & -1 & 3 \\
  -1 & 5  & -3\\
  3  & -3 & c
\end{pmatrix}
\xrightarrow[r_1\cdot(-1)]{r_1\harr r_2}
\begin{pmatrix}
  1 & -5 & 3\\
  5 & -1 & 3\\
  3 & -3 & c
\end{pmatrix}
$$

$$
\xrightarrow[r_3-3r_1]{r_2-5r_1}
\begin{pmatrix}
  1 & -5 & 3  \\
  0 & 24 & -12\\
  0 & 12 & c-9
\end{pmatrix}
\xrightarrow{r_3-\frac{1}{2}r_2}
\begin{pmatrix}
  1 & -5 & 3  \\
  0 & 24 & -12\\
  0 & 0  & c-3
\end{pmatrix}
$$

由 $r(A)=2$，可知

$$c-3=0$$

可得

$$\boxed{c=3}$$

## 化二次型为标准形

### 配方法

- $a^2+2ab=a^2+2ab+b^2-b^2=(a+b)^2-b^2$
- $a^2+ab=a^2+2a\cdot\frac{b}{2}+(\frac{b}{2})^2-(\frac{b}{2})^2=(a+\frac{b}{2})^2-\frac{1}{4}b^2$

#### 例题

已知二次型

$$f(x_1,x_2,x_3)=2x_1^2+2x_2^2+2x_3^2+2x_1x_2+2x_1x_3-2x_2x_3$$

利用配方法化 $f$ 为标准形

1. 先配所有含 $x_1$ 的项

$$
\begin{split}
  I&=2x_1^2+2x_1x_2+2x_1x_3+2x_2^2+2x_3^2-2x_2x_3\\
  &=2(x_1^2+x_1x_2+x_1x_3)+2x_2^2+2x_3^2-2x_2x_3\\
  &=2[x_1^2+x_1(x_2+x_3)]+2x_2^2+2x_3^2-2x_2x_3\\
  &=2[x_1^2+2x_1\cdot\frac{x_2+x_3}{2}+\frac{(x_2+x_3)^2}{4}-\frac{(x_2+x_3)^2}{4}]+2x_2^2+2x_3^2-2x_2x_3\\
  &=2[(x_1+\frac{x_2+x_3}{2})^2-\frac{(x_2+x_3)^2}{4}]+2x_2^2+2x_3^2-2x_2x_3\\
  &=2(x_1+\frac{x_2+x_3}{2})^2-\frac{(x_2+x_3)^2}{2}+2x_2^2+2x_3^2-2x_2x_3\\
  &=2(x_1+\frac{x_2+x_3}{2})^2+\frac{3}{2}x_2^2+\frac{3}{2}x_3^2-3x_2x_3
\end{split}
$$

2. 再配所有含 $x_2$ 的项

$$
\begin{split}
  I&=2(x_1+\frac{x_2+x_3}{2})^2+\frac{3}{2}(x_2^2-2x_2x_3+x_3^2)\\
  &=2(x_1+\frac{x_2+x_3}{2})^2+\frac{3}{2}(x_2-x_3)^2+0x_3^2\\
\end{split}
$$

3. 当所有项都为完全平方项时，换元

$$
\begin{cases}
  y_1=x_1+\frac{x_2+x_3}{2}\\
  y_2=x_2-x_3\\
  y_3=x_3
\end{cases}
$$

得标准形

$$\boxed{f=2y_1^2+\frac{3}{2}y_2^2+0y_3^2}$$

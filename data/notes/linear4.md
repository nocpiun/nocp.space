---
title: "线性代数与解析几何笔记 4 - 线性方程组"
author: NriotHrreion
tags:
- "期末"
- "线代"
date: 2026-01-09
---

## 齐次线性方程组求解

若 $A_{m\times n}\cdot x=0$，则有

- $r(A_{m\times n})=n$ $\Harr$ $A\cdot x=0$ 只有零解 (线性无关，唯一解)
- $r(A_{m\times n})<n$ $\Harr$ $A\cdot x=0$ 有非零解 (线性相关，无穷解)

### 基础解系

当 $A\cdot x=0$ 有无穷解时，解集的极大无关组称为基础解系，基础解系所含解向量个数为 $n-r(A)$ 个 

> [!tip]
> 如 $\begin{cases}x_1+x_2+x_3=0\\2x_1+2x_2+2x_3=0\\3x_1+3x_2+3x_3=0\end{cases}$<br><br>
> 其中有效方程有且仅有 $x_1+x_2+x_3=0 \Rarr x_1=-x_2-x_3$<br>
> 令 $x_2=k_1,x_3=k_2$，可得 $x_1=-k_1-k_2$<br><br>
> 所以 $x=\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}=\begin{pmatrix}-k_1-k_2\\k_1\\k_2\end{pmatrix}=\begin{pmatrix}-k_1\\k_1\\0\end{pmatrix}+\begin{pmatrix}-k_2\\0\\k_2\end{pmatrix}=k_1\begin{pmatrix}-1\\1\\0\end{pmatrix}+k_2\begin{pmatrix}-1\\0\\1\end{pmatrix}$<br><br>
> 则原方程组的基础解系为 $\xi_1=\begin{pmatrix}-1\\1\\0\end{pmatrix},\xi_2=\begin{pmatrix}-1\\0\\1\end{pmatrix}$

**求法**：

把系数阵 $A$ 化为行阶梯的最简形，令每一行的第一个非0元素为 $1$ 且上方元素化为 $0$，然后通过观察法，取非拐弯处的变量作为自由变量，将自由变量的相反数与相应的单位向量结合，得到 $\xi_1,\xi_2,...,\xi_n$

则原方程组的通解为基础解系的线性组合

$$x=k_1\xi_1+k_2\xi_2+...+k_n\xi_n$$

> [!tip]
> 如，$A\rarr\begin{pmatrix}1 & 0 & 2 & -1\\0 & 1 & 3 & 4\\0 & 0 & 0 & 0\end{pmatrix}_{3\times 4}$ $\Rarr$ 基础解系有 $n-r(A)=2$ 个，为 $\xi_1=\begin{pmatrix}-2\\-3\\1\\0\end{pmatrix},\xi_2=\begin{pmatrix}1\\-4\\0\\1\end{pmatrix}$<br><br>
> 此处的自由变量为 $\begin{pmatrix}2\\3\end{pmatrix}$ 与 $\begin{pmatrix}-1\\4\end{pmatrix}$，取反后与相应的单位向量结合就得到了 $\xi_1$ 和 $\xi_2$

#### 例题

求下列方程组的基础解系及通解

$$
\begin{cases}
  x_1+x_2-3x_4-x_5=0\\
  x_1-x_2+2x_3-x_4+x_5=0\\
  4x_1-2x_2+6x_3-5x_4+x_5=0\\
  2x_1+4x_2-2x_3+4x_4-16x_5=0
\end{cases}
$$

易得系数矩阵

$$
A=
\begin{pmatrix}
  1 & 1  & 0  & -3 & -1 \\
  1 & -1 & 2  & -1 & 1  \\
  4 & -2 & 6  & -5 & 1  \\
  2 & 4  & -2 & 4  & -16\\
\end{pmatrix}_{4\times 5}
$$

通过行变换得到最简行阶梯形矩阵

$$
\begin{pmatrix}
  1 & 1  & 0  & -3 & -1 \\
  1 & -1 & 2  & -1 & 1  \\
  4 & -2 & 6  & -5 & 1  \\
  2 & 4  & -2 & 4  & -16\\
\end{pmatrix}
\xrightarrow[r_4-2r_1]{\substack{r_2-r_1\\ r_3-4r_1}}
\begin{pmatrix}
  1 & 1  & 0  & -3 & -1 \\
  0 & -2 & 2  & 2  & 2  \\
  0 & -6 & 6  & 7  & 5  \\
  0 & 2  & -2 & 10 & -14\\
\end{pmatrix}
$$

$$
\xrightarrow[r_4+r_2]{r_3-3r_2}
\begin{pmatrix}
  1 & 1  & 0 & -3 & -1 \\
  0 & -2 & 2 & 2  & 2  \\
  0 & 0  & 0 & 1  & -1 \\
  0 & 0  & 0 & 12 & -12\\
\end{pmatrix}
\xrightarrow{r_4-12r_3}
\begin{pmatrix}
  1 & 1  & 0 & -3 & -1\\
  0 & -2 & 2 & 2  & 2 \\
  0 & 0  & 0 & 1  & -1\\
  0 & 0  & 0 & 0  & 0 \\
\end{pmatrix}
$$

$$
\xrightarrow{r_2\cdot(-\frac{1}{2})}
\begin{pmatrix}
  1 & 1 & 0  & -3 & -1\\
  0 & 1 & -1 & -1 & -1\\
  0 & 0 & 0  & 1  & -1\\
  0 & 0 & 0  & 0  & 0 \\
\end{pmatrix}
\xrightarrow[r_2+r_3]{\substack{r_1-r_2\\ r_1+2r_3}}
\begin{pmatrix}
  1 & 0 & 1  & 0 & -2\\
  0 & 1 & -1 & 0 & -2\\
  0 & 0 & 0  & 1 & -1\\
  0 & 0 & 0  & 0 & 0 \\
\end{pmatrix}
$$

由 $r(A)=3<5$，可知原方程组有无穷解，基础解系含有 $5-r(a)=2$ 个向量

分步求基础解系：

1. 找到自由变量，为 $x_3$ 和 $x_5$

$$
x_3\rarr
\begin{matrix}
  1\\-1\\0
\end{matrix},
x_5\rarr
\begin{matrix}
  -2\\-2\\-1
\end{matrix}
$$

2. 将基础解系的第3和第5个元素保留，并填上 $1,0$ 和 $0,1$

$$
\xi_1=
\begin{pmatrix}
  ?\\?\\1\\?\\0
\end{pmatrix},
\xi_2=
\begin{pmatrix}
  ?\\?\\0\\?\\1
\end{pmatrix}
$$

3. 将自由变量取反后填入剩余空位，得到最终结果

$$
\xi_1=
\begin{pmatrix}
  -1\\1\\1\\0\\0
\end{pmatrix},
\xi_2=
\begin{pmatrix}
  2\\2\\0\\1\\1
\end{pmatrix}
$$

则通解为基础解系的线性组合

$$x=k_1\xi_1+k_2\xi_2$$

即

$$
\boxed{
  x=k_1
  \begin{pmatrix}
    -1\\1\\1\\0\\0
  \end{pmatrix}
  +k_2
  \begin{pmatrix}
    2\\2\\0\\1\\1
  \end{pmatrix}
}
$$

其中， $k_1,k_2$ 为任意常数

## 非齐次线性方程组求解

若 $A_{m\times n}\cdot x=b$，则有

- $r(A)=r(A|b)=n$ $\Rarr$ $A\cdot x=b$ 有唯一解
- $r(A)=r(A|b)<n$ $\Rarr$ $A\cdot x=b$ 有无穷解
- $r(A)\neq r(A|b)$ $\Rarr$ $A\cdot x=b$ 无解

若 $A\cdot x=b$ 有无穷解，则其通解为：**原方程组对应的齐次方程组的通解 + 原方程组的特解 $\eta$**，即

$$x=k_1\xi_1+k_2\xi_2+...+k_n\xi_n+\eta$$

#### 例题 1

求下列方程组的通解

$$
\begin{cases}
  2x_1+7x_2+3x_3+x_4=6\\
  3x_1+5x_2+2x_3+2x_4=4\\
  9x_1+4x_2+x_3+7x_4=2
\end{cases}
$$

易得增广矩阵

$$
(A_{3\times 4}|b)=
\left(
  \begin{array}{cccc|c}
    2 & 7 & 3 & 1 & 6\\
    3 & 5 & 2 & 2 & 4\\
    9 & 4 & 1 & 7 & 2
  \end{array}
\right)
$$

通过变换得到最简行阶梯形矩阵

$$
\left(
  \begin{array}{cccc|c}
    2 & 7 & 3 & 1 & 6\\
    3 & 5 & 2 & 2 & 4\\
    9 & 4 & 1 & 7 & 2
  \end{array}
\right)
\xrightarrow[r_1\cdot(-1)]{r_1-r_2}
\left(
  \begin{array}{cccc|c}
    1 & -2 & -1 & 1 & -2\\
    3 & 5  & 2  & 2 & 4 \\
    9 & 4  & 1  & 7 & 2
  \end{array}
\right)
$$

$$
\xrightarrow{r_3-3r_2}
\left(
  \begin{array}{cccc|c}
    1 & -2  & -1 & 1 & -2\\
    3 & 5   & 2  & 2 & 4 \\
    0 & -11 & -5 & 1 & -10
  \end{array}
\right)
\xrightarrow{r_2-3r_1}
\left(
  \begin{array}{cccc|c}
    1 & -2  & -1 & 1  & -2\\
    0 & 11  & 5  & -1 & 10\\
    0 & -11 & -5 & 1  & -10
  \end{array}
\right)
$$

$$
\xrightarrow{r_3+r_2}
\left(
  \begin{array}{cccc|c}
    1 & -2 & -1 & 1  & -2\\
    0 & 11 & 5  & -1 & 10\\
    0 & 0  & 0  & 0  & 0
  \end{array}
\right)
\xrightarrow{r_2\cdot\frac{1}{11}}
\left(
  \begin{array}{cccc|c}
    1 & -2 & -1           & 1             & -2           \\
    0 & 1  & \frac{5}{11} & -\frac{1}{11} & \frac{10}{11}\\
    0 & 0  & 0            & 0             & 0
  \end{array}
\right)
$$

$$
\xrightarrow{r_1+2r_2}
\left(
  \begin{array}{cccc|c}
    1 & 0 & -\frac{1}{11} & \frac{9}{11}  & -\frac{2}{11}\\
    0 & 1 & \frac{5}{11}  & -\frac{1}{11} & \frac{10}{11}\\
    0 & 0 & 0             & 0             & 0
  \end{array}
\right)
$$

由 $r(A)=r(A|b)=2<4$ 可知原方程组有无穷解，对应齐次方程组的基础解系含有 $4-r(A)=2$ 个向量

可得对应齐次方程组的基础解系为

$$
\xi_1=
\begin{pmatrix}
  \frac{1}{11}\\-\frac{5}{11}\\1\\0
\end{pmatrix},
\xi_2=
\begin{pmatrix}
  -\frac{9}{11}\\\frac{1}{11}\\0\\1
\end{pmatrix}
$$

又易得原方程组的特解为

$$
\eta=
\begin{pmatrix}
  -\frac{2}{11}\\\frac{10}{11}\\0\\0
\end{pmatrix}
$$

故原方程组的通解为

$$
\boxed{
  x=k_1
  \begin{pmatrix}
    \frac{1}{11}\\-\frac{5}{11}\\1\\0
  \end{pmatrix}
  +k_2
  \begin{pmatrix}
    -\frac{9}{11}\\\frac{1}{11}\\0\\1
  \end{pmatrix}
  +
  \begin{pmatrix}
    -\frac{2}{11}\\\frac{10}{11}\\0\\0
  \end{pmatrix}
}
$$

其中， $k_1,k_2$ 为任意常数

#### 例题 2

设 $A_{3\times 3}=\begin{pmatrix}\lambda & 1 & 1\\0 & \lambda-1 & 0\\1 & 1 & \lambda\end{pmatrix},b=\begin{pmatrix}a\\1\\1\end{pmatrix}$，已知 $Ax=b$ 存在两个不同解，求：(1) $\lambda,a$；(2) $Ax=b$ 的通解

由题可知， $Ax=b$ 有无穷解，即 $r(A)=r(A|b)<3$

易得增广矩阵

$$
(A|b)=
\left(
  \begin{array}{ccc|c}
    \lambda & 1         & 1       & a\\
    0       & \lambda-1 & 0       & 1\\
    1       & 1         & \lambda & 1
  \end{array}
\right)
$$

通过变换得到最简行阶梯形矩阵

$$
\left(
  \begin{array}{ccc|c}
    \lambda & 1         & 1       & a\\
    0       & \lambda-1 & 0       & 1\\
    1       & 1         & \lambda & 1
  \end{array}
\right)
\xrightarrow{r_1+(1-\lambda)r_3}
\left(
  \begin{array}{ccc|c}
    1 & 2-\lambda & \lambda(1-\lambda)+1 & 1-\lambda+a\\
    0 & \lambda-1 & 0                    & 1          \\
    1 & 1         & \lambda              & 1
  \end{array}
\right)
$$

$$
\xrightarrow{r_3-r_1}
\left(
  \begin{array}{ccc|c}
    1 & 2-\lambda & \lambda(1-\lambda)+1 & 1-\lambda+a\\
    0 & \lambda-1 & 0                    & 1          \\
    0 & \lambda-1 & \lambda^2-1          & \lambda-a
  \end{array}
\right)
$$

$$
\xrightarrow{r_3-r_2}
\left(
  \begin{array}{ccc|c}
    1 & 2-\lambda & \lambda(1-\lambda)+1 & 1-\lambda+a\\
    0 & \lambda-1 & 0                    & 1          \\
    0 & 0         & \lambda^2-1          & \lambda-a-1
  \end{array}
\right)
$$

(1)

因为 $r(A)=r(A|b)<3$，所以

$$
\begin{cases}
  \lambda^2-1=0\\
  \lambda-a-1=0\\
  \lambda-1\neq0
\end{cases}
\Rarr
\boxed{
  \begin{cases}
    \lambda=-1\\
    a=-2
  \end{cases}
}
$$

(2)

将 $\lambda,a$ 代入上面的行阶梯形矩阵中，得

$$
\left(
  \begin{array}{ccc|c}
    1 & 3  & -1 & 0\\
    0 & -2 & 0  & 1\\
    0 & 0  & 0  & 0
  \end{array}
\right)
\xrightarrow{r_2\cdot-\frac{1}{2}}
\left(
  \begin{array}{ccc|c}
    1 & 3 & -1 & 0           \\
    0 & 1 & 0  & -\frac{1}{2}\\
    0 & 0 & 0  & 0
  \end{array}
\right)
\xrightarrow{r_1-3r_2}
\left(
  \begin{array}{ccc|c}
    1 & 0 & -1 & \frac{3}{2} \\
    0 & 1 & 0  & -\frac{1}{2}\\
    0 & 0 & 0  & 0
  \end{array}
\right)
$$

易得

$$
\xi_1=
\begin{pmatrix}
  1\\0\\1
\end{pmatrix},
\eta=
\begin{pmatrix}
  \frac{3}{2}\\-\frac{1}{2}\\0
\end{pmatrix}
$$

故原方程组的通解为

$$
\boxed{
  x=k_1
  \begin{pmatrix}
    1\\0\\1
  \end{pmatrix}
  +
  \begin{pmatrix}
    \frac{3}{2}\\-\frac{1}{2}\\0
  \end{pmatrix}
}
$$

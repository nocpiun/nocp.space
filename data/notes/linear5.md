---
title: "线性代数与解析几何笔记 5 - 矩阵的特征值与特征向量"
author: NriotHrreion
tags:
- "期末"
- "线代"
date: 2026-01-10
---

## 求解特征值与特征向量 (数字型)

已知矩阵 $A$，则：

- 由 $|\lambda E-A|=0$ 解得的 $\lambda$ 为 $A$ 的特征值
- 方程组 $(\lambda_0 E-A)\cdot x=0$ 的基础解系为 $A$ 对应于 $\lambda_0$ 的特征向量

#### 例题

求矩阵 $A=\begin{pmatrix}1 & 2 & 3\\2 & 1 & 3\\3 & 3 & 6\end{pmatrix}$ 的特征值与特征向量

由题可得下列特征方程

$$
\begin{split}
  |\lambda E-A|&=0\\
  \begin{vmatrix}
    \begin{pmatrix}
      \lambda & 0       & 0\\
      0       & \lambda & 0\\
      0       & 0       & \lambda
    \end{pmatrix}
    -
    \begin{pmatrix}
      1 & 2 & 3\\
      2 & 1 & 3\\
      3 & 3 & 6
    \end{pmatrix}
  \end{vmatrix}
  &=0\\
  \begin{vmatrix}
    \lambda-1 & -2        & -3\\
    -2        & \lambda-1 & -3\\
    -3        & -3        & \lambda-6
  \end{vmatrix}
  &=0\\
  \begin{vmatrix}
    1-\lambda & 2         & 3\\
    2         & 1-\lambda & 3\\
    3         & 3         & 6-\lambda
  \end{vmatrix}
  &=0\\
  \begin{vmatrix}
    1-\lambda & 2          & 3\\
    \lambda+1 & -1-\lambda & 0\\
    3         & 3          & 6-\lambda
  \end{vmatrix}
  &=0\\
  \begin{vmatrix}
    3-\lambda & 2          & 3\\
    0         & -1-\lambda & 0\\
    6         & 3          & 6-\lambda
  \end{vmatrix}
  &=0\\
  (\lambda+1)
  \begin{vmatrix}
    3-\lambda & 3\\
    6         & 6-\lambda
  \end{vmatrix}
  &=0\\
  (\lambda+1)[(3-\lambda)(6-\lambda)-18]&=0\\
  \lambda(\lambda+1)(\lambda-9)&=0\\
\end{split}
$$

解得

$$\boxed{\lambda_1=0,\lambda_2=-1,\lambda_3=9}$$

1. $\lambda_1$ 对应的特征向量

易得对应的方程系数矩阵为

$$
(\lambda_1 E-A)=
\begin{pmatrix}
  -1 & -2 & -3\\
  -2 & -1 & -3\\
  -3 & -3 & -6
\end{pmatrix}
\rarr
\begin{pmatrix}
  1 & 2 & 3\\
  2 & 1 & 3\\
  3 & 3 & 6
\end{pmatrix}
$$

$$
\xrightarrow[r_3-3r_1]{r_2-2r_1}
\begin{pmatrix}
  1 & 2  & 3 \\
  0 & -3 & -3\\
  0 & -3 & -3
\end{pmatrix}
\xrightarrow[r_2\cdot(-\frac{1}{3})]{r_3-r_2}
\begin{pmatrix}
  1 & 2 & 3\\
  0 & 1 & 1\\
  0 & 0 & 0
\end{pmatrix}
\xrightarrow{r_1-2r_2}
\begin{pmatrix}
  1 & 0 & 1\\
  0 & 1 & 1\\
  0 & 0 & 0
\end{pmatrix}
$$

由于 $r(\lambda_1 E-A)=2<3$，故该方程有无穷解，易得其基础解系为

$$
\boxed{
  \xi=
  \begin{pmatrix}
    -1\\-1\\1
  \end{pmatrix}
}
$$

2. $\lambda_2$ 对应的特征向量

易得对应的方程系数矩阵为

$$
(\lambda_2 E-A)=
\begin{pmatrix}
  -2 & -2 & -3\\
  -2 & -2 & -3\\
  -3 & -3 & -7
\end{pmatrix}
\rarr
\begin{pmatrix}
  2 & 2 & 3\\
  2 & 2 & 3\\
  3 & 3 & 7
\end{pmatrix}
$$

$$
\xrightarrow[r_2\harr r_3]{r_2-r_1}
\begin{pmatrix}
  2 & 2 & 3\\
  3 & 3 & 7\\
  0 & 0 & 0
\end{pmatrix}
\xrightarrow{r_1\cdot\frac{1}{2}}
\begin{pmatrix}
  1 & 1 & \frac{3}{2}\\
  3 & 3 & 7          \\
  0 & 0 & 0
\end{pmatrix}
$$

$$
\xrightarrow{r_2-3r_1}
\begin{pmatrix}
  1 & 1 & \frac{3}{2}\\
  0 & 0 & \frac{5}{2}\\
  0 & 0 & 0
\end{pmatrix}
\xrightarrow[r_1-\frac{3}{2}r_2]{r_2\cdot\frac{2}{5}}
\begin{pmatrix}
  1 & 1 & 0\\
  0 & 0 & 1\\
  0 & 0 & 0
\end{pmatrix}
$$

由于 $r(\lambda_2 E-A)=2<3$，故该方程有无穷解，易得其基础解系为

$$
\boxed{
  \xi=
  \begin{pmatrix}
    -1\\1\\0
  \end{pmatrix}
}
$$

3. $\lambda_3$ 对应的特征向量

易得对应的方程系数矩阵为

$$
(\lambda_3 E-A)=
\begin{pmatrix}
  8  & -2 & -3\\
  -2 & 8  & -3\\
  -3 & -3 & 3
\end{pmatrix}
\xrightarrow[r_3+\frac{3}{8}r_1]{r_2+\frac{1}{4}r_1}
\begin{pmatrix}
  8 & -2            & -3           \\
  0 & \frac{15}{2}  & -\frac{15}{4}\\
  0 & -\frac{15}{4} & \frac{15}{8}
\end{pmatrix}
$$

$$
\rarr
\begin{pmatrix}
  8 & -2 & -3\\
  0 & 4  & -2\\
  0 & -2 & 1
\end{pmatrix}
\xrightarrow[r_2\harr r_3]{r_2+2r_3}
\begin{pmatrix}
  8 & -2 & -3\\
  0 & -2 & 1 \\
  0 & 0  & 0
\end{pmatrix}
$$

$$
\xrightarrow{r_1-r_2}
\begin{pmatrix}
  8 & 0  & -4\\
  0 & -2 & 1 \\
  0 & 0  & 0
\end{pmatrix}
\xrightarrow[r_2\cdot(-\frac{1}{2})]{r_1\cdot\frac{1}{8}}
\begin{pmatrix}
  1 & 0 & -\frac{1}{2}\\
  0 & 1 & -\frac{1}{2}\\
  0 & 0 & 0
\end{pmatrix}
$$

由于 $r(\lambda_3 E-A)=2<3$，故该方程有无穷解，易得其基础解系为

$$
\boxed{
  \xi=
  \begin{pmatrix}
    \frac{1}{2}\\\frac{1}{2}\\1
  \end{pmatrix}
}
$$

## 求解特征值与特征向量 (抽象型)

若矩阵 $A$ 的特征值为 $\lambda_1,\lambda_2,...,\lambda_n$，则 $|A|=\lambda_1\lambda_2...\lambda_n$， $tr(A)=\lambda_1+\lambda_2+...+\lambda_n$

> [!info]
> 矩阵 $A$ 的迹 (trace) 记作 $tr(A)$

若 $\lambda_0$ 为矩阵 $A$ 的特征值， $\alpha$ 为对应于 $\lambda_0$ 的特征向量，则 $A\alpha=\lambda_0\alpha$ ($\alpha\neq0$)

|矩阵|特征值|特征向量|
|---|---|---|
|$A$|$\lambda_0$|$\alpha$|
|$A^2$|$\lambda_0^2$|$\alpha$|
|$A^3+5A-6E$|$\lambda_0^3+5\lambda_0-6$|$\alpha$|
|$A^{-1}$|$\frac{1}{\lambda_0}$|$\alpha$|
|$A^*$|$\frac{|A|}{\lambda_0}$|$\alpha$|
|$A^{\text{T}}$|$\lambda_0$|不确定|
|$P^{-1}AP$|$\lambda_0$|$P^{-1}\alpha$|

#### 例题

已知三阶矩阵 $A$ 的特征值为 $1,-1,2$，求：(1) $B=A^3-5A^2$ 的特征值；(2) 求 $|B|$

(1)

易得 $B$ 的特征值分别为

$$\gamma_1=\lambda_1^3-5\lambda_1^2=\boxed{-4}$$

$$\gamma_2=\lambda_2^3-5\lambda_2^2=\boxed{-6}$$

$$\gamma_3=\lambda_3^3-5\lambda_3^2=\boxed{-12}$$

(2)

易得

$$|B|=\gamma_1\gamma_2\gamma_3=\boxed{-288}$$

## 矩阵的相似对角化

> [!tip]
> 此处考压轴，了解即可

若矩阵 $P$ 可逆，使得 $P^{-1}AP=\wedge$，则称矩阵 $A$ 可相似对角化，其中 $\wedge$ 为对角阵

把矩阵 $A$ 对角化的步骤：

1. 求 $A$ 的特征值 $\lambda_1,\lambda_2,...,\lambda_n$
2. 求 $A$ 的特征向量 $\alpha_1,\alpha_2,...,\alpha_n$
3. 令 $P=(\alpha_1,\alpha_2,...,\alpha_n)$，则 $\wedge=P^{-1}AP=\begin{pmatrix}\lambda_1 & 0 & 0\\0 & \lambda_2 & 0\\0 & 0 & \lambda_3\end{pmatrix}$

若矩阵 $A$ 满足 $A^{\text{T}}=A$ (对称)，则一定存在正交阵 $Q$，使得 $Q^{-1}AQ=\wedge$

> [!info]
> 若矩阵 $Q$ 满足 $Q^{-1}=Q^{\text{T}}$，则称 $Q$ 为正交阵

把对称阵 $A$ 对角化的步骤：

1. 求 $A$ 的特征值 $\lambda_1,\lambda_2,...,\lambda_n$
2. 求 $A$ 的特征向量 $\alpha_1,\alpha_2,...,\alpha_n$
3. 把 $\alpha_1,\alpha_2,...,\alpha_n$ 中不正交的向量正交化 (施密特正交化)

$$
\begin{cases}
  \beta_1&=\alpha_1\\
  \beta_2&=\alpha_2-\frac{\alpha_2\cdot\beta_1}{\beta_1^2}\beta_1
\end{cases}
$$

4. 单位化所有特征向量得 $\xi_1,\xi_2,...,\xi_n$
5. 令 $Q=(\xi_1,\xi_2,...,\xi_n)$，则 $\wedge=Q^{-1}AQ=\begin{pmatrix}\lambda_1 & 0 & 0\\0 & \lambda_2 & 0\\0 & 0 & \lambda_3\end{pmatrix}$

---
title: "高等数学笔记 9 - 向量代数与空间解析几何"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-14
---

## 向量及其运算

空间中的向量可以写为

$$
\vec{a}=(a_1,a_2,a_3)=a_1\vec{i}+a_2\vec{j}+a_3\vec{k}
$$

那么可得**模长**为 $|\vec{a}|=\sqrt{a_1^2+a_2^2+a_3^2}$。

向量有三个**方向角**，分别为：
- 与 $x$ 轴正方向的夹角 $\alpha$
- 与 $y$ 轴正方向的夹角 $\beta$
- 与 $z$ 轴正方向的夹角 $\gamma$

那么可得向量的三个**方向余弦**：$\cos\alpha=\frac{a_1}{|\vec{a}|}$，$\cos\beta=\frac{a_2}{|\vec{a}|}$，$\cos\gamma=\frac{a_3}{|\vec{a}|}$

则与 $\vec{a}$ 同向的**单位向量**为

$$
\vec{e}=(\cos\alpha,\cos\beta,\cos\gamma)
$$

且

$$
\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1
$$

---

设向量 $\vec{a}=(a_1,a_2,a_3)$，$\vec{b}=(b_1,b_2,b_3)$，$\vec{a}$ 与 $\vec{b}$ 的夹角为 $\alpha$

那么它们的数量积（点乘）为

$$
\vec{a}\cdot\vec{b}=|\vec{a}||\vec{b}|\cos\alpha=a_1b_1+a_2b_2+a_3b_3
$$

向量积（叉乘）为

$$
\vec{a}\times\vec{b}=
\begin{vmatrix}
  \vec{i} & \vec{j} & \vec{k}\\
  a_1     & a_2     & a_3    \\
  b_1     & b_2     & b_3
\end{vmatrix}
=
\begin{vmatrix}
  a_2 & a_3\\
  b_2 & b_3
\end{vmatrix}
\vec{i}-
\begin{vmatrix}
  a_1 & a_3\\
  b_1 & b_3
\end{vmatrix}
\vec{j}+
\begin{vmatrix}
  a_1 & a_2\\
  b_1 & b_2
\end{vmatrix}
\vec{k}
$$

$$
|\vec{a}\times\vec{b}|=|\vec{a}||\vec{b}|\sin\alpha
$$

> [!tip]
> 叉乘向量的模长等于以 $\vec{a}$，$\vec{b}$ 为邻边的平行四边形面积。

---

设向量 $\vec{a}=(a_1,a_2,a_3)$，$\vec{b}=(b_1,b_2,b_3)$，$\vec{a}$ 与 $\vec{b}$ 的夹角为 $\alpha$

那么有

$$
\vec{a}\parallel\vec{b}\Longleftrightarrow\alpha=0\vee\alpha=\pi\Longleftrightarrow\vec{a}\times\vec{b}=\vec{0}\Longleftrightarrow\exist\lambda,\vec{a}=\lambda\vec{b}
$$

$$
\vec{a}\perp\vec{b}\Longleftrightarrow\alpha=\frac{\pi}{2}\Longleftrightarrow\vec{a}\cdot\vec{b}=0
$$

#### 例题

已知向量 $\vec{a}=(1,-1,2)$，$\vec{b}=(3,0,2)$，求 $\vec{a}\cdot\vec{b}$，$\vec{a}\times\vec{b}$ 及两向量夹角 $\alpha$ 的余弦值。

$$
\vec{a}\cdot\vec{b}=7
$$

$$
\vec{a}\times\vec{b}=
\begin{vmatrix}
  -1 & 2\\
  0  & 2
\end{vmatrix}
\vec{i}-
\begin{vmatrix}
  1 & 2\\
  3 & 2
\end{vmatrix}
\vec{j}+
\begin{vmatrix}
  1 & -1\\
  3 & 0
\end{vmatrix}
\vec{k}
=(-2,4,3)
$$

$$
\cos\alpha=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}=\frac{7\sqrt{78}}{78}
$$

## 平面与直线

设平面的法向量为 $(A,B,C)$，且过点 $(x_0,y_0,z_0)$

那么该平面可以有下面的写法：

- **点法式**：

$$
A(x-x_0)+B(y-y_0)+C(z-z_0)=0
$$

- **一般式**：

$$
Ax+By+Cz+D=0
$$

- **截距式**：

若平面过 $(a,0,0)$，$(0,b,0)$，$(0,0,c)$，则其方程为

$$
\frac{x}{a}+\frac{y}{b}+\frac{z}{c}=1
$$

设直线的方向向量为 $(A,B,C)$，且过点 $(x_0,y_0,z_0)$

那么该直线可以有下面的写法：

- **点向式**：

$$
\frac{x-x_0}{A}=\frac{y-y_0}{B}=\frac{z-z_0}{C}=k
$$

- **参数方程**：

$$
\begin{cases}
  x=x_0+Ak\\
  y=y_0+Bk\\
  z=z_0+Ck
\end{cases}
$$

- **一般式**：

$$
\begin{cases}
  A_1x+B_1y+C_1z+D_1=0\\
  A_2x+B_2y+C_2z+D_2=0
\end{cases}
$$

---

设平面 $S$ 的法向量为 $\vec{n}$，直线 $L$ 的方向向量为 $\vec{l}$，那么

$$
L\parallel S\Longleftrightarrow\vec{n}\perp\vec{l}
$$

$$
L\perp S\Longleftrightarrow\vec{n}\parallel\vec{l}
$$

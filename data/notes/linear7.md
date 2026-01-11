---
title: "线性代数与解析几何笔记 7 - 空间向量"
author: NriotHrreion
tags:
- "期末"
- "解析几何"
date: 2026-01-11
---

设 $\vec{r}=(x,y,z),\vec{a}=(x_1,y_1,z_1),\vec{b}=(x_2,y_2,z_2)$

- **向量的模长**： $|\vec{r}|=\sqrt{x^2+y^2+z^2}$
- **单位向量**： $\vec{e}_{\vec{r}}=\frac{\vec{r}}{|\vec{r}|}$
- **两点距离公式**： $|\overrightarrow{AB}|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$
- **数量积 (点积)**： $\vec{a}\cdot\vec{b}=x_1x_2+y_1y_2+z_1z_2=|\vec{a}||\vec{b}|\cos\lang\vec{a},\vec{b}\rang$

## 方向角

非零向量 $\vec{r}$ 与三条坐标轴正方向的夹角称为方向角 $\alpha,\beta,\gamma$ ($\alpha,\beta,\gamma\in[0,\pi]$)

$$x=|\vec{r}|\cos\alpha$$

$$y=|\vec{r}|\cos\beta$$

$$z=|\vec{r}|\cos\gamma$$

其中， $\cos\alpha,\cos\beta,\cos\gamma$ 称为向量的方向余弦，方向余弦常用来表示向量的方向

方向余弦满足下列特征：

- $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$
- $\vec{e}_{\vec{r}}=\left(\frac{x}{|\vec{r}|},\frac{y}{|\vec{r}|},\frac{z}{|\vec{r}|}\right)=(\cos\alpha,\cos\beta,\cos\gamma)$

## 向量积 (叉积)

向量 $\vec{a},\vec{b}$ 的叉积是一个向量，记作 $\vec{a}\times\vec{b}$

$$|\vec{a}\times\vec{b}|=|\vec{a}||\vec{b}|\sin\lang\vec{a},\vec{b}\rang$$

规定 $\vec{a}\times\vec{b}$ 的方向为：垂直于 $\vec{a}$ 和 $\vec{b}$，并按顺序 $\vec{a},\vec{b}$ 遵循右手螺旋法则

向量积运算有如下性质：

- **反交换律**： $\vec{a}\times\vec{b}=-\vec{b}\times\vec{a}$
- **左分配律**： $\vec{a}\times(\vec{b}+\vec{c})=\vec{b}\times\vec{a}+\vec{c}\times\vec{a}$
- **右分配律**： $(\vec{a}+\vec{b})\times\vec{c}=\vec{a}\times\vec{c}+\vec{b}\times\vec{c}$
- $\lambda(\vec{a}+\vec{b})=\lambda\vec{a}+\lambda\vec{b}$

设 $\vec{a}=(x_1\vec{i},y_1\vec{j},z_1\vec{k}),\vec{b}=(x_2\vec{i},y_2\vec{j},z_2\vec{k})$

则可通过如下公式计算向量积

$$
\begin{split}
  \vec{a}\times\vec{b}&=
  \begin{vmatrix}
    \vec{i} & \vec{j} & \vec{k}\\
    x_1     & y_1     & z_1    \\
    x_2     & y_2     & z_2
  \end{vmatrix}\\
  &=(y_1z_2-y_2z_1)\vec{i}+(x_1z_2-x_2z_1)\vec{j}+(x_1y_2-x_2y_1)\vec{k}
\end{split}
$$

> [!warning]
> 需按行列式**第一行**展开，否则无效

## 混合积

设 $\vec{a}=(x_1,y_1,z_1),\vec{b}=(x_2,y_2,z_2),\vec{c}=(x_3,y_3,z_3)$

向量 $\vec{a},\vec{b},\vec{c}$ 的混合积为前两个向量 $\vec{a},\vec{b}$ 的向量积所得的向量 $\vec{a}\times\vec{b}$ 与第三个向量 $\vec{c}$ 数量积的结果，记作 $(\vec{a}\times\vec{b})\cdot\vec{c}$ 或 $(\vec{a},\vec{b},\vec{c})$ 或 $(\vec{a}\vec{b}\vec{c})$

### 几何意义

向量 $\vec{a},\vec{b},\vec{c}$ 的混合积绝对值等于以 $\vec{a},\vec{b},\vec{c}$ 为棱的平行六面体的体积 $V$，即

$$(\vec{a}\vec{b}\vec{c})=\epsilon V$$

其中，
- 当 $\lang\vec{c},\vec{a}\times\vec{b}\rang\in[0,\frac{\pi}{2}]$ 时， $\epsilon=1$
- 当 $\lang\vec{c},\vec{a}\times\vec{b}\rang\in(\frac{\pi}{2},\pi]$ 时， $\epsilon=-1$

混合积满足下列特征：

- 当 $\vec{a}=\vec{b}$ 时，有 $(\vec{a}\vec{b}\vec{c})=0$
- 当 $\vec{a},\vec{b},\vec{c}$ 共面时，有 $(\vec{a}\vec{b}\vec{c})=0$
- $(\vec{a}\vec{b}\vec{c})=\begin{vmatrix}x_1 & y_1 & z_1\\ x_2 & y_2 & z_2\\ x_3 & y_3 & z_3\end{vmatrix}$

---
title: "线性代数与解析几何笔记 8 - 曲线、直线与平面"
author: NriotHrreion
tags:
- "期末"
- "解析几何"
date: 2026-01-11
---

## 曲线

曲线可以表示成以下两种形式：

1. 一般方程

$$
\begin{cases}
  F(x,y,z)=0\\
  G(x,y,z)=0
\end{cases}
$$

> [!tip]
> 可看作是两个曲面的交线

2. 参数方程

$$
\begin{cases}
  x=x(t)\\
  y=y(t)\\
  z=z(t)
\end{cases}
$$

### 空间曲线在坐标面上的投影

设空间曲线 $C$ 的一般方程为 $\begin{cases}F(x,y,z)=0\\ G(x,y,z)=0\end{cases}$

消去方程中的 $z$ 可以得到投影柱面 $H(x,y)=0$，则 $C$ 在平面 $xOy$ 上的投影曲线方程为

$$
\begin{cases}
  H(x,y)=0\\
  z=0
\end{cases}
$$

同理， $C$ 在平面 $yOz$ 上的投影曲线方程为

$$
\begin{cases}
  R(y,z)=0\\
  x=0
\end{cases}
$$

## 直线

直线可以表示成以下两种形式：

1. 一般方程

$$
\begin{cases}
  A_1x+B_1y+C_1z+D_1=0\\
  A_2x+B_2y+C_2z+D_2=0
\end{cases}
$$

> [!tip]
> 可看作是两个平面的交线

2. 对称式方程 (点向式)

$$\frac{x-x_0}{m}=\frac{y-y_0}{n}=\frac{z-z_0}{p}$$

其中， $M_0(x_0,y_0,z_0)$ 为直线上一点， $\vec{s}=(m,n,p)$ 为直线的方向向量

> [!warning]
> 若分母为零，则其分子也理解为零<br>
> 如：当 $m=0$ 时，可看作方程中 $x-x_0=0$，即 $x=x_0$

3. 参数方程

由对称式方程

$$\frac{x-x_0}{m}=\frac{y-y_0}{n}=\frac{z-z_0}{p}=t$$

可推出

$$
\begin{cases}
  x=x_0+mt\\
  y=y_0+nt\\
  z=z_0+pt
\end{cases}
$$

### 直线的夹角

若直线 $l_1,l_2$ 的方向向量分别为 $\vec{s_1}=(m_1,n_1,p_1),\vec{s_2}=(m_2,n_2,p_2)$，则两直线夹角 $\phi$ (通常取锐角) 的余弦为

$$\cos\phi=\frac{|\vec{s_1}\cdot\vec{s_2}|}{|\vec{s_1}||\vec{s_2}|}$$

### 点到直线的距离

已知点 $M_0(x_0,y_0,z_0)$ 和直线 $l:\;\frac{x-x_1}{m}=\frac{y-y_1}{n}=\frac{z-z_1}{p}$，设直线的方向向量为 $\vec{s}$， $M_1(x_1,y_1,z_1)$ 为直线上一点，则点 $M_0$ 到直线 $l$ 的距离为

$$
\begin{split}
  d&=\frac{|\overrightarrow{M_0M_1}\times\vec{s}|}{|\vec{s}|}\\
  &=\frac{1}{\sqrt{m^2+n^2+p^2}}\cdot|
  \begin{vmatrix}
    \vec{i} & \vec{j} & \vec{k}\\
    x_1-x_0 & y_1-y_0 & z_1-z_0\\
    m       & n       & p
  \end{vmatrix}|
\end{split}
$$

#### 例题

求与两平面 $x-4z=3$ 和 $2x-y-5z=1$ 的交线平行，且过点 $(-3,2,5)$ 的直线方程

设两平面的法向量分别为 $\vec{n_1},\vec{n_2}$，则待求直线的方向向量为

$$
\begin{split}
  \vec{s}&=\vec{n_1}\times\vec{n_2}\\
  &=
  \begin{vmatrix}
    \vec{i} & \vec{j} & \vec{k}\\
    1       & 0       & -4     \\
    2       & -1      & -5
  \end{vmatrix}\\
  &=(-4,-3,-1)
\end{split}
$$

由直线上的点 $(-3,2,5)$ 易得

$$\boxed{\frac{x+3}{4}=\frac{y-2}{3}=\frac{z-5}{1}}$$

## 平面

### 平面的点法式方程

若平面通过点 $M(x_0,y_0,z_0)$ 且垂直于非零向量 $\vec{n}=(A,B,C)$ (法向量)，则该平面的方程可表示为

$$A(x-x_0)+B(y-y_0)+C(z-z_0)=0$$

#### 例题

求过三点 $M_1(2,-1,4),M_2(-1,3,-2),M_3(0,2,3)$ 的平面 $\Gamma$ 的方程

由三点可求得法向量

$$
\begin{split}
  \vec{n}&=\overrightarrow{M_1M_2}\times\overrightarrow{M_1M_3}\\
  &=(-3,4,-6)\times(-2,3,-1)\\
  &=
  \begin{vmatrix}
    \vec{i} & \vec{j} & \vec{k}\\
    -3      & 4       & -6     \\
    -2      & 3       & -1
  \end{vmatrix}\\
  &=(14,9,-1)
\end{split}
$$

可得平面 $\Gamma$ 为

$$\boxed{14(x-2)+9(y+1)-(z-4)=0}$$

### 平面的一般方程

$$Ax+By+Cz+D=0\;(A^2+B^2+C^2\neq0)$$

其中，法向量 $\vec{n}=(A,B,C)$

**特殊情况**：
- 当 $D=0$ 时，平面过原点
- 当 $A=0$ 时，平面平行于 $x$ 轴
- 当 $B=0$ 时，平面平行于 $y$ 轴
- 当 $C=0$ 时，平面平行于 $z$ 轴
- 当 $A=B=0$ 时，平面平行于 $xOy$ 面
- 当 $A=C=0$ 时，平面平行于 $xOz$ 面
- 当 $B=C=0$ 时，平面平行于 $yOz$ 面

#### 例题

求通过 $x$ 轴和点 $(4,-3,-1)$ 的平面方程

设平面为 $Ax+By+Cz+D=0$

因为平面过 $x$ 轴，故可得

$$A=D=0$$

将点 $(4,-3,-1)$ 代入方程，可得

$$-3B-C=0$$

取 $B=1$，则 $C=-3$，故平面方程为

$$\boxed{y-3z=0}$$

### 平面的截距式

$$\frac{x}{a}+\frac{y}{b}+\frac{z}{c}=1$$

其中， $a,b,c$ 分别为平面在 $x,y,z$ 轴上的截距

### 平面的三点式

若平面过三点 $(x_1,y_1,z_1),(x_2,y_2,z_2),(x_3,y_3,z_3)$，则平面也可以表示为

$$
\begin{vmatrix}
  x-x_1   & y-y_1   & z-z_1  \\
  x_2-x_1 & y_2-y_1 & z_2-z_1\\
  x_3-x_1 & y_3-y_1 & z_3-z_1
\end{vmatrix}
=0
$$

### 平面的夹角

若平面 $\Gamma_1,\Gamma_2$ 的法向量分别为 $\vec{n_1}=(A_1,B_1,C_1),\vec{n_2}=(A_2,B_2,C_2)$，则两平面夹角 $\theta$ 的余弦为

$$\cos\theta=\frac{|\vec{n_1}\cdot\vec{n_2}|}{|\vec{n_1}||\vec{n_2}|}$$

**特殊情况**：
- $\Gamma_1\perp\Gamma_2\Harr\vec{n_1}\cdot\vec{n_2}=0$
- $\Gamma_1\parallel\Gamma_2\Harr\vec{n_1}\parallel\vec{n_2}\Harr\frac{A_1}{A_2}=\frac{B_1}{B_2}=\frac{C_1}{C_2}$

#### 例题

平面 $\Gamma$ 过两点 $M_1(1,1,1),M_2(0,1,-1)$，且垂直于平面 $\Pi:\;x+y+z=0$，求 $\Gamma$ 的方程

设平面 $\Gamma$ 为 $Ax+By+Cz+D=0$，则 $\Gamma$ 的法向量为 $\vec{n}=(A,B,C)$，由题可得 $\Pi$ 的法向量为 $\vec{m}=(1,1,1)$

由 $\Gamma\perp\Pi$，可得

$$
\begin{split}
  \vec{n}\cdot\vec{m}&=0\\
  A+B+C&=0
\end{split}
$$

将 $M_1,M_2$ 代入方程，并与上式联立，可得

$$
\begin{cases}
  A+B+C+D=0\\
  B-C+D=0\\
  A+B+C=0
\end{cases}
$$

解得

$$
\begin{cases}
  A=-2C\\
  B=C\\
  D=0
\end{cases}
$$

代入原方程，得

$$-2Cx+Cy+Cz=0$$

消去 $C$，即为 $\Gamma$ 的方程

$$\boxed{2x-y-z=0}$$

### 直线与平面的夹角

若平面 $\Gamma$ 的法向量为 $\vec{n}=(A,B,C)$，直线 $l$ 的方向向量为 $\vec{s}=(m,n,p)$，则平面与直线的夹角 $\phi$ 满足

$$\sin\phi=\cos\lang\vec{n},\vec{s}\rang=\frac{|\vec{n}\cdot\vec{s}|}{|\vec{n}||\vec{s}|}$$

**特殊情况**：
- $l\perp\Gamma\Harr\vec{s}\parallel\vec{n}\Harr\frac{A}{m}=\frac{B}{n}=\frac{C}{p}$
- $l\parallel\Gamma\Harr\vec{s}\cdot\vec{n}=0\Harr Am+Bn+Cp=0$

#### 例题

一直线 $L$ 过点 $A(1,2,1)$ 且垂直于直线 $l_1:\;\frac{x-1}{3}=\frac{y}{2}=\frac{z+1}{1}$，又和直线 $l_2:\;\frac{x}{2}=\frac{y}{1}=\frac{z}{-1}$ 相交，求直线 $L$ 的方程

设 $l_1,l_2$ 的方向向量分别为 $\vec{s_1},\vec{s_2}$，则可得 $\vec{s_1}=(3,2,1),\vec{s_2}=(2,1,-1)$

因为 $L$ 与 $l_2$ 相交，不妨设其交点为 $B(x_0,y_0,z_0)$，可得

$$
\frac{x_0}{2}=\frac{y_0}{1}=\frac{z_0}{-1}\Rarr
\begin{cases}
  x_0=2y_0\\
  z_0=-y_0
\end{cases}
$$

所以 $B$ 的坐标可以表示为 $(2y_0,y_0,-y_0)$

因为 $A,B\in L$，所以 $\overrightarrow{AB}$ 是直线 $L$ 的方向向量

由 $L\perp l_1$，可得

$$
\begin{split}
  \overrightarrow{AB}\cdot\vec{s_1}&=0\\
  (2y_0-1,y_0-2,-y_0-1)\cdot(3,2,1)&=0\\
  6y_0-3+2y_0-4-y_0-1&=0\\
  y_0&=\frac{8}{7}
\end{split}
$$

所以 $B$ 的坐标为 $(\frac{16}{7},\frac{8}{7},-\frac{8}{7})$，可得

$$\overrightarrow{AB}=(\frac{9}{7},-\frac{6}{7},-\frac{15}{7})$$

故直线 $L$ 的方程为

$$\frac{x-1}{\frac{9}{7}}=\frac{y-2}{-\frac{6}{7}}=\frac{z-1}{-\frac{15}{7}}$$

化简得

$$\boxed{\frac{x-1}{3}=\frac{y-2}{-2}=\frac{z-1}{-5}}$$

### 点到平面的距离

设平面 $Ax+By+Cz+D=0$，法向量为 $\vec{n}$，平面内有一点 $P_1$，平面外有一点 $P_0(x_0,y_0,z_0)$，则 $P_0$ 到平面的距离为

$$
\begin{split}
  d&=|\text{Prj}_{\vec{n}}\overrightarrow{P_1P_0}|\\
  &=\frac{|\overrightarrow{P_1P_0}\cdot\vec{n}|}{|\vec{n}|}\\
  &=\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}
\end{split}
$$

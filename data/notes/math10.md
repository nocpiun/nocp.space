---
title: "高等数学笔记 10 - 多元函数微分学"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-06-15
---

## 多元函数的极限与连续

若 $f(x,y)\to0$，则等价无穷小仍可使用，即

<div class="grid-2">

$$
\sin f(x,y)\sim f(x,y)
$$

$$
e^{f(x,y)}-1\sim f(x,y)
$$

$$
\ln(1+f(x,y))\sim f(x,y)
$$

$$
(1+f(x,y))^\alpha-1\sim\alpha f(x,y)
$$

$$
...
$$

</div>

可以使用的定律还包括：**无穷小×有界=无穷小**、**夹逼准则**。

#### 例题 1

求以下极限

$$\lim_{(x,y)\to(0,0)}\frac{\sqrt{xy+4}-2}{xy}$$

$$
\begin{split}
  I&=\lim_{(x,y)\to(0,0)}\frac{2\sqrt{\frac{xy}{4}+1}-2}{xy}\\
  &=2\lim_{(x,y)\to(0,0)}\frac{\sqrt{\frac{xy}{4}+1}-1}{xy}\\
  &=2\lim_{(x,y)\to(0,0)}\frac{(\frac{xy}{4}+1)^\frac{1}{2}-1}{xy}\\
  &=2\lim_{(x,y)\to(0,0)}\frac{\frac{1}{2}\cdot\frac{xy}{4}}{xy}\\
  &=\frac{1}{4}
\end{split}
$$

#### 例题 2

求以下极限

$$\lim_{(x,y)\to(0,0)}\frac{\sqrt{x^2y^2+1}-1}{x^2+y^2}$$

$$
\begin{split}
  I&=\lim_{(x,y)\to(0,0)}\frac{(x^2y^2+1)^\frac{1}{2}-1}{x^2+y^2}\\
  I&=\frac{1}{2}\lim_{(x,y)\to(0,0)}\frac{x^2y^2}{x^2+y^2}\\
  I&=\frac{1}{2}\lim_{(x,y)\to(0,0)}\underline{x^2}_{无穷小}\cdot\underline{\frac{y^2}{x^2+y^2}}_{有界值}\\
  I&=\frac{1}{2}\lim_{(x,y)\to(0,0)}x^2\\
  I&=0
\end{split}
$$

---

若 $f(x,y)$ 在 $(x_0,y_0)$ 处连续，则有

$$
\lim_{(x,y)\to(x_0,y_0)}f(x,y)=f(x_0,y_0)
$$

## 偏导数

对 $f(x,y)$ 求其对 $x$ 的偏导数

$$
f_x(x_0,y_0)=\frac{\partial f}{\partial x}\bigg|_{(x_0,y_0)}=\lim_{x\to x_0}\frac{f(x,y_0)-f(x_0,y_0)}{x-x_0}
$$

对 $f(x,y)$ 求其对 $y$ 的偏导数

$$
f_y(x_0,y_0)=\frac{\partial f}{\partial y}\bigg|_{(x_0,y_0)}=\lim_{y\to y_0}\frac{f(x_0,y)-f(x_0,y_0)}{y-y_0}
$$

对 $f(x,y)$ 在 $(x_0,y_0)$ 处全微分

$$
\text{d}z\bigg|_{(x_0,y_0)}=f_x(x_0,y_0)\text{d}x+f_y(x_0,y_0)\text{d}y
$$

### 求偏导

对显函数求偏导时，将其余变量看作常数即可，其余与一元函数相同。

对隐函数求偏导时，若 $z=z(x,y)$ 由方程 $F(x,y,z)=0$ 确定，则

$$
\boxed{
  \frac{\partial z}{\partial x}=-\frac{F_x}{F_z}
}
$$

$$
\boxed{
  \frac{\partial z}{\partial y}=-\frac{F_y}{F_z}
}
$$

对复合函数求导时，若二元函数 $f(u,v)$，其中 $u=u(x,y)$，$v=v(x,y)$

![关系树状图](/static/notes/math10-1.png)

遵循**同枝相乘，异枝相加**的规则，列式

$$
\frac{\partial f}{\partial x}=\frac{\partial f}{\partial u}\frac{\partial u}{\partial x}+\frac{\partial f}{\partial v}\frac{\partial v}{\partial x}
$$

$$
\frac{\partial f}{\partial y}=\frac{\partial f}{\partial u}\frac{\partial u}{\partial y}+\frac{\partial f}{\partial v}\frac{\partial v}{\partial y}
$$

$$
\begin{split}
  \frac{\partial^2f}{\partial x^2}&=\frac{\partial}{\partial x}(\frac{\partial f}{\partial u}\frac{\partial u}{\partial x}+\frac{\partial f}{\partial v}\frac{\partial v}{\partial x})\\
  &=(\frac{\partial^2 f}{\partial u^2}\frac{\partial u}{\partial x}+\frac{\partial^2 f}{\partial u\partial v}\frac{\partial v}{\partial x})\frac{\partial u}{\partial x}+\frac{\partial f}{\partial u}\frac{\partial^2 u}{\partial x^2}+(\frac{\partial^2 f}{\partial v\partial u}\frac{\partial u}{\partial x}+\frac{\partial^2 f}{\partial v^2}\frac{\partial v}{\partial x})\frac{\partial v}{\partial x}+\frac{\partial f}{\partial v}\frac{\partial^2 v}{\partial x^2}
\end{split}
$$

### 梯度与方向导数

对于函数 $f(x,y,z)$，其梯度为

$$
\nabla f=(f_x(x,y,z),f_y(x,y,z),f_z(x,y,z))
$$

已知 $\vec{l}$ 的方向余弦为 $\cos\alpha$，$\cos\beta$，$\cos\gamma$，则 $f$ 沿 $\vec{l}$ 的方向导数为

$$
\frac{\partial f}{\partial\vec{l}}=f_x(x,y,z)\cos\alpha+f_y(x,y,z)\cos\beta+f_z(x,y,z)\cos\gamma
$$

## 无条件极值

求 $f(x,y)$ 的极值，按以下步骤求解：

1. 求 $f_x(x,y)$，$f_y(x,y)$，令 $f_x(x,y)=0$，$f_y(x,y)=0$，解得稳定点 $P_0(x_0,y_0)$
2. 求出二阶偏导数 $f_{xx}(x,y)$，$f_{xy}(x,y)$，$f_{yy}(x,y)$，然后求 $A=f_{xx}(x_0,y_0)$，$B=f_{xy}(x_0,y_0)$，$C=f_{yy}(x_0,y_0)$
3. 根据求得的 $A$，$B$，$C$
  - 若 $B^2-AC<0$，那么 $\begin{cases}A<0 & P_0是极大值点\\ A>0 & P_0是极小值点\end{cases}$
  - 若 $B^2-AC>0$，那么 $P_0$ 不是极值点
  - 若 $B^2-AC=0$，那么无法判断 $P_0$ 是不是极值点

> [!tip]
> 条件极值使用拉格朗日乘数法求解。

#### 例题

求 $f(x,y)=x^2+5y^2-6x+10y+6$ 的极值。

1. 求偏导

$$
f_x(x,y)=2x-6
$$

$$
f_y(x,y)=10y+10
$$

2. 令偏导为0，求解方程

$$
2x-6=0\Rightarrow x=3
$$

$$
10y+10=0\Rightarrow y=-1
$$

得稳定点 $P_0(3,-1)$

3. 求二阶偏导

$$
f_{xx}(x,y)=\frac{\partial f_x(x,y)}{\partial x}=2
$$

$$
f_{xy}(x,y)=\frac{\partial f_x(x,y)}{\partial y}=0
$$

$$
f_{yy}(x,y)=\frac{\partial f_y(x,y)}{\partial y}=10
$$

4. 求 $A$，$B$，$C$

将 $P_0$ 代入二阶偏导中

$$
A=f_{xx}(3,-1)=2
$$

$$
B=f_{xx}(3,-1)=0
$$

$$
C=f_{xx}(3,-1)=10
$$

可得

$$
B^2-AC=-20<0
$$

又因为 $A>0$，所以 $P_0(3,-1)$ 是极小值点。

故原函数的极小值为

$$
\boxed{
  f(3,-1)=-8
}
$$

## 几何应用

### 求曲线的切线与法平面

设 $L$ 的参数方程为 $\begin{cases}x=x(t)\\ y=y(t)\\ z=z(t)\end{cases}$，设 $M(x(t_0),y(t_0),z(t_0))$，那么

曲线 $L$ 在 $M$ 处的切线方程为

$$
\frac{x-x_0}{x'(t_0)}=\frac{y-y_0}{y'(t_0)}=\frac{z-z_0}{z'(t_0)}
$$

曲线 $L$ 在 $M$ 处的法平面方程为

$$
x'(t_0)(x-x_0)+y'(t_0)(y-y_0)+z'(t_0)(z-z_0)=0
$$

---

若 $L$ 的方程为 $\begin{cases}F(x,y,z)=0\\ G(x,y,z)=0\end{cases}$，设 $M(x_0,y_0,z_0)$，那么

曲线 $L$ 在 $M$ 处的切线方程为

$$
\frac{x-x_0}{\begin{vmatrix}F_y&F_z\\ G_y&G_z\end{vmatrix}_M}=\frac{y-y_0}{\begin{vmatrix}F_z&F_x\\ G_z&G_x\end{vmatrix}_M}=\frac{z-z_0}{\begin{vmatrix}F_x&F_y\\ G_x&G_y\end{vmatrix}_M}
$$

曲线 $L$ 在 $M$ 处的法平面方程为

$$
\begin{vmatrix}F_y&F_z\\ G_y&G_z\end{vmatrix}_M(x-x_0)+\begin{vmatrix}F_z&F_x\\ G_z&G_x\end{vmatrix}_M(y-y_0)+\begin{vmatrix}F_x&F_y\\ G_x&G_y\end{vmatrix}_M(z-z_0)=0
$$

### 求曲面的切平面和法线

已知曲面方程 $F(x,y,z)=0$，则其在点 $(x_0,y_0,z_0)$ 处的切平面方程为

$$
F_x(x_0,y_0,z_0)(x-x_0)+F_y(x_0,y_0,z_0)(y-y_0)+F_z(x_0,y_0,z_0)(z-z_0)=0
$$

过点 $(x_0,y_0,z_0)$ 的法线方程为

$$
\frac{x-x_0}{F_x(x_0,y_0,z_0)}=\frac{y-y_0}{F_y(x_0,y_0,z_0)}=\frac{z-z_0}{F_z(x_0,y_0,z_0)}
$$

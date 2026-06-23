---
title: "大学物理 电磁学公式整理"
author: NriotHrreion
tags:
- "期末"
- "大物"
- "电磁学"
date: 2026-06-23
---

## 电场强度

- 库伦定律

$$
F=\frac{1}{4\pi\epsilon_0}\cdot\frac{qq_0}{r^2}
$$

$$
E=\frac{F}{q}=\frac{1}{4\pi\epsilon_0}\cdot\frac{q}{r^2}
$$

> [!tip]
> 高中物理的静电力常数 $k=\frac{1}{4\pi\epsilon_0}$。

- 无限大带电平板产生的电场强度

$$
E=\frac{\sigma}{2\epsilon_0}
$$

- 无限长带电直导线在距离 $x$ 处产生的电场强度

$$
E=\frac{\lambda}{2\pi\epsilon_0x}
$$

- 有限长带电直导线在距离中点 $x$ 处产生的电场强度

$$
E=\frac{\lambda}{2\pi\epsilon_0x}\sin\theta_0
$$

> [!info]
> 其中，$\theta_0$ 为待求点到导线端点与垂直方向的夹角。

## 电通量

- 平面的电通量

$$
\Phi_e=ES\cos\theta
$$

- 曲面的电通量

$$
\text{d}\Phi_e=\vec{E}\cdot\text{d}\vec{S}
$$

$$
\Phi_e=\int\vec{E}\cdot\text{d}\vec{S}
$$

> [!info]
> 对于曲面，**向外穿出为正，向内穿入为负。**

- 高斯定理

$$
\Phi_e=\oint\vec{E}\cdot\text{d}\vec{S}=\frac{1}{\epsilon_0}\sum q_内
$$

> [!info]
> **闭合曲面**的电通量等于内部包含**电荷量代数和**除以 $\epsilon_0$。

> [!warning]
> 高斯面上的场强 $E$，不仅由面内电荷影响，还由面外电荷影响。

## 电势

- 电场力做功

$$
W_M=\int_r^\infty\vec{F}\text{d}\vec{r}=\frac{qq_0}{4\pi\epsilon_0r}
$$

- 电势

$$
V=\frac{W_M}{q_0}=\int_r^\infty\vec{E}\text{d}\vec{l}=\frac{q}{4\pi\epsilon_0r}
$$

> [!info]
> 一般规定无穷远处为电势零点，$r$ 为待求点的位置。<br>电场线密的地方电场强度就越大，电势沿电场线方向减小。

## 导体

导体表面带电，内部不带电；非导体表面和内部都带电，且电场强度未知。

- 导体表面电场强度

$$
E=\frac{\sigma}{\epsilon_0}
$$

> [!info]
> 导体是等势体，表面是等势面，但场强并非处处相等，与表面不同位置的不同电荷密度 $\sigma$ 有关。<br>导体表面曲率越大（尖锐），电荷密度就越大。

## 电容器

- 电容

$$
C=\frac{q}{U}
$$

- 极板间电场强度

$$
E=\frac{\sigma}{\epsilon_0}=\frac{U}{d}
$$

- 极板间电势差

$$
U=\frac{q}{C}=Ed
$$

- 极板间相互作用力

$$
F=\frac{1}{2}qE
$$

- 含介质的电容器

$$
C=\epsilon_rC_0
$$

$$
E=\frac{E}{\epsilon_r}
$$

$$
\epsilon=\epsilon_0\epsilon_r
$$

> [!info]
> 真空中 $\epsilon_r=1$。

- 平行板电容器

$$
C=\frac{\epsilon_0S}{d}
$$

- 孤立导体电容器（球形）

$$
C=4\pi\epsilon_0R_A
$$

## 电介质

- 电位移

$$
D=\epsilon_0\epsilon_rE
$$

- 高斯定理

$$
\oint\vec{D}\text{d}\vec{S}=\sum q_内
$$

## 电场能

- 电场能密度

$$
w_e=\frac{1}{2}DE=\frac{1}{2}\epsilon_0\epsilon_rE^2
$$

- 电场能

$$
W=\int\limits_Vw_e\text{d}V
$$

$$
W=\frac{Q^2}{2C}=\frac{1}{2}QU
$$

---

## 磁感应强度

- 一小段电流元在距离 $r$ 处产生的磁感应强度（毕萨定理）

$$
\text{d}B=\frac{\mu_0}{4\pi}\cdot\frac{I\text{d}l\sin\theta}{r^2}
$$

$$
B=\frac{\mu_0}{4\pi}\int\frac{I\text{d}l\sin\theta}{r^2}
$$

- 无限长直导线在距离 $x$ 处产生的磁感应强度

$$
B=\frac{\mu_0I}{2\pi x}
$$

> [!info]
> 可看作导线端点在无穷远处，$\theta_1=0$，$\theta_2=\pi$。

- 有限长直导线在距离 $x$ 处产生的磁感应强度

$$
B=\frac{\mu_0I}{4\pi x}(\cos\theta_1-\cos\theta_2)
$$

- 半径为 $R$ 的载流圆环在圆心处产生的磁感应强度

$$
B=\frac{\mu_0I}{2R}
$$

- 长直螺线管内的磁感应强度

$$
B=\mu_0nI=\frac{\mu_0NI}{L}
$$

> [!info]
> 其中，$n$ 为匝数密度。

- 环形螺线管内的磁感应强度

$$
B=\mu_0nI=\frac{\mu_0NI}{2\pi R}
$$

- 安培环路定理

$$
\oint\vec{B}\text{d}\vec{l}=\mu_0\sum I_内
$$

> [!tip]
> 可看作 $\oint(\frac{1}{\mu_0}\vec{B})\text{d}\vec{l}=\sum I_内$。此处可与电介质、磁介质中的高斯定理结合记忆。

## 磁通量

- 平面的磁通量

$$
\Phi_m=BS\cos\theta
$$

- 曲面的电通量

$$
\text{d}\Phi_m=\vec{B}\cdot\text{d}\vec{S}
$$

$$
\Phi_m=\int\vec{B}\cdot\text{d}\vec{S}
$$

> [!info]
> 对于曲面，**向外穿出为正，向内穿入为负。**

- 高斯定理

$$
\Phi_m=\oint\vec{B}\cdot\text{d}\vec{S}=0
$$

> [!tip]
> 磁场是无源场，因此对于闭合曲面，穿入等于穿出。

## 安培力

- 直导线在磁场中所受的安培力（与磁场在同一平面内，夹角为 $\theta$）

$$
F=BIL\sin\theta
$$

- 任意导线在磁场中所受的安培力

$$
\text{d}F=BI\text{d}l
$$

$$
F=\int\text{d}F
$$

## 磁力矩

对于通有电流 $I$ 的闭合线圈，有

- 磁矩（方向垂直于闭合线圈平面）

$$
p_m=IS
$$

- 磁力矩

$$
M=Bp_m\sin\theta
$$

> [!info]
> 其中，$\theta$ 为 $B$ 和 $p_m$ 的夹角。

## 洛伦兹力

- 洛伦兹力

$$
F=qvB=m\frac{v^2}{R}
$$

$$
R=\frac{mv}{qB}
$$

$$
T=\frac{2\pi m}{qB}
$$

## 磁介质

- 磁场强度

$$
H=\frac{B}{\mu_0\mu_r}
$$

- 安培环路定理

$$
\oint\vec{H}\text{d}\vec{l}=\sum I_内
$$

$$
\mu=\mu_0\mu_r
$$

## 磁场能

- 磁能密度

$$
w_m=\frac{1}{2}HB=\frac{1}{2}\cdot\frac{B^2}{\mu_0\mu_r}
$$

## 电磁感应

- 感生电动势

$$
\epsilon=-\frac{\text{d}\Phi}{\text{d}t}
$$

若 $B$ 变化，$S$ 不变

$$
\epsilon=\oint\vec{E_k}\text{d}\vec{l}=-\int\frac{\partial\vec{B}}{\partial t}\text{d}\vec{S}
$$

若 $B$ 不变，$S$ 变化

$$
\epsilon=Blv
$$

## 自感

- 单匝线圈自感系数

$$
L=\frac{\Phi}{I}
$$

> [!warning]
> 自感系数 $L$ 的大小与回路的几何形状、大小、匝数、磁介质有关，**与电流无关**，是线圈自身具有的属性。

- 自感电动势

$$
\epsilon=L\frac{\text{d}I}{\text{d}t}
$$

## 互感

$$
M=\frac{\Phi_2}{I_1}=\frac{\Phi_1}{I_2}
$$

## 麦克斯韦方程组

- 电场高斯定理

电场是有源场，电荷总伴随着电场

$$
\oint\vec{D}\text{d}\vec{S}=\sum q=\int\limits_V\rho\text{d}V
$$

- 磁场高斯定理

磁场是无源场，磁力线闭合

$$
\oint\vec{B}\text{d}\vec{S}=0
$$

- 变化的电场产生磁场

$$
\oint\vec{H}\text{d}\vec{l}=I+I_d=\int\limits_S\vec{j}\text{d}\vec{S}+\int\limits_S\frac{\partial\vec{D}}{\partial t}\text{d}\vec{S}
$$

- 变化的磁场产生电场

$$
\oint\vec{E}\text{d}\vec{l}=-\frac{\text{d}\Phi}{\text{d}t}=-\int\frac{\partial\vec{B}}{\partial t}\text{d}\vec{S}
$$

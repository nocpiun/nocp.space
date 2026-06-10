---
title: "电路与模拟电子技术笔记 4 - 正弦稳态电路的分析"
author: NriotHrreion
tags:
- "期末"
- "电路"
date: 2026-06-10
---

## 正弦量

正弦量是指按正弦规律随时间变化的物理量（电压或电流）。

$$
f(t)=F_m\cos(\omega t+\phi)
$$

- $F_m$ 为振幅，且一定大于零
- $\omega$ 为角频率
- $\omega t+\phi$ 为相位
- $\phi$ 为初相位
- $f$ 为频率，且 $\omega=2\pi f$
- $T$ 为周期，且 $T=\frac{1}{f}$

已知振幅 $F_m$，角频率 $\omega$ 和初相 $\phi$，就能完全确定一个正弦量，故称它们为**正弦量的三要素**。

### 相位差

正弦稳态电路中，各电压电流都是频率相同的正弦量，常常需要将这些正弦量的相位进行比较。两个正弦电压电流相位之差，称为相位差 $\theta$。

如两个同频率的正弦电流

$$
i_1(t)=I_{1m}\cos(\omega t+\phi_1)
$$

$$
i_2(t)=I_{2m}\cos(\omega t+\phi_2)
$$

电流 $i_1(t)$，$i_2(t)$ 间的相位差为

$$
\theta=(\omega t+\phi_1)-(\omega t+\phi_2)=\phi_1-\phi_2
$$

> [!tip]
> 两个**同频率**正弦量在任意时刻的相位差均等于它们初相之差，与时间 $t$ 无关。

### 有效值

直流信号（电流 $I$）和正弦量（电流 $i(t)$）通过电阻 $R$ 时的功率和能量作一比较，导出正弦电压电流的有效值。

电流 $i(t)$ 的有效值 $I$ 为

$$
I=\sqrt{\frac{1}{T}\int_0^Ti^2(t)\text{d}t}
$$

特殊地，对于正弦电流 $i(t)=I_m\cos(\omega t+\phi)$，其有效值为

$$
I=\frac{I_m}{\sqrt2}\approx0.707I_m
$$

同理，对于正弦电压 $u(t)=U_m\cos(\omega t+\phi)$，其有效值为

$$
U=\frac{U_m}{\sqrt2}\approx0.707U_m
$$

对于半波整流波形 $h(t)=A\sin\omega t$ $(0<t<\frac{T}{2})$

![半波整流波形的 h(t)-t 图像](/static/notes/circuit4-1.png)

其有效值为

$$
H=\frac{A}{2}=0.5A
$$

## 正弦量的相量表示

### 复数

![复数的复平面表示](/static/notes/circuit4-2.png)

对于复平面中的复数 $A$，有如下的书写形式：
- 直角坐标形式：$A=a_1+ja_2$
- 三角形式：$A=a(\cos\phi+j\sin\phi)$
- 指数形式：$A=ae^{j\phi}$
- 极坐标形式：$A=a\angle\phi$

且其中的参数满足下列关系：
- $a_1=a\cos\phi$
- $a_2=a\sin\phi$
- $a=\sqrt{a_1^2+a_2^2}$
- $\phi=\arctan\frac{a_2}{a_1}$

对于任意复数 $A=a_1+ja_2=a\angle\phi$，$B=b_1+jb_2=b\angle\theta$，都有

$$
A\plusmn B=a_1\plusmn b_1+j(a_2\plusmn b_2)
$$

$$
A\times B=ab\angle(\phi+\theta)
$$

$$
\frac{A}{B}=\frac{a}{b}\angle(\phi-\theta)
$$

且

$$
A=B\Rightarrow (a_1=b_1, a_2=b_2) \vee (a=b, \angle\phi=\angle\theta)
$$

### 正弦量的相量表示法

分析正弦稳态的有效方法是相量法，相量法的基础是用相量或复数来表示正弦量的振幅和初相。**注意：其频率不变。**

$$
\begin{split}
  f(t)&=F_m\cos(\omega t+\phi)\\
  &=\text{Re}[F_me^{j(\omega t+\phi)}]
\end{split}
$$

正弦量 $f(t)$ 的振幅相量为

$$
\boxed{
  \dot{F}_m=F_me^{j\phi}=F_m\angle\phi
}
$$

![相量图](/static/notes/circuit4-3.png)

正弦量有效值与振幅值的关系为

$$
F=\frac{F_m}{\sqrt2}
$$

有效值的相量为

$$
\dot{F}=Fe^{j\phi}=F\angle\phi
$$

正弦量可用一个相量（复常数）来表示；已知正弦量相量，再加上角频率，就能写出正弦量的时域表达式（两者存在对应关系）。

$$
u(t)=U_m\cos(\omega t+\phi_u)\longleftrightarrow\dot{U}_m=U_m\angle\phi_u
$$

$$
i(t)=I_m\cos(\omega t+\phi_i)\longleftrightarrow\dot{I}_m=I_m\angle\phi_i
$$

显然，有 $\dot{U}_m=\sqrt2\dot{U}$，$\dot{I}_m=\sqrt2\dot{I}$

#### 例题

已知电流 $i_1(t)=5\cos(314t+60^\circ)(\text{A})$，$i_2(t)=-10\sin(314t+60^\circ)(\text{A})$，写出它们的振幅相量。

易得

$$
\dot{I}_{1m}=5\angle60^\circ\text{A}
$$

对于 $i_2(t)$

$$
\begin{split}
  i_2(t)&=-10\sin(314t+60^\circ)\\
  &=-10\cos(314t-30^\circ)\\
  &=10\cos(314t+150^\circ)(\text{A})
\end{split}
$$

可得

$$
\dot{I}_{2m}=10\angle150^\circ\text{A}
$$

## 基尔霍夫定律的相量形式

### KCL的相量形式

由KCL

$$
\sum_{k=1}^ni_k(t)=0
$$

电路中全部电流都具有同一频率 $\omega$，则可用振幅相量或有效值相量表示：

$$
\begin{split}
  i_k(t)&=\sqrt2I_k\cos(\omega t+\phi_k)\\
  &=\text{Re}[\dot{I}_{km}e^{j\omega t}]\\
  &=\text{Re}[\sqrt2\dot{I}_ke^{j\omega t}]
\end{split}
$$

可得

$$
\sum_{k=1}^ni_k(t)=\sum_{k=1}^n\text{Re}[\dot{I}_{km}e^{j\omega t}]=\sum_{k=1}^n\text{Re}[\sqrt2\dot{I}_ke^{j\omega t}]=0
$$

即

$$
\boxed{
  \sum_{k=1}^n\dot{I}_{km}=\sum_{k=1}^n\dot{I}_k=0
}
$$

> [!warning]
> 流出任一节点的全部支路电流振幅（或有效值）的代数和并不一定等于零，即一般情况下
> $$\sum_{k=1}^nI_{km}\neq0$$
> $$\sum_{k=1}^nI_k\neq0$$

#### 例题

已知 $i_1(t)=10\sqrt2\cos(\omega t+60^\circ)(\text{A})$，$i_2(t)=5\sqrt2\sin\omega t(\text{A})$，试求电流 $i(t)$ 及其有效值相量。

![例题图](/static/notes/circuit4-4.png)

根据图(a)电路的时域模型，得图(b)所示的相量模型。

> [!tip]
> 将时域模型中各电流符号用相应的相量符号表示。

由已知电流表达式，可得

$$
\dot{I}_1=10\angle60^\circ
$$

$$
\dot{I}_2=5\angle(-90^\circ)
$$

对节点列KCL

$$
\begin{split}
  \dot{I}&=\dot{I}_1+\dot{I}_2\\
  &=10\angle60^\circ+5\angle(-90^\circ)\\
  &=10\cos60^\circ+10j\sin60^\circ+5\cos(-90^\circ)+5j\sin(-90^\circ)\\
  &=5+5\sqrt3j-5j\\
  &\approx5+3.66j\\
  &\approx6.2\angle36.2^\circ
\end{split}
$$

可得

$$
\boxed{
  i(t)=6.2\sqrt2\cos(\omega t+36.2^\circ)(\text{A})
}
$$

### KVL的相量形式

由KVL

$$
\sum_{k=1}^nu_k(t)=0
$$

其相量形式为

$$
\boxed{
  \sum_{k=1}^n\dot{U}_{km}=\sum_{k=1}^n\dot{U}_k=0
}
$$

> [!warning]
> 沿任一回路全部支路电压振幅（或有效值）的代数和并不一定等于零，即一般情况下
> $$\sum_{k=1}^nU_{km}\neq0$$
> $$\sum_{k=1}^nU_k\neq0$$

## 正弦稳态电路的相量模型

### 电阻元件

电阻元件伏安关系的相量形式为：

$$
\boxed{
  \dot{U}=\dot{I}R
}
$$

$$
\boxed{
  \dot{U}_m=\dot{I}_mR
}
$$

电阻元件的时域模型及反映电压电流关系的波形如下图所示。可见，在任一时刻，电压的瞬时值是电流的 $R$ 倍，电压与电流同相位。 

![电阻元件的时域模型及反映电压电流关系的波形](/static/notes/circuit4-5.png)

### 电容元件

电容元件伏安关系的相量形式为：

$$
\boxed{
  \dot{I}=j\omega C\dot{U}
}
$$

代数关系为：

$$
I_m=\omega CU_m
$$

$$
I=\omega CU
$$

$$
\phi_i=\phi_u+90^\circ
$$

- **容抗**：

$$
X_C=\frac{U}{I}=\frac{U_m}{I_m}=\frac{1}{\omega C}
$$

- **容纳**：

$$
B_C=\frac{I}{U}=\frac{I_m}{U_m}=\omega C
$$

电容元件的时域模型如图(a)所示，电压电流的波形图如图(b)所示。由此可看出电容电流超前于电容电压 $90^\circ$。

![电容元件的时域模型及反映电压电流关系的波形](/static/notes/circuit4-6.png)

### 电感元件

电感元件伏安关系的相量形式为：

$$
\boxed{
  \dot{U}=j\omega L\dot{I}
}
$$

代数关系为：

$$
U_m=\omega LI_m
$$

$$
U=\omega LI
$$

$$
\phi_u=\phi_i+90^\circ
$$

- **感抗**：

$$
X_L=\frac{U}{I}=\omega L
$$

- **感纳**：

$$
B_L=\frac{I}{U}=\frac{1}{\omega L}
$$

电感元件的时域模型如图(a)所示，伏安关系的波形如图(b)所示。由此可看出电感电压超前于电感电流 $90^\circ$，当电感电流由负值增加经过零点时，其电压达到正最大值。

![电感元件的时域模型及反映电压电流关系的波形](/static/notes/circuit4-7.png)

#### 例题 1

图示电路，已知 $i_S(t)=\sqrt2\cos2t(\text{A})$，求：$u_1(t)$，$u_2(t)$，$u(t)$及有效值相量。

![例题图](/static/notes/circuit4-8.png)

相量模型如图(b)，根据相量形式的KCL求电流相量

$$
\dot{I}=\dot{I}_S=1\angle0^\circ\text{A}=1\text{A}
$$

根据相量形式的VCR，得

$$
\dot{U}_1=\dot{I}R=\dot{I}_SR=3\times1\angle0^\circ=3\angle0^\circ\text{V}
$$

$$
\dot{U}_2=j\omega L\dot{I}=j\times2\times2\times1\angle0^\circ=4j=4\angle90^\circ\text{V}
$$

根据相量形式的KVL，得

$$
\dot{U}=\dot{U}_1+\dot{U}_2=3+4j\approx5\angle53.1^\circ\text{V}
$$

可得

$$
u_1(t)=3\sqrt2\cos2t(\text{V})
$$

$$
u_2(t)=4\sqrt2\cos(2t+90^\circ)(\text{V})
$$

$$
u(t)=5\sqrt2\cos(2t+53.1^\circ)(\text{V})
$$

相量图如图(c)所示。

#### 例题 2

电路如图(a)所示，已知 $R=4\Omega$，$C=0.1\text{F}$，$u_S(t)=10\sqrt2\cos5t(\text{V})$，求：$i_1(t)$，$i_2(t)$，$i(t)$及其有效值相量。

![例题图](/static/notes/circuit4-9.png)

相量模型如图(b)，由题可得

$$
\dot{U}_S=10\angle0^\circ\text{V}
$$

$$
\omega=5\text{rad/s}
$$

由电阻元件的VCR，得

$$
\dot{I}_1=\frac{\dot{U}_S}{R}=2.5\angle0^\circ\text{A}
$$

由电容元件的VCR，得

$$
\begin{split}
  \dot{I}_2&=j\omega C\dot{U}_S\\
  &=0.5j\cdot10\angle0^\circ\\
  &=0.5\angle90^\circ\times10\angle0^\circ\\
  &=5\angle90^\circ\text{A}
\end{split}
$$

由相量形式的KCL，得

$$
\begin{split}
  \dot{I}&=\dot{I}_1+\dot{I}_2\\
  &=2.5\angle0^\circ+5\angle90^\circ\\
  &=2.5+5j\\
  &\approx5.59\angle63.4^\circ
\end{split}
$$

可得

$$
i_1(t)=2.5\cos5t\text{A}
$$

$$
i_2(t)=5\cos(5t+90^\circ)\text{A}
$$

$$
i(t)=5.59\cos(5t+63.4^\circ)\text{A}
$$

相量图如图(c)所示。

## 阻抗与导纳

![无源二端网络 $N_0$](/static/notes/circuit4-10.png)

对于无源二端网络 $N_0$，其阻抗为

$$
Z(j\omega)=\frac{\dot{U}}{\dot{I}}=\frac{\dot{U}_m}{\dot{I}_m}
$$

导纳为

$$
Y(j\omega)=\frac{\dot{I}}{\dot{U}}
$$

显然

$$
Z=\frac{1}{Y}
$$

可得欧姆定律的相量形式为：

$$
\boxed{
  \dot{U}=\dot{I}Z
}
$$

$$
\boxed{
  \dot{I}=\dot{U}Y
}
$$

> [!info]
> 导纳 $Y$ 的单位为西门子（$\text{S}$），也写作姆欧（$\Omega^{-1}$ 或 $\mho$）

### RLC元件的阻抗

<div class="grid-2">

$$
\dot{U}=\dot{I}_RR
$$

$$
Z_R=R
$$

$$
\dot{U}_L=j\omega L\dot{I}_L
$$

$$
Z_L=j\omega L
$$

$$
\dot{U}_C=\frac{1}{j\omega C}\dot{I}_C
$$

$$
Z_C=\frac{1}{j\omega C}
$$

</div>

一般情况下，阻抗的相量形式为

$$
Z=\frac{\dot{U}}{\dot{I}}=R+Xj=|Z|\angle\theta_Z
$$

- $R$ 为电阻分量
- $X$ 为电抗分量
- $|Z|$ 为阻抗模
- $\theta_Z$ 为阻抗角

由电抗分量 $X$ 的正负号，可以推出该元件的等效类型，如下：
- $X>0$ 时，$\theta_Z>0$，端口电压超前电流，网络呈**感性**，元件可等效为一个电感
- $X<0$ 时，$\theta_Z<0$，端口电流超前电压，网络呈**容性**，元件可等效为一个电容
- $X=0$ 时，$\theta_Z=0$，端口电压与电流同相，网络呈**电阻性**，元件可等效为一个电阻

### GCL元件的导纳

<div class="grid-2">

$$
\dot{I}=\dot{U}_RG
$$

$$
Y_R=G
$$

$$
\dot{I}_L=\frac{1}{j\omega L}\dot{U}_L
$$

$$
Y_L=\frac{1}{j\omega L}
$$

$$
\dot{I}_C=j\omega C\dot{U}_C
$$

$$
Y_C=j\omega C
$$

</div>

一般情况下，导纳的相量形式为

$$
Y=\frac{\dot{I}}{\dot{U}}=G+Bj=|Y|\angle\theta_Y
$$

- $G$ 为电导分量
- $B$ 为电纳分量
- $|Y|$ 为导纳模
- $\theta_Y$ 为导纳角

由电纳分量 $B$ 的正负号，可以推出该元件的等效类型，如下：
- $B>0$ 时，$\theta_Y>0$，端口电流超前电压，网络呈**容性**，元件可等效为一个电容
- $B<0$ 时，$\theta_Y<0$，端口电压超前电流，网络呈**感性**，元件可等效为一个电感
- $B=0$ 时，$\theta_Y=0$，端口电压与电流同相，网络呈**电阻性**，元件可等效为一个电阻

### 等效电路

无源网络相量模型有两种等效电路：

- 由 $Z=R+Xj$，$R$ 与 $Xj$ 串联，如图(c)
- 由 $Y=G+Bj$，$G$ 与 $Bj$ 并联，如图(e)

![无源网络相量模型的等效电路](/static/notes/circuit4-11.png)

### 阻抗串联

若 $n$ 个阻抗串联，则其等效阻抗为：

$$
Z=\sum_{k=1}^nZ_k=\sum_{k=1}^nR_k+j\sum_{k=1}^nX_k
$$

电流与端口电压相量的关系为：

$$
\dot{I}=\frac{\dot{U}}{\sum_{k=1}^nZ_k}
$$

第 $i$ 个阻抗上的电压与端口电压相量的关系为：

$$
\dot{U}_i=\dot{I}Z_i=\frac{Z_i}{\sum_{k=1}^nZ_k}\dot{U}
$$

这个公式称为 $n$ 个阻抗串联时的分压公式。

#### 例题

已知 $u(t)=10\cos2t(\text{V})$。试求 $i(t)$，$u_R(t)$，$u_L(t)$，$u_C(t)$。

![例题图](/static/notes/circuit4-12.png)

由图(a)的电路得出其相量模型，如图(b)。

由已知可得

$$
\dot{U}=5\sqrt2\angle0^\circ
$$

总阻抗为

$$
\begin{split}
  Z&=Z_R+Z_L+Z_C\\
  &=R+j\omega L+\frac{1}{j\omega C}\\
  &=2\Omega+j4\Omega-j2\Omega\\
  &=2+2j\Omega\\
  &=2\sqrt2\angle45^\circ\Omega
\end{split}
$$

根据RLC元件的欧姆定律，得

$$
\dot{I}=\frac{\dot{U}}{Z}=2.5\angle(-45^\circ)\text{A}
$$

$$
\dot{U}_R=\dot{I}R=5\angle(-45^\circ)\text{V}
$$

$$
\dot{U}_L=\dot{I}\cdot j\omega L=10\angle45^\circ\text{V}
$$

$$
\dot{U}_C=\dot{I}\cdot\frac{1}{j\omega C}=5\angle(-135^\circ)\text{V}
$$

将相量转换为时间表达式

$$
i(t)=2.5\sqrt2\cos(2t-45^\circ)(\text{A})
$$

$$
u_R(t)=5\sqrt2\cos(2t-45^\circ)(\text{V})
$$

$$
u_L(t)=10\sqrt2\cos(2t+45^\circ)(\text{V})
$$

$$
u_C(t)=5\sqrt2\cos(2t-135^\circ)(\text{V})
$$

## 导纳并联

若 $n$ 个导纳并联，则其等效导纳为：

$$
Y=\sum_{k=1}^nY_k=\sum_{k=1}^nG_k+j\sum_{k=1}^nB_k
$$

电流与端口电压相量的关系为：

$$
\dot{U}=\frac{\dot{I}}{\sum_{k=1}^nY_k}
$$

第 $i$ 个导纳上的电压与端口电压相量的关系为：

$$
\dot{I}_i=\dot{U}Y_i=\frac{Y_i}{\sum_{k=1}^nY_k}\dot{I}
$$

这个公式称为 $n$ 个导纳并联时的分流公式。

#### 例题

已知 $i_S(t)=15\sqrt2\cos2t(\text{A})$，$R=1\Omega$，$L=1\text{H}$，$C=0.5\text{F}$，试求：$u(t)$，$i_R(t)$，$i_L(t)$，$i_C(t)$。

![例题图](/static/notes/circuit4-13.png)

由图(a)的电路得出其相量模型，如图(b)。

由已知可得

$$
\dot{I}_S=15\angle0^\circ\text{A}
$$

总导纳为

$$
\begin{split}
  Y&=Y_R+Y_L+Y_C\\
  &=\frac{1}{R}+\frac{1}{j\omega L}+j\omega C\\
  &=1\text{S}-j\frac{1}{4}\text{S}+j1\text{S}\\
  &=1+\frac{3}{4}j\text{S}\\
  &\approx1.25\angle36.9^\circ\text{S}
\end{split}
$$

根据RLC元件的欧姆定律，得

$$
\dot{U}=\frac{\dot{I}}{Y}=12\angle(-36.9^\circ)\text{V}
$$

$$
\dot{I}_R=\dot{U}Y_R=12\angle(-36.9^\circ)\text{A}
$$

$$
\dot{I}_L=\dot{U}Y_L=3\angle(-126.9^\circ)\text{A}
$$

$$
\dot{I}_C=\dot{U}Y_C=12\angle53.1^\circ\text{A}
$$

将相量转换为时间表达式

$$
u(t)=12\sqrt2\cos(2t-36.9^\circ)(\text{V})
$$

$$
i_R(t)=12\sqrt2\cos(2t-36.9^\circ)(\text{A})
$$

$$
i_L(t)=3\sqrt2\cos(2t-126.9^\circ)(\text{A})
$$

$$
i_C(t)=12\sqrt2\cos(2t+53.1^\circ)(\text{A})
$$

## 正弦稳态电路的功率

二端网络的瞬时功率为：

$$
p(t)=u(t)i(t)=UI\cos\theta_Z+UI\cos(2\omega t+2\phi_u-\theta_Z)
$$

其中，$\theta_Z=\phi_u-\phi_i$ 是电压与电流的相位差。

> [!tip]
> 瞬时功率由一个恒定分量和一个频率为 $2\omega$ 的正弦分量组成。

平均功率为：

$$
P=\frac{1}{T}\int_0^Tp(t)\text{d}t=UI\cos\theta_Z
$$

平均功率不仅取决于电压电流有效值乘积 $UI$，还与阻抗角 $\theta_Z$ 有关。

特别地，对于不同的阻抗等效类型，平均功率分别是：
- 等效电阻：$P=UI=I^2R=\frac{U^2}{R}$（$\theta_Z=0^\circ$）
- 等效电抗：$P=0$（电感 $\theta_Z=90^\circ$，电容 $\theta_Z=-90^\circ$）

视在功率为：

$$
S=UI
$$

> [!info]
> **视在功率**表示电气设备的容量，是单口网络所吸收平均功率的最大值，单位：伏安（$\text{VA}$）。例如我们说某个发电机的容量为 $100\text{kVA}$，而不说其容量为 $100\text{kW}$。

功率因数为：

$$
\lambda=\cos\theta_Z=\frac{P}{S}
$$

> [!info]
> 网络吸收的平均功率 $P$ 与 $\cos\theta_Z$ 的大小密切相关，$\cos\theta_Z$ 表示功率的利用程度，称为**功率因数**，记作 $pf$ 或 $\lambda$；而 $\theta_Z$ 就称为**功率因数角**。

无功功率为：

$$
Q=UI\sin\theta_Z
$$

> [!info]
> **无功功率**反映电源（或外电路）和单口网络内储能元件之间的能量交换情况，单位为乏（$\text{Var}$），即Volt Amper Reactive。

当单口网络为纯电阻时，$\theta_Z=0$，则

$$
Q_R=UI\sin0^\circ=0
$$

当单口网络为纯电感时，$\theta_Z=90^\circ$，则

$$
Q_L=UI\sin90^\circ=UI=\omega LI^2=X_LI^2
$$

当单口网络为纯电容时，$\theta_Z=-90^\circ$，则

$$
Q_C=UI\sin(-90^\circ)=-UI=-\frac{I^2}{\omega C}=-X_CI^2
$$

复功率为：

$$
\tilde{S}=\dot{U}\dot{I}^\ast=UI\angle(\phi_u-\phi_i)=UI\angle\theta_Z=P+Qj
$$

> [!info]
> 为了便于用相量来计算平均功率，引入**复功率**。

#### 例题

电路相量模型如图，端口电压有效值为 $U=100\text{V}$，试求该网络的 $P$，$Q$，$S$，$\tilde{S}$，$\lambda$。

![例题图](/static/notes/circuit4-14.png)

设端口电压相量为

$$
\dot{U}=100\angle0^\circ\text{V}
$$

网络的等效总阻抗为

$$
\begin{split}
  Z&=-j14\Omega+\frac{16\Omega\times j16\Omega}{16\Omega+j16\Omega}\\
  &=8-6j\Omega\\
  &\approx10\angle(-36.9^\circ)\Omega
\end{split}
$$

可得

$$
\dot{I}_1=\frac{\dot{U}}{Z}=10\angle36.9^\circ\text{A}
$$

$$
\theta_Z=\phi_u-\phi_i=-36.9^\circ
$$

故

$$
P=UI_1\cos\theta_Z=800\text{W}
$$

$$
Q=UI_1\sin\theta_Z=-600\text{Var}
$$

$$
S=UI_1=1000\text{VA}
$$

$$
\tilde{S}=P+jQ=800-600j\text{VA}
$$

$$
\lambda=\cos\theta_Z=0.8
$$

## 谐振电路

含有电感、电容和电阻元件的单口网络，在某些工作频率上，出现端口电压和电流相位相同的情况时，称电路发生谐振。能发生谐振的电路，称为谐振电路。

### RCL串联谐振

当 $\omega L-\frac{1}{\omega C}=0$ 时，$\theta_Z=0$，$Z(j\omega)=R$，电压 $u(t)$ 与电流 $i(t)$ 相位相同，电路发生谐振。谐振频率为

$$
\omega=\omega_0=\frac{1}{\sqrt{LC}}
$$

其中，$\omega_0$ 称为固有谐振角频率，简称谐振角频率。

用频率表示的谐振条件为

$$
f=f_0=\frac{1}{2\pi\sqrt{LC}}
$$

谐振时的感抗或容抗称为特性阻抗，有

$$
\rho=\omega_0L=\frac{1}{\omega_0C}=\sqrt{\frac{L}{C}}
$$

谐振时，电路有如下特点：
- 阻抗呈现纯电阻，达到最小值，即 $Z(j\omega_0)=Z_0=R$，$|Z|_{min}=|Z_0|=R$
- 电流有效值达到最大值，且电流与电压源电压同相

定义品质因数为（无量纲）

$$
Q=\frac{\omega_0L}{R}=\frac{1}{\omega_0RC}=\frac{1}{R}\rho
$$

电感电压或电容电压的幅度为电压源电压幅度的 $Q$ 倍，即

$$
U_{L0}=U_{C0}=QU_S=QU_{R0}
$$

#### 例题

电路如图，已知 $u_S(t)=\sqrt2\cos\omega t(\text{V})$，求：(1) 频率 $\omega$ 为何值时，电路发生谐振；(2) 电路谐振时，$U_{L0}$ 和 $U_{C0}$ 为何值。

![例题图](/static/notes/circuit4-15.png)

(1)

电路发生谐振时，有

$$
\omega=\omega_0=\frac{1}{\sqrt{LC}}=\frac{1}{\sqrt{0.1\times10^{-3}\text{H}\times0.01\times10^{-6}\text{F}}}=1\times10^6\text{rad/s}
$$

(2)

由题可得

$$
U_S=1\text{V}
$$

通过 $\omega_0$ 可求得品质因数 $Q$

$$
Q=\frac{\omega_0 L}{R}=\frac{1\times10^6\text{rad/s}\times0.1\times10^{-3}\text{H}}{1\Omega}=100
$$

可得

$$
U_{L0}=U_{C0}=QU_S=100\text{V}
$$

### GCL并联谐振

在GCL并联谐振电路中，品质因数为

$$
Q=\omega RC=\frac{R}{\omega_0L}=R\cdot\frac{1}{\rho}=\frac{1}{G\rho}
$$

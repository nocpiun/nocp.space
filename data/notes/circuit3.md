---
title: "电路与模拟电子技术笔记 3 - 动态电路的暂态分析"
author: NriotHrreion
tags:
- "期末"
- "电路"
date: 2026-06-09
---

## 电容元件

如果一个二端元件在任一时刻，其电荷与电压之间的关系由 $q-u$ 平面上一条曲线所确定，则称此二端元件为电容元件。

- **线性电容**：特性曲线是通过 $q$，$u$ 坐标原点的一条直线，否则为非线性电容。
- **非时变电容**：特性曲线不随时间变化，否则为时变电容元件。

![线性时不变电容的特性曲线](/static/notes/circuit3-1.png)

对于线性非时变电容元件，有

$$
q=Cu
$$

### 电容元件的电压电流关系

1. 电容是动态元件

电容的电流与其电压对时间的变化率成正比。假如电容的电压保持不变，则电容的电流为零。电容元件相当于开路 ($i=0$)。 

$$
i(t)=\frac{\text{d}q}{\text{d}t}=\frac{\text{d}(Cu)}{\text{d}t}=C\frac{\text{d}u}{\text{d}t}
$$

2. 电容是惯性元件

当 $i$ 有限时，电压变化率 $\frac{\text{d}u}{\text{d}t}$ 必然有限；电压只能连续变化而不能跳变。

3. 电容是记忆元件

$$
u(t)=\frac{1}{C}\int_{-\infty}^ti(\lambda)\text{d}\lambda
$$

电容电压 $u$ 有“记忆”电流全部历史的作用，取决于电流 $(-\infty,t)$ 的值。

$$
\begin{split}
  u(t)&=\frac{1}{C}\int_{-\infty}^ti(\lambda)\text{d}\lambda\\
  &=\frac{1}{C}\int_{-\infty}^{t_0}i(\lambda)\text{d}\lambda+\frac{1}{C}\int_{t_0}^ti(\lambda)\text{d}\lambda\\
  &=u(t_0)+\frac{1}{C}\int_{t_0}^ti(\lambda)\text{d}\lambda
\end{split}
$$

4. 电容是储能元件

电压电流参考方向关联时，电容吸收功率

$$
p(t)=u(t)i(t)=u(t)C\frac{\text{d}u}{\text{d}t}
$$

- 当 $p>0$ 时，电容吸收功率（吞），储存电场能量增加
- 当 $p<0$ 时，电容发出功率（吐），电容放出存储的能量

任意时刻 $t$ 的总能量为

$$
\begin{split}
  w_C(t)&=\int_{-\infty}^tp(\xi)\text{d}\xi\\
  &=\int_{-\infty}^tu_C(\xi)i_C(\xi)\text{d}\xi\\
  &=C\int_{-\infty}^tu_C(\xi)\frac{\text{d}u_C}{\text{d}\xi}\text{d}\xi\\
  &=C\int_{u_C(-\infty)}^{u_C(t)}u_C(\xi)\text{d}\xi\\
  &=\frac{1}{2}C[u_C^2(t)-u_C^2(-\infty)]
\end{split}
$$

$$
\boxed{
  w_C(t)=\frac{1}{2}Cu_C^2(t)
}
$$

某时刻电容的储能取决于该时刻电容的电压值，与电流值无关。电压的绝对值增大时，储能增加；减小时，储能减少。

#### 例题 1

已知 $C=4\text{F}$，其上电压如图(b)，试求 $i_C(t)$，$p_C(t)$ 和 $w_C(t)$。

![例题图](/static/notes/circuit3-2.png)

由图(b)可得

$$
u_C(t)=u_S(t)=
\begin{cases}
  0 & t\leq1\\
  -t+1 & 1<t\leq2\\
  t-3 & 2<t\leq4\\
  1 & t>4
\end{cases}
$$

由公式可推出

$$
i_C(t)=C\frac{\text{d}u}{\text{d}t}=
\begin{cases}
  0 & t\leq1\\
  -4 & 1<t\leq2\\
  4 & 2<t\leq4\\
  0 & t>4
\end{cases}
$$

$$
p_C(t)=u_C(t)i_C(t)=
\begin{cases}
  0 & t\leq1\\
  4t-4 & 1<t\leq2\\
  4t-12 & 2<t\leq4\\
  0 & t>4
\end{cases}
$$

$$
w_C(t)=\frac{1}{2}Cu_C^2(t)=
\begin{cases}
  0 & t\leq1\\
  2(-t+1)^2 & 1<t\leq2\\
  2(t-3)^2 & 2<t\leq4\\
  2 & t>4
\end{cases}
$$

#### 例题 2

已知 $C=2\text{F}$，电流如图(b)，初始电压 $u(0)=0.5\text{V}$，试求 $t\geq0$ 时的电容电压。

![例题图](/static/notes/circuit3-3.png)

由图(b)可得

$$
i_C(t)=i_S(t)=
\begin{cases}
  1 & 0<t<1\\
  0 & t\geq1
\end{cases}
$$

当 $0<t<1$ 时

$$
\begin{split}
  u_C(t)&=u_C(0)+\frac{1}{C}\int_0^ti_C(\lambda)\text{d}\lambda\\
  &=u_C(0)+\frac{t}{C}\\
  &=0.5+0.5t(\text{V})
\end{split}
$$

且

$$
u_C(1)=0.5+0.5=1\text{V}
$$

当 $t\geq1$ 时

$$
\begin{split}
  u_C(t)&=u_C(1)+\frac{1}{C}\int_1^ti_C(\lambda)\text{d}\lambda\\
  &=u_C(1)\\
  &=1(\text{V})
\end{split}
$$

## 电感元件

如果一个二端元件在任一时刻，其磁链与电流之间的关系由 $\psi(t)-i(t)$ 平面上一条曲线所确定，则称此二端元件为电感元件。

- **线性电感**：特性曲线是通过 $\psi(t)-i(t)$ 坐标原点的一条直线，否则为非线性电感。
- **非时变**：特性曲线不随时间变化，否则为时变电感元件。

![线性非时变电感的特性曲线](/static/notes/circuit3-4.png)

对于线性非时变电感元件，有

$$
\psi(t)=Li(t)
$$

### 电感元件的电压电流关系

1. 电感是动态元件

电感的电压与其电流对时间的变化率成正比。假如电感的电流保持不变，则电感的电压为零。电感元件相当于短路 ($u=0$)。 

$$
u(t)=\frac{\text{d}\psi}{\text{d}t}=\frac{\text{d}(Li)}{\text{d}t}=L\frac{\text{d}i}{\text{d}t}
$$

2. 电感是惯性元件

当 $u$ 有限时，电流变化率 $\frac{\text{d}i}{\text{d}t}$ 必然有限；电流只能连续变化而不能跳变。

3. 电感是记忆元件

$$
i(t)=\frac{1}{L}\int_{-\infty}^tu(\lambda)\text{d}\lambda
$$

电感电流 $i$ 有“记忆”电压全部历史的作用，取决于电压 $(-\infty,t)$ 的值。

$$
\begin{split}
  i(t)&=\frac{1}{L}\int_{-\infty}^tu(\lambda)\text{d}\lambda\\
  &=\frac{1}{L}\int_{-\infty}^{t_0}u(\lambda)\text{d}\lambda+\frac{1}{L}\int_{t_0}^tu(\lambda)\text{d}\lambda\\
  &=i(t_0)+\frac{1}{L}\int_{t_0}^tu(\lambda)\text{d}\lambda
\end{split}
$$

4. 电感是储能元件

电压电流参考方向关联时，电感吸收功率

$$
p(t)=u(t)i(t)=i(t)L\frac{\text{d}i(t)}{\text{d}t}
$$

- 当 $p>0$ 时，电感吸收功率（吞），储存磁场能量增加
- 当 $p<0$ 时，电感发出功率（吐），电感放出存储的能量

任意时刻 $t$ 的总能量为

$$
\begin{split}
  w_L(t)&=\int_{-\infty}^tp(\xi)\text{d}\xi\\
  &=\int_{-\infty}^tu(\xi)i_L(\xi)\text{d}\xi\\
  &=L\int_{-\infty}^ti_L(\xi)\frac{\text{d}i_L}{\text{d}\xi}\text{d}\xi\\
  &=L\int_{i_L(-\infty)}^{i_L(t)}i_L(\xi)\text{d}\xi\\
  &=\frac{1}{2}L[i_L^2(t)-i_L^2(-\infty)]
\end{split}
$$

$$
\boxed{
  w_L(t)=\frac{1}{2}Li_L^2(t)
}
$$

某时刻电感的储能取决于该时刻电感的电流值，与电压值无关。电流的绝对值增大时，储能增加；减小时，储能减少。

#### 例题 1

如图所示的电路，已知 $i_1(t)=(2-e^{-t})(\text{A})$，$t>0$。求 $t>0$ 时的电流 $i(t)$。

![例题图](/static/notes/circuit3-5.png)

根据电路图列出KCL和KVL

$$
i_1(t)+i_2(t)-i(t)=0
$$

$$
u_C(t)-u_L(t)-i_1(t)R=0
$$

列出电感的VCR

$$
u_L(t)=L\frac{\text{d}i_1(t)}{\text{d}t}=e^{-t}(\text{V})
$$

则

$$
\begin{split}
  u_C(t)&=u_L(t)+i_1(t)R\\
  &=e^{-t}+2(2-e^{-t})\\
  &=4-e^{-t}(\text{V})
\end{split}
$$

列出电容的VCR

$$
i_2(t)=C\frac{\text{d}u_C(t)}{\text{d}t}=0.2e^{-t}(\text{A})
$$

由上面的KCL可得

$$
\begin{split}
  i(t)&=i_1(t)+i_2(t)\\
  &=2-e^{-t}+0.2e^{-t}\\
  &=2-0.8e^{-t}(\text{A})
\end{split}
$$

## 换路定则

换路指电路元件连接方式或参数的突然改变。

|换路前（初始状态）|换路后（初始值）|
|:---:|:---:|
|$$t=0^-$$|$$t=0^+$$|

- 若电容中电流不为无穷大，则电容电压不会跳变，即 $u_C(0^-)=u_C(0^+)$
- 若电感中电压不为无穷大，则电感电流不会跳变，即 $i_L(0^-)=i_L(0^+)$

#### 例题 1

开关闭合前电路已稳定，$u_S=10\text{V}$，$R_1=30\Omega$，$R_2=20\Omega$，$R_3=40\Omega$。求开关闭合时电容电压、电感电流的初始值。

![例题图](/static/notes/circuit3-6.png)

由于开关闭合前电路已稳定，可得

$$
i_L(0^-)=\frac{u_S}{R_1+R_2}=0.2\text{A}
$$

$$
u_C(0^-)=i_L(0^-)R_2=4\text{V}
$$

> [!tip]
> 当电路稳定时，可将**电感看作短路，电容看作开路**。

由换路定则得

$$
i_L(0^+)=i_L(0^-)=0.2\text{A}
$$

$$
u_C(0^+)=u_C(0^-)=4\text{V}
$$

#### 例题 2

电路原处于稳定状态，求 $t\geq0$ 的 $u_C(0^+)$ 和 $i(0^+)$

![例题图](/static/notes/circuit3-7.png)

由于开关闭合前电路已稳定，可得

$$
u_C(0^-)=i_S\cdot4\Omega=8\text{V}
$$

由换路定则得

$$
\boxed{
  u_C(0^+)=u_C(0^-)=8\text{V}
}
$$

当 $t=0^+$ 时，列出KVL方程

$$
\begin{split}
  u_S-i(0^+)\cdot2\Omega-u_C(0^+)&=0\\
  i(0^+)&=\frac{u_C(0^+)-u_S}{-2\Omega}\\
  i(0^+)&=1\text{A}
\end{split}
$$

故

$$
\boxed{
  i(0^+)=1\text{A}
}
$$

## 一阶电路的响应

一阶电路指由一阶微分方程描述的电路。一阶电路的响应分为：
- **零输入响应**：没有外加激励时的响应，仅由动态元件的初始状态（内激励）引起。
- **零状态响应**：初始状态为零，仅由独立电源（称为外激励或输入）引起的响应。
- **全响应**

### 三要素法

三要素法是求解一阶线性电路（即只含有一个储能元件，如电容或电感，且电路内部为线性元件）瞬态响应的一种快捷、通用的方法。

其核心公式为：

$$
f(t)=f(\infty)+[f(0^+)-f(\infty)]e^{-\frac{t}{\tau}}
$$

- **初始值** $f(0^+)$：电路在换路瞬间储能元件的响应值，利用换路定则可求得
- **终值** $f(\infty)$：电路在换路后，经过足够长时间（$t\to\infty$）达到稳态时的响应值，对稳态电路利用直流电阻电路的分析方法可求得
- **时间常数** $\tau$：反映了电路过渡过程快慢的参数，可由 $\tau=R_{\text{eq}}C$（电容电路）或 $\tau=\frac{L}{R_{\text{eq}}}$（电感电路）求得；其中，$R_{\text{eq}}$ 是从储能元件两端看进去的戴维南等效电阻

#### 例题 1（零输入）

已知 $u_C(0^-)=6\text{V}$，求 $t>0$ 的电容电压。

![例题图](/static/notes/circuit3-8.png)

1. 求初始值

由换路定则得

$$
u_C(0^+)=u_C(0^-)=6\text{V}
$$

2. 求终值

电路达到稳定后，电容可看作开路，有

$$
u_C(\infty)=0
$$

3. 求时间常数

先求戴维南等效电阻

$$
\begin{split}
  R_{\text{eq}}&=8\text{k}\Omega+\frac{3\text{k}\Omega\times6\text{k}\Omega}{3\text{k}\Omega+6\text{k}\Omega}\\
  &=10\text{k}\Omega\\
  &=1\times10^4\Omega
\end{split}
$$

使用公式求时间常数

$$
\begin{split}
  \tau&=R_{\text{eq}}C\\
  &=1\times10^4\Omega\times5\times10^{-6}\text{F}\\
  &=0.05\text{s}
\end{split}
$$

4. 代入三要素法公式

$$
\begin{split}
  u_C(t)&=u_C(\infty)+[u_C(0^+)-u_C(\infty)]e^{-\frac{t}{\tau}}\\
  &=0+(6-0)e^{-\frac{t}{0.05}}\\
  &=6e^{-20t}(\text{V})
\end{split}
$$

故

$$
\boxed{
  u_C(t)=6e^{-20t}(\text{V}) (t\geq0)
}
$$

#### 例题 2（零输入）

如图电路原已稳定，$t=0$ 时开关S打开，求零输入响应 $u_C(t)$ 和 $i_C(t)$。

![例题图](/static/notes/circuit3-9.png)

1. 求初始值

由于在开关打开前电路处于稳态，所以可以将电容看作开路。

$$
u_1=u_S\cdot\frac{3\Omega}{3\Omega+6\Omega}=6\text{V}
$$

$$
u_2=u_S\cdot\frac{18\Omega}{18\Omega+9\Omega}=12\text{V}
$$

对网孔列KVL

$$
\begin{split}
  u_2-u_C(0^-)-u_1&=0\\
  u_C(0^-)&=u_2-u_1\\
  u_C(0^-)&=6\text{V}
\end{split}
$$

由换路定则得

$$
u_C(0^+)=u_C(0^-)=6\text{V}
$$

2. 求终值

电路重新达到稳定后，电容可看作开路，有

$$
u_C(\infty)=0
$$

3. 求时间常数

先求戴维南等效电阻

$$
\begin{split}
  R_{\text{eq}}&=\frac{(6\Omega+9\Omega)(3\Omega+18\Omega)}{6\Omega+9\Omega+3\Omega+18\Omega}\\
  &=\frac{15\Omega\times21\Omega}{36\Omega}\\
  &=8.75\Omega
\end{split}
$$

使用公式求时间常数

$$
\begin{split}
  \tau&=R_{\text{eq}}C\\
  &=8.75\Omega\times0.4\text{F}\\
  &=3.5\text{s}
\end{split}
$$

4. 代入三要素法公式

$$
\begin{split}
  u_C(t)&=u_C(\infty)+[u_C(0^+)-u_C(\infty)]e^{-\frac{t}{\tau}}\\
  &=0+(6-0)e^{-\frac{t}{3.5}}\\
  &=6e^{-\frac{t}{3.5}}(\text{V})
\end{split}
$$

故

$$
\boxed{
  u_C(t)=6e^{-\frac{t}{3.5}}(\text{V})
}
$$

由电容的VCR，得

$$
\begin{split}
  i_C(t)&=C\frac{\text{d}u_C(t)}{\text{d}t}\\
  &=0.4\text{F}\times(-\frac{12}{7})e^{-\frac{t}{3.5}}\\
  &=-\frac{24}{35}e^{-\frac{t}{3.5}}(\text{A})
\end{split}
$$

故

$$
\boxed{
  i_C(t)=-\frac{24}{35}e^{-\frac{t}{3.5}}(\text{A})
}
$$

#### 例题 3（零状态）

如图所示为零状态电路，$t＝0$ 时开关闭合，求开关闭合后的 $u_C(t)$ 及 $i(t)$。

![例题图](/static/notes/circuit3-10.png)

1. 求初始值

由换路定则得

$$
u_C(0^+)=u_C(0^-)=0
$$

2. 求终值

$$
u_C(\infty)=u_S=6\text{V}
$$

3. 求时间常数

先求戴维南等效电阻

$$
R_{\text{eq}}=2\Omega+\frac{1\Omega\times2\Omega}{1\Omega+2\Omega}=\frac{8}{3}\Omega
$$

使用公式求时间常数

$$
\begin{split}
  \tau&=R_{\text{eq}}C\\
  &=\frac{8}{3}\Omega\times0.3\text{F}\\
  &=0.8\text{s}
\end{split}
$$

4. 代入三要素法公式

$$
\begin{split}
  u_C(t)&=u_C(\infty)+[u_C(0^+)-u_C(\infty)]e^{-\frac{t}{\tau}}\\
  &=6+(0-6)e^{-\frac{t}{0.8}}\\
  &=6-6e^{-\frac{t}{0.8}}(\text{V})
\end{split}
$$

故

$$
\boxed{
  u_C(t)=6-6e^{-\frac{t}{0.8}}(\text{V})
}
$$

由电容的VCR，得

$$
\begin{split}
  i_C(t)&=C\frac{\text{d}u_C(t)}{\text{d}t}\\
  &=0.3\text{F}\times7.5e^{-\frac{t}{0.8}}\\
  &=2.25e^{-\frac{t}{0.8}}(\text{A})
\end{split}
$$

对网孔列KVL

$$
\begin{split}
  i(t)\cdot2\Omega-u_C(t)-i_C(t)\cdot2\Omega&=0\\
  i(t)\cdot2\Omega&=u_C(t)+i_C(t)\cdot2\Omega\\
  i(t)\cdot2\Omega&=6-6e^{-\frac{t}{0.8}}+2.25e^{-\frac{t}{0.8}}\cdot2\Omega\\
  i(t)&=3-0.75e^{-\frac{t}{0.8}}(\text{A})
\end{split}
$$

故

$$
\boxed{
  i(t)=3-0.75e^{-\frac{t}{0.8}}(\text{A})
}
$$

#### 例题 4（全响应）

如图所示电路在 $t=0$ 时闭合，求 $t>0$ 时的 $u_C(t)$ 及 $i(t)$。

![例题图](/static/notes/circuit3-11.png)

1. 求初始值

由图可得

$$
u_C(0^+)=u_C(0^-)=u_S=10\text{V}
$$

2. 求终值

$$
u_C(\infty)=i_SR+u_S=15\text{V}
$$

3. 求时间常数

$$
\begin{split}
  \tau&=R_{\text{eq}}C\\
  &=RC\\
  &=5\Omega\times0.2\text{F}\\
  &=1\text{s}
\end{split}
$$

4. 代入三要素法公式

$$
\begin{split}
  u_C(t)&=u_C(\infty)+[u_C(0^+)-u_C(\infty)]e^{-\frac{t}{\tau}}\\
  &=15+(10-15)e^{-t}\\
  &=15-5e^{-t}(\text{V})
\end{split}
$$

故

$$
\boxed{
  u_C(t)=15-5e^{-t}(\text{V})
}
$$

由电容的VCR，得

$$
\begin{split}
  i_C(t)&=C\frac{\text{d}u_C(t)}{\text{d}t}\\
  &=0.2\text{F}\times5e^{-t}\\
  &=e^{-t}(\text{A})
\end{split}
$$

对节点列KCL

$$
\begin{split}
  -i_S+i_C(t)+i(t)&=0\\
  i(t)&=-i_C(t)+i_S\\
  i(t)&=-e^{-t}+1(\text{A})
\end{split}
$$

故

$$
\boxed{
  i(t)=-e^{-t}+1(\text{A})
}
$$

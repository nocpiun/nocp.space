---
title: "高等数学笔记 7 - 定积分"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-01-17
---

## 定积分求极限

$$S_{曲边梯形}=\lim_{n \to \infty}\sum^n_{i=1}\frac{1}{n}\cdot f(\frac{i}{n})=\int^1_0f(x)\text{d}x$$

> [!tip]
> 求 $n$ 项和的数列极限有两种方法：夹逼准则、定积分定义

**用法**：

1. 写出求和式
2. 提取因子 $\frac{1}{n}$，得 $f(\frac{i}{n})$
3. 令 $x=\frac{i}{n}$ 得 $f(x)$，使用公式求积分

#### 例题

求下列极限

$$\lim_{n \to \infty}[\frac{n}{n^2+1^2}+\frac{n}{n^2+2^2}+...+\frac{n}{n^2+n^2}]$$

将原式写成求和式

$$I=\lim_{n \to \infty}\sum^n_{i=1}\frac{n}{n^2+i^2}$$

将 $\frac{1}{n}$ 提出

$$
\begin{split}
  I&=\lim_{n \to \infty}\sum^n_{i=1}\frac{1}{n}\cdot\frac{n^2}{n^2+i^2}\\
  &=\lim_{n \to \infty}\sum^n_{i=1}\frac{1}{n}\cdot\frac{1}{1+(\frac{i}{n})^2}\\
\end{split}
$$

令 $f(x)=\frac{1}{1+x^2}$，可得

$$
\begin{split}
  I&=\lim_{n \to \infty}\sum^n_{i=1}\frac{1}{n}\cdot f(\frac{i}{n})\\
  &=\int^1_0f(x)\text{d}x\\
  &=\int^1_0\frac{1}{1+x^2}\text{d}x\\
  &=\arctan x\big|^1_0\\
  &=\boxed{\frac{\pi}{4}}
\end{split}
$$

## 变上限积分求导

$$(\int^x_af(t)\text{d}t)'=f(x)$$

$$(\int^{u(x)}_af(t)\text{d}t)'=f(u(x))\cdot u'(x)$$

#### 例题

求下列极限

$$
\begin{split}
  &\lim_{x \to 0}[\frac{\int^x_0\sqrt{1+t^2}\text{d}t}{x}+\frac{\int^x_0\sin t\text{d}t}{x^2}]\\
  &=\lim_{x \to 0}\frac{\int^x_0\sqrt{1+t^2}\text{d}t}{x}+\lim_{x \to 0}\frac{\int^x_0\sin t\text{d}t}{x^2}\\
  &=\lim_{x \to 0}\frac{\sqrt{1+x^2}}{1}+\lim_{x \to 0}\frac{\sin x}{2x}\\
  &=1+\frac{1}{2}\\
  &=\boxed{\frac{3}{2}}
\end{split}
$$

## 换元法求积分

### 偶倍奇0

积分区间对称时，常用“偶倍奇0”进行化简

若 $f(x)$ 为奇函数，则

$$\int^a_{-a}f(x)\text{d}x=0$$

若 $f(x)$ 为偶函数，则

$$\int^a_{-a}f(x)\text{d}x=2\int^a_0f(x)\text{d}x$$

### 华里士公式 (点火公式)

$$
\int^{\frac{\pi}{2}}_0\sin^nx\text{d}x=\int^{\frac{\pi}{2}}_0\cos^nx\text{d}x=
\begin{cases}
  \frac{n-1}{n}\cdot\frac{n-3}{n-2}\cdot...\cdot\frac{3}{4}\cdot\frac{1}{2}\cdot\frac{\pi}{2} & 当n为偶数\\
  \frac{n-1}{n}\cdot\frac{n-3}{n-2}\cdot...\cdot\frac{4}{5}\cdot\frac{2}{3}\cdot1 & 当n为奇数
\end{cases}
$$

#### 例题

求下列定积分

$$
\begin{split}
  &\int^1_{-1}\frac{2x^2+\sin x}{1+\sqrt{1-x^2}}\text{d}x\\
  &=\int^1_{-1}\frac{2x^2}{1+\sqrt{1-x^2}}\text{d}x+\int^1_{-1}\frac{\sin x}{1+\sqrt{1-x^2}}\text{d}x\\
  &=2\int^1_0\frac{2x^2}{1+\sqrt{1-x^2}}\text{d}x+0
\end{split}
$$

令 $x=\cos t$，可得

$$
\text{d}x=-\sin t\text{d}t
$$

代入原式，可得

$$
\begin{split}
  I&=2\int^{\frac{\pi}{2}}_0\frac{2\cos^2t\sin t}{1+\sin t}\text{d}t\\
  &=4\int^{\frac{\pi}{2}}_0\frac{(1-\sin^2t)\sin t}{1+\sin t}\text{d}t\\
  &=4\int^{\frac{\pi}{2}}_0(1-\sin t)\sin t\text{d}t\\
  &=4\int^{\frac{\pi}{2}}_0\sin t\text{d}t-4\int^{\frac{\pi}{2}}_0\sin^2t\text{d}t\\
  &=4(-\cos t)\big|^{\frac{\pi}{2}}_0-4\cdot\frac{1}{2}\cdot\frac{\pi}{2}\\
  &=\boxed{4-\pi}
\end{split}
$$

## 分部积分法求积分

当被积函数为两类不同函数相乘 (复合) 时，用分部积分法

$$\int^b_au\text{d}v=uv\big|^b_a-\int^b_av\text{d}u$$

#### 例题 1

求下列定积分

(1)

$$
\begin{split}
  &\int^2_1x\ln\sqrt{x}\text{d}x\\
  &=\frac{1}{2}\int^2_1x\ln x\text{d}x\\
  &=\frac{1}{2}[(\frac{1}{2}x^2\ln x)\big|^2_1-\int^2_1\frac{1}{2}x^2\cdot\frac{1}{x}\text{d}x]\\
  &=\frac{1}{2}(2\ln2-\int^2_1\frac{1}{2}x\text{d}x)\\
  &=\frac{1}{2}[2\ln2-(\frac{1}{4}x^2)\big|^2_1]\\
  &=\frac{1}{2}(2\ln2-\frac{3}{4})\\
  &=\boxed{\ln2-\frac{3}{8}}
\end{split}
$$

(2)

$$
\begin{split}
  &\int^1_0x\arctan x\text{d}x\\
  &=(\frac{1}{2}x^2\arctan x)\big|^1_0-\int^1_0\frac{1}{2}x^2\cdot\frac{1}{1+x^2}\text{d}x\\
  &=\frac{\pi}{8}-\frac{1}{2}\int^1_0\frac{x^2}{1+x^2}\text{d}x\\
  &=\frac{\pi}{8}-\frac{1}{2}\int^1_0\frac{x^2+1-1}{1+x^2}\text{d}x\\
  &=\frac{\pi}{8}-\frac{1}{2}\int^1_0(1-\frac{1}{1+x^2})\text{d}x\\
  &=\frac{\pi}{8}-\frac{1}{2}(1-\int^1_0\frac{1}{1+x^2}\text{d}x)\\
  &=\frac{\pi}{8}-\frac{1}{2}(1-\arctan x\big|^1_0)\\
  &=\frac{\pi}{8}-\frac{1}{2}+\frac{\pi}{8}\\
  &=\boxed{\frac{\pi}{4}-\frac{1}{2}}
\end{split}
$$

(3)

$$
\begin{split}
  &\int^{\pi}_0(x\sin x)^2\text{d}x\\
  &=(\frac{1}{3}x^3\sin^2x)\big|^{\pi}_0-\int^{\pi}_0\frac{1}{3}x^3\cdot2\sin x\cos x\text{d}x\\
  &=-\frac{1}{3}\int^{\pi}_0x^3\sin2x\text{d}x\\
  &=-\frac{1}{3}[(-\frac{1}{2}x^3\cos2x)\big|^{\pi}_0+\frac{3}{2}\int^{\pi}_0x^2\cos2x\text{d}x]\\
  &=\frac{\pi^3}{6}-\frac{1}{2}\int^{\pi}_0x^2\cos2x\text{d}x\\
  &=\frac{\pi^3}{6}-\frac{1}{2}[(\frac{1}{2}x^2\sin2x)\big|^{\pi}_0-\int^{\pi}_0x\sin2x\text{d}x]\\
  &=\frac{\pi^3}{6}+\frac{1}{2}\int^{\pi}_0x\sin2x\text{d}x\\
  &=\frac{\pi^3}{6}+\frac{1}{2}[(-\frac{1}{2}x\cos2x)\big|^{\pi}_0+\frac{1}{2}\int^{\pi}_0\cos2x\text{d}x]\\
  &=\frac{\pi^3}{6}+\frac{1}{2}(-\frac{\pi}{2}+\frac{1}{2}(\frac{1}{2}\sin2x)\big|^{\pi}_0)\\
  &=\boxed{\frac{\pi^3}{6}-\frac{\pi}{4}}
\end{split}
$$

#### 例题 2

设 $f(x)=\int^x_0\frac{\sin t}{\pi-t}\text{d}t$，求 $\int^{\pi}_0f(x)\text{d}x$

> [!tip]
> 当被积函数含有变限积分时，可以把变限部分看作 $u$，使用分部积分法解决

$$
\begin{split}
  I&=[xf(x)]\big|^{\pi}_0-\int^{\pi}_0xf'(x)\text{d}x\\
  &=\pi\int^{\pi}_0\frac{\sin x}{\pi-x}\text{d}x-\int^{\pi}_0\frac{x\sin x}{\pi-x}\text{d}x\\
  &=\int^{\pi}_0\frac{\pi\sin x-x\sin x}{\pi-x}\text{d}x\\
  &=\int^{\pi}_0\sin x\text{d}x\\
  &=(-\cos x)\big|^{\pi}_0\\
  &=\boxed{2}
\end{split}
$$

## 反常积分的敛散性

$$
\int^{+\infty}_1\frac{1}{x^p}\text{d}x=
\begin{cases}
  \frac{1}{p-1} & p>1\\
  \infty & p\leq1
\end{cases}
$$

$$
\int^1_0\frac{1}{x^p}\text{d}x=
\begin{cases}
  \infty & p\geq1\\
  \frac{1}{1-p} & p<1
\end{cases}
$$

> [!tip]
> 趋近于 $0$ 只是积分收敛的一个必要条件

在利用上述结论时，还需要搭配等价无穷小使用

#### 例题

判别下列反常积分的敛散性

(1)

$$\int^{+\infty}_1\frac{1}{x^2+x}\text{d}x$$

当 $x \to +\infty$ 时

$$x^2+x \sim x^2$$

所以原式的敛散性与如下积分相同

$$\int^{+\infty}_0\frac{1}{x^2}\text{d}x$$

因为 $\int^{+\infty}_0\frac{1}{x^2}\text{d}x$ 收敛，所以原式的积分也是收敛的

(2)

$$\int^1_0\frac{1}{x^2+x}\text{d}x$$

当 $x \to 0$ 时

$$x^2+x \sim x$$

所以原式的敛散性与如下积分相同

$$\int^{+\infty}_0\frac{1}{x}\text{d}x$$

因为 $\int^{+\infty}_0\frac{1}{x}\text{d}x$ 发散，所以原式的积分也是发散的

(3)

$$\int^1_0\frac{1}{x-\sin x}\text{d}x$$

当 $x \to 0$ 时

$$x-\sin x \sim \frac{x^3}{6}$$

所以原式的敛散性与如下积分相同

$$\int^1_0\frac{6}{x^3}\text{d}x$$

因为 $\int^1_0\frac{6}{x^3}\text{d}x$ 发散，所以原式的积分也是发散的

## 求平面图形的面积

1. X-型区域

$$S=\int^b_a[y_上(x)-y_下(x)]\text{d}x$$

2. Y-型区域

$$S=\int^b_a[x_右(y)-x_左(y)]\text{d}y$$

3. 极坐标区域

$$S=\int^{\beta}_{\alpha}[\frac{1}{2}\rho_{\beta}^2(\theta)-\frac{1}{2}\rho_{\alpha}^2(\theta)]\text{d}\theta$$

**特殊曲线方程**：
|名称|直角方程|参数方程|极坐标方程|
|---|---|---|---|
|双纽线|$(x^2+y^2)^2=a^2(x^2-y^2)$|-|$\rho^2=a^2\cos2\theta$|
|心形线|-|-|$\rho=a(1+\cos\theta)$|
|星形线|$x^{\frac{2}{3}}+y^{\frac{2}{3}}=a^{\frac{2}{3}}$|$\begin{cases}x=a\cos^3\theta\\y=a\sin^3\theta\end{cases}$|-|
|摆线|-|$\begin{cases}x=a(t-\sin t)\\y=a(1-\cos t)\end{cases}\;(0\leq t\leq2\pi)$|-|

#### 例题 1

求曲线 $\sqrt x+\sqrt y=1$ 与 $x$ 轴和 $y$ 轴所围成图形的面积

对曲线方程进行变形

$$
\begin{split}
  \sqrt x+\sqrt y&=1\\
  \sqrt y&=1-\sqrt x\\
  y&=(1-\sqrt x)^2
\end{split}
$$

由于 $\sqrt x\geq0$， $\sqrt y\geq0$，且满足 $\sqrt x+\sqrt y=1$，可知 $x,y\in[0,1]$

因此待求面积为

$$S=\int^1_0(1-\sqrt x)^2\text{d}x$$

令 $t=\sqrt x$，可得

$$\text{d}x=2\sqrt x\text{d}t=2t\text{d}t$$

代入式中，得

$$
\begin{split}
  S&=\int^1_02t(1-t)^2\text{d}t\\
  &=2\int^1_0(t-2t^2+t^3)\text{d}t\\
  &=2(\frac{1}{2}t^2-\frac{2}{3}t^3+\frac{1}{4}t^4)\big|^1_0\\
  &=2(\frac{1}{2}-\frac{2}{3}+\frac{1}{4})\\
  &=\boxed{\frac{1}{6}}
\end{split}
$$

#### 例题 2

求双纽线 $(x^2+y^2)^2=x^2-y^2$ 所围成图形的面积

易得该曲线的极坐标方程为

$$\rho^2=\cos2\theta$$

该曲线为左右对称且中心对称的图形，要求其面积，不妨先求其右上部分的面积 ($\theta\in[0,\frac{\pi}{4}]$)

对极坐标方程进行变形，可得

$$\rho=\sqrt{\cos2\theta}$$

则右上部分的面积为

$$
\begin{split}
  S_0&=\int^{\frac{\pi}{4}}_0\frac{1}{2}\rho^2\text{d}\theta\\
  &=\frac{1}{2}\int^{\frac{\pi}{4}}_0\cos2\theta\text{d}\theta\\
  &=\frac{1}{2}(\frac{1}{2}\sin2\theta)\big|^{\frac{\pi}{4}}_0\\
  &=\frac{1}{4}
\end{split}
$$

可得待求面积为

$$S=4S_0=\boxed{1}$$

## 求立体图形的体积

1. X-型图形绕 $x$ 轴旋转体

$$V=\int^b_a\pi y^2(x)\text{d}x$$

2. Y-型图形绕 $y$ 轴旋转体

$$V=\int^b_a\pi x^2(y)\text{d}y$$

3. X-型图形绕 $y$ 轴旋转体

$$V=\int^b_a2\pi x|y(x)|\text{d}x$$

4. Y-型图形绕 $x$ 轴旋转体

$$V=\int^b_a2\pi y|x(y)|\text{d}y$$

#### 例题 1

求曲线 $y=2\sin x\;(0\leq x\leq\pi)$ 分别绕 $x,y$ 轴旋转形成的立体图形体积

(i) 绕 $x$ 轴旋转

$$
\begin{split}
  V_x&=\int^{\pi}_0\pi(2\sin x)^2\text{d}x\\
  &=4\pi\int^{\pi}_0\sin^2x\text{d}x\\
  &=4\pi\int^{\pi}_0\frac{1-\cos2x}{2}\text{d}x\\
  &=4\pi(\frac{1}{2}x-\frac{1}{4}\sin2x)\big|^{\pi}_0\\
  &=\boxed{2\pi^2}
\end{split}
$$

(ii) 绕 $y$ 轴旋转

$$
\begin{split}
  V_y&=\int^{\pi}_02\pi x|2\sin x|\text{d}x\\
  &=4\pi\int^{\pi}_0x\sin x\text{d}x\\
  &=4\pi[(-x\cos x)\big|^{\pi}_0+\int^{\pi}_0\cos x\text{d}x]\\
  &=\boxed{4\pi^2}
\end{split}
$$

#### 例题 2

过原点作曲线 $y=\ln x$ 的切线，求该切线与 $y=\ln x$ 及 $x$ 轴围成图形绕直线 $x=e$ 旋转一周所得的立体图形体积

易得曲线 $y=\ln x$ 过原点的切线为 $y=\frac{1}{e}x$，切点为 $(e,1)$

则待求体积为

$$
\begin{split}
  V&=\int^1_02\pi(e-x)\cdot\frac{1}{e}x\text{d}x+\int^e_12\pi(e-x)(\frac{1}{e}x-\ln x)\text{d}x\\
  &=2\pi\int^1_0(x-\frac{1}{e}x^2)\text{d}x+2\pi\int^e_1(x-e\ln x-\frac{1}{e}x^2+x\ln x)\text{d}x\\
  &=2\pi(\frac{1}{2}x^2-\frac{1}{3e}x^3)\big|^1_0+2\pi(\frac{1}{2}x^2-\frac{1}{3e}x^3)\big|^e_1+2\pi\int^e_1(x-e)\ln x\text{d}x\\
  &=\frac{1}{3}\pi e^2+2\pi[(\frac{1}{2}x^2-ex)\ln x\big|^e_1-\int^e_1(\frac{1}{2}x-e)\text{d}x]\\
  &=\frac{1}{3}\pi e^2+2\pi[-\frac{1}{2}e^2-(\frac{1}{4}x^2-ex)\big|^e_1]\\
  &=\frac{1}{3}\pi e^2+2\pi[-\frac{1}{2}e^2-(\frac{1}{4}e^2-e^2-\frac{1}{4}+e)]\\
  &=\frac{1}{3}\pi e^2-\pi e^2+\frac{3}{2}\pi e^2+\frac{1}{2}\pi-2\pi e\\
  &=\boxed{\frac{5}{6}\pi e^2-2\pi e+\frac{\pi}{2}}
\end{split}
$$

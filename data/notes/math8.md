---
title: "高等数学笔记 8 - 微分方程"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-01-19
---

## 一阶微分方程

- **可分离变量方程**： $\frac{\text{d}y}{\text{d}x}=f(x)g(y)\xrightarrow{分离x,y}\frac{\text{d}y}{g(y)}=f(x)\text{d}x$，然后对两边进行积分
- **齐次方程**： $\frac{\text{d}y}{\text{d}x}=f(\frac{y}{x})\xrightarrow{换元}$ 令 $\frac{y}{x}=u$，则 $y=xu$， $\frac{\text{d}y}{\text{d}x}=u+x\frac{\text{d}u}{\text{d}x}$ 代入原式求解

#### 例题

求解下列方程通解

(1)

$$
\begin{split}
  y\text{d}x+(x^2-4x)\text{d}y&=0\\
  y\text{d}x&=-(x^2-4x)\text{d}y\\
  \frac{\text{d}x}{-x^2+4x}&=\frac{\text{d}y}{y}\\
  -\int\frac{1}{x(x-4)}\text{d}x&=\int\frac{1}{y}\text{d}y\\
  -\frac{1}{4}\int(\frac{1}{x-4}-\frac{1}{x})\text{d}x&=\ln|y|+C\\
  -\frac{1}{4}(\ln|x-4|-\ln|x|)+C&=\ln|y|\\
  -\frac{1}{4}[\ln(x-4)-\ln x+C]&=\ln y\\
  \ln[\frac{(x-4)C}{x}]^{-\frac{1}{4}}&=\ln y\\
  [\frac{(x-4)C}{x}]^{-\frac{1}{4}}&=y\\
  y^4(x-4)&=\frac{x}{C}
\end{split}
$$

故通解为

$$\boxed{y^4(x-4)=\frac{x}{C}\triangleq Cx}$$

(2)

$$
\begin{split}
  \frac{\text{d}y}{\text{d}x}&=\frac{x^2+y^2}{xy}\\
  \frac{\text{d}y}{\text{d}x}&=\frac{x}{y}+\frac{y}{x}
\end{split}
$$

令 $t=\frac{y}{x}$，可得

$$y=tx$$

求导得

$$\frac{\text{d}y}{\text{d}x}=t+x\frac{\text{d}t}{\text{d}x}$$

代入原方程中

$$
\begin{split}
  t+x\frac{\text{d}t}{\text{d}x}&=t+\frac{1}{t}\\
  x\frac{\text{d}t}{\text{d}x}&=\frac{1}{t}\\
  t\text{d}t&=\frac{1}{x}\text{d}x\\
  \int t\text{d}t&=\int\frac{1}{x}\text{d}x\\
  \frac{1}{2}t^2&=\ln x+C\\
  \frac{1}{2}\cdot\frac{y^2}{x^2}&=\ln x+C\\
  y^2&=2x^2\ln x+C
\end{split}
$$

通解为

$$\boxed{y^2=2x^2\ln x+C}$$

## 一阶线性微分方程

对于一阶线性微分方程 $y'+p(x)y=q(x)$，可使用公式法

$$y(x)=e^{-\int p(x)\text{d}x}\cdot[\int q(x)e^{\int p(x)\text{d}x}\text{d}x+C]$$

**证明**：

> [!tip]
> 关键在于方程左右两边同乘 $e^{\int p(x)\text{d}x}$

$$
\begin{split}
  y'+p(x)y&=q(x)\\
  e^{\int p(x)\text{d}x}\cdot y'+e^{\int p(x)\text{d}x}\cdot p(x)y&=e^{\int p(x)\text{d}x}\cdot q(x)\\
  [e^{\int p(x)\text{d}x}\cdot y]'&=e^{\int p(x)\text{d}x}\cdot q(x)\\
  e^{\int p(x)\text{d}x}\cdot y&=\int e^{\int p(x)\text{d}x}\cdot q(x)\text{d}x+C\\
  y&=e^{-\int p(x)\text{d}x}\cdot[\int q(x)e^{\int p(x)\text{d}x}\text{d}x+C]
\end{split}
$$

#### 例题

求 $xy'+y=x^2+3x+2$ 的通解

$$
\begin{split}
  xy'+y&=x^2+3x+2\\
  y'+\frac{1}{x}y&=x+3+\frac{2}{x}\\
  e^{\ln x}y'+e^{\ln x}\cdot\frac{1}{x}y&=e^{\ln x}(x+3+\frac{2}{x})\\
  (e^{\ln x}y)'&=e^{\ln x}(x+3+\frac{2}{x})\\
  xy&=\int(x^2+3x+2)\text{d}x\\
  xy&=\frac{1}{3}x^3+\frac{3}{2}x^2+2x+C\\
  y&=\frac{1}{3}x^2+\frac{3}{2}x+2+\frac{C}{x}
\end{split}
$$

通解为

$$\boxed{y=\frac{1}{3}x^2+\frac{3}{2}x+2+\frac{C}{x}}$$

## 二阶常系数齐次线性微分方程

对于二阶常系数齐次线性微分方程 $y''+py'+qy=0$，可使用特征方程法

写出特征方程 $r^2+pr+q=0$，计算该方程的 $\Delta$

- 当 $\Delta>0$ 时， $r_1\neq r_2$，通解为 $y=C_1e^{r_1x}+C_2e^{r_2x}$
- 当 $\Delta=0$ 时， $r_1=r_2=r$，通解为 $y=C_1e^{rx}+C_2e^{rx}\cdot x$
- 当 $\Delta<0$ 时， $r_{1,2}=\alpha\plusmn\beta i$，通解为 $y=(C_1\cos\beta x+C_2\sin\beta x)e^{\alpha x}$

#### 例题

求下列方程的通解

(1)

$$y''-3y'+2y=0$$

可写出特征方程

$$r^2-3r+2=0$$

可得特征方程 $\Delta>0$，求得特征方程的解为

$$r_1=1,r_2=2$$

故原方程的通解为

$$\boxed{y=C_1e^x+C_2e^{2x}}$$

(2)

$$4y''-4y'+y=0$$

可写出特征方程

$$4r^2-4r+1=0$$

可得特征方程 $\Delta=0$，求得特征方程的解为

$$r_1=r_2=\frac{1}{2}$$

故原方程的通解为

$$\boxed{y=C_1\sqrt{e^x}+C_2\sqrt{e^x}\cdot x}$$

(3)

$$y''+2y'+10y=0$$

可写出特征方程

$$r^2+2r+10=0$$

可得特征方程 $\Delta<0$，求得特征方程的解为

$$r=-1\plusmn3i$$

故原方程的通解为

$$\boxed{y=(C_1\cos3x+C_2\sin3x)e^{-x}}$$

## 二阶常系数非齐次线性微分方程

对于二阶常系数非齐次线性微分方程 $y''+py'+qy=f(x)$，其通解为

$$y=\hat y+y^*$$

其中，$\hat y$ 为该方程对应的齐次方程的通解， $y^*$ 为该方程的特解

1. 当右端函数为 $f(x)=e^{\lambda x}\cdot p_n(x)$ (指数 * 多项式)

$$
y^*=
\begin{cases}
  e^{\lambda x}\cdot\theta_n(x) & \lambda不是特征根\\
  xe^{\lambda x}\cdot\theta_n(x) & \lambda是单根\\
  x^2e^{\lambda x}\cdot\theta_n(x) & \lambda是重根\\
\end{cases}
$$

2. 当右端函数为 $f(x)=e^{\lambda x}\cdot\sin\beta x$ 或 $e^{\lambda x}\cdot\cos\beta x$ (指数 * 三角函数)

$$
y^*=
\begin{cases}
  e^{\lambda x}(A\cos\beta x+B\sin\beta x) & \lambda\plusmn\beta i不是特征根\\
  xe^{\lambda x}(A\cos\beta x+B\sin\beta x) & \lambda\plusmn\beta i是特征根\\
\end{cases}
$$

#### 例题

求下列方程的通解

$$y''+y'-6y=e^x(3x+2)$$

易得原方程的齐次方程为 $y''+y'-6y=0$，齐次方程的通解为

$$\hat y=C_1e^{-3x}+C_2e^{2x}$$

由原方程可得右端函数 $\lambda=1$，不是特征根，所以

$$y^*=e^x\theta_n(x)$$

求 $\theta_n(x)$：

1. 原方程右端函数的多项式部分是一个一次多项式，因此先设

$$\theta_n(x)=Ax+B$$

2. 将 $\theta_n(x)$ 代入 $y^*$ 中，然后将 $y^*$ 代入原方程的 $y$，把 $A,B$ 解出来

$$
\begin{split}
  (y^*)''+(y^*)'-6y^*&=e^x(3x+2)\\
  e^x(Ax+2A+B)+e^x(Ax+A+B)-6e^x(Ax+B)&=e^x(3x+2)\\
  -4Ax+3A-4B&=3x+2
\end{split}
$$

可得

$$
\begin{cases}
  -4A=3\\
  3A-4B=2
\end{cases}
\Rarr
\begin{cases}
  A=-\frac{3}{4}\\
  B=-\frac{17}{16}
\end{cases}
$$

3. 得出 $\theta_n(x)$

$$\theta_n(x)=-\frac{3}{4}x-\frac{17}{16}$$

所以

$$y^*=-e^x(\frac{3}{4}x+\frac{17}{16})$$

故原方程的通解为

$$y=\hat y+y^*=\boxed{C_1e^{-3x}+C_2e^{2x}-e^x(\frac{3}{4}x+\frac{17}{16})}$$

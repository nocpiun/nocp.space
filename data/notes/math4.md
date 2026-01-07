---
title: "高等数学笔记 4 - 导数与微分"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-01-07
---

## 可导性

若函数 $f(x)$ 在 $x=x_0$ 处可导，则同时满足：

$$\lim_{x \to x_0^+}f(x)=\lim_{x \to x_0^-}f(x)$$

$$\lim_{x \to x_0^+}f'(x)=\lim_{x \to x_0^-}f'(x)$$

#### 例题

求 $a,b$ 的值，使得 $f(x)=\begin{cases}x^2+2x+3 & x\leq 0\\ ax+b & x>0\end{cases}$ 在 $x=0$ 处连续、可导

由 $f(x)$ 的定义式可得 $f(x)$ 的导数为

$$
f'(x)=
\begin{cases}
  2x+2 & x\leq 0\\
  a & x>0
\end{cases}
$$

由 $f(x)$ 在 $x=0$ 处连续，可得

$$
\begin{split}
  \lim_{x \to 0^+}f(x)&=\lim_{x \to 0^-}f(x)\\
  \lim_{x \to 0^+}ax+b&=\lim_{x \to 0^-}x^2+2x+3\\
  b&=3
\end{split}
$$

由 $f(x)$ 在 $x=0$ 处可导，可得

$$
\begin{split}
  \lim_{x \to 0^+}f'(x)&=\lim_{x \to 0^-}f'(x)\\
  a&=\lim_{x \to 0^-}2x+2\\
  a&=2
\end{split}
$$

故

$$\boxed{a=2,b=3}$$

## 常见导数

- $(C)'=0$
- $(x^\mu)'=\mu x^{\mu-1}$
- $(\sqrt{x})'=\frac{1}{2\sqrt{x}}$, $(\frac{1}{x})'=-\frac{1}{x^2}$
- $(\sin x)'=\cos x$
- $(\cos x)'=-\sin x$
- $(\tan x)'=\sec^2 x$
- $(\cot x)'=-\csc^2 x$
- $(\sec x)'=\sec x\tan x$
- $(\csc x)'=-\csc x\cot x$


- $(a^x)'=a^x\ln a$, $(e^x)'=e^x$
- $(\log_a x)'=\frac{1}{x\ln a}$, $(\ln x)'=\frac{1}{x}$
- $(\arcsin x)'=\frac{1}{\sqrt{1-x^2}}$
- $(\arccos x)'=-\frac{1}{\sqrt{1-x^2}}$
- $(\arctan x)'=\frac{1}{1+x^2}$
- $(\arcctg x)'=-\frac{1}{1+x^2}$

## 隐函数求导

隐函数求导时，对方程两边的 $x$ 同时求导即可 (假设 $y$ 是 $x$ 的函数)

#### 例题

已知 $y=y(x)$ 由方程 $e^y+6xy+x^2-1=0$ 所确定，求 $y'(0)$， $y''(0)$

对方程两边同时求导，得

$$
\begin{align}
  y'e^y+6y+6xy'+2x&=0\\
  y''e^y+(y')^2e^y+6y'+6y'+6xy''+2&=0
\end{align}
$$

当 $x=0$ 时，有

$$e^y-1=0$$

$$
\begin{equation}
  y=0
\end{equation}
$$

将 $x=0$ 与 $(3)$ 代入 $(1)$ 中，得

$$
\begin{equation}
  \boxed{y'(0)=0}
\end{equation}
$$

将 $x=0$、 $(3)$ 与 $(4)$ 代入 $(2)$ 中，得

$$\boxed{y''(0)=-2}$$

## 参数方程求导

对于参数方程 $\begin{cases}x=x(t)\\ y=y(t)\end{cases}$，其导数为

$$\frac{\text{d}y}{\text{d}x}=\frac{\frac{\text{d}y}{\text{d}t}}{\frac{\text{d}x}{\text{d}t}}=\frac{y'_t}{x'_t}$$

#### 例题

设 $y=y(x)$ 由 $\begin{cases}x=\arctan t\\2y-ty^2+e^t=5\end{cases}$ 确定，求该函数的导数

由参数方程可得

$$
\begin{equation}
  x'_t=\frac{1}{1+t^2}
\end{equation}
$$

$$
\begin{align}
  2y-ty^2+e^t&=5\\
  2y'_t-y^2-2tyy'_t+e^t&=0\\
  y'_t&=\frac{y^2-e^t}{2(1-ty)}
\end{align}
$$

将 $(5)$， $(8)$ 代入，得

$$\frac{\text{d}y}{\text{d}x}=\frac{y'_t}{x'_t}=\boxed{\frac{(y^2-e^t)(1+t^2)}{2(1-ty)}}$$

## 对数法求导

> [!tip]
> 当函数为幂指函数、连乘、连除、开方、乘方函数时，可以先对两边取对数再进行求导

#### 例题 1

求函数 $y=\frac{\sqrt{x+2}\cdot(3-x)^4}{(x+1)^5}$ 的导数

对方程两边取对数，得

$$
\begin{split}
  \ln y&=\ln\frac{\sqrt{x+2}\cdot(3-x)^4}{(x+1)^5}\\
  \ln y&=\ln\sqrt{x+2}+\ln(3-x)^4-\ln(x+1)^5\\
  \ln y&=\frac{1}{2}\ln(x+2)+4\ln(3-x)-5\ln(x+1)\\
  \frac{y'}{y}&=\frac{1}{2(x+2)}-\frac{4}{3-x}-\frac{5}{x+1}\\
  y'&=\boxed{[\frac{1}{2(x+2)}-\frac{4}{3-x}-\frac{5}{x+1}]\cdot\frac{\sqrt{x+2}\cdot(3-x)^4}{(x+1)^5}}\\
\end{split}
$$

#### 例题 2

求函数 $y=(\frac{x}{1+x})^x$ 的导数

对方程两边取对数，得

$$
\begin{split}
  \ln y&=\ln(\frac{x}{1+x})^x\\
  \ln y&=x\ln\frac{x}{1+x}\\
  \ln y&=x(\ln x-\ln(1+x))\\
  \ln y&=x\ln x-x\ln(1+x)\\
  \frac{y'}{y}&=\ln x+1-\ln(1+x)-\frac{x}{1+x}\\
  \frac{y'}{y}&=\ln\frac{x}{1+x}+\frac{1}{1+x}\\
  y'&=\boxed{[\ln\frac{x}{1+x}+\frac{1}{1+x}]\cdot(\frac{x}{1+x})^x}\\
\end{split}
$$

## 微分

对于函数 $y=y(x)$，可以得到其微分

$$\text{d}y=y'(x)\cdot\text{d}x$$

$$\text{d}y\big|_{x=x_0}=y'(x_0)\cdot\text{d}x$$

#### 例题

设函数 $y=y(x)$ 由方程 $2^{xy}=x+y$ 所确定，求：(1) $\text{d}y$；(2) $\text{d}y\big|_{x=0}$

(1)

$$
\begin{split}
  2^{xy}&=x+y\\
  \ln2^{xy}&=\ln(x+y)\\
  xy\ln2&=\ln(x+y)\\
  y\ln2+xy'\ln2&=\frac{1+y'}{x+y}\\
  y\ln2+xy'\ln2&=\frac{1+y'}{2^{xy}}\\
  2^{xy}y\ln2+2^{xy}xy'\ln2&=1+y'\\
  y'(2^{xy}x\ln2-1)&=1-2^{xy}y\ln2\\
  y'&=\frac{1-2^{xy}y\ln2}{2^{xy}x\ln2-1}
\end{split}
$$

故

$$\text{d}y=y'\cdot\text{d}x=\boxed{\frac{1-2^{xy}y\ln2}{2^{xy}x\ln2-1}\cdot\text{d}x}$$

(2)

将 $x=0$ 代入原方程可得

$$
\begin{equation}
  y=1
\end{equation}
$$

将 $x=0$， $(9)$ 代入 $y'$ 的表达式中得

$$
\begin{equation}
  y'\big|_{x=0}=y\ln2-1=\ln2-1
\end{equation}
$$

故

$$\text{d}y\big|_{x=0}=y'\big|_{x=0}\cdot\text{d}x=\boxed{(\ln2-1)\cdot\text{d}x}$$

## 莱布尼茨法求高阶导数

$$(uv)^{(n)}=\sum_{k=0}^{n}\text{C}_{n}^{k}u^{(n-k)}v^{(k)}$$

> [!tip]
> 使用莱布尼茨公式时，一般把幂指函数 $x^\mu$ 看成 $v$

#### 例题

设 $f(x)=x^2e^{2x}$，求 $f^{(100)}(0)$

使用莱布尼茨公式求导

$$
\begin{split}
  f^{(100)}(x)&=(x^2e^{2x})^{(100)}\\
  &=x^2\cdot2^{100}e^{2x}+\text{C}_{100}^1 2x\cdot2^{99}e^{2x}+\text{C}_{100}^2 2\cdot2^{98}e^{2x}\\
  &=2^{100}x^2e^{2x}+100\cdot2^{100}xe^{2x}+4950\cdot2^{99}e^{2x}
\end{split}
$$

故

$$f^{(100)}(0)=\boxed{4950\cdot2^{99}}$$

---
title: "高等数学笔记 6 - 不定积分"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-01-10
---

## 直接积分表

<div class="grid-2">

$$\int x^a\text{d}x=\frac{x^{a+1}}{a+1}+C (a\neq-1)$$

$$\int\frac{1}{x}\text{d}x=\ln|x|+C$$

$$\int a^x\text{d}x=\frac{a^x}{\ln a}+C$$

$$\int\sin x\text{d}x=-\cos x+C$$

$$\int\cos x\text{d}x=\sin x+C$$

$$\int\tan x\text{d}x=-\ln|\cos x|+C$$

$$\int\cot x\text{d}x=\ln|\sin x|+C$$

$$\int\sec x\text{d}x=\ln|\sec x+\tan x|+C$$

$$\int\csc x\text{d}x=\ln|\csc x-\cot x|+C$$

$$\int\sec^2x\text{d}x=\tan x+C$$

$$\int\csc^2x\text{d}x=-\cot x+C$$

$$\int\frac{\text{d}x}{1+x^2}=\arctan x+C$$

$$\int\frac{\text{d}x}{x^2+a^2}=\frac{1}{a}\arctan\frac{x}{a}+C$$

$$\int\frac{\text{d}x}{x^2-a^2}=\frac{1}{2a}\ln|\frac{a-x}{a+x}|+C$$

$$\int\frac{\text{d}x}{a^2-x^2}=\frac{1}{2a}\ln|\frac{a+x}{a-x}|+C$$

$$\int\frac{\text{d}x}{\sqrt{1-x^2}}=\arcsin x+C$$

$$\int\frac{\text{d}x}{\sqrt{a^2-x^2}}=\arcsin\frac{x}{a}+C$$

$$\int\frac{\text{d}x}{\sqrt{x^2\plusmn a^2}}=\ln|x+\sqrt{x^2\plusmn a^2}|+C$$

</div>

## 凑微分法 (第一类换元法)

#### 例题 1

求下列不定积分

(1)

$$\int x^2\sqrt{x^3+1}\cdot\text{d}x$$

令 $t=x^3+1$

则有

$$\text{d}x=\frac{\text{d}t}{3x^2}$$

代入原式可得

$$
\begin{split}
  I&=\int x^2\sqrt t\cdot\frac{\text{d}t}{3x^2}\\
  &=\frac{1}{3}\int\sqrt t\cdot\text{d}t\\
  &=\frac{2}{9}t^{\frac{3}{2}}+C\\
  &=\boxed{\frac{2}{9}(x^3+1)^{\frac{3}{2}}+C}
\end{split}
$$

(2)

$$\int\frac{(\ln x)^2}{x}\text{d}x$$

令 $t=\ln x$

则有

$$\text{d}x=x\text{d}t$$

代入原式可得

$$
\begin{split}
  I&=\int\frac{t^2}{x}\cdot x\text{d}t\\
  &=\int t^2\text{d}t\\
  &=\frac{t^3}{3}+C\\
  &=\boxed{\frac{(\ln x)^3}{3}+C}
\end{split}
$$

(3)

$$\int\frac{1}{e^x+1}\text{d}x$$

令 $t=e^x+1$

则有

$$\text{d}x=\frac{\text{d}t}{e^x}=\frac{\text{d}t}{t-1}$$

代入原式可得

$$
\begin{split}
  I&=\int\frac{1}{t(t-1)}\text{d}t\\
  &=\int\frac{1}{t-1}\text{d}t-\int\frac{1}{t}\text{d}t\\
  &=\ln|t-1|-\ln|t|+C\\
  &=\boxed{x-\ln(e^x+1)+C}
\end{split}
$$

### 三角函数

![三角函数的“六边形”](/static/notes/math6-1.png)

- **三个倒数关系**： $\sin x\csc x=1$， $\tan x\cot x=1$， $\cos x\sec x=1$
- **三个平方关系**： $\sin^2x+\cos^2x=1$， $\tan^2x+1=\sec^2x$， $\cot^2x+1=\csc^2x$

$$\int f(\tan x)\cdot\sec^2x\text{d}x=\int f(\tan x)\text{d}\tan x$$

#### 例题 2

求下列不定积分

(1)

$$
\begin{split}
  &\int\tan^3x\text{d}x\\
  &=\int\tan^2x\cdot\tan x\text{d}x\\
  &=\int(\sec^2x-1)\tan x\text{d}x\\
  &=\int\tan x\sec^2x\text{d}x-\int\tan x\text{d}x\\
  &=\int\tan x\sec^2x\text{d}x+\ln|\cos x|+C
\end{split}
$$

令 $t=\tan x$

则有

$$\text{d}x=\frac{\text{d}t}{\sec^2x}$$

代入原式可得

$$
\begin{split}
  I&=\int t\text{d}t+\ln|\cos x|+C\\
  &=\frac{1}{2}t^2+\ln|\cos x|+C\\
  &=\boxed{\frac{1}{2}\tan^2x+\ln|\cos x|+C}
\end{split}
$$

(2)

$$
\begin{split}
  &\int\frac{1}{\sin^2x+2\cos^2x}\text{d}x\\
  &=\int\frac{\frac{1}{\cos^2x}}{\tan^2x+2}\text{d}x\\
  &=\int\frac{\sec^2x}{\tan^2x+2}\text{d}x
\end{split}
$$

令 $t=\tan x$

则有

$$\text{d}x=\frac{\text{d}t}{\sec^2x}$$

代入原式可得

$$
\begin{split}
  I&=\int\frac{1}{t^2+2}\text{d}t\\
  &=\frac{\sqrt2}{2}\int\frac{1}{\sqrt2}\cdot\frac{1}{\frac{t^2}{2}+1}\text{d}t\\
  &=\frac{\sqrt2}{2}\arctan\frac{t}{\sqrt2}+C\\
  &=\boxed{\frac{\sqrt2}{2}\arctan\frac{\sqrt2\tan x}{2}+C}
\end{split}
$$

## 第二类换元法

- 若 $\int f(x)\text{d}x$ 中含有 $\sqrt{a^2-x^2}$，则可令 $x=a\sin t$
- 若 $\int f(x)\text{d}x$ 中含有 $\sqrt{a^2+x^2}$，则可令 $x=a\tan t$
- 若 $\int f(x)\text{d}x$ 中含有 $\sqrt{ax+b}$，则可令 $t=\sqrt{ax+b}$
- 若 $\int f(x)\text{d}x$ 中含有 $\sqrt[m]x$ 和 $\sqrt[n]x$，则可令 $t=\sqrt[p]x$，其中 $p$ 是 $m,n$ 的最小公倍数

#### 例题

求下列不定积分

(1)

$$
\begin{split}
  &\int\frac{1}{(1-x)\sqrt{1-x^2}}\text{d}x\\
  &=\int\frac{\sqrt{1-x^2}}{(1-x)(1-x^2)}\text{d}x
\end{split}
$$

令 $x=\sin t$

则有

$$t=\arcsin x$$

$$\text{d}x=\cos t\text{d}t$$

代入原式可得

$$
\begin{split}
  I&=\int\frac{\cos t}{(1-\sin t)\cos^2t}\cdot\cos t\text{d}t\\
  &=\int\frac{1}{1-\sin t}\text{d}t\\
  &=\int\frac{1+\sin t}{1-\sin^2t}\text{d}t\\
  &=\int\frac{1+\sin t}{\cos^2t}\text{d}t\\
  &=\int\sec^2t\text{d}t+\int\tan t\sec t\text{d}t\\
  &=\tan t+\sec t+C\\
  &=\boxed{\tan(\arcsin x)+\sec(\arcsin x)+C}
\end{split}
$$

(2)

$$\int\frac{1}{x^2\sqrt{x^2+1}}\text{d}x$$

令 $x=\tan t$

则有

$$t=\arctan x$$

$$\text{d}x=\sec^2t\text{d}t$$

代入原式可得

$$
\begin{split}
  I&=\int\frac{1}{\tan^2t\sec t}\sec^2t\text{d}t\\
  &=\int\frac{\sec t}{\tan^2t}\text{d}t\\
  &=\int\frac{\frac{1}{\cos t}}{\frac{\sin^2t}{\cos^2t}}\text{d}t\\
  &=\int\frac{\cos t}{\sin^2t}\text{d}t
\end{split}
$$

令 $m=\sin t$

则有

$$\text{d}t=\frac{\text{d}m}{\cos t}$$

代入原式可得

$$
\begin{split}
  I&=\int\frac{\cos t}{m^2}\cdot\frac{\text{d}m}{\cos t}\\
  &=\int\frac{1}{m^2}\text{d}m\\
  &=-\frac{1}{m}+C\\
  &=-\frac{1}{\sin t}+C\\
  &=\boxed{-\frac{1}{\sin(\arctan x)}+C}
\end{split}
$$

(3)

$$\int\frac{1}{\sqrt x+\sqrt[3]x}\text{d}x$$

令 $t=\sqrt[6]x$

则有

$$
\begin{split}
  \frac{\text{d}t}{\text{d}x}&=\frac{1}{6}x^{-\frac{5}{6}}\\
  \frac{\text{d}t}{\text{d}x}&=\frac{1}{6x^{\frac{5}{6}}}\\
  \text{d}x&=6x^{\frac{5}{6}}\text{d}t\\
  \text{d}x&=6t^5\text{d}t
\end{split}
$$

代入原式可得

$$
\begin{split}
  I&=\int\frac{6t^5}{t^3+t^2}\text{d}t\\
  &=6\int\frac{t^3}{t+1}\text{d}t\\
  &=6\int\frac{t^3+1-1}{t+1}\text{d}t\\
  &=6\int\frac{(t+1)(t^2-t+1)-1}{t+1}\text{d}t\\
  &=6\int(t^2-t+1-\frac{1}{t+1})\text{d}t\\
  &=6(\int t^2\text{d}t-\int t\text{d}t+t-\int\frac{1}{t+1}\text{d}t)\\
  &=6(\frac{t^3}{3}-\frac{t^2}{2}+t-\ln|t+1|)+C\\
  &=2t^3-3t^2+6t-6\ln|t+1|+C\\
  &=\boxed{2\sqrt x-3\sqrt[3]x+6\sqrt[6]x-6\ln(\sqrt[6]x+1)+C}
\end{split}
$$

## 分部积分法

当被积函数为两类不同函数相乘 (复合) 时，用分部积分法

$$\int u\text{d}v=uv-\int v\text{d}u$$

#### 例题

求下列不定积分

(1)

$$
\begin{split}
  &\int x^2e^x\text{d}x\\
  &=x^2e^x-\int 2xe^x\text{d}x\\
  &=x^2e^x-(2xe^x-\int 2e^x\text{d}x)\\
  &=\boxed{x^2e^x-2xe^x+2e^x+C}
\end{split}
$$

(2)

$$
\begin{split}
  &\int x^2\cos x\text{d}x\\
  &=x^2\sin x-\int 2x\sin x\text{d}x\\
  &=x^2\sin x-(-2x\cos x-\int(-2)\cos x\text{d}x)\\
  &=x^2\sin x+2x\cos x-2\int\cos x\text{d}x\\
  &=\boxed{x^2\sin x+2x\cos x-2\sin x+C}
\end{split}
$$

(3)

$$
\begin{split}
  &\int e^{2x}\cos x\text{d}x\\
  &=e^{2x}\sin x-2\int e^{2x}\sin x\text{d}x\\
  &=e^{2x}\sin x-2(-e^{2x}\cos x-\int2e^{2x}\cdot(-\cos x)\text{d}x)\\
  &=e^{2x}\sin x-2(-e^{2x}\cos x+2\int e^{2x}\cos x\text{d}x)\\
\end{split}
$$

可得

$$
\begin{split}
  I&=e^{2x}\sin x-2(-e^{2x}\cos x+2I)\\
  I&=e^{2x}\sin x+2e^{2x}\cos x-4I\\
  5I&=e^{2x}\sin x+2e^{2x}\cos x\\
  I&=\boxed{\frac{1}{5}(e^{2x}\sin x+2e^{2x}\cos x)+C}
\end{split}
$$

## 分式函数积分

对于不定积分 $\int\frac{P(x)}{Q(x)}\text{d}x$

- 若分母 $Q(x)$ 可因式分解 ($\Delta>0$) 时，使用裂项法
- 若分母 $Q(x)$ 不可因式分解 ($\Delta<0$) 时，使用配方法 + $\int\frac{1}{a^2+x^2}\text{d}x$ 或 $\int\frac{Q'(x)}{Q(x)}\text{d}x$

#### 例题

求下列不定积分

(1)

$$
\begin{split}
  &\int\frac{1}{x^2-x-12}\text{d}x\\
  &=\int\frac{1}{(x-4)(x+3)}\text{d}x\\
  &=\frac{1}{7}\int(\frac{1}{x-4}-\frac{1}{x+3})\text{d}x\\
  &=\frac{1}{7}(\int\frac{1}{x-4}\text{d}x-\int\frac{1}{x+3}\text{d}x)\\
  &=\boxed{\frac{1}{7}\ln|x-4|-\frac{1}{7}\ln|x+3|+C}
\end{split}
$$

(2)

$$
\begin{split}
  &\int\frac{5x-1}{x^2-x-2}\text{d}x\\
  &=\int\frac{5x-1}{(x-2)(x+1)}\text{d}x\\
  &=6\int\frac{5x-1}{(2x-4)(3x+3)}\text{d}x\\
  &=6\int(\frac{1}{2x-4}+\frac{1}{3x+3})\text{d}x\\
  &=6(\frac{1}{2}\int\frac{1}{x-2}\text{d}x+\frac{1}{3}\int\frac{1}{x+1}\text{d}x)\\
  &=6(\frac{1}{2}\ln|x-2|+\frac{1}{3}\ln|x+1|)+C\\
  &=\boxed{3\ln|x-2|+2\ln|x+1|+C}
\end{split}
$$

(3)

$$
\begin{split}
  &\int\frac{1}{x^2+x+1}\text{d}x\\
  &=\int\frac{1}{x^2+x+\frac{1}{4}+\frac{3}{4}}\text{d}x\\
  &=\int\frac{1}{(x+\frac{1}{2})^2+\frac{3}{4}}\text{d}x\\
  &=\boxed{\frac{2\sqrt{3}}{3}\arctan\frac{2\sqrt3(x+\frac{1}{2})}{3}+C}
\end{split}
$$

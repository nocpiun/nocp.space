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

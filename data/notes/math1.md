---
title: "高等数学笔记 1 - 极限"
author: NriotHrreion
tags:
- "期末"
- "高数"
date: 2026-01-04
---

极限的7种题型：

- $\frac{0}{0}$ 型
- $\frac{\infty}{\infty}$ 型
- $0\cdot\infty$ 型
- $\infty-\infty$ 型
- $1^\infty$ 型
- $0^0$ 型
- $\infty^0$ 型

## $\frac{0}{0}$ 型

### 洛必达法则

$$\lim \frac{f(x)}{g(x)}=\lim \frac{f'(x)}{g'(x)}=\lim \frac{f''(x)}{g''(x)}=...$$

### 等价无穷小 (仅乘除可用)

当 $x \to 0$ 时，
- $x \sim \sin x \sim \arcsin x \sim \tan x \sim \arctan x \sim e^x-1 \sim \ln(x+1)$
- $1-\cos x \sim \frac{1}{2}x^2$
- $(x+1)^k-1 \sim kx$
- $x-\sin x \sim \frac{x^3}{6}$

## $\frac{\infty}{\infty}$ 型

### 洛必达法则

同上

### 抹去法 ("抓大头")

当 $x \to +\infty$ 时， $x \ll x^2 \ll x^3 \ll ...$， $\ln{x} \ll x^a \ll a^x$

**用法**：当 $x \to +\infty$ 时， $x^2+x \sim x^2$，$e^x+x^2 \sim e^x$

## $0\cdot\infty$ 型

将原式化为 $\frac{\infty}{\frac{1}{0}}$ 或 $\frac{0}{\frac{1}{\infty}}$ ，再进行洛必达 (同上)

## $\infty-\infty$ 型

### 倒代换

令 $t=\frac{1}{x}$

#### 例题

$$
\begin{split}
  &\lim_{x \to \infty}[x-x^2\ln(1+\frac{1}{x})]\\
  \xlongequal{t=\frac{1}{x}}&\lim_{t \to 0}[\frac{1}{t}-\frac{\ln(1+t)}{t^2}]\\
  &=\lim_{t \to 0}\frac{t-\ln(1+t)}{t^2}\\
  &=\lim_{t \to 0}\frac{1-\frac{1}{1+t}}{2t}\\
  &=\lim_{t \to 0}\frac{t}{2t(1+t)}\\
  &=\lim_{t \to 0}\frac{1}{2(1+t)}\\
  &=\boxed{\frac{1}{2}}
\end{split}
$$

## $1^\infty$ 型

### 万能公式法

$$\lim f(x)^{g(x)}=e^{\lim g(x)\cdot(f(x)-1)}$$

**推导**：

当 $f(x) \to 1$， $g(x) \to \infty$

$$
\begin{split}
  &\lim f(x)^{g(x)}\\
  &=\lim e^{\ln{f(x)^{g(x)}}}\\
  &=\lim e^{g(x)\ln{f(x)}}\\
  &=e^{\lim g(x)\ln{f(x)}}
\end{split}
$$

因为 $f(x)-1 \to 0$，使用等价无穷小 $\ln(x+1) \sim x$

$$I=e^{\lim g(x)\cdot(f(x)-1)}$$

#### 例题

$$\lim_{x \to 0}[2-\frac{\ln(1+x)}{x}]^{\frac{1}{x}}$$

由于 $\lim_{x \to 0}[2-\frac{\ln(1+x)}{x}]=1$，可用万能公式法

$$I=e^{\lim_{x \to 0}\frac{1}{x}\cdot(1-\frac{\ln(1+x)}{x})}$$

令 $t=\lim_{x \to 0}\frac{1}{x}\cdot(1-\frac{\ln(1+x)}{x})$，则 $I=e^t$

$$
\begin{split}
  t&=\lim_{x \to 0}\frac{1}{x}-\frac{\ln(1+x)}{x^2}\\
  &=\lim_{x \to 0}\frac{x-\ln(1+x)}{x^2}\\
  &=\lim_{x \to 0}\frac{1-\frac{1}{1+x}}{2x}\\
  &=\lim_{x \to 0}\frac{1}{2(1+x)}\\
  &=\frac{1}{2}
\end{split}
$$

可得

$$\boxed{I=\sqrt{e}}$$

## $0^0$、 $\infty^0$ 型

### 抬底法

$$\lim f(x)^{g(x)}=e^{\lim g(x)\ln{f(x)}}$$

**推导**：同上

#### 例题 1

$$\lim_{x \to 0^+}x^{\sin x}$$

$$=e^{\lim_{x \to 0^+}\sin x\ln x}$$

令 $t=\lim_{x \to 0^+}\sin x\ln x$，则 $I=e^t$

使用等价无穷小 $\sin x \sim x$

$$
\begin{split}
  t&=\lim_{x \to 0^+}x\ln x\\
  &=\lim_{x \to 0^+}\frac{\ln x}{\frac{1}{x}}\\
  &=\lim_{x \to 0^+}\frac{\frac{1}{x}}{-\frac{1}{x^2}}\\
  &=0
\end{split}
$$

可得

$$\boxed{I=e^0=1}$$

#### 例题 2

$$
\begin{split}
  &\lim_{x \to 0^+}(\frac{1}{x})^{\tan x}\\
  &=e^{\lim_{x \to 0^+}\tan x\ln{\frac{1}{x}}}\\
  &=e^{-\lim_{x \to 0^+}\tan x\ln{x}}
\end{split}
$$

令 $t=\lim_{x \to 0^+}\tan x\ln{x}$，则 $I=e^{-t}$

使用等价无穷小 $\tan x \sim x$

$$t=\lim_{x \to 0^+}x\ln{x}$$

同上，可得

$$t=0$$

可得

$$\boxed{I=e^{-0}=1}$$

## 重要极限

$$\lim_{x \to +\infty}(1+\frac{1}{x})^x=e$$

$$\lim_{x \to 0}\frac{\sin x}{x}=1$$

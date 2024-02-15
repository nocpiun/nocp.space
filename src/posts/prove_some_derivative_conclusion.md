---
title: "证明一些导数结论"
author: NriotHrreion
tags:
- "数学"
excerpt: "尝试证明一些常用函数的导数"
date: 2024-02-15
---

## $e^x$的导数

令

$$f(x)=e^x$$

则有

$$f'(x)=\lim_{\Delta x \to 0} \frac{f(x+\Delta x)-f(x)}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{e^{x+\Delta x}-e^x}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{e^x(e^{\Delta x}-1)}{\Delta x}$$

$$=e^x \lim_{\Delta x \to 0} \frac{e^{\Delta x}-1}{\Delta x}$$

此时，设$t=e^{\Delta x}-1$，则$\Delta x=\ln(t+1)$

当$\Delta x \to 0$时，$t \to 0$

那么，原式可化为

$$e^x \lim_{t \to 0} \frac{t}{\ln(t+1)}$$

$$=e^x \lim_{t \to 0} \frac{1}{\frac{1}{t} \ln(t+1)}$$

$$=e^x \lim_{t \to 0} \frac{1}{\ln(t+1)^{\frac{1}{t}}}$$

因为

$$e=\lim_{t \to 0} (t+1)^{\frac{1}{t}}$$

所以，原式可化为

$$e^x \frac{1}{\ln{e}}$$

$$=e^x$$

故

$$f'(x)=e^x$$

## $\ln{x}$的导数

令

$$f(x)=\ln{x}$$

则有

$$f'(x)=\lim_{\Delta x \to 0} \frac{f(x+\Delta x)-f(x)}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\ln(x+\Delta x)-\ln{x}}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\ln{\frac{x+\Delta x}{x}}}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\ln(1+\frac{\Delta x}{x})}{\Delta x}$$

此时，设$t=\frac{\Delta x}{x}$，则$\Delta x=xt$

当$\Delta x \to 0$时，$t \to 0$

那么，原式可化为

$$\lim_{\Delta x \to 0} \frac{\ln(1+t)}{xt}$$

$$=\frac{1}{x} \lim_{t \to 0} \frac{\ln(1+t)}{t}$$

$$=\frac{1}{x} \lim_{t \to 0} \ln(1+t)^{\frac{1}{t}}$$

因为

$$e=\lim_{t \to 0} (t+1)^{\frac{1}{t}}$$

所以，原式可化为

$$\frac{1}{x} \ln{e}$$

$$=\frac{1}{x}$$

故

$$f'(x)=\frac{1}{x}$$

## $\log_{a}{x}$的导数 ($a>0$)

令

$$f(x)=\log_{a}{x}, a \in (0,+\infty)$$

则有

$$f'(x)=\lim_{\Delta x \to 0} \frac{f(x+\Delta x)-f(x)}{\Delta x}$$

$$=\lim\_{\Delta x \to 0} \frac{\log\_{a}(x+\Delta x)-\log\_{a}{x}}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\ln(x+\Delta x)-\ln{x}}{\Delta x\ln{a}}$$

$$=\lim_{\Delta x \to 0} \frac{\ln\frac{x+\Delta x}{x}}{\Delta x\ln{a}}$$

$$=\lim_{\Delta x \to 0} \frac{\ln(1+\frac{\Delta x}{x})}{\Delta x\ln{a}}$$

与$\ln{x}$导数推导过程同理，可得

$$f'(x)=\frac{1}{x\ln{a}}$$

$i$ 当$a=e$时，可得$\ln{x}$的导数

$$\frac{1}{x}$$

$ii$ 当$a=10$时，可得$\lg{x}$的导数

$$\frac{1}{x\ln{10}}$$

## $\sin{x}$的导数

令

$$f(x)=\sin{x}$$

则有

$$f'(x)=\lim_{\Delta x \to 0} \frac{f(x+\Delta x)-f(x)}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\sin(x+\Delta x)-\sin{x}}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\sin{x}\cos{\Delta x}+\cos{x}\sin{\Delta x}-\sin{x}}{\Delta x}$$

由于当$\Delta x \to 0$时，$\cos{\Delta x} \to 1$

故可将原式化为

$$\lim_{\Delta x \to 0} \frac{\cos{x}\sin{\Delta x}}{\Delta x}$$

又因为当$\Delta x \to 0$时，有

$$\sin{\Delta x} \approx \Delta x$$

所以，原式可化为

$$\lim_{\Delta x \to 0} \frac{\cos{x} \Delta x}{\Delta x}$$

$$=\cos{x}$$

故

$$f'(x)=\cos{x}$$

## $\cos{x}$的导数

令

$$f(x)=\cos{x}$$

则有

$$f'(x)=\lim_{\Delta x \to 0} \frac{f(x+\Delta x)-f(x)}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\cos(x+\Delta x)-\cos{x}}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\cos{x}\cos{\Delta x}-\sin{x}\sin{\Delta x}-\cos{x}}{\Delta x}$$

由于当$\Delta x \to 0$时，$\cos{\Delta x} \to 1$

故可将原式化为

$$\lim_{\Delta x \to 0} \frac{-\sin{x}\sin{\Delta x}}{\Delta x}$$

又因为当$\Delta x \to 0$时，有

$$\sin{\Delta x} \approx \Delta x$$

所以，原式可化为

$$\lim_{\Delta x \to 0} \frac{-\sin{x}\Delta x}{\Delta x}$$

$$=-\sin{x}$$

故

$$f'(x)=-\sin{x}$$

## $\tan{x}$的导数

令

$$f(x)=\tan{x}$$

则有

$$f'(x)=\lim_{\Delta x \to 0} \frac{f(x+\Delta x)-f(x)}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\tan(x+\Delta x)-\tan{x}}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\frac{\sin(x+\Delta x)}{\cos(x+\Delta x)}-\frac{\sin{x}}{\cos{x}}}{\Delta x}$$

$$=\lim_{\Delta x \to 0} \frac{\sin(x+\Delta x)\cos{x}-\cos(x+\Delta x)\sin{x}}{\Delta x\cos(x+\Delta x)\cos{x}}$$

$$=\frac{1}{\cos{x}} \lim_{\Delta x \to 0} \frac{\sin(x+\Delta x-x)}{\Delta x\cos(x+\Delta x)}$$

$$=\frac{1}{\cos{x}} \lim_{\Delta x \to 0} \frac{\sin{\Delta x}}{\Delta x\cos(x+\Delta x)}$$

因为当$\Delta x \to 0$时，有

$$\sin{\Delta x} \approx \Delta x$$

所以，原式可化为

$$=\frac{1}{\cos{x}} \lim_{\Delta x \to 0} \frac{1}{\cos(x+\Delta x)}$$

$$=\frac{1}{\cos^2{x}}$$

故

$$f'(x)=\frac{1}{\cos^2{x}}$$

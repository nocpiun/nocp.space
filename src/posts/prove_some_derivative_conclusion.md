---
title: "证明一些导数结论"
author: NriotHrreion
tags:
- "数学"
excerpt: "尝试证明一下 e^x 和 ln(x) 的导数"
date: 2024-02-14
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

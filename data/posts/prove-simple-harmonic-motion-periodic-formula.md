---
title: "证明简谐运动的周期公式"
author: NriotHrreion
tags:
- "数学"
- "物理"
excerpt: "简谐运动的周期公式经常在用，但从来没有证明过，今天尝试证明一下"
date: 2025-03-13
---

## 简谐运动的周期公式

我们知道，一个做简谐运动的振子，其周期符合公式

$$T=2\pi\sqrt{\frac{m}{k}}$$

- $m$ 为该振子的质量
- $k$ 为该振子的刚度

## 证明

水平地面上放有一根刚度为 $k$ 的弹簧，其一端固定在竖直墙面上，另一端系有一个质量为 $m$ 的振子，此时振子位于其平衡位置。将振子拉至距离平衡位置 $A$ （振幅）处并松手，则振子开始做简谐运动。

那么，对于这个振子，由简谐运动的性质可得

$$
\begin{equation}
x=A\cos(\omega t)
\end{equation}
$$

$$
\begin{equation}
\omega=\frac{2\pi}{T}
\end{equation}
$$

对刚松手的时刻至振子第一次到达平衡位置时的过程分析，有

$$\frac{1}{2}kA^2=\frac{1}{2}mv^2$$

$$
\begin{equation}
v=A\sqrt{\frac{k}{m}}
\end{equation}
$$

对振子运动时的极短时刻内分析，有

$$k\bar{x}\Delta t=m\Delta v$$

对该方程从 $t=0$ 至 $t=\frac{T}{4}$ 积分，可得

$$k\int_0^{\frac{T}{4}}x\mathrm{d}t=mv$$

将$(1)$式与$(3)$式带入，得

$$kA\int_0^{\frac{T}{4}}\cos(\omega t)\mathrm{d}t=A\sqrt{mk}$$

$$k\int_0^{\frac{T}{4}}\cos(\omega t)\mathrm{d}t=\sqrt{mk}$$

将$(2)$式代入，得

$$k\int_0^{\frac{T}{4}}\cos(\frac{2\pi}{T}t)\mathrm{d}t=\sqrt{mk}$$

$$(\frac{T}{2\pi}\sin(\frac{2\pi}{T}t))\bigg\vert_0^{\frac{T}{4}}=\sqrt{\frac{m}{k}}$$

$$\frac{T}{2\pi}-0=\sqrt{\frac{m}{k}}$$

$$T=2\pi\sqrt{\frac{m}{k}}$$

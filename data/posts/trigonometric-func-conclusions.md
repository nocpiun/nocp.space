---
title: "自己推导的三角函数二级结论"
author: NriotHrreion
tags:
- "数学"
excerpt: "之前做题有推导出一些小结论, 就以此记录一下吧"
date: 2023-02-11
---

做题推导出的一些小结论, 之后可能会继续更新.

## 1. $\frac{1}{\cos^2\alpha}-1=\tan^2\alpha$

$$\tan\alpha=\frac{\sin\alpha}{\cos\alpha}$$

$$\tan^2\alpha+1=\frac{\sin^2\alpha}{\cos^2\alpha}+1$$

$$\tan^2\alpha+1=\frac{\sin^2\alpha+\cos^2\alpha}{\cos^2\alpha}$$

$$\frac{1}{\cos^2\alpha}-1=\tan^2\alpha$$

## 2. $\tan(\frac{\pi}{4}+\alpha)=\pm\sqrt{\frac{1+\sin2\alpha}{1-\sin2\alpha}}$

$$\tan(\frac{\pi}{4}+\alpha)$$

$$=\frac{\sin(\frac{\pi}{4}+\alpha)}{\cos(\frac{\pi}{4}+\alpha)}$$

$$=\frac{\cos\alpha+\sin\alpha}{\cos\alpha-\sin\alpha}$$

$$=\pm\sqrt{\frac{(\cos\alpha+\sin\alpha)^2}{(\cos\alpha-\sin\alpha)^2}}$$

$$=\pm\sqrt{\frac{1+2\cos\alpha\sin\alpha}{1-2\cos\alpha\sin\alpha}}$$

$$=\pm\sqrt{\frac{1+\sin2\alpha}{1-\sin2\alpha}}$$

## 3. $a\sin\theta+b\cos\theta=\sqrt{a^2+b^2}\sin(\theta+\phi)$, 其中 $\tan\phi=\frac{b}{a}$

设角 $\phi$, 令

$$\tan\phi=\frac{b}{a}$$

则有

$$a\sin\theta+b\cos\theta$$

$$=\sqrt{a^2+b^2}(\frac{a}{\sqrt{a^2+b^2}}\sin\theta+\frac{b}{\sqrt{a^2+b^2}}\cos\theta)$$

$$=\sqrt{a^2+b^2}(\cos\phi\sin\theta+\sin\phi\cos\theta)$$

$$=\sqrt{a^2+b^2}\sin(\theta+\phi)$$

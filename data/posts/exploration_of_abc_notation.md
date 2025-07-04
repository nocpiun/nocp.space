---
title: "对Abc曲谱标记语言的探索"
author: NriotHrreion
tags:
- "开源"
- "音乐"
- "javascript"
- "曲谱"
excerpt: "Abc Notation是一种用于标记曲谱的语言，通过配合[abc.js](https://abcjs.net)可以将其渲染在网页中<br>_Abc Music Standard 2.1: <https://michaeleskin.com/abctools/abc_standard_v2.1.pdf>_"
date: 2025-07-04
---

## 缘起

我最近这段时间在自学吉他，自学之余也开始尝试扒谱，而扒出来的这些曲谱如果不用某种方式存下来似乎有些可惜。所以我决定在我的网站中新增一个“曲谱”页面，在这里记录和分享我所扒过的谱。

不过，问题来了：**我应该用什么形式记下这些谱？又应该用什么方式将这些曲谱显示在网页中？**

## abc.js 和 Abc Notation

在网页中显示曲谱，这样的功能在开源社区肯定已经有人实现过了，我要做的不是大费周章重造轮子，而是找出这样的库。一番查找后，我找到了[abc.js](https://abcjs.net)。这是一个用于在网页中渲染Abc Notation的js库，这正好符合我的需求，但是所谓“Abc Notation”又是什么？

于是我继续搜索，终于发现：[Abc Notation](https://abcnotation.com)其实是一种用来标记曲谱的语言。这正好可以用来记录我的曲谱，然后通过abc.js渲染在网页中。

## 语法

第一件事就是把谱用这门语言记下来，然而这样一门语言在互联网上似乎有点冷门，找不到太多教程。幸好我找到了这门语言的[标准文件](https://michaeleskin.com/abctools/abc_standard_v2.1.pdf)，在这份pdf中详细介绍了这门语言的各方面信息。当然，记谱还是需要一些基础的乐理知识的，在记谱之前，你可以先去了解一些乐理知识再开始。

### 元数据（Metadata Fields）

Abc Notation曲谱的文件后缀是`.abc`，在创建了文件之后，应该在开头写上这份曲谱的一些信息（或者叫元数据）。下面是Abc所支持的所有元数据（`%`用来标记注释，渲染时会忽略）。

```abc
X: 1 % 序号
T: 送别 % 标题 1
T: 旅愁 % 标题 2
T: 梦见家和母亲 % 标题 3
C: John Pond Ordway % 作曲家
O: USA % 起源地
M: 4/4 % 节拍
L: 1/4 % 单位音符长度
Q: 3/8=50 "Slowly" % bpm
P: (AB)2 % 部分（即曲谱中各个部分的演奏顺序）
Z: NriotHrreion <nriot233@gmail.com> % 记谱人（将原曲转录为Abc曲谱的人）
% N: % 标注（此处用不到）
% G: % 组别（此处用不到）
H: 原曲《梦见家和母亲》是由美国音乐家John Pond Ordway所作，后传入日本，由犬童球渓改编歌词为《旅愁》，后李叔同将其改编为《送别》 % 历史（内容改自维基百科）
K: G % 调号
% R: % 韵律（此处用不到）
% 其余还有B、D、F、S、I详见上面的标准文件
```

### 指令（Directives）

指令是一种Abc Notation的进阶用法，此处不做介绍。

```abc
%%vocalfont Times-Roman 14 % 这是一种用于标记字体的指令
```

### 曲谱主体

Abc Notation使用音名来标记音符，即“CDEFGAB”，下面是这些音名所对应的唱名：

|音名|唱名|
|---|---|
|C|do (doh)|
|D|re|
|E|mi|
|F|fa|
|G|sol (so)|
|A|la|
|B|ti (si)|

#### 小节

Abc曲谱使用`|`来标记小节，在`M: 4/4`的情况下，一节有4拍，那么一个普通的C大调音阶就可以这么标记：

```abc
M: 4/4
L: 1/4
CDEF | GABc
```

#### 音高

Abc曲谱中的大写`C`指的是中央C，如果需要标记音高，可以通过`,`、`'`和小写字母来标记，如：

```abc
C,, % 低十六度的C
C, % 低八度的C
c % 高八度的C
C' % 高八度的C（等价于c）
C'' % 高十六度的C（等价于c'）
C,', % 低八度的C（等价于C,）
% 以此类推...
```

#### 升降记号

那么对于升降记号，可以使用`^`、`=`和`_`来标记。其中，`^`是升记号（♯），`=`是还原记号（♮），`_`是降记号（♭）。如：

```abc
^C % 升C
_B % 降B
```

#### 音符长度

在单位音符长度为四分音符（`L: 1/4`）的条件下，单独一个字母就指代一个四分音符，如果需要标记八分音符、十六分音符等等，则可以在字母后面加上`/`；如果需要标记二分音符或全音符，则可以在字母后面加上对应的数字，如：

```abc
L: 1/4
C % 四分音符
C/ % 八分音符（等价于C/2）
C// % 十六分音符（等价于C/4）
C2 % 二分音符
C4 % 全音符
```

在单位音符长度是其他数值的情况下，也是一样的：

```abc
L: 1/8
C % 八分音符
C/ % 十六分音符（等价于C/2）
C// % 三十二分音符（等价于C/4）
C2 % 四分音符
C4 % 二分音符
C8 % 全音符
```

#### 切分音

在Abc曲谱中，可以使用多种方法来标记切分音，下面三种表示方法均等价（示例来自标准文件）：

```abc
L: 1/16
a3b cd3 a2b2c2d2
```

```abc
L: 1/8
a3/2b/2 c/2d3/2 abcd
```

```abc
L: 1/8
a>b c<d abcd
```

#### 休止符

Abc曲谱使用`z`和`Z`来标记休止符，这里可以把字母`z`和`Z`当作普通的音符来看，它们在音符长度的标记方式是一致的。`z`和`Z`的区别在于显示的方式不一样，其他都是一样的。如：

```abc
M: 4/4
L: 1/4
CDzE | FGz2 | AzBz | c2z2
```

#### 反复记号

Abc曲谱使用`|:`、`:|`来标记某部分曲谱需要反复演奏，如：

```abc
|: CDEF | GABc :| % 反复演奏2次
|:: CDEF | GABc ::| % 反复演奏3次
% 以此类推...
```

如果需要标记多次反复结束段的曲谱，可以使用`|`和数字进行标记，如：

```abc
|: CDEF | GABc | cBAG |[1 FEDE :|[2 FEDC |]
```

其中，`|[1`是第一次反复的结束段，`|[2`是第二次反复的结束段，`|]`标记结束反复。

上面的曲谱还等价于：

```abc
|: CDEF | GABc | cBAG |1 FEDE :|2 FEDC |]
```

#### 延音线 / 连音线

Abc曲谱中使用`-`来标记延音线，使用`()`来标记连音线，如：

```abc
CD-DE | EF-FG | (GAB-B | c4)
```

连音线还可以嵌套，如：

```abc
(CDEF | (GA) B2)
```

#### 装饰音

Abc曲谱中使用`{}`来标记装饰音，如：

```abc
{^C}C
```

#### 其他记号

Abc曲谱还支持一些其他乐谱记号，如渐强、渐弱、颤音等等。这些记号使用感叹号`!!`来标记，下面是支持的部分记号：

|记号|Abc记法|
|---|---|
|颤音|`!trill!`|
|颤音（开始）|`!trill(!`|
|颤音（结束）|`!trill)!`|
|延长符|`!fermata!`|
|上拨|`!upbow!`|
|下拨|`!downbow!`|
|极弱|`!pppp!`|
|弱|`!p!`|
|中弱|`!mp!`|
|中强|`!mf!`|
|强|`!f!`|
|渐强（开始）|`!<(!`|
|渐强（结束）|`!<)!`|
|滑音|`!slide!`|
|D.S.|`!D.S.!`|
|D.C.|`!D.C.!`|

#### 和弦

如果你需要在曲谱中标记和弦，那么可以在对应的位置使用`""`来标记，如：

```abc
L: 1/8
"C" ED CD EE E2 | "G" DD ED "C" C4
```

#### 歌词

如果你需要在曲谱中添加歌词，可以用`w:`在旋律的第二行标记歌词，如：

```abc
L: 1/8
"C" ED CD EE E2 | "G" DD ED "C" C4
w: 玛丽有只小羊羔 | 粉色羊毛
```

你也可以在歌词中间使用`_`和`-`等字符来标记每个字或词对应的音符。

## 示例

下面是我扒的谱之一，你可以在[曲谱](/sheets)页面找到这份谱子。为了作示例，我在前面加上了一些元数据信息。

```abc
X: 1
T: 送别
C: John Pond Ordway
O: USA
Z: abc-transcription NriotHrreion <nriot233@gmail.com>
M: 4/4
L: 1/8
K: G
| "G" !p! G,[DB]([DB]c)-c4 | G,[DB]([DB]c) -cg-g2 |
|: "G" !mp! G,D BD "C" CE cE | "C" CE cE "G" B,D dG | "G" G,D (GA) "Em" E,E BG | "D" DA d(f e)d "D7" cA |
w: 长 _ 亭 _ 外 | 古 _ 道 _ 边 | 芳 _ 草 _ 碧 _ 连 | 天
| "G" [G,B]D GB "C" [Cc]E GE | "C" CE GE "G" B,D dG | "D" DA dA "D7" cA fA | "G" G,D GA BD (G/A/)B |
w: 晚 _ 风 _ 拂 __ 柳 | 笛 _ 声 _ 残 | 夕 _ 阳 _ 山 _ 外 | 山
| "C" !mf! CG cG eG cG | "D" DA dA "G" G,D dG | "C" CE cE "G" B,D dG | "Am7" A,E cG "D" DA (e/f/)d |
w: 天 _ 之 _ 涯 | 地 _ 之 _ 角 | 知 _ 交 _ 半 _ 零 | 落
| "G" G,D BD "C" CE cE | "C" CE cE "G" B,D dG | "D" DA dA "D7" cA fA |
w: 一 _ 壶 _ 浊 __ 酒 | 尽 _ 余 _ 欢 | 今 _ 宵 _ 别 __ 梦
|1 "C" CG cG eG cG | "G" G,G BG gG BG | "Am7" A,G cG "D" DA fA | "G" G,G BG gG BG |
w: 寒
| "C" CG cG eG cG | "Bm7" B,A dA fA dA | "Am7" A,G cG gG cG | "D" DA dA fA dA :|
|2 "G" G,D (G/A/)B "Am" [A,c]E "Bm" [B,d]F | "C" CG eG "Cm" [C_e]c ge | "D" DA dA "Em" E,E BG |
w: 寒 | 天 _ 之 _ 涯 | 地 _ 之 _ 角
| "C" CG cG "C#dim" ^CG ^cG | "D" DA dA (e/f/)A dA  | "G" G,D BG "C" [Cc]E GE | "C" CE cG "Cm" [CGc_eg]4 |
w: 知 _ 交 _ 半 _ 零 | 落 | 一 _ 壶 _ 浊 __ 酒 | 尽 _ 余 _ 欢
| "D" DA dA "D7" cA fA | "G" !mp! G,D !>(! GD BD GD | "Am" A,E cA "D" DA !>)! fd !p! |
w: 今 _ 宵 _ 别 __ 梦 | 寒 | 今 _ 宵 _ 别 |
| "Em9" E,F !mp! Gd -dF GF | "Gmaj7" G,F Gd -dF Gd | "Cadd9(#11)" CF Gd -dF Gd | "Dadd11" DF G{d}e dG FB | "G" [G,B,DGBg]8 |]
w: 梦寒
```

## 渲染

前面提到，Abc Notation可以使用[abc.js](https://abcjs.net)在网页中进行渲染显示。详细用法介绍参见：<https://paulrosen.github.io/abcjs/>

下面是这个库的基础用法：

### Node.js环境

1. 安装abc.js

```cmd
npm i abcjs
```

2. 写一个`<div>`并为它加上一个id

```html
<div id="abc-sheet"></div>
```

3. 通过`renderAbc()`方法渲染曲谱，第一个参数是你刚刚给`<div>`设置的id

```js
import abcjs from "abcjs";
abcjs.renderAbc("abc-sheet", `"C" ED CD EE E2 | "G" DD ED "C" C4`， {
  /* 这里可以设置一些其他的选项 */
  /* 具体用法参见 https://paulrosen.github.io/abcjs/visual/render-abc-options.html */
});
```

### 浏览器环境

1. 引入abc.js

```html
<script defer src="https://cdn.jsdelivr.net/npm/abcjs@6.5.1/dist/abcjs-basic-min.js"/>
```

2. 写一个`<div>`并为它加上一个id

```html
<div id="abc-sheet"></div>
```

3. 通过`renderAbc()`方法渲染曲谱，第一个参数是你刚刚给`<div>`设置的id

```js
window.ABCJS.renderAbc("abc-sheet", `"C" ED CD EE E2 | "G" DD ED "C" C4`， {
  /* 这里可以设置一些其他的选项 */
});
```

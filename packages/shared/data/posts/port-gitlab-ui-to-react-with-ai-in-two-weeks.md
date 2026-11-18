---
title: "我是如何在两周内用AI将GitLab UI移植到React的？"
author: NriotHrreion
tags:
- 开发
- 开源
excerpt: "我一直都觉得GitLab的UI非常好看，然而他们的UI库只支持Vue，于是我就打算将GitLab UI移植到React"
date: 2026-09-13
---

![GitLab UI 一览](/static/blog/glui-1.png)

自从我本地部署GitLab后，就一直觉得GitLab的UI非常好看，尤其是在最近几个版本中，Card组件的样式更新。前不久，我偶然发现GitLab官方其实有单独开源这套UI库，而且已经发布到了[npm](https://npmjs.com/package/@gitlab/ui)，于是我就兴奋地去探索了一番。这套UI库的名字叫GitLab Pajamas UI[^1]，然而它只支持Vue.js，导致我不能在我的React项目中使用这套UI。是否有人已经将它移植到React了呢？很可惜，我并没有找到这样的项目。

恰好最近我正在研究vinext这个开源项目，vinext所做的工作差不多就是用AI将Next.js从vercel的生态中移植到Cloudflare+vite的生态，而如果我来创建一个将GitLab UI从Vue移植到React的项目，将有很多模式可以从vinext身上借鉴。

## vinext是怎么做的？

vinext将上游Next.js的测试用例（[`test/e2e/**`](https://github.com/vercel/next.js/tree/canary/test/e2e)）同步下来，然后使用一个定时执行的[测试工作流](https://github.com/cloudflare/vinext/actions/workflows/nextjs-deploy-suite.yml)来跑这些测试，并以此作为判断vinext实现Next.js功能的程度与兼容性的标准。测试的实时最新结果可以在vinext官网的[兼容性页面](https://vinext.dev/compatibility)查看。

![vinext兼容性测试图](/static/blog/glui-2.png)

同时，为了更好地追踪上游仓库的更新，vinext还搭建了另一套定时执行的[追踪工作流](https://github.com/cloudflare/vinext/actions/workflows/nextjs-tracker.yml)，这个工作流会拉取上游最近的提交记录，然后调用Cloudflare部署的Ask Bonk Agent对仓库和上游的代码进行分析（如果上游有变更的话），分析后再把结果以issue的形式发送到仓库中，方便开发者及时进行更新。

![vinext仓库中的自动追踪issue](/static/blog/glui-3.png)

## 借鉴vinext

显然，一个UI库并没有必要搭建像vinext这样这么复杂的测试工作流，但为了更好地追踪上游GitLab UI的更新，我们可以把vinext的那套“自动追踪”工作流借鉴过来。

GitLab UI for React是一个monorepo项目，分为`tokens`、`styles`和`ui`这三个包。其中，`tokens`的内容是可以直接从上游自动同步的大量Design Tokens，包含各种颜色和长度常量，不需要经过大模型分析，所以我将这个追踪工作流分为两个jobs，一个负责机械同步（sync），另一个负责调用大模型分析上游改动（track）。sync job会在发现上游`tokens`改动后自动拉取，然后提交PR；track job会在发现上游的其他改动后，调用deepseek-v4-flash进行分析并提交issue（_原本想像vinext的Ask Bonk那样自己编排一个Agent的，但我还是太懒了_）。

![GitLab UI的上游追踪issue](/static/blog/glui-4.png)

## AI Coding

这是我第一次纯AI进行较大型开源项目的构建，所以经过这两周的开发，我对AI Coding又有了新的感受。

Button组件是UI库的Hello World，所以我从Button开始第一个组件的移植。我没有开计划模式，让GPT 5.6 Sol一把就完成了这次移植，而且最后出来的效果还可以，于是我以为后面的每个组件都能这么顺利地完成移植，毕竟都已经有上游的代码作为参考了，这对AI来说还有什么难的呢？于是我让它把这次移植总结成了一个组件移植Skill，这样就可以在后续的每次移植中都吸取之前移植的经验，遵守组件移植的规范。

事实上，前几个简单的组件移植还是很顺利的。由于那几天恰逢开学，为了让Agent在我离开期间保持工作，我就在去上课之前让它根据组件之间的依赖关系制定多个组件的移植计划（当时的进度已经到表单组件这里了），然后让它自己调用gh cli提交stacked PR，等我回来之后再一个个review。但这次大型任务完成的结果很糟糕，上游的表单组件大量依赖Bootstrap Vue的样式，而本地仓库并没有建立相应的样式层级，导致Agent要么没有把样式迁移完全（遗漏了底层Bootstrap的样式），要么在不同地方写了大量重复的Bootstrap样式。最后我只能将一部分不符合要求的PR关闭，重新为Agent划定边界、设计层级、制定规范，然后再次进行移植。

### 模板 / 组合

我还发现Agent为了最大程度地一比一移植上游Vue源码，会把Vue的特色写法也一块带到React，导致最后写出来的组件API在React下写起来非常奇怪。Vue中常常使用模板式写法，运用`<template>`、`<slot>`等标签来组织复杂的组件结构；而React中等价的写法就是组合式组件的写法，通过嵌套组件来组织复杂的组件结构，达成的效果和Vue的模板差不多。而Agent在移植模板式写法时，会把模板转成`ReactNode`类型的props，而非转成React特色的组合式写法：

**Agent写的模板式组件：**

```tsx
<GlTooltip
  title={
    <span>
      some <em>tooltip</em> text
    </span>
  }
  placement="top">
  <GlButton>Tooltip</GlButton>
</GlTooltip>
```

**React式的组合式组件：**

```tsx
<GlTooltip>
  <GlTooltipTrigger>
    <GlButton>Tooltip</GlButton>
  </GlTooltipTrigger>
  <GlTooltipContent placement="top">
    some <em>tooltip</em> text
  </GlTooltipContent>
</GlTooltip>
```

如果使用模板式写法，不仅要考虑props的各种边界条件，还不方便调用方编写代码，即使调用方也是AI。这一特点我并没有发现的很及时，也就是说，我发现Agent这么干的时候，它已经按这种方式移植了很多组件了。

### 计划模式

当我开始移植那些比较复杂的组合式组件时，为了更好地控制Agent完成任务，我开始在每次移植前都开启计划模式，让Agent先制定计划。Agent在制定计划的过程中会问我很多问题，而这些问题中有相当一部分我都没有选择它推荐的选项，所以如果它不经过计划直接开始工作，尽管做出来的东西看起来是ok的，许多细节也会和我想的不一样。

说到计划模式的“AskUserQuestion”环节，就不得不提到AI Coding和传统古法编程的一个巨大差异：**AI Coding把许多编码工作填平后，留给人的就是大量密集的决策点。**

Agent向用户提问的过程本质上就是澄清需求的过程，但如此密集的决策点，很难不让人感到疲惫。通常我需要花几个小时完成一个组件的移植，尽管在这期间我只是写一些提示词，回答一些问题，看看效果，但从开始移植到PR合并，我仍然会感觉有点累。这种累和古法编程写代码的那种累不一样，古法编程的累可能在于想了很久才找到解决方案或者单纯写了太多代码，AI编程的累就在于决策点很多，而且你还需要确保AI能够产出高质量的结果，而通常你还无法直观判断它的产出质量有多高。

### AI Code Review

我还为我的开发流程中接入了Codex代码审查。在我创建PR时，Codex会自动在云端创建一个Agent来审查我的代码并给出审查意见，当然我也可以手动发送`@codex review`来触发。几乎每次我创建组件移植的PR，Codex都能审查出问题，很少有能够一次过的情况。看到Codex给我的审查意见后，我会先大致看一下审查意见的内容，如果是我认为不对的意见，我会直接把它设为Resolved；如果是我看得不是很懂的意见（比如说涉及到一些我不熟悉的概念），我会把它发给我本地的Agent，让它先解释一下，然后再决定是否修复；如果是我认为成立的意见，我就会直接让Agent把它修好。

但Codex代码审查每次只有1~4条（起码我没有见过4条以上的），而真正隐藏的问题可能不止4条，甚至在我修复某些审查意见的时候，还会意外引入其他的问题。所以就会出现这样的情况：Codex提出审查意见，我修复代码然后触发审查，Codex再次提出新的审查意见，我再次修复代码然后触发审查，Codex又一次提出审查意见，......这样的循环是我开发过程中的家常便饭，最长的一次是移植Dropdown组件的那个PR[^2]，总共刷了67条PR conversation。

事实上，这个循环非常机械，但似乎又不能完全自动化，因为我还需要判断这个审查意见是否正确且值得处理。如果把所有审查意见都自动发给Agent处理，它大概率会全盘接受然后一条条修复（我尝试过把我认为不合理的审查意见发给Agent看，每次它的回答都是“审查意见成立”）。然而Codex在做代码审查的时候不一定了解我的某些决策意图，甚至不清楚这个PR的改动范围，所以它有概率给出不合适甚至不合理的审查意见，如果全盘接受，那结果将会是灾难性的。

对于这个问题，我在参与vinext贡献的时候也有碰到，我向vinext提交的第一个PR[^3]就经历了这样的多次review循环。那个PR修复的bug是“vinext会把出错时渲染出来的Error Boundary的页面错误地写入缓存”，结果修到后面，Codex提出的审查意见开始涉及这个bug范围之外的预渲染问题。当时我在那条审查意见下面写了一句“beyond the scope of this PR”，项目的另一位开发者就说他的Codex也经常出现这样的问题，并建议我在PR描述中把边界描述清楚。

![vinext开发者的建议](/static/blog/glui-5.png)

查看vinext的其他PR，不难发现review循环每天都在发生，或许这在以后将成为一种常态吧。

![review循环的PR](/static/blog/glui-6.png)

### 尽职编程[^4]

说到密集的决策点与审查意见的筛选，就不得不提到我最近在X上刷到的一篇文章。这篇文章提出了“尽职编程”的概念，所谓“尽职”，即你在做出决策时的认真程度：将所有决策都交由AI，还是人工仔细做出每一个决策？

> 因为你给他的提示词就几个字符，他只会把它当简单的需求完成，
>
> 况且如果 AI 思考过多可能还有过度设计的嫌疑。这时候，非常依赖人在其中多思考

文章中的这段话就很好地呼应了上面提到的计划模式决策点和AI审查意见判断了，即使我向AI提供再多的上下文，也总是会漏掉许多东西，甚至这些漏掉的东西里面藏着一些关键的要点。

说回GitLab UI for React这个项目，为了保持良好的“尽职”程度，我手动做出了许多决策，也从实践中学到了许多东西。事实上，AI大幅降低了重构的门槛，这样一来，在我发现方向错误时，还是能及时调整过来的，但同时，为了及时发现错误，我仍然会习惯性地在Agent写完代码后，稍微扫一眼diff。当然，正如文章所说“「尽职」是一个主观行为，且没有尽头”，把握所谓尽职的程度，仍然是一门需要长久实践和探索的学问。

## 试试 GitLab UI React 吧！

就在昨天，`gitlab-ui-react`的首个版本`0.1.0`已经发布了[^5]。你可以使用下面的命令把GitLab UI React安装到你的项目中：

```bash
npm i gitlab-ui-react @gitlab-ui-react/styles
```

> [!warning]
> GitLab UI React要求项目React版本为`19.2.8`以上。

详细安装文档请看：<https://glui.nocp.space/zh/docs/installation>

官网文档专门针对LLM做了优化，支持读取页面的纯Markdown文本，但目前组件文档还在完善中...

如果遇到任何问题，欢迎来[提交issue](https://github.com/nocpiun/gitlab-ui-react/issues)！

[^1]: [Pajamas Design System](https://design.gitlab.com)
[^2]: [feat(ui): dropdown components by NriotHrreion · Pull Request #47 · nocpiun/gitlab-ui-react](https://github.com/nocpiun/gitlab-ui-react/pull/47)
[^3]: [fix(isr/prerender): skip app page cache writes and prevent publishing error boundary artifact if there are render errors by NriotHrreion · Pull Request #2789 · cloudflare/vinext](https://github.com/cloudflare/vinext/pull/2789)
[^4]: [尽职编程：AI Coding 时代的个体产出差异的来源 - By Joway](https://x.com/jowaywang/status/2093682461737967822)
[^5]: [Release gitlab-ui-react@0.1.0 · nocpiun/gitlab-ui-react](https://github.com/nocpiun/gitlab-ui-react/releases/tag/gitlab-ui-react%400.1.0)

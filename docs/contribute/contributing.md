---
contributors: []
---

# 贡献指南

## 排版标准

请先 Fork 本仓库，然后进行文档修改。排版时请务必遵循中文文案排版指北。

请注意：在非 Log 信息以外的任何地方，如果出现中文文字、英文单词和阿拉伯数字混用的情况，请在它们之间添加空格；如果有斜杠的，请在斜杠两边增加一个空格。

例：`neomega 是一个由 CMA2401PT 在 2023 年 7 月底成立的一个项目`

在涉及非 Log 信息以外的任何地方，英文单词原则上首字母大写，部分情况需要按照规则大写，英文句子首字母大写。

例：`Minecraft`、`PhoenixBuilder`、`What your love is your life`。

在涉及路径时，请在路径的前后加上空格。

例：`路径 D:/test/neomega_storage/config 是存放 neomega配置文件 的地方`

在涉及任何站外链接时，请优先添加官方链接，尽量避免不必要的第三方链接。

如果某一条信息为特定项目独占功能或停止支持，我们提供了全局组件来标注它。

其中 type 目前仅有 `neomega`、`fb`和`unsupport` 三项，您也可以在 `docs/theme/components/Badge.vue` 及 `docs/theme/style.css(Component: Badge处)` 处自行添加

text 项可以自定义

示例如下：

:::tip neomega

### CMA2401PT <Badge type="neomega" text="仅 neomega" />

```MarkDown
### CMA2401PT <Badge type="neomega" text="仅 neomega" />
```

:::

:::tip PhoenixBuilder

### LNSSPsd <Badge type="fb" text="仅 PhoenixBuilder" />

```MarkDown
### LNSSPsd <Badge type="fb" text="仅 PhoenixBuilder" />
```

:::

:::warning unsupport

### 河南拔智齿 <Badge type="unsupport" text="当前版本暂不支持" />

```MarkDown
### 河南拔智齿 <Badge type="unsupport" text="当前版本暂不支持" />
```

:::

在您完成文档修改后，请在 MarkDown 文档的最上方修改 contributors FrontMatter，以将您的 Github 用户名添加到贡献者列表，格式如下。

```MarkDown
---
contributors: [用户名, 用户名, 用户名]
---
```

:::warning 警告
- 请一定要使用 Github 用户名署名，否则我们无法获取您的头像。
- 上述代码中所使用的均为英文半角逗号！
:::

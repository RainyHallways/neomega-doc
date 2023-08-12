---
contributors: []
---
# 简介

## neomega

提供了与 `Minecraft` 相关的工具、概念抽象和 `API` 并集成了 `lua引擎` 的新一代 omega 框架, 并在 legacy-omega 的基础上做了部分修改和拓展。

文档目前还在撰写中。

::: danger 注意
由于 neomega 仍在开发中，暂未发布正式版

本文档将仅保留最新版的文档

被遗弃的功能的文档将会被从文档中删除
:::

### 覆盖范围

- `FastBuilder/Netease Minecraft` 的登陆
- 机器人基本 `API` 及 `Minecraft` 相关基本 `API` 的封装
  - 支持对上述 `API` 的数据和状态的保存、更新和网络传输
  - 一对远程访问上述 `API` 和数据的 `Access Point` 和 `End Point`

## Omega Frame

`Omega Frame` 使用了 `neomega` 提供的 `Minecraft` 相关的 `API` ，并对这些 `API` 进行了扩展，提供了诸如文件存储、后台输入等组件必需的 `API` 。

除此之外，`Omega Frame` 下还包含了多个 `Loader`，每个 `Loader` 可以加载和运行对应的组件。

### 覆盖范围

- 提供组件必须的扩展 `API`
  - 终端输入
  - 终端目录
  - 文件存储
  - 日志
  - 共享
  - 其他
- 提供增强的功能和 `API`
  - `CQ HTTP`
  - `Builder` 接口
  - 其他
- 提供模块和组件的配置信息
- 可以运行不同语言的组件，并为每种语言提供 `API`

## Lua Omega

> 开发接口可前往 [lumega在线文档](https://lumega.kukinghan.cn/) 查看

`Lua Omega` 提供了对 `neomega` 和 `Omega Frame` 不同模块和功能的 `Lua` 封装，使得 `Lua` 脚本可以使用这些 `API` 。

`Lua Omega` 也被 `Omega Frame` 下的 `Lua Loader` 所使用。 _[注意，并不是说，`A`（的部分子包）使用了 `B` 的（部分子包的）功能，`B` 就是 `A` 的子模块。`GoLang` 的包管理更加务实一些 ]_

### 覆盖范围

- 对 `neomega` 和 `Omega Frame` 的 `API` 进行封装，供 `Omega Frame` 或其它包调用

## Omega Launcher

`Omega Launcher` 负责以交互模式从用户那里获取配置信息，并根据配置信息帮助配置 `CQ HTTP`, 以及保证 `Omega Access Point` 的正常运行及重启，同时也负责运行 `Omega Frame` 。

`Omega Launcher` 有责任在连接到 `Minecraft` 之前对 `Omega Frame` 的基础配置进行检查。

`Omega Launcher, Omega Frame` 和 `Omega Access Point` 的程序会被集成在同一个可执行文件中， 并由 `Role` 参数决定它们表现出来的行为。如果理解有困难，请想象一下 `Busy Box` 的工作方式。

最后，`Omega Launcher` 下的 `Frame` 和 `Access Point` 均以远程模式运行，即使它们可能都在同一台机器上运行。

### 覆盖范围

- 从用户那里获取配置信息
- 检查 `Omega Frame` 的基础配置
- 协助下载和配置 `CQ HTTP`
- 保存每次的配置
- 保证 `Omega Access Point` 的正常运行及重启
- 运行 `Omega Frame`
- 自动更新
- **限制如 `MinecraftSM` 的商业面板的使用**

## CQ HTTP Helper

`CQ HTTP Helper` 中包含了编译 `go-cqhttp` 的 `Makefile`，同时，提供了 `Docker File` 以帮助顺利运行起 `Sign Server` 和 `CQ HTTP` 容器。

`CQ HTTP Helper` 亦实现了与 `CQ HTTP` 的连接，以及对消息和部分控制命令的封装，且其在 `Omega Frame` 下的 `CQ HTTP` 模块中被使用。

### 覆盖范围

- 编译 `go-cqhttp`
- 提供 `Docker File` 以帮助顺利运行起 `Sign Server` 和 `CQ HTTP` 容器
- 实现与 `CQ HTTP` 的连接，以及对消息和部分控制命令的封装
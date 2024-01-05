# 从legacy-omega迁移至neomega

:::warning
此文档已经过时，其中的一些内容可能不适于现今版本的neomega!
:::

## 迁移使用
以下为 neomega 初次使用的配置流程 以commit(345):03a275e为例
```txt
╔═════════════════════════════════════════════════════════════════╗
║ ███╗   ██╗███████╗ ██████╗ ███╗   ███╗███████╗ ██████╗  █████╗  ║
║ ████╗  ██║██╔════╝██╔═══██╗████╗ ████║██╔════╝██╔════╝ ██╔══██╗ ║
║ ██╔██╗ ██║█████╗  ██║   ██║██╔████╔██║█████╗  ██║  ███╗███████║ ║
║ ██║╚██╗██║██╔══╝  ██║   ██║██║╚██╔╝██║██╔══╝  ██║   ██║██╔══██║ ║
║ ██║ ╚████║███████╗╚██████╔╝██║ ╚═╝ ██║███████╗╚██████╔╝██║  ██║ ║
║ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ║
╚═════════════════════════════════════════════════════════════════╝
> by 2401PT@CMA, Liliya233(Gu.G), awaqwqa(Rou.W), RainyHallways
> ln PhoenixBuilder (https://github.com/LNSSPsd/PhoenixBuilder)
> neomega ver: commit(345):03a275e
> var: enhanced[yes] builder[yes] secure[yes]
> checking......... ok
请输入 omega 根存储数位档案文件夹 (或回车以使用默认文件夹 neomega_storage):
omega 根存储数位档案文件夹为: neomega_storage
正在检查配置文件...
配置文件检查通过
 INFO  需要启动器帮助配置CQHTTP吗? 要请输入 y 不要请输入 n: y [若需使用就输入 y 反之则为 n]
 INFO  要使用自己的CQHTTP吗? 要请输入 y 不要请输入 n: n [推荐输入 n]
 SUCCESS  如果你需要扫码登陆，请保证这行字能完整显示在一行中（你可以双指捏合缩放）-->|
 ERROR   如果你正在手机上使用启动器配置CQHTTP, 请务必用另一部手机扫码登录, 不能截图!
 INFO  请输入QQ账号:
 INFO  请输入QQ密码 (想扫码登录则留空):
 INFO  请输入SignServer地址 (没有可留空): [安卓协议必填]
 INFO  请输入 FastBuilder 账号, 或者输入 Token:
 INFO  请输入 FastBuilder 密码:
 INFO  请输入租赁服账号:
 INFO  请输入租赁服密码 (没有则留空):
```
以下为执行完上述流程之后的文件架构
```txt
.
└─neomega_storage
    ├─archive
    │  └─日志压缩临时目录
    ├─cache
    ├─config
    │  ├─32k方块检测
    │  ├─creater[lua]
    │  ├─example1[lua]
    │  ├─MC_QQ聊天互通[lua]
    │  ├─OmegaSide旁加载组件系统
    │  ├─OP权限模拟
    │  ├─兑换码
    │  ├─入服欢迎
    │  ├─入睡检测
    │  ├─切换
    │  ├─刷怪笼检测
    │  ├─区域扫描
    │  ├─反馈信息
    │  ├─发言频率限制
    │  ├─后台发送命令[lua]
    │  ├─商店
    │  ├─地皮[lua]
    │  ├─存档修复
    │  ├─封禁时间
    │  ├─小说阅读器
    │  ├─快递系统
    │  ├─手持32k检测
    │  ├─挂机检测
    │  ├─排行榜
    │  ├─改名记录
    │  ├─数据包捕获
    │  ├─时间同步
    │  ├─服服互通
    │  ├─每日签到
    │  ├─消除方块
    │  ├─物品回收
    │  ├─玩家互传
    │  ├─玩家信息
    │  ├─玩家商店
    │  ├─玩家封禁[lua]
    │  ├─玩家留言
    │  ├─玩家自杀
    │  ├─玩家转账
    │  ├─皮肤检查
    │  ├─第三方_by温柔_优化版本雪球菜单组件
    │  ├─第三方_by温柔_地皮组件
    │  ├─简单自定义指令
    │  ├─管理员检测
    │  ├─系统上线提示
    │  ├─聊天记录
    │  ├─能力管理
    │  ├─自助建筑备份
    │  ├─自定义传送点
    │  ├─计分板UID追踪
    │  ├─计划任务
    │  ├─设置重生点
    │  ├─踢人
    │  ├─返回主城
    │  ├─返回死亡点
    │  ├─违规昵称检测
    │  ├─选取方块
    │  ├─随机巡逻
    │  ├─雪球菜单[lua]
    │  └─高频红石检查
    ├─cqhttp
    │  ├─data
    │  │  ├─cache
    │  │  ├─images
    │  │  │  └─guild-images
    │  │  ├─leveldb-v3
    │  │  ├─versions
    │  │  ├─videos
    │  │  └─voices
    │  └─logs
    ├─data
    │  ├─game_menu
    │  ├─地皮记录
    │  └─玩家封禁数据
    ├─lang
    │  └─LuaLoader
    ├─log
    └─temp
```

:::warning 注意
legacy-omega 的 Built-In组件 配置文件与 neomega 的配置文件兼容，故你无需重新进行配置(Bulit-In)，将配置文件复制到目录 ./neomega_storage/config/Built-In 即可 lua组件 请自行配置

注:以下组件并不包含在 neomega 内

指令发送、性能分析、数据库导入导出、第三方_by_xxx的所有(除去 第三方_by温柔_地皮组件 和 第三方_by温柔_优化版本雪球菜单组件)、菜单显示、OP权限自检、lua插件支持

go-cqhttp 的 config.yml device.json 与 session.token 可以进行迁移
:::

若你使用的是Windows系统，Qsign-server 推荐你使用 [此项目](https://github.com/rhwong/unidbg-fetch-qsign-onekey/releases/tag/onekey) 进行部署
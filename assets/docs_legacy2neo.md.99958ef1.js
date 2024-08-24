import{_ as s,c as n,o as a,Q as e}from"./chunks/framework.c009d427.js";const u=JSON.parse('{"title":"从legacy-omega迁移至neomega","description":"","frontmatter":{},"headers":[],"relativePath":"docs/legacy2neo.md","filePath":"docs/legacy2neo.md","lastUpdated":1724487756000}'),l={name:"docs/legacy2neo.md"},p=e(`<h1 id="从legacy-omega迁移至neomega" tabindex="-1">从legacy-omega迁移至neomega <a class="header-anchor" href="#从legacy-omega迁移至neomega" aria-label="Permalink to &quot;从legacy-omega迁移至neomega&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>此文档已经过时，其中的一些内容可能不适于现今版本的neomega!</p></div><h2 id="迁移使用" tabindex="-1">迁移使用 <a class="header-anchor" href="#迁移使用" aria-label="Permalink to &quot;迁移使用&quot;">​</a></h2><p>以下为 neomega 初次使用的配置流程 以commit(345):03a275e为例</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">╔═════════════════════════════════════════════════════════════════╗</span></span>
<span class="line"><span style="color:#e1e4e8;">║ ███╗   ██╗███████╗ ██████╗ ███╗   ███╗███████╗ ██████╗  █████╗  ║</span></span>
<span class="line"><span style="color:#e1e4e8;">║ ████╗  ██║██╔════╝██╔═══██╗████╗ ████║██╔════╝██╔════╝ ██╔══██╗ ║</span></span>
<span class="line"><span style="color:#e1e4e8;">║ ██╔██╗ ██║█████╗  ██║   ██║██╔████╔██║█████╗  ██║  ███╗███████║ ║</span></span>
<span class="line"><span style="color:#e1e4e8;">║ ██║╚██╗██║██╔══╝  ██║   ██║██║╚██╔╝██║██╔══╝  ██║   ██║██╔══██║ ║</span></span>
<span class="line"><span style="color:#e1e4e8;">║ ██║ ╚████║███████╗╚██████╔╝██║ ╚═╝ ██║███████╗╚██████╔╝██║  ██║ ║</span></span>
<span class="line"><span style="color:#e1e4e8;">║ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ║</span></span>
<span class="line"><span style="color:#e1e4e8;">╚═════════════════════════════════════════════════════════════════╝</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; by 2401PT@CMA, Liliya233(Gu.G), awaqwqa(Rou.W), RainyHallways</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; ln PhoenixBuilder (https://github.com/LNSSPsd/PhoenixBuilder)</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; neomega ver: commit(345):03a275e</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; var: enhanced[yes] builder[yes] secure[yes]</span></span>
<span class="line"><span style="color:#e1e4e8;">&gt; checking......... ok</span></span>
<span class="line"><span style="color:#e1e4e8;">请输入 omega 根存储数位档案文件夹 (或回车以使用默认文件夹 neomega_storage):</span></span>
<span class="line"><span style="color:#e1e4e8;">omega 根存储数位档案文件夹为: neomega_storage</span></span>
<span class="line"><span style="color:#e1e4e8;">正在检查配置文件...</span></span>
<span class="line"><span style="color:#e1e4e8;">配置文件检查通过</span></span>
<span class="line"><span style="color:#e1e4e8;"> INFO  需要启动器帮助配置CQHTTP吗? 要请输入 y 不要请输入 n: y [若需使用就输入 y 反之则为 n]</span></span>
<span class="line"><span style="color:#e1e4e8;"> INFO  要使用自己的CQHTTP吗? 要请输入 y 不要请输入 n: n [推荐输入 n]</span></span>
<span class="line"><span style="color:#e1e4e8;"> SUCCESS  如果你需要扫码登陆，请保证这行字能完整显示在一行中（你可以双指捏合缩放）--&gt;|</span></span>
<span class="line"><span style="color:#e1e4e8;"> ERROR   如果你正在手机上使用启动器配置CQHTTP, 请务必用另一部手机扫码登录, 不能截图!</span></span>
<span class="line"><span style="color:#e1e4e8;"> INFO  请输入QQ账号:</span></span>
<span class="line"><span style="color:#e1e4e8;"> INFO  请输入QQ密码 (想扫码登录则留空):</span></span>
<span class="line"><span style="color:#e1e4e8;"> INFO  请输入SignServer地址 (没有可留空): [安卓协议必填]</span></span>
<span class="line"><span style="color:#e1e4e8;"> INFO  请输入 FastBuilder 账号, 或者输入 Token:</span></span>
<span class="line"><span style="color:#e1e4e8;"> INFO  请输入 FastBuilder 密码:</span></span>
<span class="line"><span style="color:#e1e4e8;"> INFO  请输入租赁服账号:</span></span>
<span class="line"><span style="color:#e1e4e8;"> INFO  请输入租赁服密码 (没有则留空):</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">╔═════════════════════════════════════════════════════════════════╗</span></span>
<span class="line"><span style="color:#24292e;">║ ███╗   ██╗███████╗ ██████╗ ███╗   ███╗███████╗ ██████╗  █████╗  ║</span></span>
<span class="line"><span style="color:#24292e;">║ ████╗  ██║██╔════╝██╔═══██╗████╗ ████║██╔════╝██╔════╝ ██╔══██╗ ║</span></span>
<span class="line"><span style="color:#24292e;">║ ██╔██╗ ██║█████╗  ██║   ██║██╔████╔██║█████╗  ██║  ███╗███████║ ║</span></span>
<span class="line"><span style="color:#24292e;">║ ██║╚██╗██║██╔══╝  ██║   ██║██║╚██╔╝██║██╔══╝  ██║   ██║██╔══██║ ║</span></span>
<span class="line"><span style="color:#24292e;">║ ██║ ╚████║███████╗╚██████╔╝██║ ╚═╝ ██║███████╗╚██████╔╝██║  ██║ ║</span></span>
<span class="line"><span style="color:#24292e;">║ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ║</span></span>
<span class="line"><span style="color:#24292e;">╚═════════════════════════════════════════════════════════════════╝</span></span>
<span class="line"><span style="color:#24292e;">&gt; by 2401PT@CMA, Liliya233(Gu.G), awaqwqa(Rou.W), RainyHallways</span></span>
<span class="line"><span style="color:#24292e;">&gt; ln PhoenixBuilder (https://github.com/LNSSPsd/PhoenixBuilder)</span></span>
<span class="line"><span style="color:#24292e;">&gt; neomega ver: commit(345):03a275e</span></span>
<span class="line"><span style="color:#24292e;">&gt; var: enhanced[yes] builder[yes] secure[yes]</span></span>
<span class="line"><span style="color:#24292e;">&gt; checking......... ok</span></span>
<span class="line"><span style="color:#24292e;">请输入 omega 根存储数位档案文件夹 (或回车以使用默认文件夹 neomega_storage):</span></span>
<span class="line"><span style="color:#24292e;">omega 根存储数位档案文件夹为: neomega_storage</span></span>
<span class="line"><span style="color:#24292e;">正在检查配置文件...</span></span>
<span class="line"><span style="color:#24292e;">配置文件检查通过</span></span>
<span class="line"><span style="color:#24292e;"> INFO  需要启动器帮助配置CQHTTP吗? 要请输入 y 不要请输入 n: y [若需使用就输入 y 反之则为 n]</span></span>
<span class="line"><span style="color:#24292e;"> INFO  要使用自己的CQHTTP吗? 要请输入 y 不要请输入 n: n [推荐输入 n]</span></span>
<span class="line"><span style="color:#24292e;"> SUCCESS  如果你需要扫码登陆，请保证这行字能完整显示在一行中（你可以双指捏合缩放）--&gt;|</span></span>
<span class="line"><span style="color:#24292e;"> ERROR   如果你正在手机上使用启动器配置CQHTTP, 请务必用另一部手机扫码登录, 不能截图!</span></span>
<span class="line"><span style="color:#24292e;"> INFO  请输入QQ账号:</span></span>
<span class="line"><span style="color:#24292e;"> INFO  请输入QQ密码 (想扫码登录则留空):</span></span>
<span class="line"><span style="color:#24292e;"> INFO  请输入SignServer地址 (没有可留空): [安卓协议必填]</span></span>
<span class="line"><span style="color:#24292e;"> INFO  请输入 FastBuilder 账号, 或者输入 Token:</span></span>
<span class="line"><span style="color:#24292e;"> INFO  请输入 FastBuilder 密码:</span></span>
<span class="line"><span style="color:#24292e;"> INFO  请输入租赁服账号:</span></span>
<span class="line"><span style="color:#24292e;"> INFO  请输入租赁服密码 (没有则留空):</span></span></code></pre></div><p>以下为执行完上述流程之后的文件架构</p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">└─neomega_storage</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├─archive</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  └─日志压缩临时目录</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├─cache</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├─config</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─32k方块检测</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─creater[lua]</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─example1[lua]</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─MC_QQ聊天互通[lua]</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─OmegaSide旁加载组件系统</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─OP权限模拟</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─兑换码</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─入服欢迎</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─入睡检测</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─切换</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─刷怪笼检测</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─区域扫描</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─反馈信息</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─发言频率限制</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─后台发送命令[lua]</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─商店</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─地皮[lua]</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─存档修复</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─封禁时间</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─小说阅读器</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─快递系统</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─手持32k检测</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─挂机检测</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─排行榜</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─改名记录</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─数据包捕获</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─时间同步</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─服服互通</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─每日签到</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─消除方块</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─物品回收</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─玩家互传</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─玩家信息</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─玩家商店</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─玩家封禁[lua]</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─玩家留言</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─玩家自杀</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─玩家转账</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─皮肤检查</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─第三方_by温柔_优化版本雪球菜单组件</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─第三方_by温柔_地皮组件</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─简单自定义指令</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─管理员检测</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─系统上线提示</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─聊天记录</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─能力管理</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─自助建筑备份</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─自定义传送点</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─计分板UID追踪</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─计划任务</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─设置重生点</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─踢人</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─返回主城</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─返回死亡点</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─违规昵称检测</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─选取方块</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─随机巡逻</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─雪球菜单[lua]</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  └─高频红石检查</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├─cqhttp</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─data</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  │  ├─cache</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  │  ├─images</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  │  │  └─guild-images</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  │  ├─leveldb-v3</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  │  ├─versions</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  │  ├─videos</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  │  └─voices</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  └─logs</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├─data</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─game_menu</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  ├─地皮记录</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  └─玩家封禁数据</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├─lang</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  └─LuaLoader</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├─log</span></span>
<span class="line"><span style="color:#e1e4e8;">    └─temp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">└─neomega_storage</span></span>
<span class="line"><span style="color:#24292e;">    ├─archive</span></span>
<span class="line"><span style="color:#24292e;">    │  └─日志压缩临时目录</span></span>
<span class="line"><span style="color:#24292e;">    ├─cache</span></span>
<span class="line"><span style="color:#24292e;">    ├─config</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─32k方块检测</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─creater[lua]</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─example1[lua]</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─MC_QQ聊天互通[lua]</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─OmegaSide旁加载组件系统</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─OP权限模拟</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─兑换码</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─入服欢迎</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─入睡检测</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─切换</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─刷怪笼检测</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─区域扫描</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─反馈信息</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─发言频率限制</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─后台发送命令[lua]</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─商店</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─地皮[lua]</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─存档修复</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─封禁时间</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─小说阅读器</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─快递系统</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─手持32k检测</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─挂机检测</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─排行榜</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─改名记录</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─数据包捕获</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─时间同步</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─服服互通</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─每日签到</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─消除方块</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─物品回收</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─玩家互传</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─玩家信息</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─玩家商店</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─玩家封禁[lua]</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─玩家留言</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─玩家自杀</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─玩家转账</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─皮肤检查</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─第三方_by温柔_优化版本雪球菜单组件</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─第三方_by温柔_地皮组件</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─简单自定义指令</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─管理员检测</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─系统上线提示</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─聊天记录</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─能力管理</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─自助建筑备份</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─自定义传送点</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─计分板UID追踪</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─计划任务</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─设置重生点</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─踢人</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─返回主城</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─返回死亡点</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─违规昵称检测</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─选取方块</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─随机巡逻</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─雪球菜单[lua]</span></span>
<span class="line"><span style="color:#24292e;">    │  └─高频红石检查</span></span>
<span class="line"><span style="color:#24292e;">    ├─cqhttp</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─data</span></span>
<span class="line"><span style="color:#24292e;">    │  │  ├─cache</span></span>
<span class="line"><span style="color:#24292e;">    │  │  ├─images</span></span>
<span class="line"><span style="color:#24292e;">    │  │  │  └─guild-images</span></span>
<span class="line"><span style="color:#24292e;">    │  │  ├─leveldb-v3</span></span>
<span class="line"><span style="color:#24292e;">    │  │  ├─versions</span></span>
<span class="line"><span style="color:#24292e;">    │  │  ├─videos</span></span>
<span class="line"><span style="color:#24292e;">    │  │  └─voices</span></span>
<span class="line"><span style="color:#24292e;">    │  └─logs</span></span>
<span class="line"><span style="color:#24292e;">    ├─data</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─game_menu</span></span>
<span class="line"><span style="color:#24292e;">    │  ├─地皮记录</span></span>
<span class="line"><span style="color:#24292e;">    │  └─玩家封禁数据</span></span>
<span class="line"><span style="color:#24292e;">    ├─lang</span></span>
<span class="line"><span style="color:#24292e;">    │  └─LuaLoader</span></span>
<span class="line"><span style="color:#24292e;">    ├─log</span></span>
<span class="line"><span style="color:#24292e;">    └─temp</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">注意</p><p>legacy-omega 的 Built-In组件 配置文件与 neomega 的配置文件兼容，故你无需重新进行配置(Bulit-In)，将配置文件复制到目录 ./neomega_storage/config/Built-In 即可 lua组件 请自行配置</p><p>注:以下组件并不包含在 neomega 内</p><p>指令发送、性能分析、数据库导入导出、第三方_by_xxx的所有(除去 第三方_by温柔_地皮组件 和 第三方_by温柔_优化版本雪球菜单组件)、菜单显示、OP权限自检、lua插件支持</p><p>go-cqhttp 的 config.yml device.json 与 session.token 可以进行迁移</p></div><p>若你使用的是Windows系统，Qsign-server 推荐你使用 <a href="https://github.com/rhwong/unidbg-fetch-qsign-onekey/releases/tag/onekey" target="_blank" rel="noreferrer">此项目</a> 进行部署</p>`,9),o=[p];function c(t,i,r,y,g,d){return a(),n("div",null,o)}const h=s(l,[["render",c]]);export{u as __pageData,h as default};

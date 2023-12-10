# [WIP] lua 插件书写说明(均以pc端为列子)

> 前情提要 如果你想要书写或者修改 `lua组件` 你需要具备 lua语言 的基础语法知识  
> 但是不用担心 lua 的语法和 python 一样简单  
> 这里是学习网站: [Lua 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/lua/lua-tutoria.html)  
> 只要你认真学习 只需要花费 2-3 个小时就能使用一些基础语法

## 1.启动 格式 :

- 首先是文件方面 一般来说一个lua插件至少需要具备 `两个文件`
  
  ### 1. 在 `./neomega/config/LuaLoader/xxxx/xxx.json` 的配置文件
  
  `xxxx` 是指的插件名字而 `xxx` 指的是数字<br/>
  其内容为一般为:
  
  ```json
  {
    "名称": "example2.lua",
    "配置": {
        "Author": "2401PT",
        "Index": "2",
        "key3": "value3"
    },
    "描述": "这是一个示例lua插件",
    "是否禁用": false,
    "来源": "LuaLoader"
  }
  ```

也就是: `./neomega/lang/LuaLoader` 下面的lua代码文件的名字

然后是 `<远程地址>` 和 `<远程哈希地址>` 
当你希望你的插件保持更新 并且在你的掌控中的时候
请将你存放代码的网址地址写入 `<远程地址>` 
那么在每次启动这个插件的时候都去去保证更新
不用多说, `<配置>` 就是你的插件需要的配置文件

### 2. 接下来就是上文中提及的 `./neomega/lang/LuaLoader` 下面的 `lua代码文件`

这里集群了 `非云端lua代码` 的实现<br/>
也就是你需要将你 `插件逻辑` 写入的地方

## 2.如何写一个插件？

1. 废话不多说我们直接上 hello world 来剖析一个插件应该至少具备哪些东西

这里是一个名为  `hello_world.lua` 的插件逻辑

```lua
//获取omega的内置模块
local omega = require("omega")
//获得 可以向聊天框里面打印消息的函数
local print = omega.system.print
//向所有人发送一条hello world
print("hello world!")
```

对一个输出 `hello world!` 的插件而言你只需要写简短的三行代码<br/>
我们剖析一下这几行代码

- **第1行**: 这里运用了 `lua代码` 中的 `require函数` 这个函数获取了 `omega模块` 那么下文中出现的所有 `omega` 都代表着 `omega模块`<br/>
    而这里的 `omega` 即是最核心的部分 几乎 `插件与mc的所有的交互` 都需要它来实现<br/>
    > Tips: omega模块里面包含了全面且稳定的api

- **第2行**: 与游戏的交互函数: `print()`
    请注意这里的 `print()` 并不是lua语言中 `传统的print()`<br/>
    这里的 `print()` 完成的功能是 `将print()函数里面的参数发送到游戏中去`<br/>
    也就是说第三行中 `print("hello world!")` 函数执行后 `游戏中的聊天框` 中就会出现"hello world!"这一文字

## 3.neomega 核心篇章Poller (不用怕)

> `Poller` 我们就需要长篇大论一下了 因为写插件是一份充满爱意的事情 需要开发者本身在遵循微量的规范情况下让脑海中那些奇思妙想爆发出来 将你的思绪作为 `neomega` 社区中一份必不可少的支柱 当然我会尽量让枯燥的知识点有趣起来

### 一. poller !!!!!

> 这就是进阶核心的内容 这也是插件中你始终需要关注的东西 毫不夸张地说我们的 `lua插件` 是面向 `poller` 开发的

##### 我们开始解释何为 `poller`

> 为了充分理解这个东西 我们不妨设想一种情况 :如果你在一个插件中使用了一个堵塞的函数 类似于python中的 `input`，当用户输入之前 `input` 函数会将整个程序停住等待

那么如果我们在书写插件的时候写调用 **接受玩家的说话信息这个函数** 当我们等待a玩家说话的时候 b玩家也想使用这个插件 会发生什么？
没错！！**b玩家只能乖乖等着a玩家说话** 然后插件完成工作才能开始处理b玩家的事情

* 如何解决这个问题？**poller**便诞生了<br/>
  你可以比作它是一个指挥中心 比如你同时写了两份不同的事件函数 然后交到 `poller` 手中 `poller` 就会同时等待这两份函数的响应！那么无论是`a`还是`b`都不会因为对方的正在使用而导致自己无法使用

### 二.在代码中如何使用 `poller`?

```lua
local omega = require("omega")
local print = omega.system.print
local block_input = omega.system.block_input

print("请随便输入点什么")
local something = block_input()
print(("你刚才输入了 %s"):format(something))

--  现在的问题是，假如我们希望设置一个超时，比如说，如果用户在3秒内没有输入，那么就默认输入了"nothing"。
-- 我们知道，我们可以使用sleep函数来等待一段时间，但是我们不知道怎么在等待的同时，又能够接收用户的输入。
-- 因为，如果我们先使用sleep函数，那么在等待的时候，我们就无法接收用户的输入了。
-- 或者，我们可以先接收用户的输入，但是在等待的时候，我们就无法接收用户的输入了。
-- 就像这样：

omega.system.block_sleep(3.0)
print("3s passed")
print("请随便输入点什么")
local something = block_input()
print(("你刚才输入了 %s"):format(something))

-- 这是因为，这两个函数是阻塞的，也就是说，当我们调用这两个函数的时候，程序会停下来，等待这两个函数返回。
-- 在lua支持中，阻塞函数都被命名为 block_xxx，比如block_sleep，block_input

-- 回到我们的问题，我们希望在等待的时候，又能够接收用户的输入，该怎么做呢？
-- 我们可以使用 mux_poller 来实现这个功能
-- mux_poller 是一个多路复用器，它可以同时监听阻塞多个事件，当其中一个事件发生的时候，它就会返回这个事件。
-- 创建一个 mux_poller 的方法是 omega.listen.new_mux_poller()
local mux_poller = omega.listen.new_mux_poller()
-- 然后，我们可以使用它来监听阻塞事件，比如说，我们可以监听阻塞输入事件 block_input
local event = mux_poller:poll(block_input):poll(omega.system.block_sleep, 0.5):block_get_next()
-- 上面这句代码等效于下面这些代码
-- mux_poller:poll(block_input) -- 监听阻塞输入事件
-- mux_poller:poll(omega.system.block_sleep, 3.0) -- 监听阻塞3秒事件
-- local event = mux_poller:block_get_next() -- 等待第一件发生的事情，然后返回这件事情
-- 如果我们监听的事件都没有发生，那么这个函数就会一直等待下去，直到有一个事件发生。

print("请随便输入点什么")
if event.type == block_input then                  -- 如果是阻塞输入事件
    print(("你输入了: %s"):format(event.data))
elseif event.type == omega.system.block_sleep then -- 如果是阻塞3秒事件
    print("你没有输入")
end
mux_poller:stop() -- 需要注意的时，因为我们只取了一个事件，所以我们调用 stop 表示剩下的事件都不要了。如果不这么干，这个程序就永远不会结束


-- 我们将上面的代码封装成一个函数，这样就可以在任何地方使用了
local function get_input_with_timeout(time_out)
    local mux_poller = omega.listen.new_mux_poller()
    local event = mux_poller:poll(block_input):poll(omega.system.block_sleep, time_out):block_get_next()
    mux_poller:stop()
    if event.type == block_input then
        return event.data
    elseif event.type == omega.system.block_sleep then
        return nil
    end
end

print("请随便输入点什么")
print(("你刚才输入了 %s"):format(get_input_with_timeout(3.0)))


-- 相比 sleep, 还有一个更好的方法， 就是使用 event_after, 相比 sleep, event_after 可以携带一个参数描述事件的类型
local mux_poller = omega.listen.new_mux_poller()
local event = mux_poller:poll(block_input):event_after(0.5, { reason = "timeout" }):block_get_next()
-- 或者这样写， 上下两种写法等价，但是下面写法风格更统一
-- local event = mux_poller:poll(block_input):poll(mux_poller.event_after, 0.5, { reason = "timeout" }):block_get_next()
-- 或者这样写，event_after 携带的参数可以是任何类型，不一定是 table ()
local event = mux_poller:poll(block_input):poll(mux_poller.event_after, 0.5, "timeout"):block_get_next()
if event.type == block_input then
    print(("你输入了: %s"):format(event.data))
elseif event.type == mux_poller.event_after then
    print(("你没有输入: %s %s"):format(event.data, event.data.reason))
end
mux_poller:stop()

-- 现在， 你可以把 mux_poller:stop() 注释掉，然后看看会发生什么。
```

简单来说就是 `oemga.listen.new_mux_poller()` 获得的 `mux_poller`【*只是一个变量名不需要纠结*】是总指挥中心 而你通过其他函数列如 `oemga.system.block_input()` 的子 `poller` 放入 `mux_poller:poll()` 中也就是: `mux_poller(poller)`

然后调用 `mux_poller:block_hash_next()` 函数就会开始堵塞 一直到 `子poller` 中任意一个事件响应,然后你就可以调用 `mux_poller:block_get_next()` 获取响应的事件 进行处理

至此进阶中最核心的部分 `poller基础用法` 已经介绍完毕了

## 4.规范的插件书写的一些建议

> 需要注意的是: 如果当你看完上面的代码就开始信心满满得去根据列子插件去书写你的插件,很有可能你会遇到各种各样的问题.那么为了避免这些问题,我们可以严格围绕 `poller` 来实现插件功能. **不要脱离poller.** 比如下面的一个插件列子

```lua
local omega = require("omega")
local print = omega.system.print
local cmds = omega.cmds
local cmds_resp = cmds.resp
--这里需要详细解释一下子
--首先是每一个需要堵塞的module几乎都需要实现poller
--来实现多个堵塞事件的监听
--何为堵塞？ 比如当你想要监听 玩家说话的时候 伪代码:getPlayerMsg()那么在玩家正式说话之前
--是不是整体代码就卡在了getPlayerMsg() 如果你有python基础那么 这个道理就是input()的等待玩家输入
--由于lua的多线程是不安全的 那么在玩家正式说话之前 整个插件都会被卡住 无法同时为多个玩家服务
--于是我们仿造了poller来实现这一问题
--每个实现了poller的module都是实现了get_source接口的模块 都可以放入mux_poller中poll
--接受等待 那么 在下方代码就是 注册一个又一个新的poller 然后让如cbs这个字典中 并且存入对应的处理方法
--然后再根据这个cbs一个一个poll注册
--一同加入堵塞等待 当事件发生时且不为nil的时候 就会获取data然后放入对应的处理函数
--如果你具备一定的代码水平 想必就明白了 这类似于回调函数
print("Hello, world! from example1")

local mux_poller = omega.listen.new_mux_poller()

local cbs = {}

local echo_poller = omega.menu.add_backend_menu_entry({
    triggers = { "echo", "repeat" },
    argument_hint = "[msg]",
    usage = "在终端上打印[msg]",
})

cbs[echo_poller] = function(terminal_cmds)
    print(("echo: %s"):format(table.concat(terminal_cmds, " ")))
end

local hello_poller = omega.menu.add_backend_menu_entry({
    triggers = { "hello", "Hello" },
    argument_hint = "[msg]",
    usage = "在终端上打印 hi [msg]",
})

cbs[hello_poller] = function(terminal_cmds)
    print(("hi: %s"):format(table.concat(terminal_cmds, " ")))
end

local game_hello_poller = omega.menu.add_game_menu_entry({
    triggers = { "hello", "Hello" },
    argument_hint = "[msg]",
    usage = "在游戏里显示 hi [msg]",
})

function talk_to(player, msg)
    cmds.send_wo_cmd(("tellraw %s {\"rawtext\":[{\"text\":\"%s\"}]}"):format(player, msg))
end

cbs[game_hello_poller] = function(chat)
    -- chat={name="...",msg={"...","...","..."},type=...,raw_msg=...,raw_name=...,raw_parameters={"...","...","..."}}
    talk_to(chat.name, ("hi: %s"):format(table.concat(chat.msg, " ")))
end

local game_echo_poller = omega.menu.add_game_menu_entry({
    triggers = { "echo", "Echo" },
    argument_hint = "[msg]",
    usage = "在游戏里显示 [msg]",
})

cbs[game_echo_poller] = function(chat)
    -- chat={name="...",msg={"...","...","..."},type=...,raw_msg=...,raw_name=...,raw_parameters={"...","...","..."}}
    talk_to(chat.name, ("%s"):format(table.concat(chat.msg, " ")))
end

local game_rebirth_poller = omega.menu.add_game_menu_entry({
    triggers = { "重生", "自刎" },
    argument_hint = "",
    usage = "返回重生点",
})

cbs[game_rebirth_poller] = function(chat)
    -- chat={name="...",msg={"...","...","..."},type=...,raw_msg=...,raw_name=...,raw_parameters={"...","...","..."}}
    talk_to(chat.name, ("重生: %s"):format(table.concat(chat.msg, " ")))
end

local game_rebirth_poller = omega.menu.add_game_menu_entry({
    triggers = { "回城", "回主城" },
    argument_hint = "",
    usage = "返回主城",
})

cbs[game_rebirth_poller] = function(chat)
    -- chat={name="...",msg={"...","...","..."},type=...,raw_msg=...,raw_name=...,raw_parameters={"...","...","..."}}
    talk_to(chat.name, ("回主城: %s"):format(table.concat(chat.msg, " ")))
end


local game_mode_poller = omega.menu.add_game_menu_entry({
    triggers = { "mode", "切换模式" },
    argument_hint = "[mode]",
    usage = "切换模式",
})

cbs[game_mode_poller] = function(chat)
    -- chat={name="...",msg={"...","...","..."},type=...,raw_msg=...,raw_name=...,raw_parameters={"...","...","..."}}
    talk_to(chat.name, ("模式: %s"):format(table.concat(chat.msg, " ")))
end

cbs[cmds.resp] = function(combined_output_and_cb)
    local resp_packet = combined_output_and_cb.output
    local cb = combined_output_and_cb.cb
end

for k, _ in pairs(cbs) do
    mux_poller:poll(k)
end
while mux_poller:block_has_next() do -- 如果有下一个事件
    local event = mux_poller:block_get_next()
    if cbs[event.type] ~= nil then
        cbs[event.type](event.data)
    end
end
```

以上的代码其实看似很多,实则只是围绕一个点来写的,事件与对应的解决方案.

## 5. 解释事件,

> 事件也就是 `子poller` ,你会发现很多函数都是返回一个子poller,比如这个echo功能

```lua
local echo_poller = omega.menu.add_backend_menu_entry({
    triggers = { "echo", "repeat" },
    argument_hint = "[msg]",
    usage = "在终端上打印[msg]",
})

cbs[echo_poller] = function(terminal_cmds)
    print(("echo: %s"):format(table.concat(terminal_cmds, " ")))
end
```

这就是一个 `最简单的交互功能` 实现 （backend是后台终端的意思 也就是omg操作页面）<br/>
首先 `cbs` 为一个字典负责存事件和对应的解决函数 以便于在最下方代码统一注册事件<br/>
然后我们获取从 `omega.menu.add_backend_menu_entry` 这个函数中获取 `子poller事件`<br/>

- echo_poller的解释
    `echo_poller` 这个函数需要的参数是一个 `table`（{}）
  
    这个table所需要携带的属性是 `triggers` <br/>
    triggers 也就是触发词 比如在后台输入 `echo` 就会触发这个poller事件<br/>
    `argument_hint` 的意思是所需要携带的参数 比如echo 你好 或者先echo 然后你好<br/>
    `usage` 也就是它是用途说明

- function的解释
  
    这一团是这个事件绑定这个解决方法 然后 `terminal_cmds` 即是poller事件触发后塞入函数的 `回应数据` 在这里就是 `玩家输入的参数` 也就是 `argument_hint` 所代表的东西

那么在书写好了这一个流程后 如何注册事件呢？

```lua
for k, _ in pairs(cbs) do
    mux_poller:poll(k)
end
while mux_poller:block_has_next() do -- 如果有下一个事件
    local event = mux_poller:block_get_next()
    if cbs[event.type] ~= nil then
        cbs[event.type](event.data)
    end
end
```

> 在代码中最后一堆就完成这样的功能 我们来慢慢解释

首先依次取出 `cbs` 中的事件 然后调用 `mux_poller的poll方法` /**这里mux_poller代表总的poller中心**/然后所有被注册的事件 在被触发的时候都会让 `mux_poller:block_has_nex` 方法返回一个 `true` 的结果 否则就是返回 `false` 所以这里用while循环判断是否有事件发生

那么在事件被触发后 `mux_poller:block_get_next()` 可以获取这个被触发的事件返回的数据

比如刚才的 `echo` 返回的就是 `终端输入的msg`

那么根据被返回的事件的 `type` 来从 `cbs` 中取出对应的函数 然后调用函数 放入数据 就可以让这个函数来处理这一数据了！

#### 特别提示

> 所以我们尽量不要在一个函数的处理方法里面写上死循环或者需要堵塞很久才能完成的功能

## 6.这后面将全是api的陆续补充

---
lang: zh-CN
title: 快速入门
description: 快速入门
sidebar:  auto
---

# 猴子也能学会的插件编写/60分钟闪电战 

在本教程中, 我们将一同编写一个 "玩家封禁" 插件  
这个插件虽然功能比较简单, 但是可以很好的展示一个插件常用 API  
好了, 现在试着跟着教程进行吧!  

## Step 0. 做好开发准备
- 开发 neomega 的 lua 插件不需要任何额外的软件, 但是我们还是推荐您使用一个具备语法高亮的编辑器进行后续的编辑, vscode 是一个不错的选项, 您也可以使用您偏好的软件, 或者, MCSM 自带的编辑器也不是不能用

- 现在, 将您的的 neomega 运行起来, 当它成功运行的时候, 应该会显示 **输入 ? 显示后台菜单** 和 **输入 reload 重启 Omega** 这两条信息, 当您看到这两条信息时, 说明开发准备已经完成了, 我们将显示这两条信息的地方称为 ***终端***

- 由于 "玩家封禁" 和 neomega 内置插件重名了, 因此请删除 **neomega_storage/config/玩家封禁[lua]** 和 **neomega_storage/lang/LuaLoader/玩家封禁.lua**

## Step 1. 创建插件
- neomega 里自带了插件创建工具, 当您在终端输入 ? 时, 可以看到弹出的菜单中存在选项: **create [plugin_name] [describe]: 创建新插件**
- 在终端中输入 **create**, 当询问插件名时, 输入 **玩家封禁**, 当询问插件描述的时候, 输入 **从终端、游戏菜单、或透过 QQ 封禁、解封玩家**
- 此时, 终端的显示应该类似于:
    ```
    开始创建插件 玩家封禁: 
            代码文件位于: <路径>/neomega_storage/lang/LuaLoader/玩家封禁.lua 
            配置文件夹位于: <路径>/neomega_storage/config/玩家封禁[lua]
    插件 玩家封禁 创建成功, 输入 reload 使之生效
    ```
    如果你的终端报错了, 请按终端提示排除错误
- 现在, 输入 reload, 插件将立刻生效
- 此时, 输入 ?, 菜单中应该出现 **玩家封禁 [arg1] [arg2] ...: 从终端、游戏菜单、或透过 QQ 封禁、解封玩家**, 如果在终端中输入 **玩家封禁** 可以看到显示 **hello from 玩家封禁!**, 恭喜, 插件已经创建成功了
- 现在, 打开 <路径>/neomega_storage/lang/LuaLoader/玩家封禁.lua 您应该能看到自动生成的初始代码, 它看起来应该像这样:
    ```lua
    local omega = require("omega")
    local json = require("json")
    package.path = ("%s;%s"):format(
        package.path,
        omega.storage_path.get_code_path("LuaLoader", "?.lua")
    )
    local coromega = require("coromega").from(omega)
    
    coromega:print("config of 玩家封禁:  ",json.encode(coromega.config))
    
    coromega:when_called_by_terminal_menu({
        triggers = { "玩家封禁" },
        argument_hint = "[arg1] [arg2] ...",
        usage = "从终端、游戏菜单、或透过 QQ 封禁、解封玩家",
    }):start_new(function(input)
        coromega:print("hello from 玩家封禁!")
    end)
    
    coromega:run()
    ```

## Step 2. 处理和获取终端输入
- 现在, 让我们审视一下自动生成的代码, 很显然, 这一段:  
    ```lua
    coromega:when_called_by_terminal_menu({
        triggers = { "玩家封禁" },
        argument_hint = "[arg1] [arg2] ...",
        usage = "从终端封禁玩家",
    })
    ```
    描述了一个终端菜单项, 所谓终端菜单项就是输入 ? 唤出的菜单的每一项


- 其中 triggers 为触发词, 一个终端菜单可以具有多个不同的触发词, 满足任意一个都可触发菜单,   
argument_hint 和 usage 并无实际作用, 但是可以提示如何使用这个菜单项,  
现在, 我们将这部分修改如下:
    ```lua
    coromega:when_called_by_terminal_menu({
        triggers = { "ban","封禁","玩家封禁" },
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从终端封禁玩家",
    })
    ```

- 输入 reload, 让修改立即生效, 此时, 再次输入 ? 可以发现, 菜单项变成了 **ban (封禁, 玩家封禁) [玩家名] [时间] [原因]: 从终端封禁玩家**。同时, 当输入 ban 或 封禁 时, 菜单项也可被激活

- 现在, 让我们从输入中读取 玩家名、时间、原因 这三个要素, 将代码扩充为:
    ```lua
    coromega:when_called_by_terminal_menu({
        triggers = { "ban", "封禁", "玩家封禁" },
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从终端封禁玩家",
    }):start_new(function(input)
        local player_name=input[1]
        local ban_time=input[2]
        local ban_reason=input[3]
        coromega:log(("封禁玩家 %s %s, 原因: %s"):format(player_name,ban_time,ban_reason))
    end)
    ```
    然后, 输入 reload, 使修改立即生效
- 此时, 输入 **ban 2401PT 1天 测试** 可以发现, 插件正确的获得并显示了我们的指令: **21:10:12 [玩家封禁] 封禁玩家 2401PT 1天, 原因: 测试** 并在日志中记录了该操作
- 但是, 如果不开眼的用户只是输入了 **ban** 没有按提示输入 **[玩家名] [时间] [原因]** 那么, 就会出现: **21:11:55 [玩家封禁] 封禁玩家 nil nil, 原因: nil**
- 很显然, 如果用户只输入了 **ban** 我们应该进一步 **交互式** 的询问用户要封禁谁?封禁多久?原因是什么? 而不是简单的报一个错完事, 因为每个人每天都有很多事要做, 记住每一条指令应该长啥样太苛刻了, **符合直觉的使用方式, 并获得符合直觉的结果** 是 neomega 的一个重要的设计准则。回到这里, 在用户没有输入必要的信息时, 我们要向用户询问缺少的信息, 现在, 将代码扩充为:
    ```lua 
    coromega:when_called_by_terminal_menu({
        triggers = { "ban", "封禁", "玩家封禁" },
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从终端封禁玩家",
    }):start_new(function(input)
        local player_name = input[1]
        local ban_time = input[2]
        local ban_reason = input[3]
        while not player_name or player_name == "" do
            player_name = coromega:input("请输入要封禁的玩家名: ")
            if not player_name or player_name == "" then
                coromega:print("玩家名不能为空")
            end
        end
        while not ban_time or ban_time == "" do
            ban_time = coromega:input("请输入要的时间: ")
            if not ban_time or ban_time == "" then
                coromega:print("封禁时间不能为空")
            end
        end
        if not ban_reason or ban_reason == "" then
            ban_reason = coromega:input("请输入封禁原因: ")
            if not ban_reason or ban_reason == "" then
                coromega:print("将封禁原因设置为: 未设定")
                ban_reason = "未设定"
            end
        end
        coromega:log(("封禁玩家 %s %s, 原因: %s"):format(player_name, ban_time, ban_reason))
    end)
    ```
    然后, 输入 reload, 使修改立即生效
- 现在试试输入 **ban** , 是不是好使多了?

## Step 3. 处理参数并计算封禁信息
- 好的, 既然已经知道了要封禁的时间, 也知道了要封禁谁, 那么让我们开始封禁吧!让我们发出一条 kick 命令, 把这个玩家踢出去:
    ```lua
    coromega:log(("封禁玩家 %s %s, 原因: %s"):format(player_name, ban_time, ban_reason))
    coromega:send_ws_cmd(("kick %s %s"):format(player_name,ban_reason),false)
    ```
    等一下!是不是哪边好像不太对?这只是把那个玩家踢出去了而已, 那他要是再进来该怎么办?  
    很简单啊, 把那个玩家再踢出去不就得了?   
    那他要是隔一天, 隔一个星期, 隔一年再进来, 还要踢吗?  
    那你肯定要问了, 我们刚刚不是已经获得 ban_time 这个参数了吗?照着ban_time封不就得了?  
    是的, 确实获得了ban_time这个参数, 但是ban_time究竟是什么?是 "35000", "1天3小时", "3d6h19min" 还是别的什么?显然, 无论它是什么, 它都没有指明, 究竟到什么时候为止, 封禁才算结束。
- 因此, 我们需要定义一个函数, 完成 ban_time 到具体封禁结束时间的转换:
    ```lua
    local take_num_from_string = function(str, unit_names)
        -- convert "1d2h3m4s" -> 2 by take_num_from_string("1d2h3m4s",{ "h", "H", "小时", "时"})
        for _, unit_name in pairs(unit_names) do
            local num = str:match("(%d+)" .. unit_name)
            if num then
                return tonumber(num)
            end
        end
        return 0
    end

    local function ban_time_to_ban_until_time(ban_time)
        -- time string can be a single number, or a string like "1d2h3m4s", or chinese like "1天2小时3分钟4秒"
        local time_seconds = 0
        -- try to parse as a single number
        local time_num = tonumber(ban_time)
        if time_num then
            time_seconds = time_num
        else
            time_seconds = time_seconds + take_num_from_string(ban_time, { "d", "D", "天" }) * 86400
            time_seconds = time_seconds + take_num_from_string(ban_time, { "h", "H", "小时", "时" }) * 3600
            time_seconds = time_seconds + take_num_from_string(ban_time, { "m", "M", "分钟", "分" }) * 60
            time_seconds = time_seconds + take_num_from_string(ban_time, { "s", "S", "秒" })
        end
        if time_seconds > 0 then
            return coromega:now()+time_seconds
        end
        return nil
    end 
    ```
    当参数 ban_time 为一个有效的时间时, 函数 ban_time_to_ban_until_time 的返回为一个 unix time stamp, 如果是一个无效的时间, 那么返回为 nil
- 接着, 让我们调用这个函数完成封禁时间到封禁截止时间的转换:
    ```lua 
    coromega:when_called_by_terminal_menu({
        triggers = { "ban", "封禁", "玩家封禁" },
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从终端封禁玩家",
    }):start_new(function(input)
        local player_name = input[1]
        local ban_until = ban_time_to_ban_until_time(input[2])
        local ban_reason = input[3]
        while not player_name or player_name == "" do
            player_name = coromega:input("请输入要封禁的玩家名: ")
            if not player_name or player_name == "" then
                coromega:print("玩家名不能为空")
            end
        end
        while not ban_until do
            ban_until = ban_time_to_ban_until_time(coromega:input("请输入要封禁的时间: "))
            if not ban_until then
                coromega:print("封禁时间不能为空")
            end
        end
        if not ban_reason or ban_reason == "" then
            ban_reason = coromega:input("请输入封禁原因: ")
            if not ban_reason or ban_reason == "" then
                coromega:print("将封禁原因设置为: 未设定")
                ban_reason = "未设定"
            end
        end
        coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name,  os.date("%Y-%m-%d %H:%M:%S", ban_until), ban_reason))
        coromega:send_ws_cmd(("kick %s %s"):format(player_name,ban_reason))
    end)
    ```
- 好的, 现在输入 reload 使修改立刻生效
- 让我们尝试一下:
    ```
    ban
    请输入要封禁的玩家名: 2401PT
    请输入要封禁的时间: 3天2小时
    请输入封禁原因: 测试
    16:57:10 [玩家封禁] 封禁玩家: 2401PT 到: 2023-09-06 18:57:08, 原因: 测试
    ```
    看起来已经顺利工作了

## Step 4. 监听玩家在线状态变化
- 有心的人应该已经发现了, 你这个玩家封禁有问题啊, 你只是在输入 ban 指令的时候将玩家踢出去了一次, 但是那个玩家要是再次上线你该怎么办捏?  
    当然, 现在可以立刻求证一下是不是这么回事, 那个被封禁的玩家, 只要再上线, 就可以逃过制裁。
- 那么该怎么办捏?其实很简单, 既然那个玩家重新上线可以逃过制裁, 那再 kick 他一次不就完事了?
- 所以, 我们现在需要让 neomega 在玩家在线状态发生变化的时候执行一段检查该玩家是否被封禁的代码:
    ```lua 
    coromega:when_player_change():start_new(function(player, action)
        -- if action == "exist" then
        --     coromega:log(("player %s 已经在线"):format(player:name()))
        -- elseif action == "online" then
        --     coromega:log(("player %s 新上线"):format(player:name()))
        -- elseif action == "offline" then
        --     coromega:log(("player %s 下线"):format(player:name()))
        -- end
        if action=="offline" then 
            return 
        end
        local player_name=player:name()
        -- coromega:log(("player %s 新上线"):format(player_name))
        local ban_info=player_banned[player_name]
        if ban_info then 
            local ban_until = ban_info.ban_until
            local ban_reason=ban_info.ban_reason
            if ban_until>coromega:now() then 
                coromega:send_ws_cmd(("kick %s %s"):format(player_name,ban_reason),false)
            else 
                player_banned[player_name]=nil
            end 
        end 
    end)
    ```
- 这段函数通过检查新上线的玩家名是否在 player_banned 中, 如果在则进一步判断是否在指定的封禁时间内, 并执行封禁和解封操作, 而 player_banned 则是由终端设置的。因此, 我们需要定义 player_banned 并设置其值:
    ```lua
    local player_banned={}
    coromega:when_called_by_terminal_menu({
        triggers = { "ban", "封禁", "玩家封禁" },
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从终端封禁玩家",
    }):start_new(function(input)

        ...

        coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name,  os.date("%Y-%m-%d %H:%M:%S", ban_until), ban_reason))
        player_banned[player_name]={
            ban_until=ban_until,
            ban_reason=ban_reason,
        }
        coromega:send_ws_cmd(("kick %s %s"):format(player_name,ban_reason),false)
    end)
    ```
- 好的, 现在输入 reload 使修改立刻生效, 这个时候, 就算重新上线也会被立刻踢下线

## Step 5. 数据库
- 但是, 你应该也已经发现一个问题, 就是, 当neoemga重启时, 好像... 封禁又失效了?这是当然的, 因为 刚刚只是把封禁信息存储到一个 变量 里, 然而, 变量会因为 neomega 的关闭或重载丢失。因此, 你需要将封禁信息存储到磁盘中。neomega 实现了一个简单的类似数据库的玩意儿, 可以帮你完成相关信息的存贮。
- 首先, 我们需要先创建或者打开一个数据库, 我们希望这个数据库被存储在 磁盘中的: neomega_storage/data/玩家封禁信息 下:
    ```lua
    local player_banned_db=coromega:key_value_db("玩家封禁信息") 
    ```
- 符合直觉的, 既然我们已经使用了数据库替代了 player_banned 这个变量, 那么自然我们也应该在其他地方用数据库操作进行替代:
    ```lua 
    -- 将:
    -- player_banned[player_name]={
    --     ban_until=ban_until,
    --     ban_reason=ban_reason,
    -- }
    -- 改为:
    player_banned_db:set(player_name,{
        ban_until=ban_until,
        ban_reason=ban_reason,
    })
    ```
    ```lua
    -- 将:
    -- local ban_info=player_banned[player_name]
    -- 改为:
    local ban_info=player_banned_db:get(player_name)
    ```
    ```lua
    -- 将:
    -- player_banned[player_name]=nil
    -- 改为:
    player_banned_db:delete(player_name)
    ```
- 现在, 即使neoemga重启了, 封禁信息依然有效, 不是吗?
- 为了防止你漏掉什么步骤, 到目前为止, 代码看起来应该像这样:
    ```lua 
    local omega = require("omega")
    local json = require("json")
    package.path = ("%s;%s"):format(
        package.path,
        omega.storage_path.get_code_path("LuaLoader", "?.lua")
    )
    local coromega = require("coromega").from(omega)

    coromega:print("config of 玩家封禁:  ",json.encode(coromega.config))

    local take_num_from_string = function(str, unit_names)
        -- convert "1d2h3m4s" -> 2 by take_num_from_string("1d2h3m4s",{ "h", "H", "小时", "时"})
        for _, unit_name in pairs(unit_names) do
            local num = str:match("(%d+)" .. unit_name)
            if num then
                return tonumber(num)
            end
        end
        return 0
    end

    local function ban_time_to_ban_until_time(ban_time)
        if not ban_time or ban_time=="" then 
            return nil 
        end
        -- time string can be a single number, or a string like "1d2h3m4s", or chinese like "1天2小时3分钟4秒"
        local time_seconds = 0
        -- try to parse as a single number
        local time_num = tonumber(ban_time)
        if time_num then
            time_seconds = time_num
        else
            time_seconds = time_seconds + take_num_from_string(ban_time, { "d", "D", "天" }) * 86400
            time_seconds = time_seconds + take_num_from_string(ban_time, { "h", "H", "小时", "时" }) * 3600
            time_seconds = time_seconds + take_num_from_string(ban_time, { "m", "M", "分钟", "分" }) * 60
            time_seconds = time_seconds + take_num_from_string(ban_time, { "s", "S", "秒" })
        end
        if time_seconds > 0 then
            return coromega:now()+time_seconds
        end
        return nil
    end 

    local player_banned_db=coromega:key_value_db("玩家封禁信息") 

    coromega:when_called_by_terminal_menu({
        triggers = { "ban", "封禁", "玩家封禁" },
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从终端封禁玩家",
    }):start_new(function(input)
        local player_name = input[1]
        local ban_until = ban_time_to_ban_until_time(input[2])
        local ban_reason = input[3]
        while not player_name or player_name == "" do
            player_name = coromega:input("请输入要封禁的玩家名: ")
            if not player_name or player_name == "" then
                coromega:print("玩家名不能为空")
            end
        end
        while not ban_until do
            ban_until = ban_time_to_ban_until_time(coromega:input("请输入要封禁的时间: "))
            if not ban_until then
                coromega:print("封禁时间不能为空")
            end
        end
        if not ban_reason or ban_reason == "" then
            ban_reason = coromega:input("请输入封禁原因: ")
            if not ban_reason or ban_reason == "" then
                coromega:print("将封禁原因设置为: 未设定")
                ban_reason = "未设定"
            end
        end
        coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name,  os.date("%Y-%m-%d %H:%M:%S", ban_until), ban_reason))
        player_banned_db:set(player_name,{
            ban_until=ban_until,
            ban_reason=ban_reason,
        })
        coromega:send_ws_cmd(("kick %s %s"):format(player_name,ban_reason),false)
    end)

    coromega:when_player_change():start_new(function(player, action)
        if action=="offline" then 
            return 
        end
        local player_name=player:name()
        local ban_info=player_banned_db:get(player_name)
        if ban_info then 
            local ban_until = ban_info.ban_until
            local ban_reason=ban_info.ban_reason
            if ban_until>coromega:now() then 
                coromega:send_ws_cmd(("kick %s %s"):format(player_name,ban_reason),false)
            else 
                player_banned_db:delete(player_name)
            end 
        end 
    end)

    coromega:run()
    ```
## Step 6. 配置文件和显示优化:
- 在我们进行下一步前, 让我们针对这几个小问题进行一点小小的优化:
    - 我不想要这个定死的触发词, 我希望它的触发词像其他的 neomega 组件那样可以修改, 因为那样很酷
    - 被封禁的玩家在被踢出时, 显示的仅仅是"您已被踢出游戏"。如果能显示更多的细节那会更好
    - 当被封禁玩家上线时, 它们看到的仅仅是 "服务器断开连接" 而不是具体的封禁信息, 那样不好
- 当然, 如果你能一路看到这边, 然后写出这一百多行代码, 你还算的上有点耐心。也许你会觉得, 啊?我以为很简单的这点功能写起来这么麻烦?哈哈, 这才哪儿到哪儿啊。
    上述这三个问题都是非常细节的问题, 而一个组件是否好用往往取决于细节方面处理的细致程度。
- 让我们从第一个问题开始, 如何从配置中获得触发词并应用触发词捏? 很简单, 配置文件(就是那个json)中的配置会被 neomega 自动转换并放在 coromega.config 中以供调用, 
    所以我们只要:  
    ```lua
    local triggers = coromega.config["触发词"]

    coromega:when_called_by_terminal_menu({
        triggers = triggers,
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从终端封禁玩家",
    })
    ```
    即可。  
    好的, 让我们输入 reload 使配置立即生效。  
    阿勒? 什么情况?   
    lua 插件: 玩家封禁.lua 出现错误:    
    interface conversion: lua.LValue is *lua.LNilType, not *lua.LTable   
    很显然, config 中并没有这一项(触发词)。你也许会说, 那在配置文件中填充这一项不就得了嘛?   
    这当然是可以的, 但是如果你以后代码要升级, 需要新的配置, 或用户粗心大意, 漏了这个配置要怎么办捏?   
    因此, 我们可以在缺少这个配置的情况下, 主动写入这个配置:
    ```lua
    if coromega.config.Version == "0.0.1" then
        coromega.config["触发词"] = { "ban", "玩家封禁", "封禁玩家" }
        coromega.config.Version = "0.0.2"
        coromega:update_config(coromega.config)
    end
    local triggers = coromega.config["触发词"]
    ```
    这一段的含义是, 如果配置文件的版本号为 0.0.1 就写入新的配置项, 并升级版本号   
    让我们输入 reload, 看看配置文件发生了什么变化:   
    这是之前的配置文件:   
    ```lua
    {
        "名称": "玩家封禁.lua",
        "描述": "从终端封禁玩家",
        "是否禁用": false,
        "来源": "LuaLoader",
        "配置": {
            "Version": "0.0.1"
        }
    }
    ```
    这是reload之后, 自动升级的配置文件:
    ```lua
    {
        "名称": "玩家封禁.lua",
        "配置": {
            "Version": "0.0.2",
            "触发词": [
                "ban",
                "玩家封禁",
                "封禁玩家"
            ]
        },
        "描述": "从终端封禁玩家",
        "是否禁用": false,
        "来源": "LuaLoader"
    }
    ```
    让我们输入 ? 看看菜单有没有正确的修改捏?
    ```
    ban (玩家封禁, 封禁玩家) [玩家名] [时间] [原因]: 从终端封禁玩家
    ```
    good, 怎么样, 还是很方便的吧?

- 那么接下来第二个问题, 还是类似的, 我们留出一个配置项让用户自己决定被踢出玩家的提示 (注意不要撞上网易的敏感词了) :
    ```lua
    if coromega.config.Version == "0.0.2" then
        coromega.config["被踢出时的提示信息"] = "您因为 [ban_reason] 被封禁到 [ban_until]"
        coromega.config["日期显示格式"] = "%Y-%m-%d %H:%M:%S"
        coromega.config.Version = "0.0.3"
        coromega:update_config(coromega.config)
    end
    local hint_format = coromega.config["被踢出时的提示信息"]
    local date_time_format = coromega.config["日期显示格式"]
    local function unix_time_to_date_time_str(unix_time)
        return os.date(date_time_format, unix_time)
    end
    local function ban_info_to_hint_str(ban_until, ban_reason)
        local hint_str = hint_format
        hint_str = hint_str:gsub("%[ban_reason%]", ban_reason)
        hint_str = hint_str:gsub("%[ban_until%]", unix_time_to_date_time_str(ban_until))
        return hint_str
    end
    ```
    然后
    ```lua
    -- 将
    -- coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_reason), false)
    -- 改为 
    coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until,ban_reason)), false)
    ```
    好的, 让我们输入 reload 使修改立刻生效, 现在再试试, 正常显示了吧?
- 最后, 是第三个问题, 为什么当被封禁玩家上线时, 它们看到的仅仅是 "服务器断开连接" 而不是具体的封禁信息?因为, neomega 的反应过于迅速, 这使得玩家被踢的过早, 以至于无法显示出这条提示信息。想要解决也很简单, 只需要等待被封禁的玩家上线几秒钟, 再踢出即可。但是, 问题在于, 有的用户希望被封禁玩家立刻被踢掉, 而不是只为了显示一个原因冒着风险等几秒再踢。  
    这个问题也很好解决, 我们只需要再添加一个配置项, 让用户自行决定即可:
    ```lua
    if coromega.config.Version == "0.0.3" then
        coromega.config["延迟踢出玩家的时间以保证原因正确显示"] = true
        coromega.config.Version = "0.0.4"
        coromega:update_config(coromega.config)
    end
    local ensure_hint_display = coromega.config["延迟踢出玩家的时间以保证原因正确显示"]
    ```
    ```lua
    if ensure_hint_display then
        coromega:sleep(4.0)
    end
    coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
    ```
    好的, 让我们现在输入 reload 使修改立刻生效。如何?显示正常了吧?
- 为了防止你错过其中的某个步骤, 到目前为止, 代码看起来应该是这样
    ```lua
    local omega = require("omega")
    local json = require("json")
    package.path = ("%s;%s"):format(
        package.path,
        omega.storage_path.get_code_path("LuaLoader", "?.lua")
    )
    local coromega = require("coromega").from(omega)

    coromega:print("config of 玩家封禁:  ", json.encode(coromega.config))

    local take_num_from_string = function(str, unit_names)
        -- convert "1d2h3m4s" -> 2 by take_num_from_string("1d2h3m4s",{ "h", "H", "小时", "时"})
        for _, unit_name in pairs(unit_names) do
            local num = str:match("(%d+)" .. unit_name)
            if num then
                return tonumber(num)
            end
        end
        return 0
    end

    local function ban_time_to_ban_until_time(ban_time)
        if not ban_time or ban_time == "" then
            return nil
        end
        -- time string can be a single number, or a string like "1d2h3m4s", or chinese like "1天2小时3分钟4秒"
        local time_seconds = 0
        -- try to parse as a single number
        local time_num = tonumber(ban_time)
        if time_num then
            time_seconds = time_num
        else
            time_seconds = time_seconds + take_num_from_string(ban_time, { "d", "D", "天" }) * 86400
            time_seconds = time_seconds + take_num_from_string(ban_time, { "h", "H", "小时", "时" }) * 3600
            time_seconds = time_seconds + take_num_from_string(ban_time, { "m", "M", "分钟", "分" }) * 60
            time_seconds = time_seconds + take_num_from_string(ban_time, { "s", "S", "秒" })
        end
        if time_seconds > 0 then
            return coromega:now() + time_seconds
        end
        return nil
    end

    local player_banned_db = coromega:key_value_db("玩家封禁信息")

    if coromega.config.Version == "0.0.1" then
        coromega.config["触发词"] = { "ban", "玩家封禁", "封禁玩家" }
        coromega.config.Version = "0.0.2"
        coromega:update_config(coromega.config)
    end
    local triggers = coromega.config["触发词"]

    if coromega.config.Version == "0.0.2" then
        coromega.config["被踢出时的提示信息"] = "您因为 [ban_reason] 被封禁到 [ban_until]"
        coromega.config["日期显示格式"] = "%Y-%m-%d %H:%M:%S"
        coromega.config.Version = "0.0.3"
        coromega:update_config(coromega.config)
    end
    local hint_format = coromega.config["被踢出时的提示信息"]
    local date_time_format = coromega.config["日期显示格式"]
    local function unix_time_to_date_time_str(unix_time)
        return os.date(date_time_format, unix_time)
    end
    local function ban_info_to_hint_str(ban_until, ban_reason)
        local hint_str = hint_format
        hint_str = hint_str:gsub("%[ban_reason%]", ban_reason)
        hint_str = hint_str:gsub("%[ban_until%]", unix_time_to_date_time_str(ban_until))
        return hint_str
    end

    if coromega.config.Version == "0.0.3" then
        coromega.config["延迟踢出玩家的时间以保证原因正确显示"] = true
        coromega.config.Version = "0.0.4"
        coromega:update_config(coromega.config)
    end
    local ensure_hint_display = coromega.config["延迟踢出玩家的时间以保证原因正确显示"]

    coromega:when_called_by_terminal_menu({
        triggers = triggers,
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从终端封禁玩家",
    }):start_new(function(input)
        local player_name = input[1]
        local ban_until = ban_time_to_ban_until_time(input[2])
        local ban_reason = input[3]
        while not player_name or player_name == "" do
            player_name = coromega:input("请输入要封禁的玩家名: ")
            if not player_name or player_name == "" then
                coromega:print("玩家名不能为空")
            end
        end
        while not ban_until do
            ban_until = ban_time_to_ban_until_time(coromega:input("请输入要封禁的时间: "))
            if not ban_until then
                coromega:print("封禁时间不能为空")
            end
        end
        if not ban_reason or ban_reason == "" then
            ban_reason = coromega:input("请输入封禁原因: ")
            if not ban_reason or ban_reason == "" then
                coromega:print("将封禁原因设置为: 未设定")
                ban_reason = "未设定"
            end
        end
        coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name, unix_time_to_date_time_str(ban_until),
            ban_reason))
        player_banned_db:set(player_name, {
            ban_until = ban_until,
            ban_reason = ban_reason,
        })
        coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
    end)

    coromega:when_player_change():start_new(function(player, action)
        if action == "offline" then
            return
        end
        local player_name = player:name()
        local ban_info = player_banned_db:get(player_name)
        if ban_info then
            local ban_until = ban_info.ban_until
            local ban_reason = ban_info.ban_reason
            if ban_until > coromega:now() then
                if ensure_hint_display then
                    coromega:sleep(4.0)
                end
                coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
            else
                player_banned_db:delete(player_name)
            end
        end
    end)

    coromega:run()
    ```


## Step 7. 添加第二个终端菜单
- 有了上述的知识之后, 添加一个解封的终端菜单显然不是一件难事, 让我们添加这一段代码:
    ```lua
    if coromega.config.Version == "0.0.4" then
        coromega.config["解封触发词"] = { "unban", "玩家解封", "解封玩家" }
        coromega.config.Version = "0.0.5"
        coromega:update_config(coromega.config)
    end
    local unban_triggers = coromega.config["解封触发词"]
    coromega:when_called_by_terminal_menu({
        triggers = unban_triggers,
        argument_hint = "[玩家名]",
        usage = "从终端解封玩家",
    }):start_new(function(input)
        local player_name = input[1]
        while not player_name or player_name == "" do
            player_name = coromega:input("请输入要解封的玩家名: ")
            if not player_name or player_name == "" then
                coromega:print("玩家名不能为空")
            end
        end
        local ban_info = player_banned_db:get(player_name)
        if not ban_info then
            coromega:print(("玩家 %s 目前并未被封禁"):format(player_name))
        else
            coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
                unix_time_to_date_time_str(ban_info.ban_until),
                ban_info.ban_reason))
            player_banned_db:delete(player_name)
        end
    end)
    ```
    好的, 输入reload, 让修改立刻生效, 如果你感到困难, 你应该回头看看之前的步骤。

# Step 8. 添加游戏内菜单
- 经过上面的一系列步骤, 这个玩家封禁组件已经是一个可用的组件了。但是从这一步开始, coromega 真正的秘密才刚刚要被揭开
- 首先, 让我们添加一个游戏内菜单, 可以注意到, 游戏内菜单添加方法和终端菜单非常接近。那是当然的, 设计成这样才能让人更好的上手不是吗?  
    不过略有不同的是, 输入的参数不再只是 input, 而是一个复杂的结构: chat。chat 中包含了比较多的信息, 可以使用 json.encode(chat) 查看。不过, 我们要关心的主要是俩: chat.msg (和input差不多的东西), chat.name 发送消息的玩家名。
    ```lua
    coromega:when_called_by_game_menu({
        triggers = triggers,
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从游戏内封禁玩家",
    }):start_new(function(chat)
        -- 如果你希望, 可以这样查看chat内包含的信息:
        print(json.encode(chat))
        local caller_name = chat.name
        local input = chat.msg
        print(("%s 在游戏内唤起了封禁功能, 参数: %s"):format(caller_name, json.encode(input)))
    end)
    ```
    在你输入reload并测试这个菜单项的时候, 你应该发现了两个现象:
    1. 这个菜单项并没有出现在默认菜单里, 而是出现在默认菜单下的 "创造菜单" 中(如果你没有调整过omega的设置), 而且, 这个菜单项不是所有人都可以调用的   
    这是因为, 菜单项所在的位置和权限全部由 "neomega_storage/config/neomega框架配置.json" 决定, 你应该在那个文件中调整菜单项的位置和配置
    2. print (当然log也一样) 输出的信息仍然位于终端, 而不是游戏里。但是你希望的是与玩家进行交互, 比如询问玩家一些信息或者向他发送信息。而这正是 neomega 一个重点支持的功能, 请看下一步。

## Step 9. 与玩家交互
- 首先, 需要明确的一点是, 如果你用命令的形式和玩家交互(比如 tellraw)之类的是没有一点问题的。但是, 你无法通过这个途径获得关于玩家的更多信息, 比如他的id, 上线时间, 权限等等信息 (关于具体有哪些api和功能, 你稍后可以自行看玩家交互相关文档) 。这里我们演示如何与玩家交流:
    ```lua  
    coromega:when_called_by_game_menu({
        triggers = triggers,
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "从游戏内封禁玩家",
    }):start_new(function(chat)
        -- 如果你希望, 可以这样查看chat内包含的信息:
        print(json.encode(chat))
        local caller_name = chat.name
        local input = chat.msg
        print(("%s 在游戏内唤起了封禁功能, 参数: %s"):format(caller_name, json.encode(input)))
        local caller = coromega:get_player_by_name(caller_name)
        if caller:is_op() then
            print("调用者是 OP")
        else
            -- 实际没必要, 因为菜单已经做了权限控制, 这里只是为了向你展示 coromega 的 player 对象可以做到命令做不到的事
            caller:say("抱歉, 你不是 OP")
        end
        local ban_player_name = input[1]
        local ban_until = ban_time_to_ban_until_time(input[2])
        local ban_reason = input[3]
        while not ban_player_name or ban_player_name == "" do
            ban_player_name = caller:ask("请输入要封禁的玩家名: ")
            if not ban_player_name or ban_player_name == "" then
                caller:say("玩家名不能为空")
            end
        end
        while not ban_until do
            ban_until = ban_time_to_ban_until_time(caller:ask("请输入要封禁的时间: "))
            if not ban_until then
                caller:say("封禁时间不能为空")
            end
        end
        if not ban_reason or ban_reason == "" then
            ban_reason = caller:ask("请输入封禁原因: ")
            if not ban_reason or ban_reason == "" then
                caller:say("将封禁原因设置为: 未设定")
                ban_reason = "未设定"
            end
        end
        coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(ban_player_name, unix_time_to_date_time_str(ban_until),
            ban_reason))
        caller:say(("封禁玩家: %s 到: %s, 原因: %s"):format(ban_player_name, unix_time_to_date_time_str(ban_until),
            ban_reason))
        player_banned_db:set(ban_player_name, {
            ban_until = ban_until,
            ban_reason = ban_reason,
        })
        coromega:send_ws_cmd(("kick %s %s"):format(ban_player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
    end)
    ```
    现在, 输入 reload 测试一下。
    很方便也很直观, 不是吗?neomega 和 coromega 在背后做了大量的工作, 使得可以轻易的编写出符合直觉且功能强大的代码

## Step X.
- 太好了, 这刚好是第 X 步。  
    罗马数字 X ... 很适合以此为标题揭露一些有趣的秘密。   
- 你有没有想过, 如果当一个玩家唤起菜单, 且当omega正在询问他信息或者与他交流时, 如果另一个玩家也唤起了菜单, 或者你自己在终端正在输入, 那么会怎么样呢?
    如果你此前没有任何代码经验的话, 你大概会觉得不明所以。是啊?所以会怎么样呢?  
    但是, 如果你此前有任何代码经验, 你大概会顿感不妙。天呐, 程序该不会卡住吧?你这么想到, 因为你很清楚, 当程序运行到 input, ask, sleep 这种地方时, 程序就会停下来等待输入或者时间到达, 这时候如果有别的事件, 比如另一个玩家唤起菜单, 程序就会卡住...吗?   
- 神奇的是, 你测试了一下, 发现这种事情并没有发生, 但这是为什么呢?
- 这就是 coromega 背后的秘密, 也是它为什么叫 coro-omega 的原因。注意到 start_new 这个函数了吗?有没有考虑过, start_new 的究竟是什么呢?
- 答案是, start_new 的是一个 coroutine, coroutine 是一个远比线程轻的东西, 它和普通的函数调用几乎没有任何区别...但是代价是什么?代价是, coroutine必须主动让出执行权, 而这会使得程序变得异常复杂...
- 而 coromega 则在背后做了大量的工作, coromega:run() 隐藏了这些复杂的细节, 并将异步, 回调, 以及复杂的协程编程用一种简单的方式提供... 你只需要记得 start_new 的是一个 协程 , 而当协程内的程序运行到需要等待的函数 (input, ask, sleep, send_ws/player_cmd, http... 等等) 的时候, 这个协程就会被自动挂起, 并执行其他协程, 直到结果返回。它用起来比线程简单, 性能比线程好, 而代价 (编程的困难) 则由 coromega 支付

## Step 11. 第二个游戏内菜单
- 有了之前的经验, 这一步应该会很容易, 插入这段代码即可:
    ```lua
    coromega:when_called_by_game_menu({
        triggers = unban_triggers,
        argument_hint = "[玩家名]",
        usage = "从游戏内解封玩家",
    }):start_new(function(chat)
        local caller_name = chat.name
        local input = chat.msg
        print(("%s 在游戏内唤起了封禁功能, 参数: %s"):format(caller_name, json.encode(input)))
        local caller = coromega:get_player_by_name(caller_name)
        local ban_player_name = input[1]
        while not ban_player_name or ban_player_name == "" do
            ban_player_name = caller:ask("请输入要解封的玩家名: ")
            if not ban_player_name or ban_player_name == "" then
                caller:say("玩家名不能为空")
            end
        end
        local ban_info = player_banned_db:get(ban_player_name)
        if not ban_info then
            caller:say(("玩家 %s 目前并未被封禁"):format(ban_player_name))
        else
            coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(ban_player_name,
                unix_time_to_date_time_str(ban_info.ban_until),
                ban_info.ban_reason))
            caller:say(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(ban_player_name,
                unix_time_to_date_time_str(ban_info.ban_until),
                ban_info.ban_reason))
            player_banned_db:delete(ban_player_name)
        end
    end)
    ```
    让我们输入 reload, 然后再测试一下, 看, 很容易吧?

## Step 12. 优化玩家输入体验
- 想必你一定注意到了, 总是有玩家会用一些非常讨厌的, 无法输入的名字。那么有没有办法优化玩家名输入体验捏?
    很简单, 我们可以添加这么一个函数 (看不懂也没关系, 这是可选的) :
    ```lua
    local function display_candidates_and_get_selection_resolver_enclosure(disp)
        local candidates = coromega:get_all_online_players()
        local selectable_candidates = {}
        for i, candidate in pairs(candidates) do
            local idx = ("%s"):format(i)
            local name = candidate:name()
            selectable_candidates[idx] = name
            disp(("%s: %s"):format(idx, name))
        end
        return function(selection)
            local seleted_candidate = selectable_candidates[selection]
            if seleted_candidate then
                return seleted_candidate
            else
                return selection
            end
        end
    end
    ```
    然后修改对应的部分 
    ```lua 
    -- player_name = coromega:input("请输入要封禁的玩家名: ")
    local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) coromega:print(info) end)
    player_name = resolver(coromega:input("请输入要封禁的玩家名, 或输入序号: "))
    if not player_name or player_name == "" then
        coromega:print("玩家名不能为空")
    end
    ```
    ```lua
    -- player_name = coromega:input("请输入要解封的玩家名: ")
    local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) coromega:print(info) end)
    player_name = resolver(coromega:input("请输入要解封的玩家名, 或输入序号: "))
    if not player_name or player_name == "" then
        coromega:print("玩家名不能为空")
    end
    ```
    ```lua
    -- ban_player_name = caller:ask("请输入要封禁的玩家名: ")
    local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) caller:say(info) end)
    ban_player_name = resolver(caller:ask("请输入要封禁的玩家名, 或输入序号: "))
    if not ban_player_name or ban_player_name == "" then
        caller:say("玩家名不能为空")
    end
    ```
    ```lua
    -- ban_player_name = caller:ask("请输入要解封的玩家名: ")
    local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) caller:say(info) end)
    ban_player_name = resolver(caller:ask("请输入要解封的玩家名, 或输入序号: "))
    if not ban_player_name or ban_player_name == "" then
        caller:say("玩家名不能为空")
    end
    ```
    输入 reload 然后观察变化, 是不是挺好使的?

## Step 13. Checkpoint
- 到这步为止, 一个合格的组件就制作完了。在这篇教程里还准备了一点别的, 比如如何从 QQ、命令块、或者从别的组件唤起。这些内容将写在 Step 14 ~ 文末
- 为了防止你漏掉了什么, 到目前为止, 整个代码应该看起来像这样:
```lua
local omega = require("omega")
local json = require("json")
package.path = ("%s;%s"):format(
    package.path,
    omega.storage_path.get_code_path("LuaLoader", "?.lua")
)
local coromega = require("coromega").from(omega)

coromega:print("config of 玩家封禁:  ", json.encode(coromega.config))

local take_num_from_string = function(str, unit_names)
    -- convert "1d2h3m4s" -> 2 by take_num_from_string("1d2h3m4s",{ "h", "H", "小时", "时"})
    for _, unit_name in pairs(unit_names) do
        local num = str:match("(%d+)" .. unit_name)
        if num then
            return tonumber(num)
        end
    end
    return 0
end

local function ban_time_to_ban_until_time(ban_time)
    if not ban_time or ban_time == "" then
        return nil
    end
    -- time string can be a single number, or a string like "1d2h3m4s", or chinese like "1天2小时3分钟4秒"
    local time_seconds = 0
    -- try to parse as a single number
    local time_num = tonumber(ban_time)
    if time_num then
        time_seconds = time_num
    else
        time_seconds = time_seconds + take_num_from_string(ban_time, { "d", "D", "天" }) * 86400
        time_seconds = time_seconds + take_num_from_string(ban_time, { "h", "H", "小时", "时" }) * 3600
        time_seconds = time_seconds + take_num_from_string(ban_time, { "m", "M", "分钟", "分" }) * 60
        time_seconds = time_seconds + take_num_from_string(ban_time, { "s", "S", "秒" })
    end
    if time_seconds > 0 then
        return coromega:now() + time_seconds
    end
    return nil
end

local player_banned_db = coromega:key_value_db("玩家封禁信息")

if coromega.config.Version == "0.0.1" then
    coromega.config["触发词"] = { "ban", "玩家封禁", "封禁玩家" }
    coromega.config.Version = "0.0.2"
    coromega:update_config(coromega.config)
end
local triggers = coromega.config["触发词"]

if coromega.config.Version == "0.0.2" then
    coromega.config["被踢出时的提示信息"] = "您因为 [ban_reason] 被封禁到 [ban_until]"
    coromega.config["日期显示格式"] = "%Y-%m-%d %H:%M:%S"
    coromega.config.Version = "0.0.3"
    coromega:update_config(coromega.config)
end
local hint_format = coromega.config["被踢出时的提示信息"]
local date_time_format = coromega.config["日期显示格式"]
local function unix_time_to_date_time_str(unix_time)
    return os.date(date_time_format, unix_time)
end
local function ban_info_to_hint_str(ban_until, ban_reason)
    local hint_str = hint_format
    hint_str = hint_str:gsub("%[ban_reason%]", ban_reason)
    hint_str = hint_str:gsub("%[ban_until%]", unix_time_to_date_time_str(ban_until))
    return hint_str
end

if coromega.config.Version == "0.0.3" then
    coromega.config["延迟踢出玩家的时间以保证原因正确显示"] = true
    coromega.config.Version = "0.0.4"
    coromega:update_config(coromega.config)
end
local ensure_hint_display = coromega.config["延迟踢出玩家的时间以保证原因正确显示"]

local function display_candidates_and_get_selection_resolver_enclosure(disp)
    local candidates = coromega:get_all_online_players()
    local selectable_candidates = {}
    for i, candidate in pairs(candidates) do
        local idx = ("%s"):format(i)
        local name = candidate:name()
        selectable_candidates[idx] = name
        disp(("%s: %s"):format(idx, name))
    end
    return function(selection)
        local seleted_candidate = selectable_candidates[selection]
        if seleted_candidate then
            return seleted_candidate
        else
            return selection
        end
    end
end

coromega:when_called_by_terminal_menu({
    triggers = triggers,
    argument_hint = "[玩家名] [时间] [原因]",
    usage = "从终端封禁玩家",
}):start_new(function(input)
    local player_name = input[1]
    local ban_until = ban_time_to_ban_until_time(input[2])
    local ban_reason = input[3]
    while not player_name or player_name == "" do
        local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) coromega:print(info) end)
        player_name = resolver(coromega:input("请输入要封禁的玩家名, 或输入序号: "))
        if not player_name or player_name == "" then
            coromega:print("玩家名不能为空")
        end
    end
    while not ban_until do
        ban_until = ban_time_to_ban_until_time(coromega:input("请输入要封禁的时间: "))
        if not ban_until then
            coromega:print("封禁时间不能为空")
        end
    end
    if not ban_reason or ban_reason == "" then
        ban_reason = coromega:input("请输入封禁原因: ")
        if not ban_reason or ban_reason == "" then
            coromega:print("将封禁原因设置为: 未设定")
            ban_reason = "未设定"
        end
    end
    coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name, unix_time_to_date_time_str(ban_until),
        ban_reason))
    player_banned_db:set(player_name, {
        ban_until = ban_until,
        ban_reason = ban_reason,
    })
    coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
end)

if coromega.config.Version == "0.0.4" then
    coromega.config["解封触发词"] = { "unban", "玩家解封", "解封玩家" }
    coromega.config.Version = "0.0.5"
    coromega:update_config(coromega.config)
end
local unban_triggers = coromega.config["解封触发词"]
coromega:when_called_by_terminal_menu({
    triggers = unban_triggers,
    argument_hint = "[玩家名]",
    usage = "从终端解封玩家",
}):start_new(function(input)
    local player_name = input[1]
    while not player_name or player_name == "" do
        local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) coromega:print(info) end)
        player_name = resolver(coromega:input("请输入要解封的玩家名, 或输入序号: "))
        if not player_name or player_name == "" then
            coromega:print("玩家名不能为空")
        end
    end
    local ban_info = player_banned_db:get(player_name)
    if not ban_info then
        coromega:print(("玩家 %s 目前并未被封禁"):format(player_name))
    else
        coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
            unix_time_to_date_time_str(ban_info.ban_until),
            ban_info.ban_reason))
        player_banned_db:delete(player_name)
    end
end)



coromega:when_called_by_game_menu({
    triggers = triggers,
    argument_hint = "[玩家名] [时间] [原因]",
    usage = "从游戏内封禁玩家",
}):start_new(function(chat)
    -- 如果你希望, 可以这样查看chat内包含的信息:
    -- print(json.encode(chat))
    local caller_name = chat.name
    local input = chat.msg
    -- print(("%s 在游戏内唤起了封禁功能, 参数: %s"):format(caller_name, json.encode(input)))
    local caller = coromega:get_player_by_name(caller_name)
    -- if caller:is_op() then
    --     print("调用者是 OP")
    -- else
    --     -- 实际没必要, 因为菜单已经做了权限控制, 这里只是为了向你展示 coromega 的 player 对象可以做到命令做不到的事
    --     caller:say("抱歉, 你不是 OP")
    -- end
    local ban_player_name = input[1]
    local ban_until = ban_time_to_ban_until_time(input[2])
    local ban_reason = input[3]
    while not ban_player_name or ban_player_name == "" do
        -- ban_player_name = caller:ask("请输入要封禁的玩家名: ")
        local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) caller:say(info) end)
        ban_player_name = resolver(caller:ask("请输入要封禁的玩家名, 或输入序号: "))
        if not ban_player_name or ban_player_name == "" then
            caller:say("玩家名不能为空")
        end
    end
    while not ban_until do
        ban_until = ban_time_to_ban_until_time(caller:ask("请输入要封禁的时间: "))
        if not ban_until then
            caller:say("封禁时间不能为空")
        end
    end
    if not ban_reason or ban_reason == "" then
        ban_reason = caller:ask("请输入封禁原因: ")
        if not ban_reason or ban_reason == "" then
            caller:say("将封禁原因设置为: 未设定")
            ban_reason = "未设定"
        end
    end
    coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(ban_player_name, unix_time_to_date_time_str(ban_until),
        ban_reason))
    caller:say(("封禁玩家: %s 到: %s, 原因: %s"):format(ban_player_name, unix_time_to_date_time_str(ban_until),
        ban_reason))
    player_banned_db:set(ban_player_name, {
        ban_until = ban_until,
        ban_reason = ban_reason,
    })
    coromega:send_ws_cmd(("kick %s %s"):format(ban_player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
end)


coromega:when_called_by_game_menu({
    triggers = unban_triggers,
    argument_hint = "[玩家名]",
    usage = "从游戏内解封玩家",
}):start_new(function(chat)
    local caller_name = chat.name
    local input = chat.msg
    print(("%s 在游戏内唤起了封禁功能, 参数: %s"):format(caller_name, json.encode(input)))
    local caller = coromega:get_player_by_name(caller_name)
    local ban_player_name = input[1]
    while not ban_player_name or ban_player_name == "" do
        -- ban_player_name = caller:ask("请输入要解封的玩家名: ")
        local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) caller:say(info) end)
        ban_player_name = resolver(caller:ask("请输入要解封的玩家名, 或输入序号: "))
        if not ban_player_name or ban_player_name == "" then
            caller:say("玩家名不能为空")
        end
    end
    local ban_info = player_banned_db:get(ban_player_name)
    if not ban_info then
        caller:say(("玩家 %s 目前并未被封禁"):format(ban_player_name))
    else
        coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(ban_player_name,
            unix_time_to_date_time_str(ban_info.ban_until),
            ban_info.ban_reason))
        caller:say(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(ban_player_name,
            unix_time_to_date_time_str(ban_info.ban_until),
            ban_info.ban_reason))
        player_banned_db:delete(ban_player_name)
    end
end)


coromega:when_player_change():start_new(function(player, action)
    if action == "offline" then
        return
    end
    local player_name = player:name()
    local ban_info = player_banned_db:get(player_name)
    if ban_info then
        local ban_until = ban_info.ban_until
        local ban_reason = ban_info.ban_reason
        if ban_until > coromega:now() then
            if ensure_hint_display then
                coromega:sleep(4.0)
            end
            coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
        else
            player_banned_db:delete(player_name)
        end
    end
end)

coromega:run()

```

## Step 14. 从命令块封禁玩家
- 用命令块调用机器人封禁玩家应该算是本教程中最简单的部分了。
- 准备两个命令块, 名字填为 #ban (#最好不要丢)。
- #ban 命令块 里面的内容填为 tell @a[tag=omega_bot] 玩家名(例如 @p[tag=ban]) 时间(例如1d) 原因(例如测试)。看起来像这样 tell @a[tag=omega_bot] @p[tag=ban] 1d 测试 。需要注意的是, 应该用 @p 而不是 @a, 同时, 如果用的是循环命令方块, 频率不要太高, 不然可能会卡(40,60,80等等较为合适)
- 虽然因为机器人会把被封禁的玩家踢下线导致命令块无法用上述方式发送解封指令 (除非你把频率调的很高, 但那样会卡) , 但是如果你修改程序, 使得机器人在玩家上线一会儿之后才踢人, 那也是可以做的, 只是没什么意义
- 最后, 如果命令块的内容类似于 execute @e[type=snowball] ~ ~ ~ tell  @a[tag=omega_bot] @p[r=3], 那么应当监听物品名 (coromega:when_receive_msg_from_sender_named) 而不是命令方块名 (coromega:when_receive_msg_from_command_block_named) 因为 execute 改变了发送者
- 好了, 现在, 在代码中为机器人自己添加 omega_bot 的 tag, 并监听命令块的消息
    ```lua
    coromega:start_new(function()
        local result = coromega:send_ws_cmd("tag @s add omega_bot", true)
        -- coromega:print(json.encode(result)) 显示 tag add 指令结果, 注意, 如果是第二次add, 可能收到失败的回执
        coromega:print("已添加 omega_bot 的 tag")
    end)

    coromega:when_receive_msg_from_command_block_named("#ban"):start_new(function(chat)
        local input = chat.msg
        local player_name = input[1]
        local ban_until = ban_time_to_ban_until_time(input[2])
        local ban_reason = input[3]
        if not player_name or player_name == "" then
            coromega:print("玩家名不能为空")
        end
        if not ban_until then
            coromega:print("封禁时间不能为空")
        end
        if not ban_reason or ban_reason == "" then
            coromega:print("将封禁原因设置为: 未设定")
            ban_reason = "未设定"
        end
        coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name, unix_time_to_date_time_str(ban_until),
            ban_reason))
        player_banned_db:set(player_name, {
            ban_until = ban_until,
            ban_reason = ban_reason,
        })
        coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
    end)
    ```
- 很显然, 说命令块简单的原因是, 它没有询问参数这个步骤

## Step 15. 暴露 解封/封禁 API 以供其他组件调用
- 如果你以前开发过 dotcs 的组件, 那么对这个功能应该还是挺熟悉的, 也就是所谓的 "前置组件" 。但是和 dotcs 的前置组件不同的是, 在这里, 所有组件都是平行而不分前后, 组件之间可以平行的相互调用。
- 好的, 首先让我们在组件内插入api暴露相关代码, api名建议使用类似 url 的 / 来表示不同的功能划分
    ```lua
    coromega:when_called_by_api_named("/player/ban"):start_new(function(args, set_result)
        local player_name = args.player_name
        local ban_until = ban_time_to_ban_until_time(args.ban_time)
        local ban_reason = args.ban_reason
        if not player_name or player_name == "" then
            set_result(json.encode({ ok = false, err = "玩家名不能为空" }))
            return
        end
        if not ban_until then
            set_result(json.encode({ ok = false, err = "封禁时间不能为空" }))
            return
        end
        if not ban_reason or ban_reason == "" then
            ban_reason = "未设定"
        end
        coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name, unix_time_to_date_time_str(ban_until),
            ban_reason))
        player_banned_db:set(player_name, {
            ban_until = ban_until,
            ban_reason = ban_reason,
        })
        coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
        set_result(json.encode({
            ok = true,
            detail = ("封禁玩家: %s 到: %s, 原因: %s"):format(player_name, unix_time_to_date_time_str(ban_until),
                ban_reason)
        }))
    end)

    coromega:when_called_by_api_named("/player/unban"):start_new(function(args, set_result)
        local player_name = args.player_name
        if not player_name or player_name == "" then
            set_result(json.encode({ ok = false, err = "玩家名不能为空" }))
            return
        end
        local ban_info = player_banned_db:get(player_name)
        if not ban_info then
            set_result(json.encode({ ok = true, detail = ("玩家 %s 目前并未被封禁"):format(player_name) }))
        else
            coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
                unix_time_to_date_time_str(ban_info.ban_until),
                ban_info.ban_reason))
            set_result(json.encode({
                ok = true,
                detail = ("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
                    unix_time_to_date_time_str(ban_info.ban_until),
                    ban_info.ban_reason)
            }))
            player_banned_db:delete(player_name)
        end
    end)
    ```
    为了测试和调用这两个 api, 我们还需要另外创建一个组件, 现在输入:  
    ```
    create check_ban 测试玩家封禁  
    ```
    以创建新组件,   
    然后在新组件内部调用刚刚的接口
    ```lua
    local omega = require("omega")
    local json = require("json")
    package.path = ("%s;%s"):format(
        package.path,
        omega.storage_path.get_code_path("LuaLoader", "?.lua")
    )
    local coromega = require("coromega").from(omega)

    coromega:print("config of check_ban:  ", json.encode(coromega.config))

    coromega:when_called_by_terminal_menu({
        triggers = { "check_ban" },
        argument_hint = "[玩家名] [时间] [原因]",
        usage = "测试玩家封禁",
    }):start_new(function(input)
        local player_name = input[1]
        local ban_time = input[2]
        local ban_reason = input[3]
        while not player_name or player_name == "" do
            player_name = coromega:input("请输入要封禁的玩家名: ")
            if not player_name or player_name == "" then
                coromega:print("玩家名不能为空")
            end
        end
        while not ban_time or ban_time == "" do
            ban_time = coromega:input("请输入要的时间: ")
            if not ban_time or ban_time == "" then
                coromega:print("封禁时间不能为空")
            end
        end

        -- 调用其他插件的接口
        local result = coromega:call_other_plugin_api("/player/ban",
            { player_name = player_name, ban_time = ban_time, ban_reason = ban_reason })
        if result.ok then
            coromega:log(("调用成功: %s"):format(result.detail))
        else
            coromega:log(("调用失败: %s"):format(result.err))
        end
    end)

    coromega:run()
    ```

## Step 16. 从 QQ 解封和封禁玩家
- QQ 最为麻烦之处在于, 它有许多群、频道、私聊, 有许多人。一个人可能在一些群、频道、私聊中, 一个群、频道中不是所有人都有权限, 有权限的人还要把普通聊天信息和指令区分开来。因此, 问题变得格外麻烦。
- 首先, 我们需要先读取配置项, 并转换其形式以便后续处理
    ```lua 
    if coromega.config.Version == "0.0.5" then
        coromega.config["从QQ接受封禁指令"] = {
            ["2401PT#1634268014@好友:1634268014"] = "#ban 玩家名 秒数 原因",
            ["2401PT#1634268014@群聊:548589654"] = "#ban 玩家名 秒数 原因",
            ["频道成员-2401PT#31415926545872@频道:2401的频道:机器人测试聊天室"] = "[CQ:at,qq=144115219209376165] #ban 玩家名 秒数 原因"
        }
        coromega.config["从QQ接受解封指令"] = {
            ["2401PT#1634268014@好友:1634268014"] = "#unban 玩家名",
            ["2401PT#1634268014@群聊:548589654"] = "[CQ:at,qq=2041243708] #unban 玩家名",
            ["频道成员-2401PT#31415926545872@频道:2401的频道:机器人测试聊天室"] = "[CQ:at,qq=144115219209376165] #unban 玩家名"
        }
        coromega.config.Version = "0.0.6"
        coromega:update_config(coromega.config)
    end

    local qq_ban_permission = coromega.config["从QQ接受封禁指令"]
    local qq_unban_permission = coromega.config["从QQ接受解封指令"]
    local qq_ban_matcher = {}
    for who, format in pairs(qq_ban_permission) do
        -- who is something like "2401PT@好友:1634268014"
        -- format is something like "#ban 玩家名 时间 原因"
        -- then replace 玩家名/时间/原因 with .+
        local matcher_str = who .. ">" .. format:gsub("玩家名", ""):gsub("时间", ""):gsub("秒数", ""):gsub("原因",
            ""):gsub("^%s*(.-)%s*$", "%1")
        -- 2401PT#1634268014@好友:1634268014 -> 好友:1634268014
        local resp_target = who:sub(who:find("@") + 1)
        qq_ban_matcher[#qq_ban_matcher + 1] = { matcher_str, resp_target }
    end

    local qq_unban_matcher = {}
    for who, format in pairs(qq_unban_permission) do
        local matcher_str = who .. ">" .. format:gsub("玩家名", ""):gsub("^%s*(.-)%s*$", "%1")
        local resp_target = who:sub(who:find("@") + 1)
        qq_unban_matcher[#qq_unban_matcher + 1] = { matcher_str, resp_target }
    end
    ```
    其中, 类似 [CQ:at,qq=2041243708] 代表 @机器人 的行为
- 接着, 让我们监听 QQ 内的消息:
    ```lua
    coromega:when_receive_filtered_cqhttp_message_from_default():start_new(function(source, name, message)
        print(("cqhttp 默认监听对象> 来源: %s, 名字: %s, 消息: %s"):format(source, name, message))
    end)
    ```
    其中:
    - message 为用户发送的消息
    - source 为消息的来源, 其形式为 好友:qq号 群聊:群号 或者 频道:频道名:聊天室名 
    - name 为发送者, 形式为 昵称#qq号/频道id
- 最后, 让我们处理QQ的消息, 并执行相应的封禁和解封指令
    ```lua
    coromega:when_receive_filtered_cqhttp_message_from_default():start_new(function(source, name, message)
        local who = ("%s@%s"):format(name, source)
        local matchers = qq_ban_matcher[who]
        if matchers then
            for _, matcher_str in pairs(matchers) do
                -- take 玩家名 秒数 原因 from qq_str by matcher_str
                if message:sub(1, matcher_str:len()) == matcher_str then
                    local cmd = message:sub(matcher_str:len() + 1)
                    -- trim space
                    cmd = cmd:gsub("^%s*(.-)%s*$", "%1")
                    -- split by space
                    local args = {}
                    for arg in cmd:gmatch("%S+") do
                        args[#args + 1] = arg
                    end
                    local player_name = args[1]
                    local ban_until = ban_time_to_ban_until_time(args[2])
                    local ban_reason = args[3]
                    if not player_name then
                        coromega:send_cqhttp_message(source, "玩家名不能为空")
                        return
                    end
                    if not ban_until then
                        coromega:send_cqhttp_message(source, "封禁时间无效")
                        return
                    end
                    if not ban_reason then
                        ban_reason = "未设定"
                    end
                    coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name,
                        unix_time_to_date_time_str(ban_until),
                        ban_reason))
                    coromega:send_cqhttp_message(source, ("封禁玩家: %s 到: %s, 原因: %s"):format(
                        player_name,
                        unix_time_to_date_time_str(ban_until),
                        ban_reason))
                    player_banned_db:set(player_name, {
                        ban_until = ban_until,
                        ban_reason = ban_reason,
                    })
                    coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)),
                        false)
                end
            end
        end
        local matchers = qq_unban_matcher[who]
        if matchers then
            for _, matcher_str in pairs(matchers) do
                -- take 玩家名 秒数 原因 from qq_str by matcher_str
                if message:sub(1, matcher_str:len()) == matcher_str then
                    local cmd = message:sub(matcher_str:len() + 1)
                    -- trim space
                    cmd = cmd:gsub("^%s*(.-)%s*$", "%1")
                    -- split by space
                    local args = {}
                    for arg in cmd:gmatch("%S+") do
                        args[#args + 1] = arg
                    end
                    local player_name = args[1]
                    if not player_name then
                        coromega:send_cqhttp_message(source, "玩家名不能为空")
                        return
                    end
                    local ban_info = player_banned_db:get(player_name)
                    if not ban_info then
                        coromega:send_cqhttp_message(source, ("玩家 %s 目前并未被封禁"):format(
                            player_name))
                    else
                        coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
                            unix_time_to_date_time_str(ban_info.ban_until),
                            ban_info.ban_reason))
                        coromega:send_cqhttp_message(source,
                            ("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
                                unix_time_to_date_time_str(ban_info.ban_until),
                                ban_info.ban_reason))
                        player_banned_db:delete(player_name)
                    end
                end
            end
        end
    end)
    ```

## 写在最后
- 你也许注意到了自带的lua组件的风格和本教程不太一样, 这是因为本教程的写法基于 coromega。coromega 是从 omega 拓展而来, 其相比 omega 会好写很多, 但是性能稍微差一点点。在未来可能内置的组件也会被改为 coromega 的写法
- 在本教程中, 展示了许多 api, 但这仅仅是其中一小部分。还有许多 api 没有展示, 甚至方块操作, 建筑文件相关 api 完全没有展示。关于这些 api, 请自行查阅 api 文档
  
## 完整代码
```lua
local omega = require("omega")
local json = require("json")
package.path = ("%s;%s"):format(
    package.path,
    omega.storage_path.get_code_path("LuaLoader", "?.lua")
)
local coromega = require("coromega").from(omega)

coromega:print("config of 玩家封禁:  ", json.encode(coromega.config))

local take_num_from_string = function(str, unit_names)
    -- convert "1d2h3m4s" -> 2 by take_num_from_string("1d2h3m4s",{ "h", "H", "小时", "时"})
    for _, unit_name in pairs(unit_names) do
        local num = str:match("(%d+)" .. unit_name)
        if num then
            return tonumber(num)
        end
    end
    return 0
end

local function ban_time_to_ban_until_time(ban_time)
    if not ban_time or ban_time == "" then
        return nil
    end
    -- time string can be a single number, or a string like "1d2h3m4s", or chinese like "1天2小时3分钟4秒"
    local time_seconds = 0
    -- try to parse as a single number
    local time_num = tonumber(ban_time)
    if time_num then
        time_seconds = time_num
    else
        time_seconds = time_seconds + take_num_from_string(ban_time, { "d", "D", "天" }) * 86400
        time_seconds = time_seconds + take_num_from_string(ban_time, { "h", "H", "小时", "时" }) * 3600
        time_seconds = time_seconds + take_num_from_string(ban_time, { "m", "M", "分钟", "分" }) * 60
        time_seconds = time_seconds + take_num_from_string(ban_time, { "s", "S", "秒" })
    end
    if time_seconds > 0 then
        return coromega:now() + time_seconds
    end
    return nil
end

local player_banned_db = coromega:key_value_db("玩家封禁信息")

if coromega.config.Version == "0.0.1" then
    coromega.config["触发词"] = { "ban", "玩家封禁", "封禁玩家" }
    coromega.config.Version = "0.0.2"
    coromega:update_config(coromega.config)
end
local triggers = coromega.config["触发词"]

if coromega.config.Version == "0.0.2" then
    coromega.config["被踢出时的提示信息"] = "您因为 [ban_reason] 被封禁到 [ban_until]"
    coromega.config["日期显示格式"] = "%Y-%m-%d %H:%M:%S"
    coromega.config.Version = "0.0.3"
    coromega:update_config(coromega.config)
end
local hint_format = coromega.config["被踢出时的提示信息"]
local date_time_format = coromega.config["日期显示格式"]
local function unix_time_to_date_time_str(unix_time)
    return os.date(date_time_format, unix_time)
end
local function ban_info_to_hint_str(ban_until, ban_reason)
    local hint_str = hint_format
    hint_str = hint_str:gsub("%[ban_reason%]", ban_reason)
    hint_str = hint_str:gsub("%[ban_until%]", unix_time_to_date_time_str(ban_until))
    return hint_str
end

if coromega.config.Version == "0.0.3" then
    coromega.config["延迟踢出玩家的时间以保证原因正确显示"] = true
    coromega.config.Version = "0.0.4"
    coromega:update_config(coromega.config)
end
local ensure_hint_display = coromega.config["延迟踢出玩家的时间以保证原因正确显示"]

local function display_candidates_and_get_selection_resolver_enclosure(disp)
    local candidates = coromega:get_all_online_players()
    local selectable_candidates = {}
    for i, candidate in pairs(candidates) do
        local idx = ("%s"):format(i)
        local name = candidate:name()
        selectable_candidates[idx] = name
        disp(("%s: %s"):format(idx, name))
    end
    return function(selection)
        local seleted_candidate = selectable_candidates[selection]
        if seleted_candidate then
            return seleted_candidate
        else
            return selection
        end
    end
end

coromega:when_called_by_terminal_menu({
    triggers = triggers,
    argument_hint = "[玩家名] [时间] [原因]",
    usage = "从终端封禁玩家",
}):start_new(function(input)
    local player_name = input[1]
    local ban_until = ban_time_to_ban_until_time(input[2])
    local ban_reason = input[3]
    while not player_name or player_name == "" do
        local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) coromega:print(info) end)
        player_name = resolver(coromega:input("请输入要封禁的玩家名, 或输入序号: "))
        if not player_name or player_name == "" then
            coromega:print("玩家名不能为空")
        end
    end
    while not ban_until do
        ban_until = ban_time_to_ban_until_time(coromega:input("请输入要封禁的时间: "))
        if not ban_until then
            coromega:print("封禁时间不能为空")
        end
    end
    if not ban_reason or ban_reason == "" then
        ban_reason = coromega:input("请输入封禁原因: ")
        if not ban_reason or ban_reason == "" then
            coromega:print("将封禁原因设置为: 未设定")
            ban_reason = "未设定"
        end
    end
    coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name, unix_time_to_date_time_str(ban_until),
        ban_reason))
    player_banned_db:set(player_name, {
        ban_until = ban_until,
        ban_reason = ban_reason,
    })
    coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
end)

if coromega.config.Version == "0.0.4" then
    coromega.config["解封触发词"] = { "unban", "玩家解封", "解封玩家" }
    coromega.config.Version = "0.0.5"
    coromega:update_config(coromega.config)
end
local unban_triggers = coromega.config["解封触发词"]
coromega:when_called_by_terminal_menu({
    triggers = unban_triggers,
    argument_hint = "[玩家名]",
    usage = "从终端解封玩家",
}):start_new(function(input)
    local player_name = input[1]
    while not player_name or player_name == "" do
        local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) coromega:print(info) end)
        player_name = resolver(coromega:input("请输入要解封的玩家名, 或输入序号: "))
        if not player_name or player_name == "" then
            coromega:print("玩家名不能为空")
        end
    end
    local ban_info = player_banned_db:get(player_name)
    if not ban_info then
        coromega:print(("玩家 %s 目前并未被封禁"):format(player_name))
    else
        coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
            unix_time_to_date_time_str(ban_info.ban_until),
            ban_info.ban_reason))
        player_banned_db:delete(player_name)
    end
end)



coromega:when_called_by_game_menu({
    triggers = triggers,
    argument_hint = "[玩家名] [时间] [原因]",
    usage = "从游戏内封禁玩家",
}):start_new(function(chat)
    -- 如果你希望, 可以这样查看chat内包含的信息:
    -- print(json.encode(chat))
    local caller_name = chat.name
    local input = chat.msg
    -- print(("%s 在游戏内唤起了封禁功能, 参数: %s"):format(caller_name, json.encode(input)))
    local caller = coromega:get_player_by_name(caller_name)
    -- if caller:is_op() then
    --     print("调用者是 OP")
    -- else
    --     -- 实际没必要, 因为菜单已经做了权限控制, 这里只是为了向你展示 coromega 的 player 对象可以做到命令做不到的事
    --     caller:say("抱歉, 你不是 OP")
    -- end
    local ban_player_name = input[1]
    local ban_until = ban_time_to_ban_until_time(input[2])
    local ban_reason = input[3]
    while not ban_player_name or ban_player_name == "" do
        -- ban_player_name = caller:ask("请输入要封禁的玩家名: ")
        local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) caller:say(info) end)
        ban_player_name = resolver(caller:ask("请输入要封禁的玩家名, 或输入序号: "))
        if not ban_player_name or ban_player_name == "" then
            caller:say("玩家名不能为空")
        end
    end
    while not ban_until do
        ban_until = ban_time_to_ban_until_time(caller:ask("请输入要封禁的时间: "))
        if not ban_until then
            caller:say("封禁时间不能为空")
        end
    end
    if not ban_reason or ban_reason == "" then
        ban_reason = caller:ask("请输入封禁原因: ")
        if not ban_reason or ban_reason == "" then
            caller:say("将封禁原因设置为: 未设定")
            ban_reason = "未设定"
        end
    end
    coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(ban_player_name, unix_time_to_date_time_str(ban_until),
        ban_reason))
    caller:say(("封禁玩家: %s 到: %s, 原因: %s"):format(ban_player_name, unix_time_to_date_time_str(ban_until),
        ban_reason))
    player_banned_db:set(ban_player_name, {
        ban_until = ban_until,
        ban_reason = ban_reason,
    })
    coromega:send_ws_cmd(("kick %s %s"):format(ban_player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
end)


coromega:when_called_by_game_menu({
    triggers = unban_triggers,
    argument_hint = "[玩家名]",
    usage = "从游戏内解封玩家",
}):start_new(function(chat)
    local caller_name = chat.name
    local input = chat.msg
    print(("%s 在游戏内唤起了封禁功能, 参数: %s"):format(caller_name, json.encode(input)))
    local caller = coromega:get_player_by_name(caller_name)
    local ban_player_name = input[1]
    while not ban_player_name or ban_player_name == "" do
        -- ban_player_name = caller:ask("请输入要解封的玩家名: ")
        local resolver = display_candidates_and_get_selection_resolver_enclosure(function(info) caller:say(info) end)
        ban_player_name = resolver(caller:ask("请输入要解封的玩家名, 或输入序号: "))
        if not ban_player_name or ban_player_name == "" then
            caller:say("玩家名不能为空")
        end
    end
    local ban_info = player_banned_db:get(ban_player_name)
    if not ban_info then
        caller:say(("玩家 %s 目前并未被封禁"):format(ban_player_name))
    else
        coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(ban_player_name,
            unix_time_to_date_time_str(ban_info.ban_until),
            ban_info.ban_reason))
        caller:say(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(ban_player_name,
            unix_time_to_date_time_str(ban_info.ban_until),
            ban_info.ban_reason))
        player_banned_db:delete(ban_player_name)
    end
end)

coromega:start_new(function()
    local result = coromega:send_ws_cmd("tag @s add omega_bot", true)
    -- coromega:print(json.encode(result)) 显示 tag add 指令结果, 注意, 如果是第二次add, 可能收到失败的回执
    coromega:print("已添加 omega_bot 的 tag")
end)

coromega:when_receive_msg_from_command_block_named("#ban"):start_new(function(chat)
    local input = chat.msg
    local player_name = input[1]
    local ban_until = ban_time_to_ban_until_time(input[2])
    local ban_reason = input[3]
    if not player_name or player_name == "" then
        coromega:print("玩家名不能为空")
    end
    if not ban_until then
        coromega:print("封禁时间不能为空")
    end
    if not ban_reason or ban_reason == "" then
        coromega:print("将封禁原因设置为: 未设定")
        ban_reason = "未设定"
    end
    coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name, unix_time_to_date_time_str(ban_until),
        ban_reason))
    player_banned_db:set(player_name, {
        ban_until = ban_until,
        ban_reason = ban_reason,
    })
    coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
end)

coromega:when_called_by_api_named("/player/ban"):start_new(function(args, set_result)
    local player_name = args.player_name
    local ban_until = ban_time_to_ban_until_time(args.ban_time)
    local ban_reason = args.ban_reason
    if not player_name or player_name == "" then
        set_result(json.encode({ ok = false, err = "玩家名不能为空" }))
        return
    end
    if not ban_until then
        set_result(json.encode({ ok = false, err = "封禁时间不能为空" }))
        return
    end
    if not ban_reason or ban_reason == "" then
        ban_reason = "未设定"
    end
    coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name, unix_time_to_date_time_str(ban_until),
        ban_reason))
    player_banned_db:set(player_name, {
        ban_until = ban_until,
        ban_reason = ban_reason,
    })
    coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
    set_result(json.encode({
        ok = true,
        detail = ("封禁玩家: %s 到: %s, 原因: %s"):format(player_name, unix_time_to_date_time_str(ban_until),
            ban_reason)
    }))
end)

coromega:when_called_by_api_named("/player/unban"):start_new(function(args, set_result)
    local player_name = args.player_name
    if not player_name or player_name == "" then
        set_result(json.encode({ ok = false, err = "玩家名不能为空" }))
        return
    end
    local ban_info = player_banned_db:get(player_name)
    if not ban_info then
        set_result(json.encode({ ok = true, detail = ("玩家 %s 目前并未被封禁"):format(player_name) }))
    else
        coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
            unix_time_to_date_time_str(ban_info.ban_until),
            ban_info.ban_reason))
        set_result(json.encode({
            ok = true,
            detail = ("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
                unix_time_to_date_time_str(ban_info.ban_until),
                ban_info.ban_reason)
        }))
        player_banned_db:delete(player_name)
    end
end)


if coromega.config.Version == "0.0.5" then
    coromega.config["从QQ接受封禁指令"] = {
        ["2401PT#1634268014@好友:1634268014"] = "#ban 玩家名 秒数 原因",
        ["2401PT#1634268014@群聊:548589654"] = "#ban 玩家名 秒数 原因",
        ["频道成员-2401PT#31415926545872@频道:2401的频道:机器人测试聊天室"] = "[CQ:at,qq=144115219209376165] #ban 玩家名 秒数 原因"
    }
    coromega.config["从QQ接受解封指令"] = {
        ["2401PT#1634268014@好友:1634268014"] = "#unban 玩家名",
        ["2401PT#1634268014@群聊:548589654"] = "[CQ:at,qq=2041243708] #unban 玩家名",
        ["频道成员-2401PT#31415926545872@频道:2401的频道:机器人测试聊天室"] = "[CQ:at,qq=144115219209376165] #unban 玩家名"
    }
    coromega.config.Version = "0.0.6"
    coromega:update_config(coromega.config)
end

local qq_ban_permission = coromega.config["从QQ接受封禁指令"]
local qq_unban_permission = coromega.config["从QQ接受解封指令"]
local qq_ban_matcher = {}
for who, format in pairs(qq_ban_permission) do
    -- who is something like "2401PT@好友:1634268014"
    -- format is something like "#ban 玩家名 时间 原因"
    -- then replace 玩家名/时间/原因 with .+
    local matcher_str = format:gsub("玩家名", ""):gsub("时间", ""):gsub("秒数", ""):gsub("原因",
        ""):gsub("^%s*(.-)%s*$", "%1")
    local matchers = qq_ban_matcher[who]
    if not matchers then
        matchers = {}
        qq_ban_matcher[who] = matchers
    end
    matchers[#matchers + 1] = matcher_str
end

local qq_unban_matcher = {}
for who, format in pairs(qq_unban_permission) do
    local matcher_str = format:gsub("玩家名", ""):gsub("^%s*(.-)%s*$", "%1")
    local resp_target = who:sub(who:find("@") + 1)
    local matchers = qq_unban_matcher[who]
    if not matchers then
        matchers = {}
        qq_unban_matcher[who] = matchers
    end
    if not qq_unban_matcher[who] then
        qq_unban_matcher[who] = {}
    end
    matchers[#matchers + 1] = matcher_str
end

coromega:when_receive_filtered_cqhttp_message_from_default():start_new(function(source, name, message)
    local who = ("%s@%s"):format(name, source)
    local matchers = qq_ban_matcher[who]
    if matchers then
        for _, matcher_str in pairs(matchers) do
            -- take 玩家名 秒数 原因 from qq_str by matcher_str
            if message:sub(1, matcher_str:len()) == matcher_str then
                local cmd = message:sub(matcher_str:len() + 1)
                -- trim space
                cmd = cmd:gsub("^%s*(.-)%s*$", "%1")
                -- split by space
                local args = {}
                for arg in cmd:gmatch("%S+") do
                    args[#args + 1] = arg
                end
                local player_name = args[1]
                local ban_until = ban_time_to_ban_until_time(args[2])
                local ban_reason = args[3]
                if not player_name then
                    coromega:send_cqhttp_message(source, "玩家名不能为空")
                    return
                end
                if not ban_until then
                    coromega:send_cqhttp_message(source, "封禁时间无效")
                    return
                end
                if not ban_reason then
                    ban_reason = "未设定"
                end
                coromega:log(("封禁玩家: %s 到: %s, 原因: %s"):format(player_name,
                    unix_time_to_date_time_str(ban_until),
                    ban_reason))
                coromega:send_cqhttp_message(source, ("封禁玩家: %s 到: %s, 原因: %s"):format(
                    player_name,
                    unix_time_to_date_time_str(ban_until),
                    ban_reason))
                player_banned_db:set(player_name, {
                    ban_until = ban_until,
                    ban_reason = ban_reason,
                })
                coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)),
                    false)
            end
        end
    end
    local matchers = qq_unban_matcher[who]
    if matchers then
        for _, matcher_str in pairs(matchers) do
            -- take 玩家名 秒数 原因 from qq_str by matcher_str
            if message:sub(1, matcher_str:len()) == matcher_str then
                local cmd = message:sub(matcher_str:len() + 1)
                -- trim space
                cmd = cmd:gsub("^%s*(.-)%s*$", "%1")
                -- split by space
                local args = {}
                for arg in cmd:gmatch("%S+") do
                    args[#args + 1] = arg
                end
                local player_name = args[1]
                if not player_name then
                    coromega:send_cqhttp_message(source, "玩家名不能为空")
                    return
                end
                local ban_info = player_banned_db:get(player_name)
                if not ban_info then
                    coromega:send_cqhttp_message(source, ("玩家 %s 目前并未被封禁"):format(
                        player_name))
                else
                    coromega:log(("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
                        unix_time_to_date_time_str(ban_info.ban_until),
                        ban_info.ban_reason))
                    coromega:send_cqhttp_message(source,
                        ("解封玩家: %s (原封禁时间 %s, 原因: %s)"):format(player_name,
                            unix_time_to_date_time_str(ban_info.ban_until),
                            ban_info.ban_reason))
                    player_banned_db:delete(player_name)
                end
            end
        end
    end
end)

coromega:when_player_change():start_new(function(player, action)
    if action == "offline" then
        return
    end
    local player_name = player:name()
    local ban_info = player_banned_db:get(player_name)
    if ban_info then
        local ban_until = ban_info.ban_until
        local ban_reason = ban_info.ban_reason
        if ban_until > coromega:now() then
            if ensure_hint_display then
                coromega:sleep(4.0)
            end
            coromega:send_ws_cmd(("kick %s %s"):format(player_name, ban_info_to_hint_str(ban_until, ban_reason)), false)
        else
            player_banned_db:delete(player_name)
        end
    end
end)

coromega:run()
```
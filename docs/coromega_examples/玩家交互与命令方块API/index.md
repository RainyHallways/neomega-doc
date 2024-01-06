---
lang: zh-CN
title: 玩家交互
description: 命令示例
---

# 玩家交互&聊天和命令块消息监听相关API

## 获取玩家对象
### 通过名字或uuid获取
- get_player(uuid_string_or_name)
    - 范围:任意
    - 说明:获取指定名字或uuid的玩家对象
    - 参数:
        - name:玩家名
    - 返回值:player对象
    ``` lua
    local player = coromega:get_player("2401pt")
    local player = coromega:get_player("xxxxxxxx")
    ```
	
### 通过名字获取玩家对象
- get_player_by_name(player_name)
    - 范围:任意
    - 说明:获取指定名字的获取玩家对象
    - 参数:
        - player_name:玩家名
    - 返回值:玩家对象
    ``` lua
    local player = coromega:get_player_by_name("2401pt")
    ```
	
### 通过uuid获取玩家对象
- get_player_by_uuid_string(uuid_string)
    - 范围:任意
    - 说明:获取指定uuid的玩家对象
    - 参数:
        - uuid_string:uuid字符串
    - 返回值:玩家对象
    ``` lua
    local player = coromega:get_player_by_uuid_string("xxxxxxxx")
    ```


## 获取所有在线玩家对象
- get_all_online_players()
    - 范围:任意
    - 说明:获取所有在线玩家的玩家对象
    - 参数:无
    - 返回值:玩家对象数组
    ``` lua
    local players = coromega:get_all_online_players()
    ```
	
## 接收命令消息事件
- when_receive_msg_from_command_block_named(command_block_name)
    - 范围:任意
    - 说明:当收到命令块消息时，启动一个新协程并执行指定函数
    - 参数:
        - command_block_name:命令块名字
    - 返回值:监听器 
        -含有方法:start_new(function)
        > 允许在监听器触发时启动函数并且放入新的协程
    ``` lua
    -- 命令块命名为 "扫地机"，指令为 tell 机器人名字 去扫地
    -- 当收到命令块的消息时，执行回调
    coromega:when_receive_msg_from_command_block_named("扫地机"):start_new(function(chat)
        coromega:log(("command block (%s) chat: %s"):format("扫地机", json.encode(chat)))
    end)
    ```
	
## 实体消息事件
- when_receive_msg_from_sender_named(name)
    - 范围:任意
    - 说明:当收到指定名字的消息时, 这个名字可以是物品名，启动一个新协程并执行指定函数
    - 参数:
        - name:发送者名字
    - 返回值:监听器 
        -含有方法:start_new(function)
        > 允许在监听器触发时启动函数并且放入新的协程
    ``` lua
    -- 命令块指令为 execute @e[type=snowball] ~ ~ ~ tell 机器人名字 @p[r=3]
    -- 当收到命令块的消息时，执行回调
    coromega:when_receive_msg_from_sender_named("雪球"):start_new(function(chat)
        coromega:log(("item (%s) chat: %s"):format("雪球", json.encode(chat)))
    end)
    ```

## 聊天消息事件
- when_chat_msg()
    - 范围:任意
    - 说明:当收到聊天消息时，启动一个新协程并执行指定函数
    - 返回值:监听器 
        -含有方法:start_new(function)
        > 允许在监听器触发时启动函数并且放入新的协程
    ``` lua
    coromega:when_chat_msg():start_new(function(chat)
        coromega:log(("chat sender: %s > %s"):format(chat.name, json.encode(chat)))
    end)
    ```

## 玩家在线状态变化事件
- when_player_change()
    - 范围: 任意
    - 当玩家的在线情况发生变化时，启动一个新协程并执行指定函数
    - 返回值:监听器 
        -含有方法:start_new(function)
        > 允许在监听器触发时启动函数并且放入新的协程
        > player 是一个玩家对象
    ``` lua
    coromega:when_player_change():start_new(function(player, action)
        if action == "exist" then
            coromega:log(("player %s 已经在线"):format(player:name()))
        elseif action == "online" then
            coromega:log(("player %s 新上线"):format(player:name()))
        elseif action == "offline" then
            coromega:log(("player %s 下线"):format(player:name()))
        end
    end)
    ```

## player对象的函数
### 发送消息
- say(msg)
    - 范围:任意
    - 说明:向指定玩家来发送消息
    - 参数:
        - msg:消息字符串
    - 返回值:无
    ``` lua
    player:say("hello")
    ```

### 发送tell
- raw_say(msg)
    - 范围:任意
    - 说明:向指定玩家来发送 tell raw 消息，这个消息应当是一个对象
    - 参数:
        - msg: 对象，被 json.encode 之后应该符合 tell raw 的规范
    - 返回值:无
    ``` lua
    player:raw_say({rawtext={{text="hello world"}}})
    ```

### 获取输入
- ask(hint)
    - 范围:协程内
    - 说明:获取指定玩家的输入
    - 参数:
        - hint:提示给玩家的信息
    - 返回值:输入的内容
    ``` lua
    local input = player:ask("请输入:")
    ```
	
### 发送标题（title）
- title(title,subtitle)
    - 范围:任意
    - 说明:发送标题
    - 参数:
        - title:标题
        - subtitle:副标题
    - 返回值:无
    ``` lua
    player:title("hello","world")
    ```
	
### 发送副标题
- subtitle(subtitle,title)
    - 范围:任意
    - 说明:发送副标题 如果主标题为nil则不会显示subtitle
    - 参数:
        - subtitle:副标题
        - title:标题
    - 返回值:无
    ``` lua
    player:subtitle("world","hello")
    ```

### 发送action_bar
- action_bar(msg)
    - 范围:任意
    - 说明:发送actionbar
    - 参数:
        - msg:消息
    - 返回值:无
    ``` lua
    player:action_bar("hi")
    ```

### 获得玩家坐标和维度
- get_pos()
    - 范围:协程内
    - 说明:获得玩家坐标和维度 (实际上是 query player 的包装)
    - 返回值:{position:{x:float,y:float,z=float},dimension:int}
    ``` lua
    local pos = player:get_pos().position
    local x = math.floor(pos.x)
    local y = math.floor(pos.y)
    local z = math.floor(pos.z)
    local dimension=player:get_pos().dimension
    coromega:print(dimension)
    ```
### 判断玩家条件
- check(conditions)
    - 范围:协程内
    - 说明:检查玩家是否满足条件 为条件限制器效果:@a[xxxxxxxx]
    - 参数:
        - conditions:条件字符串 列如:{ "m=c", "tag=!no_omega","tag=!ban" }
        其会被拼装为指令 querytarget @a[name=玩家名,m=c,tag=!no_omega,tag=!ban]
    - 返回值:是否满足条件
    ``` lua
    local result = player:check({ "m=c", "tag=!ban", "tag=!ban" })
    local result = player:check({ "m=c"})
    ```

### 获取玩家 uuid
- uuid_string()
    - 范围:协程内
    - 说明:获取玩家的uuid字符串
    - 参数:无
    - 返回值:uuid字符串,是否获得该信息
    ``` lua
    local uuid = player:uuid_string()
    local uuid,found = player:uuid_string()
    ```

### 获取玩家名字
- name()
    - 范围:协程内
    - 说明:获取玩家的名字
    - 参数:无
    - 返回值:玩家名,是否获得该信息
    ``` lua
    local name = player:name()
    local name,found = player:name()
    ```
	
### 获取玩家id
- entity_unique_id()
    - 范围:协程内
    - 说明:获取玩家的实体唯一id
    - 参数:无
    - 返回值:实体唯一id,是否获得该信息
    ``` lua
    local id = player:entity_unique_id()
    local id,found = player:entity_unique_id()
    ```
	
### 获取玩家登录时间
- login_time()
    - 范围:协程内
    - 说明:获取玩家的登录时间(unix time)， 其类型与 :now() 一致，单位秒
    - 参数:无
    - 返回值:登录时间,是否获得该信息
    ``` lua
    local time = player:login_time()
    local time,found = player:login_time()
    ```
	
### 获取玩家平台聊天id
- platform_chat_id()
    - 范围:协程内
    - 说明:获取玩家的平台聊天id
    - 参数:无
    - 返回值:平台聊天id,是否获得该信息
    ``` lua
    local id = player:platform_chat_id()
    local id,found = player:platform_chat_id()
    ```
	
### 获取玩家皮肤id
- skin_id()
    - 范围:协程内
    - 说明:获取玩家的皮肤id
    - 参数:无
    - 返回值:皮肤id,是否获得该信息
    ``` lua
    local id = player:skin_id()
    local id,found = player:skin_id()
    ```
	
### 获取玩家属性标识
- properties_flag()
    - 范围:协程内
    - 说明:获取玩家的属性标识
    - 参数:无
    - 返回值:属性标识,是否获得该信息
    ``` lua
    local flag = player:properties_flag()
    local flag,found = player:properties_flag()
    ```
	
### 获取玩家命令权限等级
- command_permission_level()
    - 范围:协程内
    - 说明:获取玩家的命令权限等级
    - 参数:无
    - 返回值:命令权限等级,是否获得该信息
    ``` lua
    local level = player:command_permission_level()
    local level,found = player:command_permission_level()
    ```
	
### 获取玩家动作权限
- action_permissions()
    - 范围:协程内
    - 说明:获取玩家的动作权限
    - 参数:无
    - 返回值:动作权限,是否获得该信息
    ``` lua
    local permissions = player:action_permissions()
    local permissions,found = player:action_permissions()
    ```
	
### 获取玩家op权限等级
- op_permission_level()
    - 范围:协程内
    - 说明:获取玩家的op权限等级
    - 参数:无
    - 返回值:op权限等级,是否获得该信息
    ``` lua
    local level = player:op_permission_level()
    local level,found = player:op_permission_level()
    ```
	
### 获取玩家自定义存储权限
- custom_stores_permissions()
    - 范围:协程内
    - 说明:获取玩家的自定义存储权限
    - 参数:无
    - 返回值:自定义存储权限,是否获得该信息
    ``` lua
    local permissions = player:custom_stores_permissions()
    local permissions,found = player:custom_stores_permissions()
    ```
	
### 获取玩家设备id
- device_id()
    - 范围:协程内
    - 说明:获取玩家的设备id
    - 参数:无
    - 返回值:设备id,是否获得了该信息
    ``` lua
    local id,found = player:device_id()
    ```
	
### 获取玩家runtimeId
- entity_runtime_id()
    - 范围:协程内
    - 说明:获取玩家实体的runtime_id
    - 参数:无
    - 返回值:runtime_id,是否获得了该信息
    ``` lua
    local id,found = player:entity_runtime_id()
    ```
	
### 获取玩家实体元数据
- entity_metadata()
    - 范围:协程内
    - 说明:获取玩家实体的元数据,是否获得了该信息
    - 参数:无
    - 返回值:元数据
    ``` lua
    local metadata, found = player:entity_metadata()
    ```
	
## 获取玩家的冒险和动作能力等级字典
- adventure_and_action_ability_map()
    - 范围:协程内
    - 说明:获取玩家的冒险和动作能力等级字典
    - 参数:无
    - 返回值:冒险和动作能力等级字典,是否获得该信息
    ``` lua
    local adventure_ability_map, action_permission_ability_map = player:adventure_and_action_ability_map()
    local adventure_ability_map, action_permission_ability_map,found = player:adventure_and_action_ability_map()
    ```
	
### 更新玩家的权限等级字典
- set_adventure_and_permission_ability_map(adventure_ability_map, action_ability_map)
    - 范围:协程内
    - 说明:更新玩家的权限等级字典, 一般和 adventure_and_action_ability_map 搭配使用
    - 参数:
        - adventure_ability_map:冒险能力等级字典
        - action_ability_map:动作能力等级字典
    - 返回值:无
    ``` lua
    player:set_adventure_and_permission_ability_map(adventure_ability_map, action_permission_ability_map)
    ```
	
### 判断是否为op
- is_op()
    - 范围:协程内
    - 说明:判断玩家是否为op
    - 参数:无
    - 返回值:是否为op,是否获得该信息
    ``` lua
    local result = player:is_op()
    local result,found = player:is_op()
    ```
	
### 判断是否在线
- is_online()
    - 范围:协程内
    - 说明:判断玩家是否在线
    - 参数:无
    - 返回值:是否在线
    ``` lua
    local result = player:is_online()
    ```

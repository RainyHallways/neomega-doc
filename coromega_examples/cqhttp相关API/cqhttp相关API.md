---
lang: zh-CN
title: cqhttp
description: cqhttp示例
---
# CQHTTP 相关API

## 向 cqhttp 发送消息
- send_cqhttp_message(target,message)
    - 范围: 任意
    - 向 cqhttp 发送消息
    - 参数 target 的形式诸如 群聊:xxxxx, 频道:xxx(频道名):xxx(聊天室名)
    - 参数 message 为消息内容
    ``` lua 
    coromega:send_cqhttp_message("群聊:548589654", "hello world 1")
    ```

## 向默认发送列表发送 cqhttp 消息
- send_cqhttp_message_to_default(message)
    - 范围: 任意
    - 向默认发送列表发送 cqhttp 消息
    - 参数 message 为消息内容
    ``` lua 
    coromega:send_cqhttp_message_to_default("hello world 2")
    ```

## 向指定 qq号 发送私聊消息
- send_cqhttp_message_to_id(id,message)
    - 范围: 协程内
    - 向指定 qq号 发送私聊消息
    - 参数 id 为 qq号
    - 参数 message 为消息内容
    - 返回值为是否发送（只代表已发送，但不一定发送成功）
    ``` lua 
    coromega:send_cqhttp_message_to_id(1634268014, "hello world 3")
    ```

## 向指定 群号 发送群聊消息
- send_cqhttp_message_to_group(group_id,message)
    - 范围: 协程内
    - 向指定 群号 发送群聊消息
    - 参数 group_id 为 群号
    - 参数 message 为消息内容
    - 返回值为是否发送（只代表已发送，但不一定发送成功）
    ``` lua 
    coromega:send_cqhttp_message_to_group(548589654, "hello world 4")
    ```

## 指定频道号指定聊天室发送消息
- send_cqhttp_message_to_guild(guild_id,channel_id,message)
    - 范围: 协程内
    - 向指定 频道号 的指定 聊天室 发送消息
    - 参数 guild_id 为 频道号
    - 参数 channel_id 为 聊天室号
    - 参数 message 为消息内容
    - 返回值为是否发送（只代表已发送，但不一定发送成功）
    ``` lua 
    coromega:send_cqhttp_message_to_guild(671889153994807378, 606767554, "hello world 5")
    ```

## 指定群成员信息
- get_cqhttp_group_members_info(group_id)
    - 范围: 协程内
    - 获取指定 群号 的群成员信息
    - 参数 group_id 为 群号
    - 返回值为群成员信息
    ``` lua 
    local group_members_info = coromega:get_cqhttp_group_members_info(548589654)
    ```

## 已加入的频道信息
- get_cqhttp_joined_guilds()
    - 范围: 协程内
    - 获取已加入的频道信息
    - 返回值为频道信息
    ``` lua 
    local joined_guilds = coromega:get_cqhttp_joined_guilds()
    ```

## 获取指定频道号频道信息
- get_cqhttp_guild_channels(guild_id)
    - 范围: 协程内
    - 获取指定 频道号 的频道信息
    - 参数 guild_id 为 频道号
    - 返回值为频道信息
    ``` lua 
    local guild_channels = coromega:get_cqhttp_guild_channels(671889153994807378)
    ```

## 获取指定频道号指定成员信息
- get_cqhttp_guild_member(guild_id,member_id)
    - 范围: 协程内
    - 获取指定 频道号 的指定 成员 的信息
    - 参数 guild_id 为 频道号
    - 参数 member_id 为 成员号
    - 返回值为成员信息
    ``` lua 
    local owner_info = coromega:get_cqhttp_guild_member(671889153994807378, "xxxxxxxxxxx")
    ```

## 监听 cqhttp 消息
- when_receive_cqhttp_message()
    - 事件端点，协程起点
    - 监听 cqhttp 消息
    - 返回值为监听器
    - 监听器的回调函数的参数为 message_type(消息类型), message(消息), raw_message_string(原始消息)
    ``` lua 
    coromega:when_receive_cqhttp_message():start_new(function(message_type, message, raw_message_string)
        print(("cqhttp 消息> message type: %s, message: %s, raw message string: %s"):format(message_type, message,
            raw_message_string))
    end)
    ```

## 监听默认发送列表 cqhttp 消息
- when_receive_filtered_cqhttp_message_from_default()
    - 事件端点，协程起点
    - 监听默认发送列表的 cqhttp 消息
    - 返回值为监听器
    - 监听器的回调函数的参数为 source(来源), name(名字 昵称#qq号), message(消息)
    ``` lua 
    coromega:when_receive_filtered_cqhttp_message_from_default():start_new(function(source, name, message)
        print(("cqhttp 默认监听对象> 来源: %s, 名字: %s, 消息: %s"):format(source, name, message))
    end)
    ```

## 综合使用展示参考
```lua
local omega = require("omega")
package.path = ("%s;%s"):format(
    package.path,
    omega.storage_path.get_code_path("LuaLoader", "?.lua")
)
local coromega = require("coromega").from(omega)
local json = require("json")

coromega:start_new(function()
    local group_members_info = coromega:get_cqhttp_group_members_info(548589654)
    print(json.encode(group_members_info))
    local joined_guilds = coromega:get_cqhttp_joined_guilds()
    print(json.encode(joined_guilds))
    for _, guild in ipairs(joined_guilds) do
        local guild_id = guild.GuildID
        local guild_name = guild.GuildName
        local guild_display_id = guild.GuildDisplayID
        print(("guild id: %d, name: %s, display id: %d"):format(guild_id, guild_name, guild_display_id))
        local guild_channels = coromega:get_cqhttp_guild_channels(guild_id)
        print(json.encode(guild_channels))
        -- local owner_info = coromega:get_cqhttp_guild_member(guild_id, "xxxxxxxxxxx")
        -- print(json.encode(owner_info))
    end
    coromega:send_cqhttp_message("群聊:548589654", "hello world 1")
    coromega:send_cqhttp_message_to_default("hello world 2")
    coromega:send_cqhttp_message_to_id(1634268014, "hello world 3")
    coromega:send_cqhttp_message_to_group(548589654, "hello world 4")
    coromega:send_cqhttp_message_to_guild(671889153994807378, 606767554, "hello world 5")
end)

coromega:when_receive_cqhttp_message():start_new(function(message_type, message, raw_message_string)
    print(("cqhttp 消息> message type: %s, message: %s, raw message string: %s"):format(message_type, message,
        raw_message_string))
end)

coromega:when_receive_filtered_cqhttp_message_from_default():start_new(function(source, name, message)
    print(("cqhttp 默认监听对象> 来源: %s, 名字: %s, 消息: %s"):format(source, name, message))
end)

coromega:run()

```
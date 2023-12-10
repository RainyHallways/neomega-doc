---
lang: zh-CN
title: 命令
description: 命令示例
---

# 命令收发相关API

## 以wo身份发送命令
- send_wo_cmd(cmd)
    - 范围:任意
    - 说明:以wo身份发送 setting command 命令 没有返回值, 部分指令使用此方法发送是无效的
    - 参数:
        - cmd:命令字符串
    - 示例:
    ``` lua
    coromega:send_wo_cmd("say hello")
    ```
	
## 以websocket身份发送命令
- send_ws_cmd(cmd,get_result)
    - 范围:协程内
    - 说明:以websocket身份发送命令 当 get_result为true时 ,会返回命令执行结果 否则返回 nil. 部分指令没有返回值，如果此时将 get_result 设为为true, 可能导致程序卡死, 例如 say
    - 参数:
        - cmd:命令字符串
        - get_result:是否获取返回值
    - 返回值:返回命令返回结果 json字符串
    - 示例:
    ``` lua
    local result = coromega:send_ws_cmd("list @a",true)
    coromega:print(json.encode(result))
    ```

## 以玩家身份发送命令
- send_player_cmd(cmd,get_result)
    - 范围:协程内
    - 说明:以玩家身份发送命令 当get_result为true时,会返回命令执行结果 否则返回 nil. 部分指令没有返回值，如果此时将 get_result 设为为true, 可能导致程序卡死, 例如 say
    - 参数:
        - cmd:命令字符串
        - get_result:是否获取返回值
    - 示例:
    ``` lua
    local value = coromega:send_player_cmd("list @a",true)
    coromega:print(json.encode(value))
    ```

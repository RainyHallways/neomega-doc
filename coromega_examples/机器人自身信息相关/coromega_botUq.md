---
lang: zh-CN
title: 机器人
description: 机器人示例
---

# 机器人自身信息相关

## 机器人名称
- bot_name()
    - 范围: 任意
    - 说明: 获取机器人的名字
    - 参数: 无
    - 返回: 机器人的名字
    ``` lua
    cocomega:bot_name()
    ```

## 机器人UUID
- bot_uuid_string()
    - 范围: 任意
    - 说明: 获取机器人的UUID的字符串形式
    - 参数: 无
    - 返回: 机器人的UUID
    ``` lua
    cocomega:bot_uuid_string()
    ```

## 机器人uniqueId
- bot_unique_id()
    - 范围: 任意
    - 说明: 获取机器人的unique_id
    - 参数: 无
    - 返回: ID字符串
    ``` lua
    cocomega:bot_unique_id()
    ```
	
## 机器人runtimeId
- bot_runtime_id()
    - 范围: 任意
    - 说明: 获取机器人的runtimeid
    - 参数: 无
    - 返回: 机器人的runtimeid
    ``` lua
    cocomega:bot_runtime_id()
    ```
	
## 机器人身份
- bot_identity()
    - 范围: 任意
    - 说明: 获取机器人的身份
    - 参数: 无
    - 返回: 机器人的身份
    ``` lua
    cocomega:bot_identity()
    ```
	
## 机器人发言
- bot_say(msg)
    - 范围: 任意
    - 说明: 让机器人说话 和普通玩家说话是一样的效果
    - 参数: 
        - msg: 机器人要说的话
    - 返回: 无
    ``` lua
    cocomega:bot_say("Hello World!")
    ```
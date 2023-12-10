---
lang: zh-CN
title: Websocket
description: Websocket示例
---
# Websocket相关API

## 连接到一个 websocket 服务器
- connect_to_websocket(addr)
    - 范围: 协程内
    - 参数: 
        - addr: 服务器地址, e.g. ws://127.0.0.1:1042, ws://127.0.0.1:1042/path/to/ws_api
    - 返回值为一个 WebSocketConn 对象
    ```lua
    coromega:start_new(function()
        local conn = coromega:connect_to_websocket("ws://127.0.0.1:1042")
        conn:when_new_msg(function(msg)
            print("websocket client received (not intercepted): ", msg)
        end)
        conn:send_message("client hello")
        local received = conn:receive_message()
        print("websocket client received (first message): ", received)
    end)
    ```

## 创建一个 websocket 服务器
- create_websocket_server(host,port)
    - 范围: 任意
    - 参数:
        - host: 字符串，一般为 "127.0.0.1" (仅本机可访问) / "0.0.0.0" (可被其他主机访问)
        - port: 端口号，数字
    - 返回: 监听器, 监听器目前包含两个方法
        - when_new_conn: 当有客户端连接到服务器时, 一个新协程被创建并启动指定的函数，函数的参数为 WebSocketConn 对象
        - when_dead: 当服务器关闭时，一个新协程被创建并启动指定的函数，函数的参数为字符串形式的服务器关闭的原因
    ```lua
    coromega:create_websocket_server("0.0.0.0", 1042):when_new_conn(function(conn)
        conn:when_new_msg(function(msg)
            print("websocket server received (not intercepted): ", msg)
            conn:send_message("server echo: " .. msg)
        end)
        conn:send_message("server hello")
        local received = conn:receive_message()
        print("websocket server received (first message): ", received)
    end):when_dead(function(deadReason)
        print("websocket server dead, reason: ", deadReason)
    end)
    ```

## WebSocketConn 对象的方法

### 发送消息(字符串)
- send_message(message)
    - 范围: 协程内
    - 参数:
        - message: 待发送的字符串形式的数据，以 TextMessage 形式发送
    - 返回: 无
    ```lua
    conn:send_message("hello")
    ```

### 发送消息
- send(message)
    - 范围: 协程内
    - 参数:
        - message: 待发送的数据，以 TextMessage 形式发送其被 json.encode 后的结果
    - 返回: 无
    ```lua
    conn:send({author="somebody",age=18})
    ```

### 接收到消息时的回调
- when_new_msg(func)
    - 范围: 协程内
    - 参数:
        - func: 当新消息到来且未被 receive_message 拦截时，一个新协程被创建并启动func函数，函数的参数为字符串形式的消息
    - 返回: 无
    ```lua
    conn:when_new_msg(function(msg)
        print("websocket received (not intercepted): ", msg)
    end)
    ```

### 接收下一条消息
- receive_message()
    - 范围: 协程内
    - 说明: 接收下一条消息，下一条消息会做为该函数的返回值出现，而不会被 when_new_msg 处理
    - 参数: 无
    - 返回: 下一条即将被收到的消息
    ```lua
    local received = conn:receive_message()
    print("websocket client received: ", received)
    ```

## 综合使用
```lua
local omega = require("omega")
package.path = ("%s;%s"):format(
    package.path,
    omega.storage_path.get_code_path("LuaLoader", "?.lua")
)
local coromega = require("coromega").from(omega)

coromega:create_websocket_server("0.0.0.0", 1042):when_new_conn(function(conn)
    conn:when_new_msg(function(msg)
        print("websocket server received (not intercepted): ", msg)
        conn:send_message("server echo: " .. msg)
    end)

    conn:send_message("server hello")
    local received = conn:receive_message()
    print("websocket server received (first message): ", received)
end):when_dead(function(deadReason)
    print("websocket server dead, reason: ", deadReason)
end)

coromega:start_new(function()
    coromega:sleep(1.0)
    local conn = coromega:connect_to_websocket("ws://127.0.0.1:1042")
    conn:when_new_msg(function(msg)
        print("websocket client received (not intercepted): ", msg)
    end)
    conn:send_message("client hello")
    local received = conn:receive_message()
    print("websocket client received (first message): ", received)
    conn:send_message("client hello 1")
    coromega:sleep(1.0)
    conn:send_message("client hello 2")
    coromega:sleep(1.0)
    conn:send_message("client hello 3")
    local received = conn:receive_message()
    print("websocket client received: ", received)
    coromega:sleep(1.0)
    conn:send_message("client hello 4")
    local received = conn:receive_message()
    print("websocket client received: ", received)
end)
coromega:run()

```
---
lang: zh-CN
title: 数据包
description: 数据包监听相关示例
---
# 数据包监听相关 API

## 监听数据包
- when_receive_packet_of_types(...)
    - 范围: 协程外
    - 说明: 当机器人收到指定的数据包类型时, 启动一个新的协程并运行指定处理函数
    - 参数: 
        - 待接收的数据包类型列表, 这里有两种方式
        - 1:when_receive_packet_of_types(数据包类型1, 数据包类型2, 数据包类型3 ...)
        e.g. :when_receive_packet_of_types(packets.Text, packets.CommandOutput)
        这代表接收所罗列的数据包类型

        2:when_receive_packet_of_types(packets.all, no数据包类型1, no数据包类型2, no数据包类型3 ...)
        e.g. :when_receive_packet_of_types(packets.all, packets.noMovePlayer)
        这代表接收除了 noXX 对应的 XX 类型数据包外的其余数据包类型 (反选)
    - 返回: 监听器，监听器的处理函数的参数为数据包, 数据包具有以下三个成员函数
        - name() 数据包名, 例如 "IDText"
        - id() 数据包类型编号, 例如 27
        - user_data() 数据包数据, user_data 形式, 注意, 您可以访问 user_data 形式数据包内部的成员
        但是, user_data 并非普通的 lua 数据结构，因此您无法使用 pair 或 ipair 遍历数据包内部结构
        您可以使用 ud2lua 函数将 user_data 转换为普通的 lua 数据结构以使用 pair 或 ipair,
        但是, ud2lua 会造成额外的性能开销，因此您应该尽量避免使用 ud2lua 函数以提高插件性能
    ```lua
    local packets = omega.packets
    coromega:when_receive_packet_of_types(packets.Text, packets.CommandOutput):start_new(function(packet)
        coromega:log(("packet name: %s id: %s"):format(packet:name(), packet:id()))
        if packet:name() == packets.CommandOutput then
            coromega:log(("detail packet %s"):format(packet:json_str(packet)))
            local packet_userdata = packet:user_data()
            coromega:log(("detail packet (user_data) %s"):format(packet_userdata))
            coromega:log(("detail packet (lua table) %s"):format(ud2lua(packet_userdata)))
            coromega:log(("Origin: %s"):format(packet_userdata.CommandOrigin.Origin))
            coromega:log(("OutputMessages[0].Message: %s"):format(packet_userdata.OutputMessages[1].Message))
        end
    end)

    coromega:when_receive_packet_of_types(packets.all, packets.noMovePlayer)
    ```

## 综合使用
```lua
local omega = require("omega")
package.path = ("%s;%s"):format(
    package.path,
    omega.storage_path.get_code_path("LuaLoader", "?.lua")
)
local coromega = require("coromega").from(omega)

local packets = omega.packets
coromega:when_receive_packet_of_types(packets.Text, packets.CommandOutput):start_new(function(packet)
    coromega:log(("packet name: %s id: %s"):format(packet:name(), packet:id()))
    if packet:name() == packets.CommandOutput then
        coromega:log(("detail packet %s"):format(packet:json_str(packet)))
        local packet_userdata = packet:user_data()
        coromega:log(("detail packet (user_data) %s"):format(packet_userdata))
        coromega:log(("detail packet (lua table) %s"):format(ud2lua(packet_userdata)))
        coromega:log(("Origin: %s"):format(packet_userdata.CommandOrigin.Origin))
        coromega:log(("OutputMessages[0].Message: %s"):format(packet_userdata.OutputMessages[1].Message))
    end
end)

coromega:run()
```
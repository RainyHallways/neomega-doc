local omega = require("omega")
local packets = omega.packets
local block_input = omega.system.block_input
local cmds = omega.cmds

-- cmds 一共有五个方法
--  发送诸如 setblock 之类的命令，很多命令无法通过这个方法发送，但是其对租赁服压力最低
-- 如果需要大量放置方块，可以使用这个方法
local send_wo_cmd = cmds.send_wo_cmd
-- 以websocket身份发送命令，最常用的发送方式
local send_ws_cmd = cmds.send_ws_cmd
-- 以玩家身份发送命令，它和在聊天栏里发送命令是一样的
local send_player_cmd = cmds.send_player_cmd

-- 上述三种命令都很简单易用，只是速度和适用范围不一样，但是上述三种方式都无法获得命令的返回值
-- 问题是，命令从发出到返回是需要一定时间的，可能这个时间还不短，如果我们等待这个结果，就会造成阻塞
-- 哈，又是阻塞，聪明的你有没有想到什么呢？
-- 对了，mux_poller! 你可以将命令返回的获得和mux_poller 结合使用！我们稍后演示如何使用，先看剩下两个函数

-- 和 send_wo_cmd 类似，但是它可以获得命令的返回值
local send_ws_cmd_with_resp = cmds.send_ws_cmd_with_resp
-- 和 send_player_cmd 类似，但是它可以获得命令的返回值
-- 需要注意的是，如果游戏中 gamerule sendcommandfeedback 为 false
-- 这个函数将打开它，接收到结果后，再关闭它
-- 因此，这个函数有失败概率，且会在所有op的聊天栏中显示命令
local send_player_cmd_with_resp = cmds.send_player_cmd_with_resp

-- 先过一下三个简单的函数
cmds.send_wo_cmd("setblock ~~~ air")
cmds.send_ws_cmd("tp @r @s")
cmds.send_player_cmd("tp @s ~ ~100 ~")

-- 下面，是mux_poller与其的结合，我会写的稍微复杂一点
local mux_poller = omega.listen.new_mux_poller()
mux_poller:poll(cmds.resp)   -- 关键，监听命令返回，所有命令的返回都会由cmds.resp 返回
print("请输入命令")
mux_poller:poll(block_input) -- 监听用户输入

-- 定义一个函数，用来显示数据包的详细信息,这个在 03_监听数据包 已经展示过了
local print_packet_detail = function(packet)
    print(("detail packet %s"):format(packets.to_json_string_slow(packet))) -- to_json_string_slow 是一个比较慢的函数，但是它可以将数据包转换成json字符串，方便我们查看，它最好只在调试的时候使用
end

local count = 0
while mux_poller:block_has_next() do
    local event = mux_poller:block_get_next()
    if event.type == cmds.resp then                           -- 如果是命令返回
        local resp_packet = event.data.output                 -- 获取命令返回的数据包
        local cb = event.data.cb                              -- 获得附加在这个命令上的回调和信息
        print(("(%s) %s 命令返回，执行其回调"):format(cb.type, cb.cmd)) -- 显示附加信息
        cb.action(resp_packet)                                -- 执行回调

        -- 读取用户的下一个输入
        mux_poller:poll(block_input) -- 因为每次只读取一个输入，所以每次都需要重新监听
    elseif event.type == block_input then
        count = count + 1
        if count > 10 then
            mux_poller:stop()  -- 重复十次，就停止
        end
        local cmd = event.data -- 获取用户输入的命令
        if count % 2 == 1 then -- 奇数次使用 send_ws_cmd_with_resp
            local cb = { type = "websocket", cmd = cmd }
            cb["action"] = function(resp_packet)
                print(("收到了ws数据包！命令返回: %s"):format(resp_packet))
                print_packet_detail(resp_packet)
            end

            send_ws_cmd_with_resp(cmd, cb) -- 这里也是一个重点，因为先发出去的命令不一定先返回
            -- 因此，我们可以将cb设为这次调用的附加信息，当命令返回的时候，我们可以通过cb来判断这个命令是哪个命令的返回
            -- 由于cb可以为任何类型，所以也可以向上面一样，在cb里塞一堆东西，比如命令的类型，命令的内容等等
            -- 反正，会跟着结果一并返回
        else -- 偶数次使用 send_player_cmd_with_resp
            local cb = { type = "玩家", cmd = cmd }
            cb["action"] = function(resp_packet)
                print(("收到了玩家命令的返回数据包: %s"):format(resp_packet))
                print_packet_detail(resp_packet)
            end

            send_player_cmd_with_resp(cmd, cb)
        end
    end
end

print("来将命令和之前的监听数据包结合起来!")
print("请输入命令")
-- 来将命令和之前的监听数据包结合起来
local mux_poller = omega.listen.new_mux_poller()
local packet_poller = omega.listen.new_packet_poller(packets.all, packets.noCommandOutput)
mux_poller:poll(packet_poller) -- 监听数据包
mux_poller:poll(cmds.resp)     -- 监听命令返回
mux_poller:poll(block_input)   -- 监听用户输入
while mux_poller:block_has_next() do
    local event = mux_poller:block_get_next()
    if event.type == packet_poller then
        print_packet_detail(event.data)
    elseif event.type == cmds.resp then
        local resp_packet = event.data.output
        local cb = event.data.cb
        print(("(%s) %s 命令返回，执行其回调"):format(cb.type, cb.cmd))
        cb.action(resp_packet)
    elseif event.type == block_input then
        local cmd = event.data
        local cb = { type = "Websocket", cmd = cmd }
        cb["action"] = function(resp_packet)
            print(("收到了玩家命令的返回数据包: %s"):format(resp_packet))
            print_packet_detail(resp_packet)
        end
        send_ws_cmd_with_resp(cmd, cb)
        mux_poller:poll(block_input)
    end
end

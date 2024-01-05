local omega = require("omega")
local print = omega.system.print

print("Hello, world! from example2")

local builder = omega.builder
-- 放置命令块，机器人的xz坐标不能离太远，y随意
-- 有一定失败的概率，如果失败了，可以再次尝试
builder.place_command_block(
    { x = 31095, y = 100, z = 11026 },
    "command_block",   -- command_block/repeating_command_block/chain_command_block
    "11",              -- 方块朝向 0-11 0:南 1:西 2:北 3:东 4:下 5:上
    false,             -- 是否需要红石
    true,              -- 是否有条件
    "this is command", --    命令
    "some name",       -- 命令方块的名称
    20,                -- 命令方块的延迟
    true,              -- 是否需要输出命令方块的输出
    true               -- execute on first tick
)

-- 至于普通方块，直接用
omega.cmds.send_wo_cmd("setblock 31095 101 11026 stone 0") -- 快一点
-- 也可以用
omega.cmds.send_ws_cmd("setblock 31095 102 11026 stone 0") -- 可以在末地和下界使用

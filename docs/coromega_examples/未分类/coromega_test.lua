local omega = require("omega")
package.path = ("%s;%s"):format(
    package.path,
    omega.storage_path.get_code_path("LuaLoader", "?.lua")
)
local coromega = require("coromega").from(omega)
local json = require("json")

coromega:print(("config: %s"):format(json.encode(coromega.config)))
coromega:bot_say("coromega test start")

coromega:when_called_by_terminal_menu({
    triggers = { "coro", "coro_cmd", "coro_term_cmd" },
    argument_hint = "[cmd]",
    usage = "coro_test",
}):start_new(function(input)
    local cmd = table.concat(input, " ")
    coromega:print("sleep 3s")
    coromega:sleep(3)
    coromega:print("awake!")
    if cmd == "" then
        cmd = coromega:backend_input("please input cmd: ")
    end
    coromega:log(("cmd: %s"):format(cmd))
    local result = coromega:send_ws_cmd(cmd, true)
    coromega:log(("cmd result: %s"):format(json.encode(result)))
end)

local function print_and_update_detailed_player_info(player)
    print("uuid string: ", player:uuid_string())
    print("player name: ", player:name())
    print("entity unique id: ", player:entity_unique_id())
    print("login time: ", os.date("%Y-%m-%d %H:%M:%S", player:login_time()))
    print("platform chat id: ", player:platform_chat_id())
    print("build platform: ", player:build_platform())
    print("skin id: ", player:skin_id())
    print("properties flag: ", player:properties_flag())
    print("command permission level: ", player:command_permission_level())
    print("action permissions: ", player:action_permissions())
    print("op permission level: ", player:op_permission_level())
    print("custom stored permissions: ", player:custom_stored_permissions())
    print("is op: ", player:is_op())
    print("is online: ", player:is_online())

    local device_id, found = player:device_id()
    if found then
        print("device id: ", device_id)
    else
        print("device id not found")
    end
    local entity_runtime_id, found = player:entity_runtime_id()
    if found then
        print("entity runtime id: ", entity_runtime_id)
    else
        print("entity runtime id not found")
    end
    local get_entity_metadata, found = player:entity_metadata()
    if found then
        print("entity metadata: ", get_entity_metadata)
    else
        print("entity metadata not found")
    end

    -- get permission ability map
    local adventure_ability_map, action_permission_ability_map = player:adventure_and_action_ability_map()
    print("adventure ability map: ", json.encode(adventure_ability_map))
    print("action permission ability map: ", json.encode(action_permission_ability_map))

    -- update detailed player info (permission)
    player:set_adventure_and_permission_ability_map(adventure_ability_map, action_permission_ability_map)
end

coromega:when_called_by_game_menu({
    triggers = { "coro", "coro_cmd", "coro_game_cmd" },
    argument_hint = "[cmd]",
    usage = "coro_test",
}):start_new(function(chat)
    local cmd = table.concat(chat.msg, " ")
    local player = coromega:get_player(chat.name)
    local player_is_creative = player:check({ "m=c", "tag=!ban", "tag=!ban" })
    if not player_is_creative then
        player:say("你不是创造模式")
        return
    else
        player:say("你是创造模式")
    end
    print_and_update_detailed_player_info(player)
    while (cmd == "") do
        local chat = player:ask("请输入命令: ")
        cmd = chat.raw_msg
        if cmd == "" then
            player:say("命令不能为空")
        end
    end
    coromega:log(("cmd: %s"):format(cmd))
    local result = coromega:send_ws_cmd(cmd, true)
    player:say(("cmd result: %s"):format(json.encode(result)))
end)

coromega:when_chat_msg():start_new(function(chat)
    coromega:log(("chat sender: %s > %s"):format(chat.name, json.encode(chat)))
end)

coromega:when_player_change():start_new(function(player, action)
    if action == "exist" then
        coromega:log(("player %s 已经在线"):format(player:name()))
    elseif action == "online" then
        coromega:log(("player %s 新上线"):format(player:name()))
    elseif action == "offline" then
        coromega:log(("player %s 下线"):format(player:name()))
    end
end)

-- 命令块命名为 "扫地机"，指令为 tell 机器人名字 去扫地
-- 当收到命令块的消息时，执行回调
coromega:when_receive_msg_from_command_block_named("扫地机"):start_new(function(msg)
    coromega:log(("command block (%s) msg: %s"):format("扫地机", json.encode(msg)))
end)

-- 命令块指令为 execute @e[type=snowball] ~ ~ ~ tell 机器人名字 @p[r=3]
-- 当收到命令块的消息时，执行回调
coromega:when_receive_msg_from_sender_named("雪球"):start_new(function(msg)
    coromega:log(("item (%s) msg: %s"):format("雪球", json.encode(msg)))
end)

coromega:start_new(function()
    local all_online_players = coromega:get_all_online_players()
    for _, player in ipairs(all_online_players) do
        print("player online: ", player:name())
    end
    print("bot name: ", coromega:bot_name())
    print("bot uuid string: ", coromega:bot_uuid_string())
    print("bot unique id: ", coromega:bot_unique_id())
    print("bot runtime id: ", coromega:bot_runtime_id())
    print("bot identity: ", coromega:bot_identity())
    coromega:save_data(coromega:data_path_of("test.json"), { a = 1, b = 2 })
    local data = coromega:load_data(coromega:data_path_of("test.json"))
    print("data: ", json.encode(data))

    local db = coromega:key_value_db(coromega:data_path_of("test_db"))
    db:set("a", 1)
    db:set("b", "2")
    db:set("c", 3)
    db:delete("a")
    db:set("c", "CCC")
    print("db c: ", db:get("c"))
    db:iter(function(key, value)
        print("db iter: ", key, value)
        local next = true
        return next
    end)
end)

coromega:start_new(function()
    coromega:place_block({ x = 884, y = 72, z = 829 }, "stone", 0)
    coromega:place_command_block(
        { x = 884, y = 73, z = 829 },
        "repeating_command_block", 0,
        {
            need_red_stone = true,
            conditional = true,
            command = "list @a",
            name = "列出所有玩家",
            tick_delay = 10,
            track_output = true,
            execute_on_first_tick = true,
        }
    )
    -- local canvas = omega.structures.new_canvas()
    -- canvas:place_block({ x = 0, y = 0, z = 0 }, "stone", 0)
    -- canvas:place_command_block(
    --     { x = 0, y = 1, z = 0 },
    --     "repeating_command_block", 0,
    --     {
    --         need_red_stone = true,
    --         conditional = true,
    --         command = "list @a",
    --         name = "列出所有玩家",
    --         tick_delay = 10,
    --         track_output = true,
    --         execute_on_first_tick = true,
    --     }
    -- )
    -- coromega:when_progress_increased_by_build(
    --     canvas,                            --需要被导的东西
    --     canvas:get_start_pos(),            --被导的东西的起始位置
    --     canvas:get_end_pos(),              --被导的东西的结束位置
    --     { x = 884, y = 74, z = 829 },      -- 导入到的位置(租赁服中)
    --     {
    --         speed = 2000,                  --导入速度
    --         incremental = false,           --增量构建(false)
    --         force_use_block_state = false, --强制使用block state(false),注：即时这里设置false，如果struceture中use_block_state为true，也会使用block state
    --         ignore_nbt_block = false,      --是否忽略nbt方块(false)
    --         clear_target_block = false,    --导入时清除目标位置的方块(false)
    --         clear_dropped_item = false,    --导入时清理掉落物(false)，注: 清理范围为整个租赁服，不止是导入的建筑范围
    --         auto_reverse = true,           --（重新开始时回退跃点）(true)
    --         start_hop = 0,                 --开始跃点(0)
    --     }
    -- ):start_new(function(total, current)
    --     coromega:log(("progress: %d/%d"):format(total, current))
    -- end)
end)

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

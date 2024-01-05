local omega = require("omega")
local print = omega.system.print
local poller = omega.listen.new_mux_poller()
local players = omega.players.get_all_online_players()

-- local chat_poller=players.make_chat_poller()
-- local player,found =players.find_player_by_name("omega")
-- local player,found =players.get_player_by_uuid(uuid_string)
-- local players=players.get_all_online_players()
-- player:say("hello")
-- player:action_bar("hello")
-- player:title("hello")
-- player:sub_title("hello")

omega.system.block_sleep(1.0)
for i, player in ipairs(players) do
    local player_name, found = player:get_username()
    local uuid_string, found = player:get_uuid_string()
    local entity_unique_id, found = player:get_entity_unique_id()
    local login_time, found = player:get_login_time()
    local platform_chat_id, found = player:get_platform_chat_id()
    local build_platform, found = player:get_build_platform()
    local skin_id, found = player:get_skin_id()
    local properties_flag, found = player:get_properties_flag()
    local command_permission_level, found = player:get_command_permission_level()
    local action_permissions, found = player:get_action_permissions()
    local op_permission_level, found = player:get_op_permission_level()
    local custom_stored_permissions, found = player:get_custom_stored_permissions()
    local device_id, found = player:get_device_id()
    local entity_runtime_id, found = player:get_entity_runtime_id()
    local entity_metadata, found = player:get_entity_metadata()
    local is_op, found = player:is_op()
    local still_online, found = player:still_online()
    print(("player_name:%s"):format(player_name))
    print(("uuid_string:%s"):format(uuid_string))
    print(("entity_unique_id:%s"):format(entity_unique_id))
    print(("login_time:%s"):format(login_time))
    print(("platform_chat_id:%s"):format(platform_chat_id))
    print(("build_platform:%s"):format(build_platform))
    print(("skin_id:%s"):format(skin_id))
    print(("properties_flag:%s"):format(properties_flag))
    print(("command_permission_level:%s"):format(command_permission_level))
    print(("action_permissions:%s"):format(action_permissions))
    print(("op_permission_level:%s"):format(op_permission_level))
    print(("custom_stored_permissions:%s"):format(custom_stored_permissions))
    print(("device_id:%s"):format(device_id))
    print(("entity_runtime_id:%s"):format(entity_runtime_id))
    print(("entity_metadata:%s"):format(entity_metadata))
    print(("is_op:%s"):format(is_op))
    print(("still_online:%s"):format(still_online))

    local adventrue_abilities, action_abilities, found = player:get_ability_map()
    for i, v in pairs(adventrue_abilities) do
        print(("adventrue_abilities:%s:%s"):format(i, v))
    end
    for i, v in pairs(action_abilities) do
        print(("action_abilities:%s:%s"):format(i, v))
    end

    local sent = player:update_ability_map(adventrue_abilities, action_abilities)
    print(("sent:%s"):format(sent))

    local _p = player
    player:check_condition({ "m=c", "tag=!ban" }, function(ok)
        print(("\n%s creative=%s\n"):format(_p:get_username(), ok))
    end)
    player:intercept_just_next_input(function(chat)
        print(("\n%s intercept_just_next_input=%s\n"):format(chat.name, table.concat(chat.msg, "\n"), chat.raw_msg))
    end)
end

local cbs = {}
cbs[omega.players.resp] = function(event)
    event.cb(event.output)
end

local player_change_poller = omega.players.make_player_change_poller()
local function on_player_change(event)
    local player, action = event.player, event.action
    local name, found = player:get_username()
    local uuid_string, found = player:get_uuid_string()
    local online, found = player:still_online()
    local action = action -- exist/online/offline
    print(("player: %s (%s) %s (online=%s)"):format(name, uuid_string, action, online))
end
cbs[player_change_poller] = on_player_change

for source, cb in pairs(cbs) do
    poller:poll(source, cb)
end

while poller:block_has_next() do
    local event = poller:block_get_next()
    local cb = cbs[event.type]
    cb(event.data)
end

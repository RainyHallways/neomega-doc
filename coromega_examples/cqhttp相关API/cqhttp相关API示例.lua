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

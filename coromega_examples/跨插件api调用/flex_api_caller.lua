local omega = require("omega")
package.path = ("%s;%s"):format(
    package.path,
    omega.storage_path.get_code_path("LuaLoader", "?.lua")
)
local coromega = require("coromega").from(omega)
local json = require("json")

coromega:when_new_data_in_subscribed_topic_named("/send_time/1"):start_new(function(data)
    print(data.disp, "now add money")
    coromega:call_other_plugin_api_no_result("/money/add", 1)
end)

coromega:when_new_data_in_subscribed_topic_named("/send_time/2"):start_new(function(data)
    print(data.disp, "now check and add money")

    local money = coromega:call_other_plugin_api("/money/check", nil)
    print(("money is [%d]"):format(tonumber(money)))

    local money = coromega:call_other_plugin_api("/money/add", 100)
    print(("after add 100 money, now money is %s"):format(money))

    local time_after5s = coromega:call_other_plugin_api("/calculator/add", { data.send_time, 3 })
    print(("will be called at [%d] next time"):format(tonumber(time_after5s)))
end)

-- cbs = {}
-- local mux_poller = omega.listen.make_mux_poller()
-- cbs[omega.flex.resp] = function(event)
--     event.cb(event.output)
-- end

-- cbs[omega.flex.listen("/send_time/1")] = function(event)
--     local result = json.decode(event)
--     print(result.disp, " add money")
--     omega.flex.call("/money/add", "1")
-- end


-- cbs[omega.flex.listen("/send_time/2")] = function(event)
--     local result = json.decode(event)
--     print(result.disp, " check and add money")

--     local money = omega.flex.block_call("/money/check", "")
--     print(("money is [%d]"):format(tonumber(money)))

--     omega.flex.call("/money/add", "100", function(event)
--         print(("after add 100 money, now money is %s"):format(event))
--     end)

--     local time_after5s = omega.flex.block_call("/calculator/add", json.encode({ result.send_time, 3 }))
--     print(("will be called at [%d] next time"):format(tonumber(time_after5s)))
-- end

coromega:run()

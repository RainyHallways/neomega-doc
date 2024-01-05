local omega = require("omega")
local json = require("json")

cbs = {}
local mux_poller = omega.listen.make_mux_poller()
cbs[omega.flex.resp] = function(event)
    event.cb(event.output)
end

cbs[omega.flex.listen("/send_time/1")] = function(event)
    local result = json.decode(event)
    print(result.disp, " add money")
    omega.flex.call("/money/add", "1")
end


cbs[omega.flex.listen("/send_time/2")] = function(event)
    local result = json.decode(event)
    print(result.disp, " check and add money")

    local money = omega.flex.block_call("/money/check", "")
    print(("money is [%d]"):format(tonumber(money)))

    omega.flex.call("/money/add", "100", function(event)
        print(("after add 100 money, now money is %s"):format(event))
    end)

    local time_after5s = omega.flex.block_call("/calculator/add", json.encode({ result.send_time, 3 }))
    print(("will be called at [%d] next time"):format(tonumber(time_after5s)))
end

for k, _ in pairs(cbs) do
    mux_poller:poll(k)
end
while mux_poller:block_has_next() do
    local event = mux_poller:block_get_next()
    if event.type == mux_poller.event_after then
        event.data()
    else
        local cb = cbs[event.type]
        cb(event.data)
    end
end

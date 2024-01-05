local omega = require("omega")
local json = require("json")

cbs = {}
local mux_poller = omega.listen.make_mux_poller()

local function send_time_1()
    omega.flex.pub("/send_time/1",
        json.encode({
            send_time = os.time(),
            disp = ("time 1: %d"):format(os.time())
        })
    )
end

cbs[mux_poller:event_interval(5.0, nil)] = send_time_1

local function send_time_2()
    omega.flex.pub("/send_time/2",
        json.encode({
            send_time = os.time(),
            disp = ("time 2: %d"):format(os.time())
        })
    )
end

cbs[mux_poller:event_interval(3.0, nil)] = send_time_2

local total_money = 0


cbs[omega.flex.expose("/calculator/add")] = function(event)
    local args = event.args
    local cb = event.cb
    args = json.decode(args)
    local result = args[1] + args[2]
    cb(("%s"):format(result))
end

cbs[omega.flex.expose("/money/check")] = function(event)
    local args = event.args
    local cb = event.cb
    cb(("%s"):format(total_money))
end

cbs[omega.flex.expose("/money/add")] = function(event)
    local args = event.args
    print(("add money %d"):format(tonumber(args)))
    local cb = event.cb
    total_money = total_money + tonumber(args)
    cb(("%s"):format(total_money))
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

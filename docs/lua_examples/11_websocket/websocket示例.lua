local omega = require("omega")

local cbs = {}
local mux_poller = omega.listen.new_mux_poller()

cbs[omega.websocket.resp] = function(event)
    event.cb(event.output)
end

local err = omega.websocket.server("0.0.0.0", 1042, function(conn)
    print("new websocket client connected")
    cbs[conn] = function(recved_msg)
        print("websocket server received: ", recved_msg)
        conn:send_message("server echo: " .. recved_msg)
    end
    mux_poller:poll(conn)
end, function(deadReason)
    print("websocket server dead, reason: ", deadReason)
end)

if err then
    print("websocket server started, err: ", err)
end

mux_poller:event_after(1.0, function()
    local conn = omega.websocket.connect("ws://127.0.0.1:1042")
    cbs[conn] = function(recved_msg)
        print("websocket client received: ", recved_msg)
    end
    mux_poller:poll(conn)
    conn:send_message("hello")
end)

for event_poller, _ in pairs(cbs) do
    mux_poller:poll(event_poller)
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

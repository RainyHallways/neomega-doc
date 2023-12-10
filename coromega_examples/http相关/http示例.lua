local omega = require("omega")
package.path = ("%s;%s"):format(
    package.path,
    omega.storage_path.get_code_path("LuaLoader", "?.lua")
)
local coromega = require("coromega").from(omega)

coromega:start_new(function()
    local response, error_message = coromega:http_request("GET", "http://example.com", {
        query = "page=1",
        timeout = "30s",
        headers = {
            Accept = "*/*"
        }
    })
    if error_message then
        print("request error: ", error_message)
    else
        print("request response: ", response)
        print("request response status_code: ", response.status_code)
        print("request response headers: ", response.headers)
        print("request response body_size: ", response.body_size)
        print("request response body: ", response.body)
        print("request response cookies: ", response.cookies)
        print("request response url: ", response.url)
    end

    -- or just:
    -- local response, error_message = coromega:http_get("http://example.com", {
    --     query = "page=1",
    --     timeout = "30s",
    --     headers = {
    --         Accept = "*/*"
    --     }
    -- })

    -- or just
    -- local response, error_message = coromega:http_post("http://example.com")
end)

coromega:run()

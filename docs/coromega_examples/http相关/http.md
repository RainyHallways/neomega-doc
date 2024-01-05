---
lang: zh-CN
title: HTTP
description: HTTP示例
---

# HTTP 相关API

## HTTP request
- http_request(method,url,option)
    - 范围: 协程内
    - 参数:
        - method: 方法 get/post/put/delete/head/patch
        - url: 字符串形式地址
        - option: 可不填，或参考 https://github.com/cjoudrey/gluahttp 的选项, http 模块为 gluahttp 的异步版本
    - 返回:  
        - 请求结果对象, 包含以下成员
            - status_code: 状态码
            - headers: 响应头
            - body_size: body 长度
            - body: body
            - cookies
            - url
        - 字符串形式的错误信息(如果有)
    ```lua
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
    local response, error_message = coromega:http_request("GET", "http://example.com")
    ```

## HTTP get
- http_get(url,option)
    等效于: http_request("get",url,option)

## HTTP post
- http_post(url,option)
    等效于: http_request("post",url,option)

## HTTP put
- http_put(url,option)
    等效于: http_request("out",url,option)

## HTTP delete
- http_delete(url,option)
    等效于: http_request("delete",url,option)

## HTTP head
- http_head(url,option)
    等效于: http_request("head",url,option)

## HTTP patch
- http_patch(url,option)
    等效于: http_request("patch",url,option)

## 综合使用
```lua
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

```
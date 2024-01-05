---
contributors: [CMA2401PT, Liliya233, awaqwqa, kukinghan]
---

# Web(HTTP) 模块

此模块为 lua 环境引入了对 HTTP 请求的支持。

## 使用
Web 模块位于 `omega` 命名空间下的 `web` 子项。
```
local http=require("omega").web
```
## 实现
### 伪定义
这些定义并未被现实地实现，而是作为要求遵守的隐式约定存在。
#### `HTTPRequest` : `table`
这是向 `web.request` 传入的 `table` 值。
* `method`: `string` [可选, 默认="GET"], 有效的 HTTP 请求类型，例如 `POST`。
* `body`: `string` [可选], 请求体
* `headers`: `table` [可选], 若设定，所有的 key 需要作为字符串存在。
#### `HTTPResponse` : `table`
这是 HTTP 方法们返回的 `table` 值。
* `status`: `number`
* `headers`: `table`
* `body`: `string`
### `client`: HTTP 客户端
客户端可以通过调用 `web.new` 或 `client` 对象的 `client.new` 方法实现，不管创建方式如何，空的 HTTP 客户端都会被创建。 此模块，`web` 是一个默认的 `client` 对象，用于简化 headers 不重要的 HTTP 请求。
#### `client.get`
参数:
* `url`: `string`
返回:
* `response`: `HTTPResponse`
* `error` [可选]: `string`
#### `client.post`
参数:
* `url`: `string`
* `content_type`: `string`
* `body`: `string`
返回:
* `response`: `HTTPResponse`
* `error` [可选]: `string`
#### `client.request`
参数:
* `request`: `HTTPRequest`
返回:
* `response`: `HTTPResponse`
* `error` [可选]: `string`
#### `client.headers`
此项目存储对此客户端所发送的全部请求适用的 headers 值。此项目可以变更。

可能的用法:
```
local headers={Authorization="Bearer Hello"}
client.headers=headers
```

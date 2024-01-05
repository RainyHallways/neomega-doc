# Web(HTTP) Module

This module implements HTTP requests to lua environment.

## Access
The Web module is under `omega` namespace / table.
```
local http=require("omega").web
```
## Implementation
### Pseudo Definitions
These definitions are not specifically implemented, but are performed as implicit rules that are required to be conformed
#### `HTTPRequest` : `table`
This is the `table` value passed to `web.request`.
* `method`: `string` [OPTIONAL, DEFAULT="GET"], valid HTTP request method, e.g. `POST`
* `body`: `string` [OPTIONAL], request body
* `headers`: `table` [OPTIONAL], all the keys SHOULD be string if defined.
#### `HTTPResponse` : `table`
This is the `table` value that HTTP functions return.
* `status`: `number`
* `headers`: `table`
* `body`: `string`
### `client`: HTTP Client
A client can be created by calling `web.new` or `client.new` from a client object, in either way an empty HTTP client would be created. This module, `web` itself is a `client` created by default enabling simple HTTP requests whose features like headers do not matter.
#### `client.get`
Argument:
* `url`: `string`
Return values:
* `response`: `HTTPResponse`
* `error` [OPTIONAL]: `string`
#### `client.post`
Arguments:
* `url`: `string`
* `content_type`: `string`
* `body`: `string`
Return values:
* `response`: `HTTPResponse`
* `error` [OPTIONAL]: `string`
#### `client.request`
Argument:
* `request`: `HTTPRequest`
Return values:
* `response`: `HTTPResponse`
* `error` [OPTIONAL]: `string`
#### `client.headers`
This field stores the headers that would be applied to ALL of the requests sent by the client. This field is assignable.

Usage:
```
local headers={Authorization="Bearer Hello"}
client.headers=headers
```

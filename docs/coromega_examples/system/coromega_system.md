---
lang: zh-CN
title: 系统功能
description: 系统功能示例
---

# system

## 打印信息
- print(...)
    - 范围: 任意
    - 说明: 打印信息
    - 参数: ... 为任意参数
    - 返回值: 无
    ``` lua
    coromega:print("hello world")
    ```
	
## 输出日志
- log(...)
    - 范围: 任意
    - 说明: 信息将会被同时输出到终端和日志中, mc中的彩色字将会被自动转换为同一颜色的终端代码
    - 参数: ... 为任意参数
    - 返回值: 无
    ``` lua
    coromega:log("hello world")
    ```

## 从终端获取输入
- input(hint)
    - 范围: 协程内
    - 说明: 从终端获取输入, 末尾的换行符号("\n")会被移除
    - 参数: hint 为提示信息
    - 返回值: 输入的内容
    ``` lua
    local input = coromega:input("请输入:")
    ```
- backend_input(hint)
    - 范围: 协程内
    - 说明: 从终端获取输入,效果和 input 完全相同
    - 参数: hint 为提示信息
    - 返回值: 输入的内容
    ``` lua
    local input = coromega:backend_input("请输入:")
    ```
	
## 系统架构信息
- os()
    - 范围: 任意
    - 说明: 获取操作系统和架构信息，例如 "linux-amd64"
    - 参数: ... 为任意参数
    - 返回值: 字符串形式的操作系统和架构信息
    ``` lua
    local system_and_arch = coromega:os()
    ```
	
## 获取当前目录
- current_dir()
    - 范围: 任意
    - 说明: 获取当前目录
    - 参数: 无
    - 返回值: 当前目录
    ``` lua
    local current_dir = coromega:current_dir()
    ```
	
## 创建目录
- make_dir(path)
    - 范围: 任意
    - 说明: 创建目录
    - 参数: path 为目录地址
    - 返回值: 无
    ``` lua
    coromega:make_dir("test")
    ```
	
## 创建临时目录
- make_temp_dir()
    - 范围: 任意
    - 说明: 创建临时目录 这个目录会在omega框架退出时或重启时自动删除, 由neomega保证这个目录内文件有可执行权限和其他权限(安卓的 Download目录，即neomega在安卓上的默认目录没有可执行权限)
    - 参数: 无
    - 返回值: 临时目录地址
    ``` lua
    coromega:make_temp_dir()
    ```
	
## 获取当前时间
- now()
    - 范围: 任意
    - 说明: 获取当前时间 单位秒 (unix time)
    - 参数: 无
    - 返回值: 当前时间
    ``` lua
    coromega:now()
    ```
- now_unix()
    - 范围: 任意
    - 说明: 获取当前时间 单位秒 (unix time), 同 now()
    - 参数: 无
    - 返回值: 当前时间
    ``` lua
    coromega:now()
    ```
	
## 获取插件启动时间
- now_since_start()
    - 范围: 任意
    - 说明: 从插件启动开始的时间单位秒
    - 参数: 无
    - 返回值: 当前时间
    ``` lua
    coromega:now_since_start()
    ```
	
## 睡眠（休眠、暂停）
- sleep(time)
    - 范围: 协程内
    - 说明: 睡眠
    - 参数: time 为睡眠时间 单位秒. 当时间过短时，可能会因为系统原因导致sleep时间不精确
    - 返回值: 无
    ``` lua
    coromega:sleep(1.1)
    ```

## 创建协程
- start_new(func)
    - 范围: 任意
    - 说明: 在一个新的协程中开始执行指定的函数
    - 参数: 没有输入也没有输出的函数
    - 返回值: 无
    ``` lua 
    coromega:start_new(function()
        coromega:print("running in a new coroutine!")
    end)
    ```

## 暂停协程
- pause() & get_resume()
    - 范围: 协程内
    - 说明: pause 暂停一个协程，直到 get_resume() 获取的回执获得结果
    ```lua
    coromega:start_new(function()
        coromega:print("running in coroutine 1")
        local resumable=coromega:get_resume()
        coromega:start_new(function()
            coromega:print("running in coroutine 2")
            coromega:print("coroutine 2 sleep 3s")
            coromega:sleep(3.0)
            coromega:print("coroutine 2 awake")
            resumable("2401")
            coromega:print("coroutine 2 exit")
        end)
        coromega:print("coroutine 1 paused!")
        local ret=coromega:pause()
        coromega:print(("coroutine 1 resumed, with ret %s"):format(ret))
        coromega:print("coroutine 1 exit")
    end)
    ```
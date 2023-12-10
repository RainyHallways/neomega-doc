---
lang: zh-CN
title: 配置读取
description: 配置读取示例
---

# 配置读取和升级相关 API

## 读取配置文件的配置
- coromega.config
    - 范围: 任意
    - 说明: 当执行 local coromega = require("coromega").from(omega) 时, 插件对应配置文件的参数将被自动读取到 coromega.config 中,   
    您可以像访问一个通常的对象那样访问 coromega.config   
    假设, 您的配置文件看起来如下:
    ```json
    {
        "名称": "购买.lua",
        "描述": "允许用户购买物品",
        "是否禁用": false,
        "来源": "LuaLoader",
        "配置": {
            "Version":"0.0.1",
            "记分板名":"coin",
            "物品清单":[
                {"名称":"苹果","MC名称":"apple","价格":10},
                {"名称":"石头","MC名称":"stone","价格":5},
                {"名称":"玻璃","MC名称":"glass","价格":20}
            ]
        }
    }
    ```
    那么您可以这样访问它们:
    ```lua
    print(json.encode(coromega.config))
    local version=coromega.config.Version
    -- 或
    local version=coromega.config["Version"]
    local scoreboard_name=coromega.config["记分板名"]
    local items_list=coromega.config["物品清单"]
    for item_i,item in ipairs(items_list) do 
        print(("第 %s 个物品: %s"):format(item_i,item["名称"]))
        for key,value in pairs(item) do 
            print(("- %s:%s"):format(key,value))
        end
        -- 或
        local item_name=item["名称"]
        local item_mc_name=item["MC名称"]
        local item_price=item["价格"]
    end
    ```

## 升级文件配置
- update_config(new_config)
    - 范围: 任意
    - 说明: 当您升级了您的代码后，代码可能需要一些旧配置中原本不存在的配置项, 此方法存在的意义就是允许您修改配置文件，使之与新代码对应   
    例如，在上述配置文件中，您希望为配置文件添加 "记分板显示名" 这一选项, 您可以这么做:
    ```lua
    local version=coromega.config.Version
    if version=="0.0.1" then -- 只有当配置文件版本较旧的时候才升级
        coromega.config["记分板显示名"]="金币"
        coromega.config.Version="0.0.2"
        coromega:update_config(coromega.config)
    end
    local scoreboard_display_name=coromega.config["记分板显示名"]
    ```
    当您的插件运行时, 配置文件将被更新为:
    ```json
    {
        "名称": "购买.lua",
        "描述": "允许用户购买物品",
        "是否禁用": false,
        "来源": "LuaLoader",
        "配置": {
            "Version":"0.0.2",
            "记分板名":"coin",
            "物品清单":[
                {"名称":"苹果","MC名称":"apple","价格":10},
                {"名称":"石头","MC名称":"stone","价格":5},
                {"名称":"玻璃","MC名称":"glass","价格":20}
            ],
            "记分板显示名":"金币"
        }
    }
    ```

## 综合使用
```lua
print(json.encode(coromega.config))
local version=coromega.config.Version
-- 或
local version=coromega.config["Version"]
local scoreboard_name=coromega.config["记分板名"]

if version=="0.0.1" then -- 只有当配置文件版本较旧的时候才升级
    coromega.config["记分板显示名"]="金币"
    coromega.config.Version="0.0.2"
    coromega:update_config(coromega.config)
end

local scoreboard_display_name=coromega.config["记分板显示名"]
local items_list=coromega.config["物品清单"]
for item_i,item in ipairs(items_list) do 
    print(("第 %s 个物品: %s"):format(item_i,item["名称"]))
    for key,value in pairs(item) do 
        print(("- %s:%s"):format(key,value))
    end
    -- 或
    local item_name=item["名称"]
    local item_mc_name=item["MC名称"]
    local item_price=item["价格"]
end

```
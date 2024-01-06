---
lang: zh-CN
title: 方块、命令块
description: 方块和命令块示例
---

# 方块和命令块放置相关API

## 立即方块放置
以下两个api在被调用时会立即放置方块，   
调用者应该自行确保该方块在机器人可放置范围内，且所在区块已经加载

- place_block(pos, block_name, block_data)
    - 范围: 任意
    - 说明: 在pos位置放置一个方块
    - 参数: 
        - pos: 放置的位置
        - block_name: 方块的名字
        - block_data: 方块的数据
    - 返回: 无
    ``` lua
    -- 在1,2,3位置放置一个状态为0的石头方块
    coromega:place_block({ x = 1, y = 2, z = 3 }, "stone", "0")
    ```
- place_command_block(pos, block_name, block_data, option)
    - 范围: 任意
    - 说明: 在pos位置放置一个命令方块
    - 参数: 
        - pos: 放置的位置
        - block_name: 方块的名字
        - block_data: 方块的状态
        - option: 命令方块的配置
    - 返回: 错误信息
    ``` lua
    -- 在884.73.829位置放置一个重复命令方块,命令为list @a 10tick后执行,并且需要红石激活 条件为真 名字为:列出所有玩家 延迟为10 tick 输出结果 并且在第一次tick时执行
    local err = coromega:place_command_block( 
        { x = 884, y = 73, z = 829 },       -- 坐标
        "repeating_command_block",          -- command_block/chain_command_block/repeating_command_block
        0,                                  -- 方块数据，影响朝向
        { 
            need_red_stone = true,          -- 红石激活
            conditional = true,             -- 有条件
            command = "list @a",            -- 命令
            name = "列出所有玩家",           -- 方块名
            tick_delay = 10,                -- 延迟
            track_output = true,            -- 显示输出
            execute_on_first_tick = true,   -- 执行第一个对象
        } 
    )
    if err then
        coromega:print(err)
    end 
    ```

- place_sign(pos, block_name, text, lighting)
    - 范围: 任意
    - 说明: 在pos位置放置一个告示牌
    - 参数: 
        - pos: 放置的位置
        - block_name: 方块的名字
        - text: 告示牌上的字
        - lighting: 是否发光
    - 返回: 错误信息
    ``` lua
    -- 在 1,-60,0 位置放置一个告示牌，上面写着 240! 同时发光
    local err = coromega:place_sign(
        { x = 1, y = -60, z = 0 }, -- 坐标
        "jungle_standing_sign 0",
        "§a§l240!",
        true
    )
    if err then
        coromega:print(err)
    end
    ```

## 区块构建 API
> 调用 omega builder 构建一个区块范围的方块   
区块范围的方块指的是 structure 和 canvas，如何编辑和使用他们请参照章节   
- 建筑文件读取，转换，编辑，拷贝相关API   
- 画布和绘制相关API
调用该API时，由 omega builder 负责方块正确的构建
您需要有对应的权限

- when_progress_increased_by_build(aread_chunk, start_pos, end_pos, target_pos, option)
    - 范围: 任意
    - 说明: 导入 详细如下
    - 参数: 
        - aread_chunk: 需要导入的数据 (structure / canvas)
        - start_pos: 被导入的东西的起始位置
        - end_pos: 被导入的东西的的结束位置
        - target_pos: 导入的位置(服务器中)
        - option: 导入的选项
    - 返回值为监听器
    - 监听器的回调函数的参数为 全部任务和当前进度，当 total==current 时，导入完成
    ``` lua
    coromega:when_progress_increased_by_build(
        target_structure_or_canvas,                  --需要被导的东西
        target_structure_or_canvas:get_start_pos(),  --被导的东西的起始位置
        target_structure_or_canvas:get_end_pos(),    --被导的东西的结束位置
        { x = 31000, y = 100, z = 11000 },           --导入到的位置(租赁服中)
        {
            speed = 2000,                            --导入速度
            incremental = false,                     --增量构建(false)
            force_use_block_state = false,           --强制使用block state(false),注：即时这里设置false，如果struceture中use_block_state为true，也会使用block state
            ignore_nbt_block = false,                --是否忽略nbt方块(false)
            clear_target_block = false,              --导入时清除目标位置的方块(false)
            clear_dropped_item = false,              --导入时清理掉落物(false)，注: 清理范围为整个租赁服，不止是导入的建筑范围
            auto_reverse = true,                      --（重新开始时回退跃点）(true)
            start_hop=0,                             --开始跃点(0)
        }
    ):start_new(function(total, current)
        coromega:log(("progress: %d/%d"):format(total, current))
    end)
    ```

---
lang: zh-CN
title: 方块转换和nbt
description: 方块转换和nbt示例
---

## 方块转换和 nbt 相关 API
```lua 
local blocks = omega.blocks
```
### 将传统格式方块转换为 runtime id 表示
- blocks.legacy_block_to_rtid
    - 将传统格式方块转换为 runtime id 表示(注意，不应该在文件中保存 runtime id，因为 runtime id 会随版本发生变化)
    ```lua
    local rtid, found = blocks.legacy_block_to_rtid("stained_glass", 1)
    print(found, rtid)
    ```

### 将 runtime id 表示的方块转为传统表示
- blocks.rtid_to_legacy_block
    ```lua
    local blockName, blockData, found = blocks.rtid_to_legacy_block(rtid)
    print(found, blockName, blockData)
    ```

### 将 runtime id 表示的方块转为 block name, block state 表示
- blocks.rtid_to_block_name_and_state
    ```lua
    local blockName, blockState, found = blocks.rtid_to_block_name_and_state(rtid)
    print(found, ("%s [%s]"):format(blockName, blockState))
    ```

### 将 block name, block state 表示转为 runtime id 表示
- blocks.block_name_and_state_to_rtid
    ```lua
    local rtid, found = blocks.block_name_and_state_to_rtid(blockName, blockState)
    print(found, rtid)
    ```

### 将 runtime id 表示的方块转为 java 表示
- blocks.rtid_to_java_str
    ```lua
    local java_str, found = blocks.rtid_to_java_str(rtid)
    print(found, java_str)
    ```

### 将 java 表示转为 runtime id 表示
- blocks.block_name_and_state_to_rtid
    ```lua
    local rtid, found = blocks.java_str_to_rtid(java_str)
    print(found, rtid)
    ```

```lua
local blocks = omega.blocks
local rtid, found = blocks.legacy_block_to_rtid("stained_glass", 1)
print(found, rtid)

local blockName, blockData, found = blocks.rtid_to_legacy_block(rtid)
print(found, blockName, blockData)

local blockName, blockState, found = blocks.rtid_to_block_name_and_state(rtid)
print(found, ("%s [%s]"):format(blockName, blockState))

local rtid, found = blocks.block_name_and_state_to_rtid(blockName, blockState)
print(found, rtid)

local java_str, found = blocks.rtid_to_java_str(rtid)
print(found, java_str)

local rtid, found = blocks.java_str_to_rtid(java_str)
print(found, rtid)
```

## nbt 编辑与生成操作
local nbt = blocks.new_nbt()

### 从方块 nbt 中读取 ID
- nbt:get_id()
    ``` lua
    local nbt_block_id=nbt:get_id()    
    ```

### 从方块 nbt 中读取某个 key 的 string
- nbt:get_string(key)
    ```lua
    local value=nbt:get_string("name")
    ```

### 将方块 nbt 中某个 key 的值设置为指定 string
- nbt:set_string(key,value)
    ```lua
    local value=nbt:set_string("name","#test")
    ```

### 复制 nbt 并获得副本
- nbt:copy()
    ```lua
    local copied_nbt=nbt:copy()
    ```

### 将 nbt 转为字符串表示
- nbt:to_str()
    ```lua
    local string_represent=nbt:to_str()
    ```

### 将 字符串表示 的内容恢复到此 nbt
- nbt:from_str(string_represent)
    ```lua
    local nbt=nbt:from_str(string_represent)
    ```

### 检查 nbt 是否为空
- nbt:is_empty()
    ```lua
    local is_empty=nbt:is_empty()
    ```

### 清除 nbt 内数据
- nbt:empty()
    ```lua
    nbt:empty()
    ```


## 建筑和画布
- 建筑和画布围绕三个重要的抽象概念实现:
    - AreaChunk: 由两个坐标确定的区块区域，以及一些可能的附加信息
    - Structure: 对应磁盘中的一个国际服存档文件
    - Canvas: 可以逐个放置方块的对象
- 概念实现:
  - structures.convert_file_to_structure(structure_path,structure_file_path)
    - 实现了 AreaChunk 和 Structure 概念, structure_file_path 为一个 .mcworld / .schem / .schematic /.bdx 文件
    - 当 structure_file_path 为 .mcworld 文件时，mcworld 文件被解压到 structure_path 并返回 structure 
    - 当 structure_file_path 为 .schem / .schematic /.bdx 文件时，若 structure_path 不存在或者为空时，就地创建一个国际服存档，并将 structure_file_path 文件内容写入此存档，若 structure_path 为一个国际服存档，则将  structure_file_path 文件内容直接写入此存档， 都返回 structure
    ```lua
    local structures=omega.structures
    local source_structure = structures.convert_file_to_structure(source_structure_dir, source_structure_file)
    ```
  - structures.open_or_create_structure(path)
    - 实现了 AreaChunk 和 Structure 概念, 当 path 对应的路径不存在或者为空时，就地创建一个国际服存档, 当 path 对应的路径为国际服存档时， 则直接打开该存档，都返回 structure 
    ```lua
    local structures=omega.structures
    local source_structure = structures.open_or_create_structure("some_dir")
    ```
  - structures.new_canvas()
    - 实现了 AreaChunk 和 Canvas 概念
    - 驻留在内存中，不会产生文件
    ```lua
    local canvas = structure.new_canvas()
    ```

## Area Chunk 
### 复制和移动
- structures.copy(source, target, source_start_pos, source_end_pos, offset)
  - 将源区域内的方块复制到目标区域,如果需要移动，可以修改偏移量(偏移量)
    ```lua
    local structures=omega.structures
    local source_start_pos = source_structure_or_canvas:get_start_pos()
    local source_end_pos = source_structure_or_canvas:get_end_pos()
    local offset = { x = 0, y = 0, z = 0 }
    structures.copy(source_structure_or_canvas,target_structure_or_canvas,source_start_pos, source_end_pos, offset)
    ```

### 调用 omega builder 构建一个区块范围的方块   
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

### 获取区域起点
- structure/canvas:get_start_pos()
    ```lua
    local start_pos = structure/canvas:get_start_pos()
    ```
### 设置区域起点
- structure/canvas:set_start_pos(pos)
  - 如果新起点导致区域范围变大，变大的范围会被 空气 充满，如果区域变小，原有方块也不会丢失
    ```lua
    structure/canvas:set_start_pos(pos)
    ```

### 获取区域终点
- structure/canvas:get_end_pos()
    ```lua
    local start_pos = structure/canvas:get_end_pos()
    ```

### 设置区域终点
- structure/canvas:set_end_pos(pos)
  - 如果新终点导致区域范围变大，变大的范围会被 空气 充满，如果区域变小，原有方块也不会丢失
    ```lua
    structure/canvas:set_end_pos(pos)
    ```

### 检查区域属性:是否必须使用 block state
- structure/canvas:get_must_block_state()
    ```lua
    local must_block_state = structure/canvas:get_must_block_state()
    ```

### 设置区域属性:是否必须使用 block state
-  structure/canvas:set_must_block_state(must_block_state)
    ```lua
    structure/canvas:set_must_block_state(true)
    ```

### 对区域内所有方块应用变换
- structure/canvas:apply_alter_to_blocks(start_pos, end_pos,alter_fn,option_ignore_air_block, option_ignore_nbt_block, option_ignore_normal_block)
  - start_pos: 起始坐标
  - end_pos: 结束坐标
  - alter_fn: 变换函数
  - option_ignore_air_block: 是否忽略空气方块
  - option_ignore_nbt_block: 是否忽略 nbt 方块
  - option_ignore_normal_block: 是否忽略普通方块
  ```lua
    local alter_start_pos = source_structure:get_start_pos()
    local alter_end_pos = source_structure:get_end_pos()
    -- 忽略范围内的空气方块
    local option_ignore_air_block = true
    -- 修改范围内的nbt方块
    local option_ignore_nbt_block = false
    -- 忽略范围内的非nbt方块
    local option_ignore_normal_block = true
    -- 对于每一个方块，都会调用 alter_fn 函数，该函数返回修改后的方块的 runtime id 和 nbt
    local alter_fn = function(x, y, z, block_rtid, nbt)
        local nbt_type = nbt:get_id()
        -- 只需修改命令块的命令
        if nbt_type == "CommandBlock" then
            local key_name = nbt:get_string("Command")
            -- 将命令块的命令前加一个"#",这样命令块就不会执行命令了,你也可以做其他修改
            nbt:set_string("Command", "#" .. key_name)
        end
        return block_rtid, nbt
    end
    --  对目标建筑进行修改
    print("开始修改目标建筑, 请稍等...\n")
    target_structure:apply_alter_to_blocks(
        alter_start_pos, alter_end_pos,                                              -- 范围
        alter_fn,                                                                    -- 修改函数
        option_ignore_air_block, option_ignore_nbt_block, option_ignore_normal_block -- 选项
    )
  ```

## Structure
### 获得 omega_builder 可接受的存档名
- get_file_name()
    - 获得 omega_builder 可接受的存档名
    ```lua
    local file_name=structure:get_file_name()
    ```

### 获得建筑名
- get_structure_name()
    - 获得建筑名
    ```lua
    local structure_name=structure:get_structure_name()
    ```

### 设置建筑名
- set_structure_name(name)
    - 设置建筑名
    ```lua
    structure:set_structure_name("test_structure")
    ```

### 移除磁盘中的存档文件并销毁建筑
- remove()
    - 移除磁盘中的存档文件并销毁建筑，此函数后，该建筑无法被操作
    ```lua
    structure:remove()
    ```

### 关闭建筑，并在指定路径生成 .mcworld 存档
- gen_mcworld(path)
    - 关闭建筑，并在指定路径生成 .mcworld 存档，此函数后，该建筑无法被操作，直到重新打开 (structures.open_or_create_structure(path))
    ```lua
    -- 获得输出目录，输出目录为当前目录(.), 这是指程序运行的目录，不是本文件所在的目录
    local output_dir = "."
    -- 自动计算建议的输出文件名
    local output_file_name = (("%s/%s.mcworld"):format(output_dir, target_structure:get_file_name()))
    -- 将目标建筑写入到输出文件 (mcworld 格式)
    target_structure:gen_mcworld(output_file_name) -- 需要注意，调用这个函数后，建筑就无法再修改/导入/进行其他操作了，因为生成mcworld需要先关闭建筑
    ```

### 关闭建筑
- close()
    - 关闭建筑，此函数后，该建筑无法被操作，直到重新打开 (structures.open_or_create_structure(path))
    ```lua
    target_structure:close()
    ```

## Canvas
### 在 canvas 的 pos位置放置一个方块
- place_block(pos, block_name, block_data)
    - 范围: 任意
    - 说明: 在 canvas 的 pos 位置放置一个方块
    - 参数: 
        - pos: 放置的位置
        - block_name: 方块的名字
        - block_data: 方块的数据
    - 返回: 无
    ``` lua
    -- 在1,2,3位置放置一个状态为0的石头方块
    canvas:place_block({ x = 1, y = 2, z = 3 }, "stone", "0")
    ```

### 在 canvas 的 pos位置放置一个命令方块
- place_command_block(pos, block_name, block_data, option)
    - 范围: 任意
    - 说明: 在 canvas 的 pos位置放置一个命令方块
    - 参数: 
        - pos: 放置的位置
        - block_name: 方块的名字
        - block_data: 方块的状态
        - option: 命令方块的配置
    - 返回: 无
    ``` lua
    -- 在884.73.829位置放置一个重复命令方块,命令为list @a 10tick后执行,并且需要红石激活 条件为真 名字为:列出所有玩家 延迟为10 tick 输出结果 并且在第一次tick时执行
    canvas:place_command_block( 
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
    ```

### 设置 canvas 放置方块操作的坐标偏移
- set_upcoming_block_offset(offset)
      - 后续所有 place_block / place_command_block 的操作，或间接调用 place_block / place_command_block 的操作 中的 pos 都会加上 offset 指定的偏移
    ```lua
    canvas:set_upcoming_block_offset({100,100,100})
    ```

## Canvas Artists
local canvas_artists = omega.canvas_artists

### 在 canvas 上绘制地图画
- canvas_artists.map_art(canvas, image_file, apply_dither, xsize, zsize)
    - 在 canvas 上绘制地图画
    - image_file 为图片路径，图片可以是 jpg, jpeg, png 
    - apply_dither: 是否应用量化算法，在地图画较大时，效果更好，较小时，效果更差
    - xsize: 横向地图画数量
    - zsize: 纵向地图画数量
    ```lua
    local canvas_artists = omega.canvas_artists
    canvas_artists.map_art(canvas, "test.jpg", true, 3, 3)
    ```
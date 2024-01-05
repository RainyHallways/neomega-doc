local omega = require("omega")
local print = omega.system.print

print("Hello, world! from example2")

local structures = omega.structures
local blocks = structures.blocks


-- 建筑文件,可以是 schem/schemaic/bdx/mcworld
local source_structure_file = "./空散云雾菜单2.0.bdx"
-- 在临时目录创建一个空建筑
local source_structure_dir = omega.system.temp_dir() -- "./omega_source_structure" -- 临时建筑目录，所谓建筑目录其实就是基岩版存档的文件夹
-- 从建筑文件中读取建筑到临时建筑目录
local source_structure = structures.convert_file_to_structure(source_structure_dir, source_structure_file)
-- 从mc基岩版存档地址(文件夹)中读取建筑
-- local structure = structures.open_or_create_structure("mc基岩版存档地址")
-- 在临时目录创建一个空建筑,如果目录是一个mc基岩版存档，则打开存档
local target_structure_dir = omega.system.temp_dir() -- "./omega_target_structure" -- 输出建筑目录，所谓建筑目录其实就是基岩版存档的文件夹
local target_structure = structures.open_or_create_structure(target_structure_dir)

print(source_structure:get_file_name())
-- source_structure:get_start_pos()
-- source_structure:get_end_pos()
-- source_structure:get_structure_name()
-- source_structure:get_must_block_state()
-- source_structure:gen_mcworld("输出文件名")
-- source_structure:remove()
-- source_structure:set_start_pos(pos)
-- source_structure:set_end_pos(pos)
-- source_structure:set_structure_name(name)
-- source_structure:set_must_block_state(must_block_state)
-- source_structure:apply_alter_to_blocks(start_pos, end_pos, alter_fn, option_ignore_air_block, option_ignore_nbt_block, option_ignore_normal_block)

-- 两个坐标相加
local function add_pos(pos_1, pos_2)
    return {
        x = pos_1.x + pos_2.x,
        y = pos_1.y + pos_2.y,
        z = pos_1.z + pos_2.z
    }
end

-- 实际的建筑操作代码
local function convert_structure(source_structure, target_structure)
    -- 获得源建筑的起始位置和结束位置
    local source_start_pos = source_structure:get_start_pos()
    local source_end_pos = source_structure:get_end_pos()
    -- 将源建筑复制到目标建筑，偏移量(offset)为(0, 0, 0),如果需要移动建筑，可以修改offset
    local offset = { x = 0, y = 0, z = 0 }
    structures.copy_structure(source_structure, target_structure, source_start_pos, source_end_pos, offset)

    -- 本文件中只包含一个建筑，你可以自己搞更花哨的操作
    -- 将位置、名称、是否必须使用 block state 等信息从源建筑复制到目标建筑 (因为只有一个建筑)
    local target_start_pos = add_pos(source_start_pos, offset)
    target_structure:set_start_pos(target_start_pos)
    local target_end_pos = add_pos(source_end_pos, offset)
    target_structure:set_end_pos(target_end_pos)
    target_structure:set_structure_name(source_structure:get_structure_name())
    target_structure:set_must_block_state(source_structure:get_must_block_state())


    -- 对目标建筑进行修改，在这份文件生成时，命令方块的命令全部被提取出来，放在 key_strings 中
    -- 你可以在这里对命令进行修改，然后再写回去
    -- 修改的范围
    local alter_start_pos = target_start_pos
    local alter_end_pos = target_end_pos
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

    return target_structure
end

target_structure = convert_structure(source_structure, target_structure)
source_structure:remove()

local progress_poller = omega.builder.build_structure(
    target_structure,                  -- 需要被导入的建筑
    target_structure:get_start_pos(),  --被导入的建筑的起始位置
    target_structure:get_end_pos(),    --被导入建筑的结束位置
    { x = 31000, y = 100, z = 11000 }, --导入到的位置(租赁服中)
    2000,                              -- 导入速度
    false,                             -- 增量构建(false)
    false,                             -- 强制使用block state(false),注：即时这里设置false，如果struceture中use_block_state为true，也会使用block state
    false,                             -- 是否忽略nbt方块(false)
    false,                             --导入时清除目标位置的方块(false)
    false,                             --导入时清理掉落物(false)，注: 清理范围为整个租赁服，不止是导入的建筑范围
    false,                             --导入时回退跃点(false)
    0                                  --起始跃点
)
-- 因为一些原因，有时命令块需要导入两次才能保证全部导入，只导入一次可能会漏

local mux_poller = omega.listen.make_mux_poller()
local function on_progress(progress)
    print(("progress: %s/%s"):format(progress.total, progress.current))
    if progress.total == progress.current then
        print("done")
        -- 获得输出目录，输出目录为当前目录(.), 这是指程序运行的目录，不是本文件所在的目录
        local output_dir = "."
        -- 自动计算建议的输出文件名
        local output_file_name = (("%s/%s.mcworld"):format(output_dir, target_structure:get_file_name()))
        -- 将目标建筑写入到输出文件 (mcworld 格式)
        target_structure:gen_mcworld(output_file_name) -- 需要注意，调用这个函数后，建筑就无法再修改/导入/进行其他操作了，因为生成mcworld需要先关闭建筑
        -- 当然，你可以再次打开建筑
        -- 移除源建筑所在的目录
        target_structure:remove()
    end
end


mux_poller:poll(progress_poller)
while mux_poller:block_has_next() do
    local event = mux_poller:block_get_next()
    if event.type == progress_poller then
        local progress = event.data
        on_progress(progress)
    end
end



-- 虽然没有在上面展示，不过这些函数也可以用:
-- nbt 相关
-- local new_nbt = blocks.new_nbt() -- 创建一个空的 nbt
-- print(nbt:is_empty()) -- nbt 是否为空
-- nbt:empty() -- 清空nbt
-- local new_nbt=nbt:copy() -- 复制一个 nbt
-- local str_like_nbt=nbt:to_str() -- 将 nbt 转换为 字符串
-- print(str_like_nbt)
-- nbt=nbt:from_str(str_like_nbt) -- 从 字符串 转换为 nbt



-- rtid 相关
-- print(("air rtid is %s \n"):format(blocks.AIR))                     -- 获取空气方块的 runtime id (rtid)
-- local rtid, found = blocks.legacy_block_to_rtid("stained_glass", 1) -- 从名称和数据值获取 rtid\
-- if found then
--     print(("rtid of stained_glass with data value 1 is %s \n"):format(rtid))
-- else
--     print("stained_glass with data value 1 not found\n")
-- end

-- 从 rtid 获取方块的名称和数据值
-- local block_name, data_value, found = blocks.rtid_to_legacy_block(rtid)
-- if found then
--     print(("block name of rtid %s is %s, data value is %s \n"):format(rtid, block_name, data_value))
-- else
--     print(("rtid %s not found\n"):format(rtid))
-- end

-- 从 rtid 获取方块的 java str 名
-- local java_str_name, found = blocks.rtid_to_java_str(rtid)
-- if found then
--     print(("java str name of rtid %s is %s \n"):format(rtid, java_str_name))
-- else
--     print(("rtid %s not found\n"):format(rtid))
-- end

-- 从 java str 名 获取 rtid
-- local rtid, found = blocks.java_str_to_rtid(java_str_name)
-- if found then
--     print(("rtid of java str name %s is %s \n"):format(java_str_name, rtid))
-- else
--     print(("java str name %s not found\n"):format(java_str_name))
-- end

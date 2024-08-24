import{_ as s,c as a,o as n,Q as l}from"./chunks/framework.c009d427.js";const u=JSON.parse('{"title":"方块、命令块","description":"方块和命令块示例","frontmatter":{"lang":"zh-CN","title":"方块、命令块","description":"方块和命令块示例"},"headers":[],"relativePath":"coromega_examples/方块和命令块放置相关/index.md","filePath":"coromega_examples/方块和命令块放置相关/index.md","lastUpdated":1724487756000}'),p={name:"coromega_examples/方块和命令块放置相关/index.md"},o=l(`<h1 id="方块和命令块放置相关api" tabindex="-1">方块和命令块放置相关API <a class="header-anchor" href="#方块和命令块放置相关api" aria-label="Permalink to &quot;方块和命令块放置相关API&quot;">​</a></h1><h2 id="立即方块放置" tabindex="-1">立即方块放置 <a class="header-anchor" href="#立即方块放置" aria-label="Permalink to &quot;立即方块放置&quot;">​</a></h2><p>以下两个api在被调用时会立即放置方块，<br> 调用者应该自行确保该方块在机器人可放置范围内，且所在区块已经加载</p><ul><li><p>place_block(pos, block_name, block_data)</p><ul><li>范围: 任意</li><li>说明: 在pos位置放置一个方块</li><li>参数: <ul><li>pos: 放置的位置</li><li>block_name: 方块的名字</li><li>block_data: 方块的数据</li></ul></li><li>返回: 无</li></ul><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">-- 在1,2,3位置放置一个状态为0的石头方块</span></span>
<span class="line"><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">place_block</span><span style="color:#E1E4E8;">({ x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, z </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> }, </span><span style="color:#9ECBFF;">&quot;stone&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;0&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">-- 在1,2,3位置放置一个状态为0的石头方块</span></span>
<span class="line"><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">place_block</span><span style="color:#24292E;">({ x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, z </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> }, </span><span style="color:#032F62;">&quot;stone&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;0&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div></li><li><p>place_command_block(pos, block_name, block_data, option)</p><ul><li>范围: 任意</li><li>说明: 在pos位置放置一个命令方块</li><li>参数: <ul><li>pos: 放置的位置</li><li>block_name: 方块的名字</li><li>block_data: 方块的状态</li><li>option: 命令方块的配置</li></ul></li><li>返回: 错误信息</li></ul><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">-- 在884.73.829位置放置一个重复命令方块,命令为list @a 10tick后执行,并且需要红石激活 条件为真 名字为:列出所有玩家 延迟为10 tick 输出结果 并且在第一次tick时执行</span></span>
<span class="line"><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">place_command_block</span><span style="color:#E1E4E8;">( </span></span>
<span class="line"><span style="color:#E1E4E8;">    { x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">884</span><span style="color:#E1E4E8;">, y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">73</span><span style="color:#E1E4E8;">, z </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">829</span><span style="color:#E1E4E8;"> },       </span><span style="color:#6A737D;">-- 坐标</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;repeating_command_block&quot;</span><span style="color:#E1E4E8;">,          </span><span style="color:#6A737D;">-- command_block/chain_command_block/repeating_command_block</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,                                  </span><span style="color:#6A737D;">-- 方块数据，影响朝向</span></span>
<span class="line"><span style="color:#E1E4E8;">    { </span></span>
<span class="line"><span style="color:#E1E4E8;">        need_red_stone </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,          </span><span style="color:#6A737D;">-- 红石激活</span></span>
<span class="line"><span style="color:#E1E4E8;">        conditional </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,             </span><span style="color:#6A737D;">-- 有条件</span></span>
<span class="line"><span style="color:#E1E4E8;">        command </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;list @a&quot;</span><span style="color:#E1E4E8;">,            </span><span style="color:#6A737D;">-- 命令</span></span>
<span class="line"><span style="color:#E1E4E8;">        name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;列出所有玩家&quot;</span><span style="color:#E1E4E8;">,           </span><span style="color:#6A737D;">-- 方块名</span></span>
<span class="line"><span style="color:#E1E4E8;">        tick_delay </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,                </span><span style="color:#6A737D;">-- 延迟</span></span>
<span class="line"><span style="color:#E1E4E8;">        track_output </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,            </span><span style="color:#6A737D;">-- 显示输出</span></span>
<span class="line"><span style="color:#E1E4E8;">        execute_on_first_tick </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,   </span><span style="color:#6A737D;">-- 执行第一个对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">-- 在884.73.829位置放置一个重复命令方块,命令为list @a 10tick后执行,并且需要红石激活 条件为真 名字为:列出所有玩家 延迟为10 tick 输出结果 并且在第一次tick时执行</span></span>
<span class="line"><span style="color:#D73A49;">local</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">place_command_block</span><span style="color:#24292E;">( </span></span>
<span class="line"><span style="color:#24292E;">    { x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">884</span><span style="color:#24292E;">, y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">73</span><span style="color:#24292E;">, z </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">829</span><span style="color:#24292E;"> },       </span><span style="color:#6A737D;">-- 坐标</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;repeating_command_block&quot;</span><span style="color:#24292E;">,          </span><span style="color:#6A737D;">-- command_block/chain_command_block/repeating_command_block</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,                                  </span><span style="color:#6A737D;">-- 方块数据，影响朝向</span></span>
<span class="line"><span style="color:#24292E;">    { </span></span>
<span class="line"><span style="color:#24292E;">        need_red_stone </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,          </span><span style="color:#6A737D;">-- 红石激活</span></span>
<span class="line"><span style="color:#24292E;">        conditional </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,             </span><span style="color:#6A737D;">-- 有条件</span></span>
<span class="line"><span style="color:#24292E;">        command </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;list @a&quot;</span><span style="color:#24292E;">,            </span><span style="color:#6A737D;">-- 命令</span></span>
<span class="line"><span style="color:#24292E;">        name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;列出所有玩家&quot;</span><span style="color:#24292E;">,           </span><span style="color:#6A737D;">-- 方块名</span></span>
<span class="line"><span style="color:#24292E;">        tick_delay </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,                </span><span style="color:#6A737D;">-- 延迟</span></span>
<span class="line"><span style="color:#24292E;">        track_output </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,            </span><span style="color:#6A737D;">-- 显示输出</span></span>
<span class="line"><span style="color:#24292E;">        execute_on_first_tick </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,   </span><span style="color:#6A737D;">-- 执行第一个对象</span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div></li><li><p>place_sign(pos, block_name, text, lighting)</p><ul><li>范围: 任意</li><li>说明: 在pos位置放置一个告示牌</li><li>参数: <ul><li>pos: 放置的位置</li><li>block_name: 方块的名字</li><li>text: 告示牌上的字</li><li>lighting: 是否发光</li></ul></li><li>返回: 错误信息</li></ul><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">-- 在 1,-60,0 位置放置一个告示牌，上面写着 240! 同时发光</span></span>
<span class="line"><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">place_sign</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    { x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">60</span><span style="color:#E1E4E8;">, z </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> }, </span><span style="color:#6A737D;">-- 坐标</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;jungle_standing_sign 0&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;§a§l240!&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">then</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(err)</span></span>
<span class="line"><span style="color:#F97583;">end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">-- 在 1,-60,0 位置放置一个告示牌，上面写着 240! 同时发光</span></span>
<span class="line"><span style="color:#D73A49;">local</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">place_sign</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    { x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">60</span><span style="color:#24292E;">, z </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> }, </span><span style="color:#6A737D;">-- 坐标</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;jungle_standing_sign 0&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;§a§l240!&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">then</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(err)</span></span>
<span class="line"><span style="color:#D73A49;">end</span></span></code></pre></div></li></ul><h2 id="区块构建-api" tabindex="-1">区块构建 API <a class="header-anchor" href="#区块构建-api" aria-label="Permalink to &quot;区块构建 API&quot;">​</a></h2><blockquote><p>调用 omega builder 构建一个区块范围的方块<br> 区块范围的方块指的是 structure 和 canvas，如何编辑和使用他们请参照章节</p></blockquote><ul><li><p>建筑文件读取，转换，编辑，拷贝相关API</p></li><li><p>画布和绘制相关API 调用该API时，由 omega builder 负责方块正确的构建 您需要有对应的权限</p></li><li><p>when_progress_increased_by_build(aread_chunk, start_pos, end_pos, target_pos, option)</p><ul><li>范围: 任意</li><li>说明: 导入 详细如下</li><li>参数: <ul><li>aread_chunk: 需要导入的数据 (structure / canvas)</li><li>start_pos: 被导入的东西的起始位置</li><li>end_pos: 被导入的东西的的结束位置</li><li>target_pos: 导入的位置(服务器中)</li><li>option: 导入的选项</li></ul></li><li>返回值为监听器</li><li>监听器的回调函数的参数为 全部任务和当前进度，当 total==current 时，导入完成</li></ul><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">when_progress_increased_by_build</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    target_structure_or_canvas,                  </span><span style="color:#6A737D;">--需要被导的东西</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">target_structure_or_canvas</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">get_start_pos</span><span style="color:#E1E4E8;">(),  </span><span style="color:#6A737D;">--被导的东西的起始位置</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">target_structure_or_canvas</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">get_end_pos</span><span style="color:#E1E4E8;">(),    </span><span style="color:#6A737D;">--被导的东西的结束位置</span></span>
<span class="line"><span style="color:#E1E4E8;">    { x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">31000</span><span style="color:#E1E4E8;">, y </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">, z </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">11000</span><span style="color:#E1E4E8;"> },           </span><span style="color:#6A737D;">--导入到的位置(租赁服中)</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">        speed </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;">,                            </span><span style="color:#6A737D;">--导入速度</span></span>
<span class="line"><span style="color:#E1E4E8;">        incremental </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,                     </span><span style="color:#6A737D;">--增量构建(false)</span></span>
<span class="line"><span style="color:#E1E4E8;">        force_use_block_state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,           </span><span style="color:#6A737D;">--强制使用block state(false),注：即时这里设置false，如果struceture中use_block_state为true，也会使用block state</span></span>
<span class="line"><span style="color:#E1E4E8;">        ignore_nbt_block </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,                </span><span style="color:#6A737D;">--是否忽略nbt方块(false)</span></span>
<span class="line"><span style="color:#E1E4E8;">        clear_target_block </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,              </span><span style="color:#6A737D;">--导入时清除目标位置的方块(false)</span></span>
<span class="line"><span style="color:#E1E4E8;">        clear_dropped_item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,              </span><span style="color:#6A737D;">--导入时清理掉落物(false)，注: 清理范围为整个租赁服，不止是导入的建筑范围</span></span>
<span class="line"><span style="color:#E1E4E8;">        auto_reverse </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,                      </span><span style="color:#6A737D;">--（重新开始时回退跃点）(true)</span></span>
<span class="line"><span style="color:#E1E4E8;">        start_hop</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,                             </span><span style="color:#6A737D;">--开始跃点(0)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">):</span><span style="color:#79B8FF;">start_new</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(total, current)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">log</span><span style="color:#E1E4E8;">((</span><span style="color:#9ECBFF;">&quot;progress: %d/%d&quot;</span><span style="color:#E1E4E8;">):</span><span style="color:#79B8FF;">format</span><span style="color:#E1E4E8;">(total, current))</span></span>
<span class="line"><span style="color:#F97583;">end</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">when_progress_increased_by_build</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    target_structure_or_canvas,                  </span><span style="color:#6A737D;">--需要被导的东西</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">target_structure_or_canvas</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">get_start_pos</span><span style="color:#24292E;">(),  </span><span style="color:#6A737D;">--被导的东西的起始位置</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">target_structure_or_canvas</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">get_end_pos</span><span style="color:#24292E;">(),    </span><span style="color:#6A737D;">--被导的东西的结束位置</span></span>
<span class="line"><span style="color:#24292E;">    { x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">31000</span><span style="color:#24292E;">, y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">, z </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">11000</span><span style="color:#24292E;"> },           </span><span style="color:#6A737D;">--导入到的位置(租赁服中)</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">        speed </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2000</span><span style="color:#24292E;">,                            </span><span style="color:#6A737D;">--导入速度</span></span>
<span class="line"><span style="color:#24292E;">        incremental </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,                     </span><span style="color:#6A737D;">--增量构建(false)</span></span>
<span class="line"><span style="color:#24292E;">        force_use_block_state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,           </span><span style="color:#6A737D;">--强制使用block state(false),注：即时这里设置false，如果struceture中use_block_state为true，也会使用block state</span></span>
<span class="line"><span style="color:#24292E;">        ignore_nbt_block </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,                </span><span style="color:#6A737D;">--是否忽略nbt方块(false)</span></span>
<span class="line"><span style="color:#24292E;">        clear_target_block </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,              </span><span style="color:#6A737D;">--导入时清除目标位置的方块(false)</span></span>
<span class="line"><span style="color:#24292E;">        clear_dropped_item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,              </span><span style="color:#6A737D;">--导入时清理掉落物(false)，注: 清理范围为整个租赁服，不止是导入的建筑范围</span></span>
<span class="line"><span style="color:#24292E;">        auto_reverse </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,                      </span><span style="color:#6A737D;">--（重新开始时回退跃点）(true)</span></span>
<span class="line"><span style="color:#24292E;">        start_hop</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,                             </span><span style="color:#6A737D;">--开始跃点(0)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">):</span><span style="color:#005CC5;">start_new</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(total, current)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">log</span><span style="color:#24292E;">((</span><span style="color:#032F62;">&quot;progress: %d/%d&quot;</span><span style="color:#24292E;">):</span><span style="color:#005CC5;">format</span><span style="color:#24292E;">(total, current))</span></span>
<span class="line"><span style="color:#D73A49;">end</span><span style="color:#24292E;">)</span></span></code></pre></div></li></ul>`,7),e=[o];function t(c,r,y,E,i,F){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{u as __pageData,d as default};

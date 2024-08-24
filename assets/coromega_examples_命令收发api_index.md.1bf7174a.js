import{_ as s,c as a,o as l,Q as o}from"./chunks/framework.c009d427.js";const _=JSON.parse('{"title":"命令","description":"命令示例","frontmatter":{"lang":"zh-CN","title":"命令","description":"命令示例"},"headers":[],"relativePath":"coromega_examples/命令收发api/index.md","filePath":"coromega_examples/命令收发api/index.md","lastUpdated":1724487756000}'),e={name:"coromega_examples/命令收发api/index.md"},n=o(`<h1 id="命令收发相关api" tabindex="-1">命令收发相关API <a class="header-anchor" href="#命令收发相关api" aria-label="Permalink to &quot;命令收发相关API&quot;">​</a></h1><h2 id="以wo身份发送命令" tabindex="-1">以wo身份发送命令 <a class="header-anchor" href="#以wo身份发送命令" aria-label="Permalink to &quot;以wo身份发送命令&quot;">​</a></h2><ul><li>send_wo_cmd(cmd) <ul><li>范围:任意</li><li>说明:以wo身份发送 setting command 命令 没有返回值, 部分指令使用此方法发送是无效的</li><li>参数: <ul><li>cmd:命令字符串</li></ul></li><li>示例:</li></ul><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">send_wo_cmd</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;say hello&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">send_wo_cmd</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;say hello&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div></li></ul><h2 id="以websocket身份发送命令" tabindex="-1">以websocket身份发送命令 <a class="header-anchor" href="#以websocket身份发送命令" aria-label="Permalink to &quot;以websocket身份发送命令&quot;">​</a></h2><ul><li>send_ws_cmd(cmd,get_result) <ul><li>范围:协程内</li><li>说明:以websocket身份发送命令 当 get_result为true时 ,会返回命令执行结果 否则返回 nil. 部分指令没有返回值，如果此时将 get_result 设为为true, 可能导致程序卡死, 例如 say</li><li>参数: <ul><li>cmd:命令字符串</li><li>get_result:是否获取返回值</li></ul></li><li>返回值:返回命令返回结果 json字符串</li><li>示例:</li></ul><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">send_ws_cmd</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;list @a&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(json.</span><span style="color:#79B8FF;">encode</span><span style="color:#E1E4E8;">(result))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">local</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">send_ws_cmd</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;list @a&quot;</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(json.</span><span style="color:#005CC5;">encode</span><span style="color:#24292E;">(result))</span></span></code></pre></div></li></ul><h2 id="以玩家身份发送命令" tabindex="-1">以玩家身份发送命令 <a class="header-anchor" href="#以玩家身份发送命令" aria-label="Permalink to &quot;以玩家身份发送命令&quot;">​</a></h2><ul><li>send_player_cmd(cmd,get_result) <ul><li>范围:协程内</li><li>说明:以玩家身份发送命令 当get_result为true时,会返回命令执行结果 否则返回 nil. 部分指令没有返回值，如果此时将 get_result 设为为true, 可能导致程序卡死, 例如 say</li><li>参数: <ul><li>cmd:命令字符串</li><li>get_result:是否获取返回值</li></ul></li><li>示例:</li></ul><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">local</span><span style="color:#E1E4E8;"> value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">send_player_cmd</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;list @a&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">coromega</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(json.</span><span style="color:#79B8FF;">encode</span><span style="color:#E1E4E8;">(value))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">local</span><span style="color:#24292E;"> value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">send_player_cmd</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;list @a&quot;</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">coromega</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(json.</span><span style="color:#005CC5;">encode</span><span style="color:#24292E;">(value))</span></span></code></pre></div></li></ul>`,7),p=[n];function t(c,r,i,d,y,E){return l(),a("div",null,p)}const h=s(e,[["render",t]]);export{_ as __pageData,h as default};

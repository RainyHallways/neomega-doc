---
contributors: []
---

<script setup>
import Analyzer from '../.vitepress/theme/components/chksenswd.vue'
</script>

# 敏感词分析工具 2.0

:::tip 提示
敏感词分析工具目前处于测试阶段，可能不稳定。    

level: 默认使用 0, 少部分表达式会使用此字段    

适用区域数值解释:    
item_comment: 一般情况下使用此选项    
sign_content: 文本来源为 >告示牌< 时使用此选项    
check_long_numbers: 文本来源为 >书与笔< 时使用此选项    
chatserver: 文本来源为 >聊天系统< 时使用此选项    
ai_command_processor: 文本来源为 >AI指令< 时使用此选项    
World: 文本来源为 >世界频道< 时使用此选项    
HuaYuTing: 文本来源为 >某网络游戏< 时使用此选项
:::

---

<Analyzer />

---

:::warning 隐私声明
- 本服务使用了 咕咕 提供的API，介意数据泄露的用户请自行斟酌使用，API服务器不会储存您所提交的内容。
:::

---

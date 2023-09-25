<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Notification } from 'vue-amazing-ui'
import 'vue-amazing-ui/css'
const notification = ref()
function onInfo (info: string) {
  notification.value.info({
    message: 'Notification Title',
    description: info
  })
} 
function onClose () {
  console.log('关闭notification')
} 
onMounted(() => { setTimeout(() => { onInfo('本文档站已接入ChatGPT!') }, 2000) })
</script>
<template>
<Notification ref="notification" @close="onClose" />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'vue-amazing-ui/css'
import { BackTop } from 'vue-amazing-ui'
function onShow (show: boolean) {
  console.log('show', show)
}
</script>
<template>
  <BackTop :right="100" @show="onShow" />
</template>
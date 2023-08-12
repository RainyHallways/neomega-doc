<script setup lang="ts">
defineProps<{
  text?: string
  type?: "neomega" | "PhoenixBulider" | "unsupport"
}>()
</script>

<template>
  <span class="Badge" :class="type">
    <slot>{{ text }}</slot>
  </span>
</template>

<style scoped>
.Badge {
  display: inline-block;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0 8px;
  line-height: 18px;
  font-size: 12px;
  font-weight: 600;
  transform: translateY(-2px);
}

h1 .Badge,
h2 .Badge,
h3 .Badge,
h4 .Badge,
h5 .Badge,
h6 .Badge {
  vertical-align: text-top;
}

h2 .Badge {
  border-radius: 11px;
  line-height: 20px;
}

.Badge.neomega {
  border-color: var(--vp-badge-neomega-border);
  color: var(--vp-badge-neomega-text);
  background-color: var(--vp-badge-neomega-bg);
}

.Badge.fb {
  border-color: var(--vp-badge-fb-border);
  color: var(--vp-badge-fb-text);
  background-color: var(--vp-badge-fb-bg);
}

.Badge.unsupport {
  border-color: var(--vp-badge-unsupport-border);
  color: var(--vp-badge-unsupport-text);
  background-color: var(--vp-badge-unsupport-bg);
}
</style>

<template>
  <div class="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
    <AppIcon name="package" class="mx-auto h-10 w-10 text-zinc-300" />
    <p class="mt-3 text-sm font-semibold text-zinc-700">{{ title }}</p>
    <p class="mt-1 text-xs text-zinc-400">{{ text }}</p>
    <RouterLink v-if="to" :to="to" class="mt-5 inline-flex h-10 items-center rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white">{{ action }}</RouterLink>
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  title: { type: String, default: '暂无内容' },
  text: { type: String, default: '去看看更多潮流好物' },
  to: { type: String, default: '' },
  action: { type: String, default: '去逛逛' },
})
</script>

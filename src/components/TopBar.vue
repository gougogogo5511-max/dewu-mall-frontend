<template>
  <header class="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-zinc-100 bg-white/95 px-4 backdrop-blur">
    <button class="grid h-9 w-9 place-items-center rounded-full bg-zinc-100" @click="goBack" aria-label="返回">
      <AppIcon name="chevron-left" class="h-5 w-5" />
    </button>
    <h1 class="min-w-0 flex-1 truncate text-center text-base font-semibold">{{ title }}</h1>
    <div class="h-9 w-9"></div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppIcon from './AppIcon.vue'

defineProps({ title: { type: String, default: '' } })
const router = useRouter()
const goBack = () => {
  if (history.length > 1) router.back()
  else router.push('/')
}
</script>

<template>
  <nav class="fixed bottom-0 left-1/2 z-30 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-4 border-t border-zinc-200 bg-white/95 px-2 pb-3 pt-2 backdrop-blur">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="flex flex-col items-center gap-1 rounded-lg py-1 text-[11px] font-medium"
      :class="isActive(item.to) ? 'text-ink' : 'text-zinc-400'"
    >
      <AppIcon :name="item.icon" class="h-5 w-5" :stroke-width="isActive(item.to) ? 2.6 : 2" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'

const route = useRoute()
const items = [
  { to: '/', label: '首页', icon: 'home' },
  { to: '/category', label: '分类', icon: 'grid' },
  { to: '/cart', label: '购物车', icon: 'shopping-bag' },
  { to: '/profile', label: '我的', icon: 'user' },
]

const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

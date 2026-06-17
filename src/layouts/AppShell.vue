<template>
  <main class="mx-auto min-h-screen max-w-[430px] bg-zinc-50 text-ink app-shadow">
    <slot />
    <BottomNav v-if="showTab" />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'

const route = useRoute()
const showTab = computed(() => route.meta.tab)
</script>

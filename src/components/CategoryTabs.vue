<template>
  <section class="sticky top-14 z-10 border-b border-zinc-100 bg-zinc-50 px-4 py-3">
    <div class="flex gap-2 overflow-x-auto no-scrollbar">
      <RouterLink
        :to="{ path: '/products', query: queryFor('') }"
        class="rounded-full px-4 py-2 text-sm font-semibold"
        :class="!activeCategory ? activeClass : normalClass"
      >
        全部
      </RouterLink>
      <RouterLink
        v-for="category in categories"
        :key="category.id"
        :to="{ path: '/products', query: queryFor(category.id) }"
        class="rounded-full px-4 py-2 text-sm font-semibold"
        :class="activeCategory === category.id ? activeClass : normalClass"
      >
        {{ category.name }}
      </RouterLink>
    </div>

    <div class="mt-3 grid grid-cols-3 gap-2 text-xs font-semibold">
      <button
        v-for="item in sorts"
        :key="item.value"
        class="rounded-full py-2"
        :class="sort === item.value ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-500'"
        @click="$emit('sort-change', item.value)"
      >
        {{ item.label }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineProps({
  categories: {
    type: Array,
    required: true,
  },
  activeCategory: {
    type: String,
    default: '',
  },
  sort: {
    type: String,
    default: 'default',
  },
  sorts: {
    type: Array,
    default: () => [
      { label: '综合', value: 'default' },
      { label: '销量', value: 'sales' },
      { label: '价格', value: 'price' },
    ],
  },
})

defineEmits(['sort-change'])

const route = useRoute()
const activeClass = 'bg-zinc-950 text-white'
const normalClass = 'bg-white text-zinc-500'

const queryFor = (categoryId) => {
  const next = { ...route.query }
  if (categoryId) next.category = categoryId
  else delete next.category
  return next
}
</script>

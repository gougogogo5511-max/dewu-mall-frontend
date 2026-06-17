<template>
  <PageFrame>
    <TopBar title="搜索" />
    <section class="px-4 py-4">
      <SearchBar v-model="keyword" @submit="keepResults" />
      <div class="mt-6">
        <p class="text-sm font-black">热门搜索</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button
            v-for="word in trends"
            :key="word"
            type="button"
            class="rounded-full bg-white px-3 py-2 text-sm font-semibold text-zinc-600 ring-1 ring-zinc-100"
            @click="go(word)"
          >
            {{ word }}
          </button>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between">
        <p class="text-sm font-black">{{ keyword.trim() ? '搜索结果' : '猜你喜欢' }}</p>
        <p class="text-xs text-zinc-400">{{ results.length }} 件商品</p>
      </div>
      <div class="mt-3 grid grid-cols-2 gap-3">
        <ProductCard v-for="item in results" :key="item.id" :product="item" />
      </div>
      <EmptyState v-if="keyword.trim() && !results.length" class="mt-6" title="没有找到相关商品" text="换个关键词试试" />
    </section>
  </PageFrame>
</template>

<script setup>
import { computed, ref } from 'vue'
import PageFrame from '../layouts/PageFrame.vue'
import TopBar from '../components/TopBar.vue'
import SearchBar from '../components/SearchBar.vue'
import ProductCard from '../components/ProductCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { products, trends } from '../mock/data'

const keyword = ref('')
const results = computed(() => {
  const value = keyword.value.trim().toLowerCase()
  if (!value) return products.slice(0, 6)
  return products.filter((item) => (item.title + item.brand + item.categoryId + item.tags.join('')).toLowerCase().includes(value))
})

const keepResults = () => {}

const go = (word) => {
  keyword.value = word
}
</script>

<template>
  <PageFrame>
    <section class="sticky top-0 z-20 bg-white px-4 pb-3 pt-5">
      <h1 class="text-2xl font-black">分类</h1>
      <p class="mt-1 text-sm text-zinc-500">热门品类、品牌和单品都在这里</p>
    </section>

    <section class="grid min-h-[calc(100vh-160px)] grid-cols-[92px_1fr]">
      <aside class="border-r border-zinc-100 bg-white py-2">
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          class="relative flex w-full items-center gap-2 px-3 py-4 text-left text-sm font-semibold"
          :class="activeCategory === category.id ? 'bg-zinc-50 text-zinc-950' : 'text-zinc-500'"
          @click="activeCategory = category.id"
        >
          <span v-if="activeCategory === category.id" class="absolute left-0 top-3 h-8 w-1 rounded-r-full bg-zinc-950"></span>
          <span>{{ category.icon }}</span>
          <span>{{ category.name }}</span>
        </button>
      </aside>

      <section class="min-w-0 px-3 py-3">
        <div class="rounded-lg bg-zinc-950 p-4 text-white">
          <p class="text-xs font-semibold text-neon">HOT CATEGORY</p>
          <h2 class="mt-1 text-xl font-black">{{ activeCategoryInfo.name }}专区</h2>
          <p class="mt-1 text-xs text-white/60">{{ currentProducts.length }} 件正在热卖</p>
        </div>

        <div class="mt-4">
          <div class="mb-2 flex items-center justify-between">
            <p class="text-sm font-black">热门品牌</p>
            <RouterLink :to="'/products?category=' + activeCategory" class="text-xs font-semibold text-zinc-400">更多</RouterLink>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <RouterLink
              v-for="brand in currentBrands"
              :key="brand"
              :to="'/products?category=' + activeCategory + '&keyword=' + encodeURIComponent(brand)"
              class="rounded-lg bg-white p-3 text-center shadow-sm ring-1 ring-zinc-100"
            >
              <p class="truncate text-xs font-black">{{ brand }}</p>
              <p class="mt-1 text-[10px] text-zinc-400">品牌馆</p>
            </RouterLink>
          </div>
        </div>

        <div class="mt-4">
          <p class="mb-2 text-sm font-black">热卖商品</p>
          <div class="grid grid-cols-2 gap-3">
            <ProductCard v-for="item in currentProducts" :key="item.id" :product="item" />
          </div>
        </div>
      </section>
    </section>
  </PageFrame>
</template>

<script setup>
import { computed, ref } from 'vue'
import PageFrame from '../layouts/PageFrame.vue'
import ProductCard from '../components/ProductCard.vue'
import { categories, products } from '../mock/data'

const activeCategory = ref(categories[0].id)
const activeCategoryInfo = computed(() => categories.find((item) => item.id === activeCategory.value) || categories[0])
const currentProducts = computed(() => products.filter((item) => item.categoryId === activeCategory.value))
const currentBrands = computed(() => {
  const brands = currentProducts.value.map((item) => item.brand)
  return [...new Set(brands)].concat(['DEWU精选', '潮流尖货']).slice(0, 6)
})
</script>

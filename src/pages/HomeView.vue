<template>
  <PageFrame>
    <section class="sticky top-0 z-20 bg-zinc-950 px-4 pb-3 pt-4 text-white">
      <div class="flex items-center gap-3">
        <div class="leading-tight">
          <p class="text-xs font-semibold text-neon">DEWU</p>
          <h1 class="text-xl font-black tracking-normal">得潮</h1>
        </div>
        <SearchBar to="/search" class="flex-1" placeholder="搜索球鞋、潮服、数码" />
        <RouterLink to="/login" class="shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold">登录</RouterLink>
      </div>
      <div class="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        <RouterLink
          v-for="category in categories"
          :key="category.id"
          :to="'/products?category=' + category.id"
          class="shrink-0 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/85"
        >
          {{ category.name }}
        </RouterLink>
      </div>
    </section>

    <section class="px-4 pt-4">
      <div class="flex snap-x gap-3 overflow-x-auto no-scrollbar">
        <RouterLink v-for="banner in banners" :key="banner.id" to="/products" class="relative h-36 min-w-[82%] snap-center overflow-hidden rounded-lg bg-zinc-900">
          <img :src="banner.image" :alt="banner.title" class="h-full w-full object-cover opacity-72" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent"></div>
          <div class="absolute left-4 top-5 max-w-40 text-white">
            <p class="text-xl font-black">{{ banner.title }}</p>
            <p class="mt-1 text-xs text-white/78">{{ banner.subtitle }}</p>
            <span class="mt-4 inline-flex rounded-full bg-neon px-3 py-1 text-xs font-bold text-zinc-950">立即入手</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="grid grid-cols-3 gap-2 px-4 py-4">
      <div v-for="item in serviceTags" :key="item.title" class="rounded-lg bg-white px-3 py-3 shadow-sm ring-1 ring-zinc-100">
        <div class="flex items-center gap-2">
          <AppIcon :name="item.icon" class="h-4 w-4 text-zinc-950" />
          <p class="text-xs font-black">{{ item.title }}</p>
        </div>
        <p class="mt-1 text-[10px] text-zinc-400">{{ item.text }}</p>
      </div>
    </section>

    <section class="px-4">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-lg font-black">推荐好物</h2>
        <RouterLink to="/products" class="text-xs font-semibold text-zinc-500">查看全部</RouterLink>
      </div>
      <div class="columns-2 gap-3">
        <ProductCard v-for="(item, index) in waterfallProducts" :key="item.id + '-home-' + index" :product="item" class="mb-3 break-inside-avoid" />
      </div>
    </section>
  </PageFrame>
</template>

<script setup>
import { computed } from 'vue'
import PageFrame from '../layouts/PageFrame.vue'
import ProductCard from '../components/ProductCard.vue'
import SearchBar from '../components/SearchBar.vue'
import AppIcon from '../components/AppIcon.vue'
import { banners, categories, products } from '../mock/data'

const serviceTags = [
  { title: '正品保障', text: '多重鉴别', icon: 'shield' },
  { title: '闪电直发', text: '现货速达', icon: 'truck' },
  { title: '新人优惠', text: '券包可领', icon: 'ticket' },
]

const waterfallProducts = computed(() => [...products, ...products.slice(0, 4)])
</script>

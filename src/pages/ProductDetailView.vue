<template>
  <PageFrame>
    <TopBar title="商品详情" />
    <template v-if="product">
      <section class="bg-white">
        <div class="relative aspect-square bg-zinc-100">
          <img :src="activeImage" :alt="product.title" class="h-full w-full object-cover" />
          <button class="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90" @click="toggleFavorite(product.id)">
            <AppIcon name="heart" :filled="isFavorite(product.id)" class="h-5 w-5" :class="isFavorite(product.id) ? 'text-red-500' : 'text-zinc-700'" />
          </button>
        </div>
        <div class="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
          <button v-for="image in product.images" :key="image" class="h-16 w-16 overflow-hidden rounded-lg border" :class="activeImage === image ? 'border-zinc-950' : 'border-zinc-200'" @click="activeImage = image">
            <img :src="image" class="h-full w-full object-cover" alt="" />
          </button>
        </div>
      </section>

      <section class="space-y-4 px-4 py-4">
        <div class="card rounded-lg p-4">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-semibold text-zinc-400">{{ product.brand }}</p>
              <h1 class="mt-1 text-xl font-black leading-7">{{ product.title }}</h1>
            </div>
            <div class="text-right">
              <p class="text-2xl font-black text-accent">¥{{ product.price }}</p>
              <p class="text-xs text-zinc-400 line-through">¥{{ product.originalPrice }}</p>
            </div>
          </div>
          <div class="mt-3 flex flex-wrap gap-2">
            <span v-for="tag in product.tags" :key="tag" class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">{{ tag }}</span>
          </div>
        </div>

        <div class="card rounded-lg p-4">
          <div class="flex items-center justify-between">
            <p class="text-sm font-black">尺码</p>
            <p class="text-xs font-semibold text-zinc-400">已选 {{ selectedSize }}</p>
          </div>
          <div class="mt-3 grid grid-cols-4 gap-2">
            <button
              v-for="size in product.sizes"
              :key="size"
              type="button"
              class="h-10 rounded-lg border text-sm font-semibold"
              :class="selectedSize === size ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-200 bg-white text-zinc-700'"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div class="card rounded-lg p-4">
          <p class="text-sm font-black">商品说明</p>
          <p class="mt-2 text-sm leading-6 text-zinc-500">{{ product.description }}</p>
          <div class="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-zinc-500">
            <span class="rounded-lg bg-zinc-50 py-2">平台鉴别</span>
            <span class="rounded-lg bg-zinc-50 py-2">品牌直采</span>
            <span class="rounded-lg bg-zinc-50 py-2">售后无忧</span>
          </div>
        </div>
      </section>

      <footer class="fixed bottom-0 left-1/2 z-30 flex w-full max-w-[430px] -translate-x-1/2 gap-2 border-t border-zinc-200 bg-white p-3">
        <RouterLink to="/cart" class="grid h-12 w-12 place-items-center rounded-full bg-zinc-100">
          <AppIcon name="shopping-bag" class="h-5 w-5" />
        </RouterLink>
        <button class="h-12 flex-1 rounded-full bg-zinc-950 text-sm font-black text-white" @click="addCart">加入购物车</button>
        <button class="h-12 flex-1 rounded-full bg-neon text-sm font-black text-zinc-950" @click="buyNow">立即购买</button>
      </footer>
    </template>
  </PageFrame>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageFrame from '../layouts/PageFrame.vue'
import TopBar from '../components/TopBar.vue'
import AppIcon from '../components/AppIcon.vue'
import { products } from '../mock/data'
import { useMallStore } from '../stores/mallStore'

const route = useRoute()
const router = useRouter()
const { addToCart, toggleFavorite, isFavorite } = useMallStore()
const product = products.find((item) => item.id === route.params.id)
const selectedSize = ref(product?.sizes[0])
const activeImage = ref(product?.image)

watchEffect(() => {
  if (product && !activeImage.value) activeImage.value = product.image
})

const addCart = () => product && addToCart(product, { size: selectedSize.value })
const buyNow = () => {
  addCart()
  router.push('/checkout')
}
</script>

<template>
  <PageFrame>
    <section class="bg-zinc-950 px-4 pb-6 pt-5 text-white">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="grid h-14 w-14 place-items-center rounded-full bg-neon text-lg font-black text-zinc-950">潮</div>
          <div>
            <p class="text-lg font-black">{{ state.user.name }}</p>
            <p class="mt-1 text-xs text-white/60">{{ state.user.vip }} · {{ state.user.phone }}</p>
          </div>
        </div>
        <RouterLink to="/login" class="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold">切换</RouterLink>
      </div>
      <div class="mt-5 grid grid-cols-3 gap-2 rounded-lg bg-white/8 p-3 text-center">
        <div><p class="text-lg font-black">{{ state.orders.length }}</p><p class="text-xs text-white/55">订单</p></div>
        <div><p class="text-lg font-black">{{ favoriteProducts.length }}</p><p class="text-xs text-white/55">收藏</p></div>
        <div><p class="text-lg font-black">{{ cartCount }}</p><p class="text-xs text-white/55">购物车</p></div>
      </div>
    </section>

    <section class="space-y-3 px-4 py-4">
      <div class="card rounded-lg p-4">
        <div class="mb-3 flex items-center justify-between">
          <p class="font-black">我的订单</p>
          <RouterLink to="/orders" class="text-xs font-semibold text-zinc-400">全部订单</RouterLink>
        </div>
        <div class="grid grid-cols-4 gap-2 text-center">
          <RouterLink v-for="item in orderEntries" :key="item.label" to="/orders" class="rounded-lg bg-zinc-50 px-1 py-3">
            <AppIcon :name="item.icon" class="mx-auto h-5 w-5 text-zinc-800" />
            <p class="mt-2 text-[11px] font-semibold text-zinc-600">{{ item.label }}</p>
          </RouterLink>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-2">
        <RouterLink v-for="item in toolEntries" :key="item.label" :to="item.to" class="card rounded-lg px-1 py-4 text-center">
          <AppIcon :name="item.icon" class="mx-auto h-5 w-5 text-zinc-900" />
          <p class="mt-2 text-[11px] font-semibold text-zinc-600">{{ item.label }}</p>
        </RouterLink>
      </div>

      <div class="card rounded-lg p-4">
        <div class="mb-3 flex items-center justify-between">
          <p class="font-black">我的收藏</p>
          <RouterLink to="/products" class="text-xs font-semibold text-zinc-400">继续逛</RouterLink>
        </div>
        <div v-if="favoriteProducts.length" class="flex gap-3 overflow-x-auto no-scrollbar">
          <RouterLink v-for="item in favoriteProducts" :key="item.id" :to="'/product/' + item.id" class="w-28 shrink-0">
            <img :src="item.image" class="h-28 w-28 rounded-lg object-cover" alt="" />
            <p class="mt-2 line-clamp-1 text-xs font-semibold">{{ item.title }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
  </PageFrame>
</template>

<script setup>
import PageFrame from '../layouts/PageFrame.vue'
import AppIcon from '../components/AppIcon.vue'
import { useMallStore } from '../stores/mallStore'

const { state, favoriteProducts, cartCount } = useMallStore()

const orderEntries = [
  { label: '待付款', icon: 'wallet' },
  { label: '待发货', icon: 'receipt' },
  { label: '待收货', icon: 'truck' },
  { label: '已完成', icon: 'shield' },
]

const toolEntries = [
  { label: '我的鉴别', icon: 'shield', to: '/profile' },
  { label: '优惠券', icon: 'ticket', to: '/profile' },
  { label: '地址管理', icon: 'map-pin', to: '/profile' },
  { label: '浏览历史', icon: 'clock', to: '/products' },
]
</script>

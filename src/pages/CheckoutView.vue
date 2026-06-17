<template>
  <PageFrame>
    <TopBar title="确认订单" />
    <section class="space-y-3 px-4 py-4">
      <div class="card rounded-lg p-4">
        <div class="flex items-start gap-3">
          <AppIcon name="map-pin" class="mt-1 h-5 w-5 text-zinc-950" />
          <div>
            <p class="font-black">{{ defaultAddress?.name }} {{ defaultAddress?.phone }}</p>
            <p class="mt-1 text-sm leading-5 text-zinc-500">{{ defaultAddress?.city }} {{ defaultAddress?.detail }}</p>
          </div>
        </div>
      </div>

      <template v-if="cartItems.length">
        <div class="card rounded-lg p-4">
          <p class="mb-3 text-sm font-black">商品清单</p>
          <div v-for="item in cartItems" :key="item.productId + '-' + item.size" class="flex gap-3 border-b border-zinc-100 py-3 last:border-0">
            <img :src="item.product.image" class="h-20 w-20 rounded-lg object-cover" alt="" />
            <div class="min-w-0 flex-1">
              <p class="line-clamp-2 text-sm font-semibold">{{ item.product.title }}</p>
              <p class="mt-1 text-xs text-zinc-400">{{ item.size }} · x{{ item.quantity }}</p>
              <p class="mt-2 font-black">¥{{ item.product.price }}</p>
            </div>
          </div>
        </div>
        <div class="card rounded-lg p-4 text-sm">
          <div class="flex justify-between py-1"><span class="text-zinc-500">商品金额</span><b>¥{{ cartTotal }}</b></div>
          <div class="flex justify-between py-1"><span class="text-zinc-500">运费</span><b>¥0</b></div>
          <div class="flex justify-between py-1"><span class="text-zinc-500">平台鉴别</span><b>已包含</b></div>
        </div>
      </template>
      <EmptyState v-else title="暂无待结算商品" text="购物车添加商品后再来确认订单" to="/cart" action="去购物车" />
    </section>
    <footer v-if="cartItems.length" class="fixed bottom-0 left-1/2 z-30 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 border-t border-zinc-200 bg-white px-4 py-3">
      <div class="flex-1">
        <p class="text-xs text-zinc-400">实付</p>
        <p class="text-xl font-black text-accent">¥{{ cartTotal }}</p>
      </div>
      <button class="h-12 min-w-36 rounded-full bg-neon px-6 text-sm font-black text-zinc-950" @click="pay">提交订单</button>
    </footer>
  </PageFrame>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PageFrame from '../layouts/PageFrame.vue'
import TopBar from '../components/TopBar.vue'
import EmptyState from '../components/EmptyState.vue'
import AppIcon from '../components/AppIcon.vue'
import { useMallStore } from '../stores/mallStore'

const router = useRouter()
const { cartItems, cartTotal, defaultAddress, createOrder } = useMallStore()
const pay = () => {
  const order = createOrder()
  if (order) router.push('/orders')
}
</script>

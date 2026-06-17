<template>
  <PageFrame>
    <section class="sticky top-0 z-20 bg-white px-4 pb-4 pt-5">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-black">购物车</h1>
          <p class="mt-1 text-sm text-zinc-500">已选 {{ selectedCount }} / {{ cartCount }} 件</p>
        </div>
        <button v-if="cartItems.length" type="button" class="text-xs font-semibold text-zinc-400" @click="deleteSelected">删除选中</button>
      </div>
    </section>

    <section class="space-y-3 px-4 pt-4 pb-36">
      <template v-if="cartItems.length">
        <div v-for="item in cartItems" :key="itemKey(item)" class="card flex gap-3 rounded-lg p-3">
          <label class="grid h-24 place-items-center">
            <input v-model="selectedKeys" :value="itemKey(item)" type="checkbox" class="h-4 w-4 accent-zinc-950" />
          </label>
          <img :src="item.product.image" :alt="item.product.title" class="h-24 w-24 rounded-lg object-cover" />
          <div class="min-w-0 flex-1">
            <p class="line-clamp-2 text-sm font-black">{{ item.product.title }}</p>
            <p class="mt-1 text-xs text-zinc-400">95分 / {{ item.product.condition }} · 尺码 {{ item.size }}</p>
            <div class="mt-2 flex flex-wrap gap-1">
              <span class="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">闪电直发</span>
              <span class="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">正品保障</span>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <p class="font-black text-accent">¥{{ item.product.price }}</p>
              <QuantityStepper :model-value="item.quantity" @change="updateQuantity(item.productId, item.size, $event)" />
            </div>
            <button class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-zinc-400" @click="removeOne(item)">
              <AppIcon name="trash" class="h-3.5 w-3.5" /> 删除
            </button>
          </div>
        </div>
      </template>
      <EmptyState v-else title="购物车空空如也" text="已为你准备示例商品，刷新页面即可重新体验" to="/" />
    </section>

    <footer v-if="cartItems.length" class="fixed bottom-[68px] left-1/2 z-20 flex w-full max-w-[430px] -translate-x-1/2 items-center gap-3 border-t border-zinc-200 bg-white px-4 py-3">
      <label class="flex shrink-0 items-center gap-2 text-sm font-semibold">
        <input type="checkbox" class="h-4 w-4 accent-zinc-950" :checked="allSelected" @change="toggleAll" />
        全选
      </label>
      <div class="min-w-0 flex-1">
        <p class="text-xs text-zinc-400">合计</p>
        <p class="truncate text-xl font-black text-accent">¥{{ selectedTotal }}</p>
      </div>
      <RouterLink
        to="/checkout"
        class="flex h-12 min-w-32 items-center justify-center rounded-full px-6 text-sm font-black"
        :class="selectedCount ? 'bg-zinc-950 text-white' : 'pointer-events-none bg-zinc-200 text-zinc-400'"
      >
        结算({{ selectedCount }})
      </RouterLink>
    </footer>
  </PageFrame>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import PageFrame from '../layouts/PageFrame.vue'
import EmptyState from '../components/EmptyState.vue'
import QuantityStepper from '../components/QuantityStepper.vue'
import AppIcon from '../components/AppIcon.vue'
import { useMallStore } from '../stores/mallStore'

const { cartItems, cartCount, ensureCartSamples, updateQuantity, removeFromCart, removeCartItems } = useMallStore()
const selectedKeys = ref([])

const itemKey = (item) => item.productId + '__' + item.size
const allKeys = computed(() => cartItems.value.map(itemKey))
const selectedItems = computed(() => cartItems.value.filter((item) => selectedKeys.value.includes(itemKey(item))))
const selectedCount = computed(() => selectedItems.value.reduce((sum, item) => sum + item.quantity, 0))
const selectedTotal = computed(() => selectedItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
const allSelected = computed(() => allKeys.value.length > 0 && selectedKeys.value.length === allKeys.value.length)

onMounted(() => {
  ensureCartSamples()
  selectedKeys.value = allKeys.value
})

watch(allKeys, (keys) => {
  selectedKeys.value = selectedKeys.value.filter((key) => keys.includes(key))
  if (!selectedKeys.value.length) selectedKeys.value = keys
})

const toggleAll = (event) => {
  selectedKeys.value = event.target.checked ? allKeys.value : []
}

const removeOne = (item) => {
  removeFromCart(item.productId, item.size)
}

const deleteSelected = () => {
  removeCartItems([...selectedKeys.value])
}
</script>

<template>
  <PageFrame>
    <TopBar title="我的订单" />
    <section class="px-4 py-4">
      <div class="mb-4 grid grid-cols-4 gap-2 text-center text-xs font-semibold">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          class="rounded-full py-2"
          :class="active === tab ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-500'"
          @click="active = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div v-if="filteredOrders.length" class="space-y-3">
        <OrderCard
          v-for="order in filteredOrders"
          :key="order.id"
          :order="order"
          :status-options="orderStatusOptions"
          @status-change="changeOrderStatus"
        />
      </div>
      <EmptyState v-else title="暂无订单" text="提交订单后会展示在这里" to="/" />
    </section>
  </PageFrame>
</template>

<script setup>
import { computed, ref } from 'vue'
import PageFrame from '../layouts/PageFrame.vue'
import TopBar from '../components/TopBar.vue'
import EmptyState from '../components/EmptyState.vue'
import OrderCard from '../components/OrderCard.vue'
import { orderStatusOptions, useMallStore } from '../stores/mallStore'

const { state, updateOrderStatus } = useMallStore()
const tabs = ['全部', ...orderStatusOptions]
const active = ref('全部')
const filteredOrders = computed(() => active.value === '全部' ? state.orders : state.orders.filter((item) => item.status === active.value))

const changeOrderStatus = ({ orderId, status }) => {
  updateOrderStatus(orderId, status)
}
</script>

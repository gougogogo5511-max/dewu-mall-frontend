<template>
  <article class="card rounded-lg p-4">
    <div class="flex items-center justify-between border-b border-zinc-100 pb-3">
      <p class="text-xs font-semibold text-zinc-400">{{ order.id }}</p>
      <p class="text-sm font-black text-accent">{{ order.status }}</p>
    </div>

    <div class="space-y-3 py-3">
      <div v-for="item in order.items" :key="order.id + '-' + item.productId + '-' + item.size" class="flex gap-3">
        <img :src="item.image" class="h-16 w-16 rounded-lg object-cover" :alt="item.title" />
        <div class="min-w-0 flex-1">
          <p class="line-clamp-1 text-sm font-semibold">{{ item.title }}</p>
          <p class="mt-1 text-xs text-zinc-400">{{ item.size }} · x{{ item.quantity }}</p>
        </div>
        <p class="text-sm font-black">¥{{ item.price }}</p>
      </div>
    </div>

    <div class="border-t border-zinc-100 pt-3">
      <div class="flex items-center justify-between">
        <p class="text-xs text-zinc-400">{{ order.createdAt }}</p>
        <p class="text-sm font-black">实付 ¥{{ order.total }}</p>
      </div>
      <div class="mt-3 grid grid-cols-3 gap-2 text-xs font-semibold">
        <button
          v-for="status in statusOptions"
          :key="status"
          type="button"
          class="rounded-full py-2"
          :class="order.status === status ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-500'"
          @click="$emit('status-change', { orderId: order.id, status })"
        >
          {{ status }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  order: {
    type: Object,
    required: true,
  },
  statusOptions: {
    type: Array,
    default: () => ['待发货', '待收货', '已完成'],
  },
})

defineEmits(['status-change'])
</script>

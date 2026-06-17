<template>
  <RouterLink :to="'/product/' + product.id" class="block overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-zinc-100">
    <div class="relative aspect-[3/3.35] overflow-hidden bg-zinc-100">
      <img :src="product.image" :alt="product.title" class="h-full w-full object-cover" />
      <span class="absolute left-2 top-2 rounded-full bg-black/75 px-2 py-0.5 text-[10px] font-semibold text-white">{{ product.condition }}</span>
      <span class="absolute bottom-2 left-2 rounded-full bg-neon px-2 py-0.5 text-[10px] font-black text-zinc-950">闪电直发</span>
    </div>
    <div class="space-y-2 p-2.5">
      <p class="line-clamp-2 min-h-10 text-[13px] font-semibold leading-5 text-zinc-900">{{ product.title }}</p>
      <div class="flex flex-wrap gap-1">
        <span class="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">95分</span>
        <span class="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">{{ product.condition }}</span>
        <span class="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">正品保障</span>
      </div>
      <div class="flex items-end justify-between gap-2">
        <div>
          <p class="text-[11px] text-zinc-400">{{ product.brand }}</p>
          <p class="text-base font-black text-zinc-950">¥{{ product.price }}<span class="text-[11px] font-semibold text-zinc-500"> 起</span></p>
        </div>
        <p class="text-[10px] text-zinc-400">已售 {{ soldText }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const soldText = computed(() => props.product.sales >= 10000 ? (props.product.sales / 10000).toFixed(1) + '万' : props.product.sales)
</script>

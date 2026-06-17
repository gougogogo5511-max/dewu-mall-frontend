<template>
  <div class="inline-flex items-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-50">
    <button
      type="button"
      class="grid h-8 w-8 place-items-center text-zinc-500 disabled:text-zinc-300"
      :disabled="modelValue <= 1"
      @click="$emit('change', Math.max(1, modelValue - 1))"
    >
      -
    </button>
    <span class="min-w-8 text-center text-sm font-semibold">{{ modelValue }}</span>
    <button type="button" class="grid h-8 w-8 place-items-center text-zinc-900" @click="$emit('change', modelValue + 1)">
      +
    </button>
  </div>
</template>

<script setup>
defineProps({ modelValue: { type: Number, required: true } })
defineEmits(['change'])
</script>

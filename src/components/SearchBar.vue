<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-zinc-500 ring-1 ring-zinc-100"
  >
    <AppIcon name="search" class="h-4 w-4 shrink-0 text-zinc-400" />
    <span class="min-w-0 truncate">{{ placeholder }}</span>
  </RouterLink>

  <form v-else class="flex gap-2" @submit.prevent="$emit('submit')">
    <div class="flex h-11 flex-1 items-center gap-2 rounded-full bg-white px-4 ring-1 ring-zinc-100">
      <AppIcon name="search" class="h-4 w-4 shrink-0 text-zinc-400" />
      <input
        :value="modelValue"
        class="min-w-0 flex-1 bg-transparent text-sm outline-none"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <button v-if="showButton" class="h-11 rounded-full bg-zinc-950 px-5 text-sm font-black text-white">
      {{ buttonText }}
    </button>
  </form>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '搜索潮鞋、服饰、数码',
  },
  buttonText: {
    type: String,
    default: '搜索',
  },
  showButton: {
    type: Boolean,
    default: true,
  },
  to: {
    type: [String, Object],
    default: '',
  },
})

defineEmits(['update:modelValue', 'submit'])
</script>

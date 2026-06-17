<template>
  <PageFrame>
    <section class="flex min-h-screen flex-col bg-zinc-950 px-4 py-8 text-white">
      <div>
        <p class="text-xs font-semibold text-neon">DEWU ACCOUNT</p>
        <h1 class="mt-2 text-3xl font-black">登录得潮商城</h1>
        <p class="mt-2 text-sm leading-6 text-white/60">使用本地 mock 登录，便于体验购物车、订单与个人中心流程。</p>
      </div>
      <form class="mt-10 space-y-4" @submit.prevent="submit">
        <label class="block">
          <span class="text-xs font-semibold text-white/50">手机号</span>
          <input v-model="phone" class="mt-2 h-12 w-full rounded-lg border border-white/10 bg-white/8 px-4 text-sm outline-none focus:border-neon" placeholder="请输入手机号" />
        </label>
        <label class="block">
          <span class="text-xs font-semibold text-white/50">验证码</span>
          <input v-model="code" class="mt-2 h-12 w-full rounded-lg border border-white/10 bg-white/8 px-4 text-sm outline-none focus:border-neon" placeholder="任意 4 位数字" />
        </label>
        <button class="h-12 w-full rounded-full bg-neon text-sm font-black text-zinc-950">登录</button>
      </form>
      <RouterLink to="/" class="mt-4 text-center text-sm font-semibold text-white/60">先去逛逛</RouterLink>
    </section>
  </PageFrame>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageFrame from '../layouts/PageFrame.vue'
import { useMallStore } from '../stores/mallStore'

const router = useRouter()
const { login } = useMallStore()
const phone = ref('13820262026')
const code = ref('2026')
const submit = () => {
  login(phone.value)
  router.push('/profile')
}
</script>

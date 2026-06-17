<template>
  <PageFrame>
    <TopBar title="商品列表" />
    <CategoryTabs
      :categories="categories"
      :active-category="activeCategory"
      :sort="sort"
      :sorts="sorts"
      @sort-change="setSort"
    />
    <section class="grid grid-cols-2 gap-3 px-4 pt-4">
      <ProductCard v-for="item in filteredProducts" :key="item.id" :product="item" />
    </section>
  </PageFrame>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageFrame from '../layouts/PageFrame.vue'
import TopBar from '../components/TopBar.vue'
import CategoryTabs from '../components/CategoryTabs.vue'
import ProductCard from '../components/ProductCard.vue'
import { categories, products } from '../mock/data'

const route = useRoute()
const router = useRouter()
const sorts = [{ label: '综合', value: 'default' }, { label: '销量', value: 'sales' }, { label: '价格', value: 'price' }]
const activeCategory = computed(() => route.query.category || '')
const sort = computed(() => route.query.sort || 'default')
const keyword = computed(() => String(route.query.keyword || '').trim())

const filteredProducts = computed(() => {
  let list = products.filter((item) => !activeCategory.value || item.categoryId === activeCategory.value)
  if (keyword.value) list = list.filter((item) => (item.title + item.brand).toLowerCase().includes(keyword.value.toLowerCase()))
  if (sort.value === 'sales') list = [...list].sort((a, b) => b.sales - a.sales)
  if (sort.value === 'price') list = [...list].sort((a, b) => a.price - b.price)
  return list
})

const setSort = (value) => router.replace({ query: { ...route.query, sort: value } })
</script>

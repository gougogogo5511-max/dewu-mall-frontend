import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/HomeView.vue'), meta: { tab: true } },
  { path: '/category', name: 'category', component: () => import('../pages/CategoryView.vue'), meta: { tab: true } },
  { path: '/products', name: 'products', component: () => import('../pages/ProductsView.vue') },
  { path: '/product/:id', name: 'product-detail', component: () => import('../pages/ProductDetailView.vue') },
  { path: '/search', name: 'search', component: () => import('../pages/SearchView.vue') },
  { path: '/cart', name: 'cart', component: () => import('../pages/CartView.vue'), meta: { tab: true } },
  { path: '/checkout', name: 'checkout', component: () => import('../pages/CheckoutView.vue') },
  { path: '/orders', name: 'orders', component: () => import('../pages/OrdersView.vue') },
  { path: '/profile', name: 'profile', component: () => import('../pages/ProfileView.vue'), meta: { tab: true } },
  { path: '/login', name: 'login', component: () => import('../pages/LoginView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

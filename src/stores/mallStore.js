import { computed, reactive, watch } from 'vue'
import { addresses, initialOrders, products } from '../mock/data'

const defaultCart = [
  { productId: 'p1001', size: '42', quantity: 1 },
  { productId: 'p1004', size: 'L', quantity: 2 },
  { productId: 'p1007', size: '均码', quantity: 1 },
]

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const orderStatusOptions = ['待付款', '待发货', '待收货', '已完成']

const state = reactive({
  user: load('dewu-user', { name: '潮流玩家', phone: '138****2026', vip: 'LEVEL 4' }),
  cart: load('dewu-cart', defaultCart),
  favorites: load('dewu-favorites', ['p1001', 'p1007']),
  orders: load('dewu-orders', initialOrders),
  addresses: load('dewu-addresses', addresses),
})

watch(() => state.cart, (value) => localStorage.setItem('dewu-cart', JSON.stringify(value)), { deep: true })
watch(() => state.favorites, (value) => localStorage.setItem('dewu-favorites', JSON.stringify(value)), { deep: true })
watch(() => state.orders, (value) => localStorage.setItem('dewu-orders', JSON.stringify(value)), { deep: true })
watch(() => state.addresses, (value) => localStorage.setItem('dewu-addresses', JSON.stringify(value)), { deep: true })
watch(() => state.user, (value) => localStorage.setItem('dewu-user', JSON.stringify(value)), { deep: true })

export function useMallStore() {
  const getProduct = (id) => products.find((item) => item.id === id)

  const cartItems = computed(() => state.cart.map((item) => ({ ...item, product: getProduct(item.productId) })).filter((item) => item.product))
  const cartCount = computed(() => state.cart.reduce((sum, item) => sum + item.quantity, 0))
  const cartTotal = computed(() => cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
  const favoriteProducts = computed(() => state.favorites.map(getProduct).filter(Boolean))
  const defaultAddress = computed(() => state.addresses.find((item) => item.default) || state.addresses[0])

  const addToCart = (product, options = {}) => {
    const size = options.size || product.sizes[0]
    const found = state.cart.find((item) => item.productId === product.id && item.size === size)
    if (found) {
      found.quantity += options.quantity || 1
    } else {
      state.cart.push({ productId: product.id, size, quantity: options.quantity || 1 })
    }
  }

  const ensureCartSamples = () => {
    if (state.cart.length) return
    state.cart.push(...defaultCart)
  }

  const updateQuantity = (productId, size, quantity) => {
    const item = state.cart.find((entry) => entry.productId === productId && entry.size === size)
    if (!item) return
    item.quantity = Math.max(1, quantity)
  }

  const removeFromCart = (productId, size) => {
    const index = state.cart.findIndex((item) => item.productId === productId && item.size === size)
    if (index > -1) state.cart.splice(index, 1)
  }

  const removeCartItems = (keys) => {
    keys.forEach((key) => {
      const [productId, size] = key.split('__')
      removeFromCart(productId, size)
    })
  }

  const toggleFavorite = (productId) => {
    const index = state.favorites.indexOf(productId)
    if (index > -1) state.favorites.splice(index, 1)
    else state.favorites.push(productId)
  }

  const isFavorite = (productId) => state.favorites.includes(productId)

  const updateOrderStatus = (orderId, status) => {
    if (!orderStatusOptions.includes(status)) return
    const order = state.orders.find((item) => item.id === orderId)
    if (order) order.status = status
  }

  const createOrder = () => {
    if (!state.cart.length) return null
    const order = {
      id: 'D' + Date.now(),
      status: '待付款',
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      total: cartTotal.value,
      items: cartItems.value.map((item) => ({
        productId: item.productId,
        title: item.product.title,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        size: item.size,
      })),
      address: defaultAddress.value,
    }
    state.orders.unshift(order)
    state.cart.splice(0, state.cart.length)
    return order
  }

  const login = (phone) => {
    state.user = { name: '得潮用户', phone: phone || '138****2026', vip: 'LEVEL 2' }
  }

  return {
    state,
    cartItems,
    cartCount,
    cartTotal,
    favoriteProducts,
    defaultAddress,
    addToCart,
    ensureCartSamples,
    updateQuantity,
    removeFromCart,
    removeCartItems,
    toggleFavorite,
    isFavorite,
    updateOrderStatus,
    createOrder,
    login,
  }
}

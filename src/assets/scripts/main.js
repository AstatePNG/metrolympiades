// src/js/useAppLogic.js
import { onMounted, provide, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export function useAppLogic(notificationStore) {
  const router = useRouter()
  const isAuthenticated = ref(!!localStorage.getItem('token'))

  provide('isAuthenticated', isAuthenticated)

  const checkAuth = () => {
    isAuthenticated.value = !!localStorage.getItem('token')
    console.log("App - État d'authentification:", isAuthenticated.value)
  }

  watch(() => router.currentRoute.value, () => {
    checkAuth()
  })

  onMounted(() => {
    checkAuth()
    const currentRoute = router.currentRoute.value
    if (currentRoute.meta.requiresAuth && !isAuthenticated.value) {
      router.push('/login')
    }
  })

  return {
    isAuthenticated
  }
}

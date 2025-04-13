import { computed, ref, onMounted } from 'vue'
import { useRouter} from 'vue-router'
import { notificationStore } from '@/stores/notification'

export default function useSidebar(){
  const router = useRouter()
  const isAuthenticated = ref(!!localStorage.getItem('token'))
  
  //verifier à chaque changement
  onMounted(() =>{
    checkAuth()
    window.addEventListener('storage', checkAuth)
  })
  
  function checkAuth() {
    isAuthenticated.value = !!localStorage.getItem('token')
  }

  const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    isAuthenticated.value = false
    notificationStore.showNotification('Vous avez été déconnecté')
    router.push('/login')
  }

  return{
    isAuthenticated,
    logout,
    checkAuth
  }
}

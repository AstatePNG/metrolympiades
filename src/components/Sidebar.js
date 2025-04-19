import { computed, ref, onMounted } from 'vue'
import { useRouter} from 'vue-router'
import { notificationStore } from '@/stores/notification'

export default function useSidebar(){
  const router = useRouter()
  const isAuthenticated = ref(!!localStorage.getItem('token'))
  const isSidebarOpen = ref(false)
  
  //verifier à chaque changement
  onMounted(() =>{
    checkAuth()
    window.addEventListener('storage', checkAuth)
    
    //fermer le menu quand on clique sur un element du menu en mode header
    router.afterEach(() => {
      if (window.innerWidth <= 768) {
        isSidebarOpen.value = false
      }
    })
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
  
  const toggleSidebar = () =>{
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return{
    isAuthenticated,
    logout,
    checkAuth,
    isSidebarOpen,
    toggleSidebar
  }
}

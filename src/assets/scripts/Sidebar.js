import { computed, ref, onMounted } from 'vue'
import { useRouter} from 'vue-router'
import { notificationStore } from '@/stores/notification'

export default function useSidebar(){
  const router = useRouter()
  const isAuthenticated = ref(!!localStorage.getItem('token'))
  const isSidebarOpen = ref(true)
  const teamName = ref('')
  
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
    
    //recuperer le nom de l'equipe
    if (isAuthenticated.value) {
      const userDataString =localStorage.getItem('user')
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString)
          teamName.value = userData.team?.name || ''
        } catch (error){
          console.error('Erreur lors de la lecture des données utilisateur:', error)
          teamName.value = ''
        }
      }
    } else {
      teamName.value = ''
    }
  }

  const logout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    isAuthenticated.value = false
    teamName.value = ''
    notificationStore.showNotification('Vous avez été déconnecté')
    router.push('/login')
  }
  
  const toggleSidebar = () =>{
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return{
    isAuthenticated,
    teamName, // Exposition du nom de l'équipe
    logout,
    checkAuth,
    isSidebarOpen,
    toggleSidebar
  }
}

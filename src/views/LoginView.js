import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/api'
import { notificationStore } from '@/stores/notification'

export default function useLogin(){
  const router = useRouter()

  const email= ref('')
  const password = ref('')
  const errorMessage = ref('')
  const isLoading = ref(false)

  const handleLogin = async () => {
    try {
      isLoading.value = true
      errorMessage.value = ''
      
      const response = await authService.login(email.value, password.value)
      //recuperer le token
      localStorage.setItem('token',response.data.token)
      
      if (response.data.user){
        localStorage.setItem('user',JSON.stringify(response.data.user))
      }
      
      notificationStore.showNotification('Connexion réussie !', 'success')
      
      //on verra vers quoi on redirige peut etre un tableau de bord
      router.push('/')
    } catch (error) {
      console.error('Erreur de connexion:', error)
      
      if(error.response && error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message
        notificationStore.showNotification(error.response.data.message,'error')
      }
      else {
        errorMessage.value = "Une erreur s'est produite lors de la connexion."
        notificationStore.showNotification("Erreur lors de la connexion.",'error')
      }
    } finally {
      isLoading.value =false
    }
  }
  return {
    email,
    password,
    errorMessage,
    isLoading,
    handleLogin
  }
}
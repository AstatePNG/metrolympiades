import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService, teamService} from '@/services/api'
import { notificationStore} from '@/stores/notification'

export default function useRegister(){
  const router = useRouter()

  const email = ref('')
  const username = ref('')
  const password = ref('')
  const teamName = ref('')
  const errorMessage = ref('')
  const isLoading = ref(false)

  const handleRegister = async () =>{
    try {
      isLoading.value = true
      errorMessage.value = ''

      //permet de vérifier l'unicité du nom d'équipe
      const teamsResponse = await teamService.getAllTeams();
      const existingTeam = teamsResponse.data.find(team => team.name.toLowerCase() === teamName.value.trim().toLowerCase());

      if (existingTeam) {
        notificationStore.showNotification("Ce nom d'équipe est déjà pris. Choisissez-en un autre  !", 'error')
        throw new Error("Nom d'équipe déjà utilisé")
      }

      const response = await authService.register(
        email.value,
        username.value,
        password.value,
        teamName.value
      )

      //stocker le token dans le localstorage
      localStorage.setItem('token', response.data.token)
      //les infos de l'utilisateur
      localStorage.setItem('user', JSON.stringify(response.data))
      window.dispatchEvent(new Event('storage'))

      notificationStore.showNotification('Inscription réussie !', 'success')

      //on verra vers quoi on redirige peut etre un tableau de bord
      router.push('/team')
    }
    catch (error) {
      console.error('Erreur d\'inscription:', error)

      if (error.response &&error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message
        notificationStore.showNotification(error.response.data.message,'error')
      }
      else {
        errorMessage.value = "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
        notificationStore.showNotification("Une erreur s'est produite lors de l'inscription.", 'error')
      }
    } finally{
      isLoading.value = false
    }
  }
  return {
    email,
    username,
    password,
    teamName,
    errorMessage,
    isLoading,
    handleRegister
  }
}

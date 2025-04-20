import { ref, onMounted } from 'vue'
import { matchService } from '@/services/api'
import { notificationStore } from '@/stores/notification'

export default function useGames(){
  const matches = ref([])
  const isLoading = ref(true)
  const errorMessage = ref('')

  const formatTime= (timestamp) =>{
    try {
      const date = new Date(timestamp)
      return date.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})
    } 
    catch (error){
      console.error('Erreur de formatage de date:', error)
      return ''
    }
  }

  onMounted(async () => {
    try {
      isLoading.value = true
      const response = await matchService.getMyMatches()
      matches.value = response.data || []
    } 
    catch (error){
      console.error('Erreur lors du chargement des matchs:', error)
      if (error.response?.data?.message){
        errorMessage.value = error.response.data.message
      } 
      else {
        errorMessage.value = 'Impossible de charger les matchs'
      }
      
      notificationStore.showNotification(errorMessage.value, 'error')
    } finally {
      isLoading.value = false
    }
  })

  const deleteMatch= async (matchId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce match?')) return
    
    try{
      await matchService.deleteMatch(matchId)
      matches.value = matches.value.filter(match => match.id !== matchId)
      notificationStore.showNotification('Match supprimé avec succès', 'success')
    } 
    catch (error) {
      console.error('Erreur lors de la suppression du match:', error)
      
      if (error.response?.data?.message) {
        notificationStore.showNotification(error.response.data.message, 'error')
      } else {
        notificationStore.showNotification('Impossible de supprimer le match', 'error')
      }
    }
  }

  return {
    matches,
    isLoading,
    errorMessage,
    formatTime,
    deleteMatch
  }
}

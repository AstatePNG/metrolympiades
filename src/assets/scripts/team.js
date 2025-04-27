import { ref, onMounted } from 'vue'
import { teamService } from '@/services/api'
import { notificationStore } from '@/stores/notification'

export default function useTeam() {
  const teamName = ref('')
  const members = ref([])
  const newMember = ref('')
  const isLoading = ref(true)
  const isSubmitting = ref(false)
  const errorMessage = ref('')
  const leader = ref('')

  //recuperer les données de l'équipe
  onMounted(async () =>{
    try {
      isLoading.value = true
      errorMessage.value= ''

      const response = await teamService.getMyTeam()
      const reponseMyTeam = await teamService.getTeamByID(response.data.id)

      if (response.data){
        teamName.value = response.data.name || ''

        //copier le tableau pour ne pas utiliser de référence
        members.value = Array.isArray(response.data.members)
          ?[...response.data.members]
          : []
      }
      if (reponseMyTeam.data){
        leader.value = reponseMyTeam.data.leader.username || ''
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'équipe:', error)

      if (error.response?.data?.message) {
        errorMessage.value = error.response.data.message
      }
      else{
        errorMessage.value= 'Impossible de charger les informations de l\'équipe'
      }

      notificationStore.showNotification(
        errorMessage.value,
        'error'
      )
    } finally {
      isLoading.value = false
    }
  })

  //ajouter un membre dans un tableau
  const addMember = () => {
    if (newMember.value.trim()) {
      members.value.push(newMember.value.trim())
      newMember.value = ''
    }
  }

  //Supprimer
  const removeMember = (index) => {
    //nouveau tableau avec fonction callback qui parcourt le tableau existant
    // et retourne le tableau sans l'élément à supprimer
    members.value = members.value.filter((_, i) => i !== index)
  }

  //mise à jour avec l'api
  const updateTeam = async () => {
    try {
      isSubmitting.value = true
      errorMessage.value = ''

      await teamService.updateMyTeam(teamName.value, members.value)

      notificationStore.showNotification(
        'Équipe mise à jour avec succès',
        'success'
      )
    }
    catch (error){
      console.error('Erreur lors de la mise à jour de l\'équipe:', error)

      if (error.response?.data?.message){
        errorMessage.value = error.response.data.message
      }
      else {
        errorMessage.value = 'Impossible de mettre à jour les informations de l\'équipe'
      }

      notificationStore.showNotification(
        errorMessage.value,
        'error'
      )
    }
    finally {
      isSubmitting.value =false
    }
  }

  return{
    teamName,
    members,
    newMember,
    isLoading,
    isSubmitting,
    errorMessage,
    updateTeam,
    addMember,
    removeMember,
    leader
  }
}

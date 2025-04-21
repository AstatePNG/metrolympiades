import { ref, computed } from "vue";
import { rankingService } from "@/services/api";
import { notificationStore } from '@/stores/notification'

export default function showLeaderboard(){

    const leaderboard = ref([])
    const sortedLeaderboard = computed(() => 
        leaderboard.value.toSorted((teamA, teamB) => teamB.points - teamA.points)
    )

    const errorMessage = ref('')
    const isLoading = ref(false)

    const fetchLeaderboard = async () => {
        try {
            isLoading.value = true
            errorMessage.value = ''
        
            rankingService.getRanking().then((data) => leaderboard.value = data.data)
        } catch (error) {
            console.error('Erreur lors de la récupération du classement :', error)
            
            if(error.response && error.response.data && error.response.data.message) {
                errorMessage.value = error.response.data.message
                notificationStore.showNotification(error.response.data.message,'error')
            }
            else {
                errorMessage.value = "Une erreur s'est produite lors de la récupération du classement."
                notificationStore.showNotification("Erreur lors de la récupération du classement.",'error')
            }
        } finally {
            isLoading.value =false
        }
    }
    return {
        leaderboard,
        sortedLeaderboard,
        errorMessage,
        isLoading,
        fetchLeaderboard
    }
}
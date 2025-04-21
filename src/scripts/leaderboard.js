
import { ref, computed } from "vue";
import { rankingService } from "@/services/api";
import { notificationStore } from '@/stores/notification' //TODO : INSTALL

// const loading = ref(false);

// const fetchLeaderboard = async () => {
//     loading.value = true;
//     const result = rankingService.getRanking();
//     result.then((response) => response.json()).then((data) => {
//         apiLeaderboard.value = data;
//         loading.value = false;
//     });
// }

// export default fetchLeaderboard

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
        
            const response = await rankingService.getRanking()
            response.then((data) => console.log(data))
        
            notificationStore.showNotification('Voici le classement !', 'success')
            
            //on verra vers quoi on redirige peut etre un tableau de bord
            router.push('/')
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
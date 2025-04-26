import { ref, computed } from "vue";
import { rankingService } from "@/services/api";
import { notificationStore } from '@/stores/notification'
import { teamService } from "@/services/api";

export default function leaderboardScript(){

    const leaderboard = ref([])
    const sortedLeaderboard = computed(() => 
        leaderboard.value.toSorted((teamA, teamB) => teamB.points - teamA.points)
    )

    const teamList = ref([])

    const errorMessage = ref('')
    const isLoading = ref(false)

    const fetchLeaderboard = async () => {
        try {
            isLoading.value = true
            errorMessage.value = ''
        
            teamService.getAllTeams()
            .then((data) => teamList.value = data.data)
            .then(() => {
                rankingService.getRanking().then((data) => {
                    data.data.forEach((team) => {
                        const teamName = team.team
                        const teamDetail = teamList.value.find((t) => t.name === teamName)
                        if(teamDetail.length > 1) {
                            teamDetail = teamDetail[0]
                        }

                        team.id = teamDetail.id
                        team.members = teamDetail.members
                        team.leader = teamDetail.leader.username
                        team.avatarUrl = teamDetail.avatarUrl
                    })
                    return data
                })
                .then((data) => leaderboard.value = data.data)
            })
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

    const fetchTeamHistory = async (teamId) => {
        const team = leaderboard.value.find((team) => team.id === teamId)
        if(team.history === undefined) {
            try {
                isLoading.value = true
                errorMessage.value = ''
            
                rankingService.getHistoryOfTeam(teamId)
                .then((data) => {
                    const sortedData = data.data.toSorted((matchA, matchB) => new Date(matchB.startedAt) - new Date(matchA.startedAt))
                    const history = []
                    sortedData.forEach((match) => {
                        const cleannedMatch = {}
                        if(match.team1 !== team.team) {
                            cleannedMatch.opponent = match.team1
                            cleannedMatch.teamScore = match.team2Score
                            cleannedMatch.opponentScore = match.team1Score

                        }
                        else {
                            cleannedMatch.opponent = match.team2
                            cleannedMatch.teamScore = match.team1Score
                            cleannedMatch.opponentScore = match.team2Score
                        }
                        cleannedMatch.activity = match.activity
                        const matchDate = new Date(match.startedAt)
                        cleannedMatch.date = matchDate.toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                        if(cleannedMatch.teamScore > cleannedMatch.opponentScore) {
                            cleannedMatch.result = 'Victoire'
                        }
                        else if(cleannedMatch.teamScore < cleannedMatch.opponentScore) {
                            cleannedMatch.result = 'Défaite'
                        }
                        else {
                            cleannedMatch.result = 'Match nul'
                        }
                        history.push(cleannedMatch)
                    })
                    team.history = history
                })
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de l\'équipe :', error)
                
                if(error.response && error.response.data && error.response.data.message) {
                    errorMessage.value = error.response.data.message
                    notificationStore.showNotification(error.response.data.message,'error')
                }
                else {
                    errorMessage.value = "Une erreur s'est produite lors de la récupération des détails de l'équipe."
                    notificationStore.showNotification("Erreur lors de la récupération des détails de l'équipe.",'error')
                }
            } finally {
                isLoading.value =false
            }
        }
    }

    return {
        leaderboard,
        sortedLeaderboard,
        errorMessage,
        isLoading,
        fetchLeaderboard,
        fetchTeamHistory,
    }
}
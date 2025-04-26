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
            // affectation de la liste des équipes à la variable teamList
            .then((data) => teamList.value = data.data)
            // récupération du classement
            .then(() => {
                rankingService.getRanking().then((data) => {
                    data.data.forEach((team) => {
                        const teamName = team.team
                        // recherche de l'équipe par son nom, l'id n'étant pas accessible depuis cette requête
                        let teamDetail = teamList.value.find((t) => t.name === teamName)
                        // si plusieurs équipes ont le même nom, on prend la première
                        if(teamDetail.length > 1) {
                            teamDetail = teamDetail[0]
                        }

                        // ajout des détails de l'équipe aux données du classement
                        team.id = teamDetail.id
                        team.members = teamDetail.members
                        team.leader = teamDetail.leader.username
                        team.avatarUrl = teamDetail.avatarUrl
                    })
                    // renvoie du classement avec les détails de l'équipe
                    return data
                })
                // affectation du classement à la variable leaderboard
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
        // vérification si l'historique de l'équipe est déjà chargé
        // si oui, on ne le recharge pas
        if(team.history === undefined) {
            try {
                isLoading.value = true
                errorMessage.value = ''
            
                rankingService.getHistoryOfTeam(teamId)
                // récupération de l'historique de l'équipe
                .then((data) => {
                    // tri des matchs du plus récent au plus ancien
                    const sortedData = data.data.toSorted((matchA, matchB) => new Date(matchB.startedAt) - new Date(matchA.startedAt))
                    const history = []
                    // pour chaque match, on crée un objet avec les informations nécessaires pour l'affichage
                    // qui permet de ne pas avoir à faire de traitement dans le template
                    sortedData.forEach((match) => {
                        const cleannedMatch = {}
                        // recherche de l'équipe adverse par son nom
                        // et ajout des scores de façon distincte
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

                        // ajout du résultat du match au format texte
                        if(cleannedMatch.teamScore > cleannedMatch.opponentScore) {
                            cleannedMatch.result = 'Victoire'
                        }
                        else if(cleannedMatch.teamScore < cleannedMatch.opponentScore) {
                            cleannedMatch.result = 'Défaite'
                        }
                        else {
                            cleannedMatch.result = 'Match nul'
                        }

                        // ajout des informations du match manquante
                        cleannedMatch.activity = match.activity
                        // formatage de la date pour l'affichage
                        // et ajout de l'heure
                        const matchDate = new Date(match.startedAt)
                        cleannedMatch.date = matchDate.toLocaleDateString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })

                        // ajout du match à l'historique
                        history.push(cleannedMatch)
                    })
                    // ajout de l'historique à l'objet équipe
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
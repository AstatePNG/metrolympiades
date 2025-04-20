import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { matchService, teamService, activityService } from '@/services/api'

export default function useCreateMatch() {
  const router = useRouter()

  const selectedTeamId = ref('')
  const selectedActivityId = ref('')
  const startTime = ref('00:00')
  const teamScore = ref(0)
  const opponentScore = ref(0)
  const errorMessage = ref('')

  const teamName = ref('Mon équipe')
  const teams = ref([])
  const activities = ref([])

  const fetchTeams = async () => {
    try {
      errorMessage.value = ''

      const response = await teamService.getAllTeams()
      console.log('Équipes récupérées :', response.data)
      teams.value = response.data
    } catch (error) {
      errorMessage.value = "Erreur lors de la récupération des équipes" + error
    }
  }

  const fetchActivities = async () => {
    try {
      errorMessage.value = ''

      const response = await activityService.getActivities()
      console.log('Activités récupérées :', response.data)

      activities.value = response.data
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des activités" + error
    }
  }

  const handleSaveMatch = async () => {
    try {
      errorMessage.value = ''

      const matchData = {
        team2Id: selectedTeamId.value,
        activityId: selectedActivityId.value,
        startedAt: startTime.value,
        team1Score: teamScore.value,
        team2Score: opponentScore.value
      }

      console.log('Match à enregistrer :', matchData)

      await matchService.createMatch(
        matchData.team2Id,
        matchData.activityId,
        matchData.startedAt,
        matchData.team1Score,
        matchData.team2Score
      )
      router.push('/matches')
    } catch (error) {
      errorMessage.value = "Erreur lors de la création du match" + error
    }
  }

  onMounted(() => {
    fetchTeams()
    fetchActivities()
  })

  return {
    selectedTeamId,
    selectedActivityId,
    startTime,
    teamScore,
    opponentScore,
    errorMessage,
    handleSaveMatch,
    teams,
    activities,
    teamName
  }
}

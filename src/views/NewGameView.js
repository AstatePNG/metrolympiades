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

  const currentTeam = ref(null)

  const fetchTeams = async () => {
    try {
      errorMessage.value = ''
      const response = await teamService.getAllTeams()
      teams.value = response.data
    } catch (error) {
      errorMessage.value = "Erreur lors de la récupération des équipes" + error
    }
  }

  const fetchActivities = async () => {
    try {
      errorMessage.value = ''
      const response = await activityService.getActivities()
      activities.value = response.data
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des activités" + error
    }
  }

  const fetchCurrentTeam = async () => {
    try {
      const response = await teamService.getMyTeam()

      currentTeam.value = response.data
      selectedTeamId.value = currentTeam.value.id
      teamName.value = currentTeam.value.name
    } catch (error) {
      errorMessage.value = "Erreur lors de la récupération de l'équipe" + error
    }
  }

  const handleSaveMatch = async () => {
    try {
      errorMessage.value = ''

      if (!selectedTeamId.value) {
        throw new Error("Veuillez sélectionner une équipe adverse.")
      }
      if (!selectedActivityId.value) {
        throw new Error("Veuillez sélectionner une activité.")
      }

      const currentDate = new Date();
      const selectedTime = startTime.value.split(':');
      currentDate.setHours(selectedTime[0], selectedTime[1], 0, 0);

      const matchData = {
        team1Id: currentTeam.value.id,
        team2Id: selectedTeamId.value,
        activityId: selectedActivityId.value,
        startedAt: currentDate.toISOString(),
        team1Score: teamScore.value,
        team2Score: opponentScore.value
      }

      await matchService.createMatch(
        matchData.team2Id,
        matchData.activityId,
        matchData.startedAt,
        matchData.team1Score,
        matchData.team2Score
      )

      router.push('/matches')
    } catch (error) {
      errorMessage.value = "Erreur lors de la création du match : " + error
    }
  }

  onMounted(() => {
    fetchTeams()
    fetchActivities()
    fetchCurrentTeam()
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

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { matchService, teamService, activityService } from '@/services/api'

export default function useCreateMatch() {
  const router = useRouter()

  const selectedOpponentId = ref('')
  const selectedActivityId = ref('')
  const startTime = ref('00:00')
  const teamScore = ref(0)
  const opponentScore = ref(0)
  const errorMessage = ref('')
  const isLoading = ref(false)

  const teamName = ref('Mon équipe')
  const teams = ref([])
  const activities = ref([])

  const currentTeam = ref(null)

  const filterTeams = (allTeams) => {
    return allTeams.filter(team => team.id !== currentTeam.value?.id)
  }

  const fetchTeams = async () => {
    isLoading.value = true
    try {
      errorMessage.value = ''
      const response = await teamService.getAllTeams()
      teams.value = filterTeams(response.data)
    } catch (error) {
      errorMessage.value = "Erreur lors de la récupération des équipes: " + error
    } finally {
      isLoading.value = false
    }
  }

  const fetchActivities = async () => {
    isLoading.value = true
    try {
      errorMessage.value = ''
      const response = await activityService.getActivities()
      activities.value = response.data
    } catch (error) {
      errorMessage.value = "Erreur lors du chargement des activités: " + error
    } finally {
      isLoading.value = false
    }
  }

  const fetchCurrentTeam = async () => {
    isLoading.value = true
    try {
      const response = await teamService.getMyTeam()
      currentTeam.value = response.data
      selectedOpponentId.value = ''
      teamName.value = currentTeam.value.name

      fetchTeams()
    } catch (error) {
      errorMessage.value = "Erreur lors de la récupération de l'équipe: " + error
    } finally {
      isLoading.value = false
    }
  }

  const handleSaveMatch = async () => {
    isLoading.value = true
    try {
      errorMessage.value = ''

      if (!selectedOpponentId.value) {
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
        team2Id: selectedOpponentId.value,
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

      router.push('/games')
    } catch (error) {
      errorMessage.value = "Erreur lors de la création du match : " + error
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchActivities()
    fetchCurrentTeam()
  })

  return {
    selectedOpponentId,
    selectedActivityId,
    startTime,
    teamScore,
    opponentScore,
    errorMessage,
    isLoading,
    handleSaveMatch,
    teams,
    activities,
    teamName,
  }
}

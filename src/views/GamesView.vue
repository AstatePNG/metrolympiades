<template>
  <div class="games-container">
    <div class="games-header">
      <h1>Mes matchs</h1>
      <router-link to="/games/create" class="add-game-btn">
        Ajouter un match
      </router-link>
    </div>

    <div v-if="isLoading" class="loading">
      Chargement des matchs
    </div>
    <div v-else-if="errorMessage" class="error-message">
      {{ errorMessage}}
    </div>
    
    <div v-else-if="!matches.length" class="empty">
      Aucun match à afficher
    </div>
    
    <div v-else class="matches-list">
      <div v-for="match in matches" :key="match.id" class="match-card">
        <div class="match-header">
          <div class="activity-name">{{match.activity }}</div>
          <div class="match-time">{{ formatTime(match.startedAt) }}</div>
        </div>
        
        <div class="match-teams">
          <div class="team">
            <div class="team-name">{{match.team1 }}</div>
            <div class="team-score">{{ match.team1Score }}</div>
          </div>
          
          <div class="team">
            <div class="team-name">{{ match.team2 }}</div>
            <div class="team-score">{{ match.team2Score }}</div>
          </div>
        </div>
        
        <button @click="deleteMatch(match.id)" class="delete-btn">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { matchService } from '@/services/api'
import { notificationStore } from '@/stores/notification'

const matches = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const formatTime= (timestamp) =>{
  try{
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
    
    if(error.response?.data?.message) {
      notificationStore.showNotification(error.response.data.message, 'error')
    } else {
      notificationStore.showNotification('Impossible de supprimer le match', 'error')
    }
  }
}
</script>

<style>
.games-container {
  width: 100%;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.games-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.games-header h1 {
  margin: 0;
  color: #1a1a2e;
}

.add-game-btn {
  background-color: #4ecca3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s;
}

.add-game-btn:hover {
  background-color: #3dbb92;
}

.loading, .empty{
  text-align: center;
  padding: 2rem;
  font-style: italic;
  color: #666;
}

.matches-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.match-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  transition: box-shadow 0.3s;
  position: relative;
}

.match-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.activity-name {
  font-weight: 600;
  color: #1a1a2e;
}

.match-time {
  color: #666;
  font-size: 0.9rem;
}

.match-teams {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.team {
  display: flex;
  justify-content: space-between;
  width: 48%;
  padding: 0.75rem;
  background-color: #f9f9f9;
  border-radius: 4px;
  align-items: center;
}

.team-name {
  font-weight: 500;
}

.team-score {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a2e;
}

.delete-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: transparent;
  color: #f44336;
  border: 1px solid #f44336;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.delete-btn:hover {
  background-color: #f44336;
  color: white;
}

@media(max-width: 768px) {
  .games-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .add-game-btn {
    width: 100%;
    text-align: center;
  }
  .match-teams{
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .team {
    width: 100%;
  }
}
</style>
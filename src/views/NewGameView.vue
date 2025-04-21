<script setup>
import useCreateMatch from '../assets/scripts/newGame.js'
import '../assets/css/NewGameView.css'

const {
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
} = useCreateMatch()

const handleSave = () => {
  handleSaveMatch()
}
</script>

<template>
  <div class="new-match-container">
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="isLoading" class="loading">Chargement en cours</div>

    <form v-else @submit.prevent="handleSave" class="new-match-form">
      <div class="new-match-header">
        <h1>Créer un match</h1>
        <button
          type="submit"
          class="btn primary"
          :disabled="!selectedOpponentId || !selectedActivityId"
        >
          Créer le match
        </button>
      </div>

      <div class="form-group">
        <label for="opponent">Adversaire</label>
        <select id="opponent" v-model="selectedOpponentId" required>
          <option disabled value="">Sélectionner une équipe</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="activity">Activité</label>
        <select id="activity" v-model="selectedActivityId" required>
          <option disabled value="">Sélectionner une activité</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">
            {{ activity.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="startTime">Heure de début</label>
        <input type="time" id="startTime" v-model="startTime" required />
      </div>

      <div class="form-group">
        <label>Scores finaux</label>
        <div class="scores-container">
          <div class="score-input">
            <span>{{ teamName }}</span>
            <input type="number" min="0" v-model.number="teamScore" />
          </div>
          <div class="score-input">
            <span> Adversaire </span>
            <input type="number" min="0" v-model.number="opponentScore" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

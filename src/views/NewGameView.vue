<script setup>
import useCreateMatch from './NewGameView.js'

const {
  selectedTeamId,
  selectedActivityId,
  startTime,
  teamScore,
  opponentScore,
  errorMessage,
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
  <div>
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleSave">
      <h2>Créer un match</h2>

      <div>
        <label for="opponent">Adversaire</label>
        <select id="opponent" v-model="selectedTeamId" required>
          <option disabled value="">Sélectionner une équipe</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="activity">Activité</label>
        <select id="activity" v-model="selectedActivityId" required>
          <option disabled value="">Sélectionner une activité</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">
            {{ activity.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="startTime">Heure de début</label>
        <input type="time" id="startTime" v-model="startTime" required />
      </div>

      <div>
        <label>Scores finaux</label>
        <div>
          <div>
            <span>{{ teamName }}</span>
            <input type="number" min="0" v-model.number="teamScore" />
          </div>
          <div>
            <span>Adversaire</span>
            <input type="number" min="0" v-model.number="opponentScore" />
          </div>
        </div>
      </div>

      <div>
        <button type="submit">Créer le match</button>
      </div>
    </form>
  </div>
</template>

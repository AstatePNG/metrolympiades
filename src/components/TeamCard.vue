<script setup>
import { ref, computed } from 'vue'

// position dans classement
const props = defineProps({
  team: Object,
  position: Number,
})
const emit = defineEmits(['details'])

const visible = ref(false)

function detailsClicked(team) {
  emit('details', team.id)
  visible.value = !visible.value
}

// classe en fonction du classement
const cardClasses = computed(() => ({
  podium: props.position <= 3,
  'first-place': props.position === 1,
  'second-place': props.position === 2,
  'third-place': props.position === 3,
  'details-open': visible.value,
  'team-card': true,
}))

// obtenir l'icône d'activité
function getActivityIcon(activity) {
  const icons = {
    Football: '⚽',
    Basketball: '🏀',
    Volleyball: '🏐',
    Tennis: '🎾',
    Badminton: '🏸',
    Natation: '🏊',
    Athlétisme: '🏃',
    Cyclisme: '🚴',
  }
  return icons[activity] || '🏆' //si ce n'est pas un sport connu
}

// cllase en fonction de victoire ou défaite
function getResultClass(result) {
  if (result === 'Victoire') return 'result-victory'
  if (result === 'Défaite') return 'result-defeat'
  return 'result-draw'
}
</script>

<template>
  <div class="card my-3" :class="cardClasses" @click="detailsClicked(team)">
    <header class="card-header">
      <p>
        <span class="team-info-title">{{ team.team }}</span>
        <span class="team-score">{{ team.points }} pts</span>
      </p>
    </header>
    <div v-if="!visible" class="click-indicator">
      <span>Plus de détails</span>
      <i>→</i>
    </div>
    <div class="card-body" v-if="visible">
      <div class="team-composition">
        <p>
          <span class="team-info-title">Composition de l'équipe:</span>
          <span class="team-leader">Capitaine : {{ team.leader }}</span
          ><br />
          <span class="team-members">Membres : </span><br />
          <span class="no-data" v-if="!team.members"> Cette équipe n'a pas d'autres membres. </span>
          <span class="members">{{ team.members }}</span>
        </p>
      </div>
      <div class="team-history" v-if="team.history">
        <p><span class="team-info-title">Matchs les plus récents :</span></p>
        <p class="no-data" v-if="!team.history || team.history.length === 0">
          Cette équipe n'a pas encore joué de match.
        </p>
        <div
          class="match-card my-3"
          v-for="(match, index) in team.history.slice(0, 5)"
          :key="index"
        >
          <header class="card-header">
            <span class="activity-icon">{{ getActivityIcon(match.activity) }}</span>
            {{ match.activity }} contre {{ ' ' + match.opponent + ' ' }}
            <div class="match-date">{{ ' ' + match.date }}</div>
          </header>
          <div class="card-body">
            <div class="match-score">
              <div>
                <span class="score-label">{{ team.team }}</span>
                <span class="score-value">{{ match.teamScore }}</span>
              </div>
              <span class="score-separator">-</span>
              <div>
                <span class="score-value">{{ match.opponentScore }}</span>
                <span class="score-label">{{ match.opponent }}</span>
              </div>
            </div>
            <div class="match-result" :class="getResultClass(match.result)">
              {{ match.result }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,computed } from 'vue'

// position dans classement
const props = defineProps({
  team: Object,
  position: Number 
});
const emit = defineEmits(["details"]);

const visible = ref(false);

function detailsClicked(team) {
    emit('details', team.id);
    visible.value = !visible.value;
}

// classe en fonction du classement
const cardClasses =computed(() => ({
  'podium': props.position <= 3,
  'first-place': props.position === 1,
  'second-place': props.position === 2,
  'third-place': props.position === 3,
  'details-open': visible.value
}));
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
                    <span class="team-leader">Capitaine : {{ team.leader }}</span><br>
                    <span class="team-members">Membres : </span><br>
                    <span v-if="!team.members">
                        Cette équipe n'a pas d'autres membres.
                    </span>
                    <span>{{ team.members }}</span>
                </p>
            </div>
            <div class="team-history" v-if="team.history">
                <p><span class="team-info-title">Matchs les plus récents :</span></p>
                <p v-if="!team.history">
                    Cette équipe n'a pas encore joué de match.
                </p>
                <div class="card my-3" v-for="(match, index) in team.history.slice(0, 5)" :key="index">
                    <header class="card-header">
                        <p>{{ match.activity }} contre {{ match.opponent }} le {{ match.date }} :</p>
                    </header>
                    <div class="card-body">
                        <p>Score : {{ match.teamScore }} à {{ match.opponentScore }}</p>
                        <p>Résultat : {{ match.result }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
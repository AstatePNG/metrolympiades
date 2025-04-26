<script setup>

import { ref } from 'vue'

const props = defineProps(["team"]);

const emit = defineEmits(["details"]);

</script>

<template>
    <div class="card my-3" @click="emit('details', team.id)">
        <header class="card-header">
            <p>
                <span class="team-info-title">{{ team.team }}</span>
                <span class="team-score">{{ team.points }} pts</span>
            </p>
        </header>
        <div class="card-body">
            <div class="team-composition">
                <p>
                    <span class="team-info-title">Composition de l'équipe:</span>
                    <span class="team-leader">Capitaine : {{ team.leader }}</span>
                    <span class="team-members">Membres : {{ team.members }}</span>
                </p>
            </div>
            <div class="team-history">
                <p><span class="team-info-title">Historique des matchs :</span></p>
                <ul>
                    <li v-for="(match, index) in team.history" :key="index">
                        {{ match }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
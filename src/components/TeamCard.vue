<script setup>

import { ref } from 'vue'

const props = defineProps(["team"]);
const emit = defineEmits(["details"]);

const visible = ref(false);

function detailsClicked(team) {
    emit('details', team.id);
    visible.value = !visible.value;
}

</script>

<template>
    <div class="rounded overflow-hidden shadow-lg bg-teal-500/5 text-white" @click="detailsClicked(team)">
        <div class="pb-4">
            <header class="flex justify-between items-center bg-teal-500/10 p-4 rounded">
                <div class="text-lg font-bold">{{ team.team }}</div>
                <div class="text-base">{{ team.points }} pts</div>
            </header>
            <div class="grid grid-cols-2 gap-4" v-if="visible">
                <div>
                    <p>
                        <span class="text-lg font-semibold">Composition de l'équipe:</span>
                        <span class="block mt-1">
                            <span class="mb-2">Capitaine : {{ team.leader }}</span><br>
                            <span>Membres :</span><br>
                            <span>{{ team.members }}</span>
                        </span>
                    </p>
                </div>
                <div v-if="team.history">
                    <p class="text-lg font-semibold mb-2">Historique des matchs :</p>
                    <div class="space-y-3" v-for="(match, index) in team.history.slice(0, 5)" :key="index">
                        <div class="border p-3 rounded">
                            <header class="card-header">
                                <p class="font-semibold">{{ match.activity }} contre {{ match.opponent }} le {{ match.date }}:</p>
                            </header>
                            <div class="card-body">
                                <p>Score : {{ match.teamScore }} à {{ match.opponentScore }}</p>
                                <p>Résultat : {{ match.result }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

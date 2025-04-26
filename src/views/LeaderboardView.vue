<script setup>
import TeamCard from '../components/TeamCard.vue'
import leaderboardScript from "../assets/scripts/leaderboard"
import '../assets/css/LeaderBoard.css'

const {
    leaderboard,
    sortedLeaderboard,
    errorMessage,
    isLoading,
    fetchLeaderboard,
    fetchTeamHistory,
} = leaderboardScript()

fetchLeaderboard()

function getTeamHistory(teamId) {
    fetchTeamHistory(teamId)
}
</script>

<template>
    <div class="container">
        <h1>Classement des équipes</h1>

        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>

        <div v-if="isLoading" class="loading">
            Chargement du classement...
        </div>

        <div v-else-if="!leaderboard.length" class="empty">
            Pas de classement disponible pour le moment.
        </div>

        <div v-else id="leaderboard">
            <TeamCard
                v-for="(team, index) in sortedLeaderboard"
                :key="team.id"
                :team="team"
                :position="index + 1"
                @details="getTeamHistory(team.id)"
            />
        </div>
    </div>
</template>
<script setup>

    import TeamCard from '../components/TeamCard.vue'
    import leaderboardScript from "../assets/scripts/leaderboard"
    import '../assets/css/leaderboard.css'

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
    <main>
        <div class="flex justify-center flex-col">
            <h1 class="text-5xl pb-10">Classement des équipes :</h1>

            <div v-if="errorMessage" class="error-message">
                {{ errorMessage}}
            </div>

            <p v-if="isLoading">Chargement...</p>

            <p v-else-if="!leaderboard.length">Pas de classement pour le moment.</p>

            <div v-else id="leaderboard">
                <TeamCard
                    v-for="(team) in sortedLeaderboard"
                    :key="team.id"
                    :team="team"
                    @details="getTeamHistory(team.id)"
                />
            </div>
        </div>
    </main>
</template>
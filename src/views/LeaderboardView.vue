<script setup>

    import TeamCard from '../components/TeamCard.vue'
    import showLeaderboard from "../assets/scripts/leaderboard"

    const {
        leaderboard,
        sortedLeaderboard,
        errorMessage,
        isLoading,
        fetchLeaderboard
    } = showLeaderboard()

    fetchLeaderboard()

</script>

<template>
    <main>
        <div class="container">
            <h1 class="h1">Classement des équipes :</h1>

            <div v-if="errorMessage" class="error-message">
                {{ errorMessage}}
            </div>

            <p v-if="isLoading">Chargement...</p>

            <p v-else-if="!leaderboard.length">Pas de classement pour le moment.</p>

            <div v-else id="accordion">
                <TeamCard
                    v-for="(team, index) in sortedLeaderboard"
                    :key="index"
                    :team="team"
                    :index="index"
                />
            </div>
        </div>
    </main>
</template>
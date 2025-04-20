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
import '../css/GamesView.css'
import useGames from '../js/GamesView.js'

const { matches, isLoading, errorMessage, formatTime, deleteMatch } = useGames()
</script>


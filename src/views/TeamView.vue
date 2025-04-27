<script setup>
import useTeam from '../assets/scripts/team.js'
import '../assets/css/TeamView.css'

const {
  teamName,
  members,
  newMember,
  isLoading,
  isSubmitting,
  errorMessage,
  updateTeam,
  addMember,
  removeMember,
  leader,
} = useTeam()
</script>

<template>
  <div class="team-container">
    <h1>Mon Équipe</h1>

    <div v-if="isLoading" class="loading">Chargement des informations de l'équipe...</div>

    <div v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-else class="team-details">
      <form @submit.prevent="updateTeam" class="team-form">
        <div class="form-group">
          <label for="teamName">Nom de l'équipe</label>
          <input
            type="text"
            id="teamName"
            v-model="teamName"
            required
            placeholder="Nom de l'équipe"
          />
        </div>
        <div class="form-group">
          <label for="teamName">Chef de l'équipe</label>
          {{ leader }}
        </div>
        <div class="members-section">
          <h2>Membres de l'équipe</h2>
          <p v-if="members.length === 0" class="no-members">Aucun membre dans votre équipe</p>
          <ul class="members-list">
            <li v-for="(member, index) in members" :key="index" class="member-item">
              {{ member }}
              <button
                type="button"
                class="remove-btn"
                @click="removeMember(index)"
                aria-label="Retirer ce membre"
              >
                &times;
              </button>
            </li>
          </ul>

          <div class="add-member-form">
            <div class="form-group">
              <label for="newMember">Ajouter un membre</label>
              <div class="input-with-button">
                <input
                  type="text"
                  id="newMember"
                  v-model="newMember"
                  placeholder="Nom du nouveau membre"
                />
                <button
                  type="button"
                  class="add-btn"
                  @click="addMember"
                  :disabled="!newMember.trim()"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

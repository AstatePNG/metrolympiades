<script setup>
import useRegister from '../assets/scripts/register.js'
import '../assets/css/RegisterView.css'

const { 
  email, 
  username, 
  password, 
  teamName, 
  errorMessage, 
  isLoading, 
  handleRegister 
} = useRegister()
</script>

<template>
  <div class="register-container">
    <h1>Inscription</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required 
          placeholder="Entrez votre email"
        />
      </div>
      
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          required 
          placeholder="Choisissez un nom d'utilisateur"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          placeholder="Choisissez un mot de passe"
        />
      </div>
      
      <div class="form-group">
        <label for="teamName">Nom de l'équipe</label>
        <input 
          type="text" 
          id="teamName" 
          v-model="teamName" 
          required 
          placeholder="Nom de votre équipe"
        />
      </div>
      
      <div class="form-actions">
        <button type="submit" :disabled="isLoading" class="btn primary">
          {{ isLoading ? 'Inscription en cours...' : 'S\'inscrire' }}
        </button>
      </div>
      
      <div class="login-link">
        Vous avez déjà un compte ? 
        <router-link to="/login">Connectez-vous</router-link>
      </div>
    </form>
  </div>
</template>
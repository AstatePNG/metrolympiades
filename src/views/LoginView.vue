<template>
  <div class="login-container">
    <h1>Connexion</h1>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage}}
    </div>
    
    <form @submit.prevent="handleLogin" class="login-form">
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
        <label for="password">Mot de passe</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          placeholder="Entrez votre mot de passe"
        />
      </div>
      
      <div class="form-actions">
        <button type="submit" :disabled="isLoading" class="btn primary">
          {{isLoading ? 'Connexion en cours...' :'Se connecter' }}
        </button>
        
      </div>
      
      <div class="register-link">
        Vous n'avez pas de compte ? 
        <router-link to="/register">Inscrivez-vous</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import useLogin from './LoginView.js'
import './LoginView.css'

const {email, password, errorMessage,isLoading, handleLogin } = useLogin()
</script>
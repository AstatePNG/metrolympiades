<script setup>
import useSidebar from './Sidebar.js'
import './Sidebar.css'

const { isAuthenticated, logout} = useSidebar()
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h1>Métrolympiades</h1>
    </div>
    <nav class="sidebar-nav">
        <!--Accessible par tout le monde -->
      <router-link to="/" class="nav-item">
        <span>Classement</span>
      </router-link>
      <!--Si connecté -->
      <template v-if="isAuthenticated">
        <router-link to="/team" class="nav-item">
          <span>Mon Équipe</span>
        </router-link>
        <router-link to="/games" class="nav-item">
          <span>Mes Matchs</span>
        </router-link>
        <router-link to="/games/create" class="nav-item">
          <span>Créer un Match</span>
        </router-link>
        <a href="#" class="nav-item logout" @click.prevent="logout">
          <span>Se déconnecter</span>
        </a>
      </template>
      <!--non connecté seulement -->
      <template v-else>
        <router-link to="/login" class="nav-item">
          <span>Se connecter</span>
        </router-link>
        <router-link to="/register" class="nav-item">
          <span>S'inscrire</span>
        </router-link>
      </template>
    </nav>
  </div>
</template>

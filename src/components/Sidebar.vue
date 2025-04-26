<script setup>
import useSidebar from '../assets/scripts/Sidebar'
import '../assets/css/Sidebar.css'

const { isAuthenticated, teamName, logout, isSidebarOpen, toggleSidebar } = useSidebar()

const closeSidebar = () => {
  if (isSidebarOpen) {
    toggleSidebar();  
  }
}
</script>

<template>
  <div class="sidebar" :class="{ 'open': isSidebarOpen }">
    <div class="sidebar-header">
      <div class="title-container">
        <h1>Métrolympiades</h1>
        <div v-if="isAuthenticated && teamName" class="team-name">
          {{ teamName }}
        </div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" @click="toggleSidebar">
        <span>Classement</span>
      </router-link>

      <template v-if="isAuthenticated">
        <router-link to="/team" class="nav-item" @click="toggleSidebar">
          <span>Mon Équipe</span>
        </router-link>
        <router-link to="/games" class="nav-item" @click="toggleSidebar">
          <span>Mes Matchs</span>
        </router-link>
        <router-link to="/games/create" class="nav-item" @click="toggleSidebar">
          <span>Créer un Match</span>
        </router-link>
        <a href="#" class="nav-item logout" @click.prevent="logout">
          <span>Se déconnecter</span>
        </a>
      </template>

      <template v-else>
        <router-link to="/login" class="nav-item" @click="toggleSidebar">
          <span>Se connecter</span>
        </router-link>
        <router-link to="/register" class="nav-item" @click="toggleSidebar">
          <span>S'inscrire</span>
        </router-link>
      </template>

      <div class="nav-item close-sidebar" @click="closeSidebar">
        <span>Fermer Sidebar</span>
      </div>
    </nav>
  </div>

  <button class="toggle-sidebar-button" @click="toggleSidebar">
    <span v-if="isSidebarOpen">✖</span>
    <span v-else>☰</span>
  </button>
</template>

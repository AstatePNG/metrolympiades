<script setup>
import useSidebar from '../assets/scripts/Sidebar'
import '../assets/css/Sidebar.css'

const { isAuthenticated, teamName, logout, isSidebarOpen, toggleSidebar } = useSidebar()
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
      <button class="toggle-arrow" @click="toggleSidebar">
        <span v-if="isSidebarOpen">&#10094;</span>
        <span class="toggle-sidebar-button" v-else></span>
      </button>
    </div>
    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item">
        <span>Classement</span>
      </router-link>

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

      <template v-else>
        <router-link to="/login" class="nav-item" >
          <span>Se connecter</span>
        </router-link>
        <router-link to="/register" class="nav-item" >
          <span>S'inscrire</span>
        </router-link>
      </template>
    </nav>
  </div>

  <button class="toggle-sidebar-button" @click="toggleSidebar" :class="{ 'hidden': isSidebarOpen }">
    <span style="color: #4ecca3;">&#10095;</span>
  </button>
</template>

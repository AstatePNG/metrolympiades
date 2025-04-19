<script setup>
import useSidebar from './Sidebar.js'
import './Sidebar.css'

const { isAuthenticated, logout, isSidebarOpen, toggleSidebar } = useSidebar()
</script>

<template>
  <div class="sidebar" :class="{ 'open': isSidebarOpen }">
    <div class="sidebar-header">
      <h1>Métrolympiades</h1>
      <button class="burger-menu" @click="toggleSidebar">☰</button>
    </div>
    <nav class="sidebar-nav">
        <!--Accessible par tout le monde -->
      <router-link to="/" class="nav-item" @click="toggleSidebar">
        <span>Classement</span>
      </router-link>
      <!--Si connecté -->
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
      <!--non connecté seulement -->
      <template v-else>
        <router-link to="/login" class="nav-item" @click="toggleSidebar">
          <span>Se connecter</span>
        </router-link>
        <router-link to="/register" class="nav-item" @click="toggleSidebar">
          <span>S'inscrire</span>
        </router-link>
      </template>
    </nav>
  </div>
</template>

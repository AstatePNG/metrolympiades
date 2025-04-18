<template>
  <div class="app-container">
    <Sidebar />
    <div class="content-container">
      <div v-if="notificationStore.show" 
           class="notification" 
           :class="notificationStore.type">
        {{ notificationStore.message }}
        <button class="close-btn" @click="notificationStore.hide">&times;</button>
      </div>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import { notificationStore } from './stores/notification'
import { useAppLogic } from './js/App'

const { isAuthenticated } = useAppLogic(notificationStore)
</script>

<style src="./css/App.css"></style>

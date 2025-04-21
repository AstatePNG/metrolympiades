<script setup>
import Sidebar from './components/Sidebar.vue'
import { notificationStore } from './stores/notification'
import { useAppLogic } from './assets/scripts/main'

const { isAuthenticated } = useAppLogic(notificationStore)
</script>

<template>
  <div>
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
          <RouterView/>
        </main>
      </div>
    </div>
  </div>
</template>

<style src="./assets/css/App.css"></style>


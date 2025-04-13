<script setup>
import { onMounted, provide, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { notificationStore } from './stores/notification'
import Sidebar from './components/Sidebar.vue'

const router = useRouter()
const isAuthenticated = ref(!!localStorage.getItem('token'))

//donner accès à l'authentification aux composants
provide('isAuthenticated', isAuthenticated)

const checkAuth =() => {
  isAuthenticated.value = !!localStorage.getItem('token')
  console.log("App - État d'authentification:", isAuthenticated.value)
}
//a chaque changement de route 
watch(() => router.currentRoute.value, () =>{
  checkAuth()
})

onMounted(() => {
  checkAuth()
  //renvoyer vers le login si non connecté
  const currentRoute = router.currentRoute.value
  if (currentRoute.meta.requiresAuth && !isAuthenticated.value) {
    router.push('/login')
  }
})
</script>

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

<style>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.success {
  background-color: #4caf50;
}

.error {
  background-color: #f44336;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.primary {
  background-color: #4ecca3;
  color: white;
}

.primary:hover {
  background-color: #3aa889;
}

.primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  background-color: #ffebee;
  color: #f44336;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .content-container {
    margin-left: 0;
    padding-top: 80px;
  }
  
  .notification {
    width: 90%;
    right: 5%;
  }
}
</style>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { notificationStore } from './stores/notification'

const router = useRouter()
const isAuthenticated = computed(() => !!localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  notificationStore.showNotification('Vous avez été déconnecté avec succès')
  router.push('/login')
}

onMounted(() => {
  //renvoyer vers le login si non connecté
  const currentRoute = router.currentRoute.value
  if (currentRoute.meta.requiresAuth && !isAuthenticated.value){
    router.push('/login')
  }
})
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Classement</router-link>
      <span v-if="!isAuthenticated">
        <router-link to="/login">Se connecter</router-link>
        <router-link to="/register">S'inscrire</router-link>
      </span>
      <span v-else>
        <router-link to="/team">Mon Équipe</router-link>
        <router-link to="/games">Mes Matchs</router-link>
        <router-link to="/games/create">Créer un Match</router-link>
        <router-link to="/logout" @click.prevent="logout">Se déconnecter</router-link>
      </span>
    </nav>
  </header>
  <div v-if="notificationStore.show" 
       class="notification" 
       :class="notificationStore.type">
    {{ notificationStore.message}}
    <button class="close-btn" @click="notificationStore.hide">&times;</button>
  </div>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

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

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

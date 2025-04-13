<script setup>
import { computed,onMounted } from 'vue'
import {useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = computed(() => !!localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
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

  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
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

import {createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ranking',
      component: () => import('../views/LeaderboardView.vue')
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true}
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {requiresGuest: true }
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/TeamView.vue'),
      meta: { requiresAuth: true}
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/GamesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/games/create',
      name: 'new-game',
      component: () => import('../views/NewGameView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

//protéger les routes si authentification necessaire
router.beforeEach((to,from,next) =>{
    const isAuthenticated = !!localStorage.getItem('token')

    if(to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        return { name: 'login'}
    }
    else next()
    }
)

export default router

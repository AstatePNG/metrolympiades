import axios from 'axios'

//créer le service axios
const api = axios.create({
  baseURL:'http://localhost:3000', //il faudra peut etre changer l'url je n'ai pas tester 
  headers:{
    'Content-Type': 'application/json'
  }
})

//ajouter le bearer token au header de la requête
api.interceptors.request.use(
  (config) =>{
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization =`Bearer ${token}`
    }
    return config
  },
  (error) =>Promise.reject(error)
)

//authentification
export const authService = {
  //inscription
  register: (email, username, password, teamName) => {
    return api.post('/auth/register', { email,username, password, teamName })
  },
  
  //connexion
  login: (email, password) =>{
    return api.post('/auth/login', {email,password })
  }
}

//gesttion des equipes
export const teamService = {
  //info de SON equipe
  getMyTeam: () => {
    return api.get('/teams/me')
  },
  
  //modifier les infos de son equipe
  updateMyTeam: (name, members) => {
    return api.put('/teams/me', { name, members })
  },
  
  //recuperer toutes les équipes
  getAllTeams: () => {
    return api.get('/teams')
  }
}

//gestion des matchs
export const matchService ={
  //créer un match
  createMatch: (team2Id, activityId, startedAt,team1Score, team2Score) => {
    return api.post('/matches', {
      team2Id,
      activityId,
      startedAt,
      team1Score,
      team2Score
    })
  },
  
  //récuperer les matchs d'une équipe
  getMyMatches: () => {
    return api.get('/matches/me')
  },
  
  //supprimer un match
  deleteMatch: (matchId) => {
    return api.delete(`/matches/${matchId}`)
  }
}

//gestions des activités
export const activityService = {
  //ajouté une activité
  createActivity: (name) => {
    return api.post('/activities', { name})
  },
  
  //récupérer toutes les activités
  getActivities: () => {
    return api.get('/activities')
  }
}

//recupérer le classement
export const rankingService = {
  getRanking: () => {
    return api.get('/ranking')
  }
}
export default api
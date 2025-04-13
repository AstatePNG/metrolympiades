import { reactive } from 'vue'

export const notificationStore = reactive({
  message: '',
  type: '', //message d'erreur ou de reussite
  show: false,
  
  showNotification(message, type = 'success') {
    this.message = message
    this.type = type
    this.show = true
    
   //retirer après 5s
    setTimeout(() => {
      this.hide()
    }, 5000)
  },
  
  hide() {
    this.show = false
  }
})

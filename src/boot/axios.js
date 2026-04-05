import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Aquesta és la IP màgica per a l'emulador d'Android
// Si proves al navegador del PC (spa), canvia-ho a http://localhost:3000
const api = axios.create({ 
  // baseURL: 'http://localhost:3000', //postatil
  baseURL: 'http://192.168.0.20:3000', //emulador android
  withCredentials: true
})

export default boot(({ app }) => {
  // Cuando la app arranca, miramos si hay un token guardado
  const token = localStorage.getItem('token')
  
  if (token) {
    // Si hay token, se lo pegamos a Axios
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Aquesta és la IP màgica per a l'emulador d'Android
// Si proves al navegador del PC (spa), canvia-ho a http://localhost:3000
const api = axios.create({ baseURL: 'http://localhost:3000' })

// Si decideixes mantenir les cookies del nuxt-auth-utils, necessites això:
api.defaults.withCredentials = true; 

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
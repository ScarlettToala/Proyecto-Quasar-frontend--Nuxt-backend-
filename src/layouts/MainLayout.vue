<template>
  <q-layout view="lHh Lpr lFf">
    
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat no-caps to="/" class="text-h6 q-mr-sm">
          Mi Catálogo Animal
        </q-btn>

        <q-space />

        <div v-if="isLoggedIn" class="q-gutter-sm">
          <q-btn flat icon="favorite" to="/mis-animales" label="Mis Animales" />
          <q-btn flat icon="add" to="/animal/nuevo" label="Añadir" />
          <q-btn outline icon="logout" @click="cerrarSesion" label="Salir" />
        </div>

        <div v-else class="q-gutter-sm">
          <q-btn flat to="/login" label="Entrar" />
          <q-btn color="secondary" to="/register" label="Registrarse" />
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from 'boot/axios' // <-- ¡AQUÍ ESTÁ LA SOLUCIÓN! Importamos 'api'

const route = useRoute()
const router = useRouter()

// Variable para controlar si mostramos el menú de usuario o el de login
const isLoggedIn = ref(false)

// Función para comprobar el token
const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token // Si hay token es true, si es null es false
}
  
// Comprobamos si hay sesión al cargar el layout
onMounted(() => {
  checkLoginStatus()
})
  
// Vigilamos cada vez que cambias de página para actualizar el Header 
// (por si acabas de hacer login)
watch(() => route.path, () => {
  checkLoginStatus()
})

const cerrarSesion = () => {
  localStorage.removeItem('token')
  
  // Como ya importamos 'api' arriba, esto ahora funcionará perfecto
  delete api.defaults.headers.common['Authorization'] 
  
  checkLoginStatus()
  
  router.push('/login')
}
</script>
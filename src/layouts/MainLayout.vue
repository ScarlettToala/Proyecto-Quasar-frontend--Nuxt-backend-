<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    
    <q-header 
      elevated 
      class="shadow-10 transition-header" 
      :class="isLoggedIn ? 'text-white' : 'bg-white text-dark'"
      :style="isLoggedIn ? 'background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);' : ''"
    >
      <q-toolbar class="q-py-sm q-px-md">
        
        <q-btn flat no-caps to="/" class="q-px-md rounded-borders hover-scale">
          <q-icon name="pets" size="sm" class="q-mr-sm" :class="isLoggedIn ? 'text-green-400' : 'text-green-600'" />
          <div class="text-h6 font-bold tracking-tight">
            Bio<span :class="isLoggedIn ? 'text-green-400' : 'text-green-600'">Pedia</span>
          </div>
        </q-btn>

        <q-space />

        <div v-if="isLoggedIn" class="row items-center q-gutter-x-sm">
          <div class="gt-xs q-gutter-x-sm">
            <q-btn 
              flat 
              no-caps 
              icon="favorite" 
              to="/mis-animales" 
              label="Mis Animales"
              class="rounded-xl hover-blue"
            />
            <q-btn 
              unelevated 
              no-caps 
              icon="add" 
              to="/animal/nuevo" 
              label="Añadir"
              class="rounded-xl bg-gradient-green shadow-2"
            />
          </div>

          <q-separator vertical inset dark class="q-mx-sm gt-xs" />

          <q-btn 
            flat 
            round 
            color="red-4" 
            icon="logout" 
            @click="cerrarSesion"
            class="hover-red"
          >
            <q-tooltip>Cerrar Sesión</q-tooltip>
          </q-btn>
        </div>

        <div v-else class="q-gutter-sm">
          <q-btn 
            flat 
            no-caps 
            to="/login" 
            label="Entrar" 
            class="rounded-xl text-primary"
          />
          <q-btn 
            unelevated 
            no-caps 
            to="/register" 
            label="Registrarse" 
            class="rounded-xl bg-gradient-blue shadow-2"
          />
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <q-footer v-if="isLoggedIn" class="lt-sm bg-white text-primary border-top shadow-up-5">
      <q-tabs active-color="primary" indicator-color="transparent" class="text-grey-7">
        <q-route-tab icon="home" to="/" label="Inicio" />
        <q-route-tab icon="favorite" to="/mis-animales" label="Guardados" />
        <q-route-tab icon="add_circle" to="/animal/nuevo" label="Nuevo" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from 'boot/axios'

const route = useRoute()
const router = useRouter()
const isLoggedIn = ref(false)

const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
}
  
onMounted(() => {
  checkLoginStatus()
})
  
watch(() => route.path, () => {
  checkLoginStatus()
})

const cerrarSesion = () => {
  localStorage.removeItem('token')
  delete api.defaults.headers.common['Authorization'] 
  checkLoginStatus()
  router.push('/login')
}
</script>

<style lang="scss">
// Estilos personalizados para que se vea "Pro"
.font-bold { font-weight: 700; }

.rounded-xl {
  border-radius: 12px;
}

// Degradados iguales a los de tu Nuxt
.bg-gradient-blue {
  background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
  color: white;
}

.bg-gradient-green {
  background: linear-gradient(135deg, #10b981, #059669) !important;
  color: white;
}

// Efectos de Hover
.hover-scale {
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
}

.hover-blue:hover {
  background: rgba(59, 130, 246, 0.1);
}

.hover-red:hover {
  background: rgba(248, 113, 113, 0.1);
}

// Animación de cambio de página
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.border-top {
  border-top: 1px solid rgba(0,0,0,0.1);
}
</style>
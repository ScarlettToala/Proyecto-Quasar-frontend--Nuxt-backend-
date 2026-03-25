<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2" style="width: 400px; max-width: 90vw;">
      
      <q-card-section class="text-center">
        <div class="text-h4 text-weight-bold text-primary q-mb-md">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          
          <q-input
            v-model="state.email"
            type="email"
            label="Email"
            outlined
            color="primary"
            :rules="[val => !!val || 'El email es obligatorio']"
          />

          <q-input
            v-model="state.password"
            type="password"
            label="Password"
            outlined
            color="primary"
            :rules="[val => val.length >= 8 || 'Mínimo 8 caracteres']"
          />

          <div>
            <q-btn 
              type="submit" 
              color="primary" 
              label="Iniciar sesión" 
              class="full-width q-mt-md" 
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-separator inset class="q-my-md" />
      <div class="text-center text-grey-6 q-mb-md">o</div>

      <q-card-section class="q-pt-none">
        <q-btn
          color="dark"
          icon="fa-brands fa-github"
          label="Login con Github"
          class="full-width"
          @click="loginWithGithub"
        />
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
        <div class="q-mt-md">
          <span class="text-grey-8">¿No tienes cuenta? </span>
          <router-link to="/register" class="text-primary text-weight-bold" style="text-decoration: none;">
            Regístrate aquí
          </router-link>
        </div>

        <div class="q-mt-sm">
          <router-link to="/reset-password" class="text-secondary" style="text-decoration: none;">
            ¿Olvidaste tu contraseña?
          </router-link>
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue' // Añadimos onMounted y onUnmounted
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const router = useRouter()
const loading = ref(false)

const state = reactive({
  email: '',
  password: ''
})

// === LOGIN NORMAL CON EMAIL ===
const onSubmit = async () => {
  if (loading.value) return
  loading.value = true

  try {
    const response = await api.post('/auth/token/login', state)
    const token = response.data.token 

    if (token) {
      // 1. Guardamos el token
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      // 2. Notificamos y redirigimos SOLO si hubo token
      $q.notify({ type: 'positive', message: 'Has iniciado sesión correctamente', position: 'top' })
      router.push('/')
    } else {
      // Si el backend no mandó token por algún error raro
      throw new Error('No se recibió el token del servidor')
    }

  } catch (error) {
    // Si usas throw new Error arriba, o si el backend da error 400, cae aquí
    const message = error.response?.data?.statusMessage || error.message || 'Credenciales incorrectas'
    $q.notify({ type: 'negative', message: message, position: 'top' })
  } finally {
    loading.value = false
  }
}

// === LOGIN CON GITHUB ===
const loginWithGithub = () => {
  // Abrimos el popup de GitHub
  window.open('http://localhost:3000/auth/github', 'github_login', 'width=600,height=600')
}

// === EL ESCUCHADOR MÁGICO ===
const handleMessage = (event) => {
  // 1. SEGURIDAD: Solo aceptamos mensajes que vengan de tu backend (puerto 3000)
  if (event.origin !== 'http://localhost:3000') return

  // 2. Extraemos el token que el backend nos acaba de enviar
  const token = event.data.token

  if (token) {
    // 3. Guardamos el token exactamente igual que en el login normal
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    $q.notify({
      type: 'positive',
      message: '¡Login con GitHub exitoso!',
      position: 'top'
    })

    // Redirigimos al inicio
    router.push('/')
  } else if (event.data.error) {
    $q.notify({
      type: 'negative',
      message: 'Error al iniciar sesión con GitHub',
      position: 'top'
    })
  }
}

// Encendemos el escuchador cuando el usuario entra a la pantalla de Login
onMounted(() => {
  window.addEventListener('message', handleMessage)
})

// Lo apagamos si el usuario se va a otra pantalla (para que no consuma memoria)
onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})
</script>
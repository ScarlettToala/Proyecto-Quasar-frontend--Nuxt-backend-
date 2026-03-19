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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios' // Tu axios configurado en Quasar

const $q = useQuasar()
const router = useRouter()

const loading = ref(false)
const state = reactive({
  email: '',
  password: ''
})

const onSubmit = async () => {
  if (loading.value) return
  loading.value = true

  try {
    // Hacemos la llamada al backend de Nuxt (que debe estar en el puerto 3000)
    await api.post('/auth/login', state)

    $q.notify({
      type: 'positive',
      message: 'Has iniciado sesión correctamente',
      position: 'top'
    })

    // Redirigir al usuario al catálogo de animales
    router.push('/animals')

  } catch (error) {
    const message = error.response?.data?.message || 'Credenciales incorrectas'
    $q.notify({
      type: 'negative',
      message: message,
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

const loginWithGithub = () => {
  // Aquí tendrías que abrir el popup hacia la URL de Nuxt
  window.open('http://localhost:3000/auth/github', 'popup', 'width=600,height=600')
}
</script>
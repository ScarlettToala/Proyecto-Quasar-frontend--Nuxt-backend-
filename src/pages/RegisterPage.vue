<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2" style="width: 400px; max-width: 90vw;">
      
      <q-card-section class="text-center">
        <div class="text-h4 text-weight-bold text-primary q-mb-md">Register</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          
          <q-input
            v-model="state.name"
            type="text"
            label="Nombre"
            placeholder="Tu nombre completo"
            outlined
            color="primary"
            :rules="[val => !!val || 'El nombre es obligatorio']"
          />

          <q-input
            v-model="state.email"
            type="email"
            label="Email"
            placeholder="usuario@ejemplo.com"
            outlined
            color="primary"
            :rules="[
              val => !!val || 'El email es obligatorio',
              val => /.+@.+\..+/.test(val) || 'Email inválido'
            ]"
          />

          <q-input
            v-model="state.password"
            type="password"
            label="Password"
            placeholder="Mínimo 8 caracteres"
            outlined
            color="primary"
            :rules="[val => val && val.length >= 8 || 'Mínimo 8 caracteres']"
          />

          <div>
            <q-btn 
              type="submit" 
              color="primary" 
              label="Registrarse" 
              class="full-width q-mt-md" 
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-separator inset class="q-my-md" />

      <q-card-section class="q-pt-none">
        <q-btn
          color="dark"
          icon="fa-brands fa-github"
          label="Registrarse con Github"
          class="full-width"
          @click="registerWithGithub"
        />
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
        <div class="q-mt-md">
          <span class="text-grey-8">¿Ya tienes cuenta? </span>
          <router-link to="/login" class="text-primary text-weight-bold" style="text-decoration: none;">
            Inicia sesión
          </router-link>
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script setup>
// Le damos un nombre compuesto para que ESLint no se queje
defineOptions({ name: 'RegisterPage' })

import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()
const router = useRouter()

const loading = ref(false)
const state = reactive({
  name: '',
  email: '',
  password: ''
})

const onSubmit = async () => {
  if (loading.value) return
  loading.value = true

  try {
    // Petición POST a tu backend Nuxt
    await api.post('/auth/register', state)

    // Notificación de éxito
    $q.notify({
      type: 'positive',
      message: 'Cuenta registrada correctamente',
      position: 'top'
    })

    // Si se registra bien, lo mandamos directo al catálogo de animales
    router.push('/animals')

  } catch (error) {
    // Si falla, mostramos el mensaje de error del backend
    const message = error.response?.data?.message || 'Error inesperado. Contacta con soporte.'
    
    $q.notify({
      type: 'negative',
      message: message,
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

const registerWithGithub = () => {
  // Abre el popup apuntando a la ruta de tu backend en el puerto 3000
  window.open('http://localhost:3000/auth/github', 'popup', 'width=600,height=600')
}
</script>
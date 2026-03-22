<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const isLoading = ref(false)
const errorMessage = ref('')

// Preparamos el formulario reactivo
const form = ref({
  name: '',
  scientific_name: '',
  category: '', 
  seenAt: '',
  notes: '',
  imageUrl: ''
})

const guardarNuevoAnimal = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    // Petición POST con axios
    await api.post('/api/animals', form.value)

    // Notificación bonita de Quasar en lugar de alert()
    $q.notify({
      type: 'positive',
      message: '¡Animal añadido al catálogo!',
      position: 'top'
    })

    // Redirigimos al catálogo
    router.push('/catalogo')

  } catch (error) {
    console.error("Error al guardar:", error)
    // Extraemos el mensaje de error de axios si existe
    errorMessage.value = error.response?.data?.message || "Hubo un error al crear el animal."
    
    $q.notify({
      type: 'negative',
      message: errorMessage.value,
      position: 'top'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <q-page padding class="flex flex-center">
    <q-card style="max-width: 700px; width: 100%;" class="q-pa-md">
      
      <q-card-section>
        <div class="text-h4 text-center text-weight-bold text-grey-9">Añadir Nuevo Animal</div>
      </q-card-section>

      <q-card-section>
        <q-banner v-if="errorMessage" class="bg-red-2 text-red-9 q-mb-md rounded-borders">
          <template v-slot:avatar>
            <q-icon name="error" color="red-9" />
          </template>
          {{ errorMessage }}
        </q-banner>

        <q-form @submit.prevent="guardarNuevoAnimal" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            
            <div class="col-12 col-md-6">
              <q-input v-model="form.name" label="Nombre común *" placeholder="Ej: Zorro Rojo" outlined required />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.scientific_name" label="Nombre científico" placeholder="Ej: Vulpes vulpes" outlined />
            </div>

            <div class="col-12 col-md-6">
              <q-select 
                v-model="form.category" 
                :options="categorias" 
                label="Categoría *" 
                outlined 
                emit-value 
                map-options
                required 
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="form.seenAt" type="datetime-local" label="Fecha de Avistamiento *" outlined required stack-label />
            </div>

            <div class="col-12">
              <q-input v-model="form.imageUrl" type="url" label="URL de la Imagen" placeholder="https://ejemplo.com/foto.jpg" outlined />
            </div>

            <div class="col-12">
              <q-input v-model="form.notes" type="textarea" label="Notas / Descripción" placeholder="¿Dónde lo viste? ¿Cómo era?" outlined rows="4" />
            </div>

          </div>

          <div class="row justify-end q-mt-lg q-gutter-sm">
            <q-btn label="Cancelar" to="/catalogo" color="grey-7" flat />
            <q-btn :loading="isLoading" label="Guardar Animal" type="submit" color="positive" icon="save" />
          </div>
        </q-form>

      </q-card-section>
    </q-card>
  </q-page>
</template>
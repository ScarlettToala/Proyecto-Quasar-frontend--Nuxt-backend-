<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <q-card class="q-pa-md shadow-2">
          
          <q-card-section>
            <h1 class="text-h4 text-center text-weight-bold q-my-none text-grey-9">
              Editar Animal
            </h1>
          </q-card-section>

          <div v-if="isLoadingData" class="text-center q-pa-xl">
            <q-spinner-dots color="primary" size="3em" />
            <div class="text-grey q-mt-md">Cargando datos del animal...</div>
          </div>

          <q-card-section v-else>
            <q-form @submit="actualizarAnimal" class="q-gutter-md">
              
              <div class="row q-col-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-input 
                    v-model="form.name" 
                    label="Nombre común *" 
                    outlined 
                    :rules="[val => !!val || 'Requerido']" 
                  />
                </div>

                <div class="col-12 col-sm-6">
                  <q-input 
                    v-model="form.scientific_name" 
                    label="Nombre científico" 
                    outlined 
                  />
                </div>

                <div class="col-12 col-sm-6">
                  <q-select 
                    v-model="form.category" 
                    :options="categorias" 
                    label="Categoría *" 
                    outlined 
                    emit-value
                    map-options
                    :rules="[val => !!val || 'Requerido']"
                  />
                </div>

                <div class="col-12 col-sm-6">
                  <q-input 
                    v-model="form.seenAt" 
                    type="datetime-local" 
                    label="Fecha de Avistamiento *" 
                    outlined 
                    stack-label
                    :rules="[val => !!val || 'Requerido']"
                  />
                </div>

                <div class="col-12">
                  <q-input 
                    v-model="form.imageUrl" 
                    type="url" 
                    label="URL de la Imagen" 
                    outlined 
                  />
                </div>

                <div class="col-12">
                  <q-input 
                    v-model="form.notes" 
                    type="textarea" 
                    label="Notas / Descripción" 
                    outlined 
                    rows="4"
                  />
                </div>
              </div>

              <div class="row justify-end q-mt-lg q-gutter-sm">
                <q-btn 
                  label="Cancelar" 
                  color="grey-7" 
                  outline 
                  to="/" 
                />
                <q-btn 
                  :label="isUpdating ? 'Actualizando...' : 'Actualizar Animal'" 
                  type="submit" 
                  color="warning" 
                  text-color="black"
                  :loading="isUpdating"
                />
              </div>

            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()

// Extraemos el ID de la URL
const animalId = route.params.id

// Estados de carga
const isLoadingData = ref(true)
const isUpdating = ref(false)

// Opciones para el select (Valor interno vs Etiqueta visible)
const categorias = [
  { label: 'Mamífero', value: 'mammal' },
  { label: 'Ave', value: 'bird' },
  { label: 'Reptil', value: 'reptile' },
  { label: 'Anfibio', value: 'amphibian' },
  { label: 'Marino', value: 'marine' },
  { label: 'Insecto', value: 'insect' }
]

const form = ref({
  name: '',
  scientific_name: '',
  category: 'mammal',
  seenAt: '',
  notes: '',
  imageUrl: ''
})

// Cargar datos iniciales
const cargarAnimal = async () => {
  try {
    const response = await api.get(`/api/animals/${animalId}`)
    const animal = response.data

    // Rellenamos el formulario
    form.value.name = animal.name || ''
    form.value.scientific_name = animal.scientific_name || ''
    form.value.category = animal.category || 'mammal'
    form.value.notes = animal.notes || ''
    form.value.imageUrl = animal.imageUrl || ''

    // Formatear la fecha para el input datetime-local
    if (animal.seenAt) {
      const fecha = new Date(animal.seenAt)
      form.value.seenAt = fecha.toISOString().slice(0, 16)
    }
  } catch (error) {
    console.error("Error al cargar:", error)
    $q.notify({ type: 'negative', message: 'No se pudo cargar el animal' })
  } finally {
    isLoadingData.value = false
  }
}

// Guardar cambios
const actualizarAnimal = async () => {
  isUpdating.value = true
  
  try {
    // Usamos api.put de Axios (incluyendo withCredentials si es necesario)
    await api.put(`/api/animals/${animalId}`, form.value, {
      withCredentials: true 
    })

    $q.notify({ type: 'positive', message: '¡Animal actualizado correctamente!' })
    router.push('/') // Volvemos a la lista principal
    
  } catch (error) {
    console.error("Error al actualizar:", error)
    $q.notify({ 
      type: 'negative', 
      message: error.response?.data?.statusMessage || 'Hubo un error al actualizar el animal' 
    })
  } finally {
    isUpdating.value = false
  }
}

// Ejecutar al montar el componente
onMounted(() => {
  cargarAnimal()
})
</script>
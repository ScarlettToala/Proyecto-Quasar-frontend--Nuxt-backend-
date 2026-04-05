<template>
  <q-page padding>
    <div class="text-h3 text-center text-weight-bold q-mb-xl text-primary">Mis Animales</div>

    <div v-if="pending" class="flex flex-center q-pa-xl">
      <q-spinner-dots color="primary" size="50px" />
    </div>

    <div v-else-if="error" class="text-center text-negative q-pa-xl text-h6">
      Hubo un error al cargar los animales.
    </div>

<div v-else>
      <div v-if="animals?.length" class="row q-col-gutter-lg items-stretch">
        
        <div v-for="animal in animals" :key="animal.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
          
          <div class="column full-height">
            
            <AnimalCard :animal="animal" class="col" />

            <q-btn 
              @click="eliminarAnimal(animal.id)" 
              icon="delete_outline" 
              label="Quitar de mi lista" 
              class="q-mt-md full-width btn-eliminar" 
              flat
              no-caps
            />
          </div>

        </div>

      </div>

      <div v-else class="text-center q-pa-xl text-grey-6 text-h5">
        No tienes animales guardados todavía. 
      </div>
    </div>

    <div class="row justify-center q-mt-xl">
      <q-btn 
        to="/" 
        color="primary" 
        size="lg" 
        icon="pets" 
        label="Ver catálogo general" 
        rounded 
        glossy 
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import AnimalCard from 'components/AnimalCard.vue'

const $q = useQuasar()
const animals = ref([])
const pending = ref(true)
const error = ref(false)

const cargarMisAnimales = async () => {
  pending.value = true
  error.value = false
  try {
    const response = await api.get('/api/animals_saved')
    animals.value = response.data
  } catch (err) {
    console.error("Error al cargar favoritos:", err)
    error.value = true
  } finally {
    pending.value = false
  }
}

const eliminarAnimal = (id) => {
  $q.dialog({
    title: 'Confirmación',
    message: '¿Seguro que quieres quitar este animal de tu lista?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.delete(`/api/animals_saved/${id}`)
      
      $q.notify({
        type: 'positive',
        message: 'Animal quitado de tu lista',
        position: 'top'
      })

      await cargarMisAnimales()

    } catch (err) {
      console.error("Error al eliminar:", err)
      $q.notify({
        type: 'negative',
        message: 'Hubo un problema al eliminar el animal.',
        position: 'top'
      })
    }
  })
}

onMounted(() => {
  cargarMisAnimales()
})
</script>

<style lang="scss" scoped>
/* Estilos para que el botón de eliminar se vea premium */
.btn-eliminar {
  border-radius: 15px; /* Misma curva que la tarjeta para que haya armonía */
  background-color: #fee2e2; /* Un rojo muy clarito de fondo */
  color: #ef4444; /* Texto e icono en rojo fuerte */
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ef4444; /* Al pasar el ratón se vuelve rojo fuerte */
    color: white !important; /* Y el texto blanco */
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
  }
}
</style>
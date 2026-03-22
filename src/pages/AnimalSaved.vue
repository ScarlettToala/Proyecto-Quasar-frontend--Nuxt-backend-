<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import AnimalCard from "@/components/animalCard.vue"

const $q = useQuasar()
const animals = ref([])
const pending = ref(true)
const error = ref(false)

// Función para cargar los animales (simula el useFetch inicial y el refresh)
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
  // Cuadro de diálogo nativo de Quasar (mucho más estético que el confirm del navegador)
  $q.dialog({
    title: 'Confirmación',
    message: '¿Seguro que quieres quitar este animal de tu lista?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    // Si el usuario dice que Sí:
    try {
      await api.delete(`/api/animals_saved/${id}`)
      
      $q.notify({
        type: 'positive',
        message: 'Animal quitado de tu lista',
        position: 'top'
      })

      // Recargamos la lista automáticamente
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

// Ejecutamos la carga al montar la pantalla
onMounted(() => {
  cargarMisAnimales()
})
</script>

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
      <div v-if="animals?.length" class="row q-col-gutter-lg">
        
        <div v-for="animal in animals" :key="animal.id" class="col-12 col-sm-6 col-md-4 col-lg-3 flex column">
          
          <AnimalCard :animal="animal" class="col-grow" />

          <q-btn 
            @click="eliminarAnimal(animal.id)" 
            color="negative" 
            icon="delete" 
            label="Quitar de mi lista" 
            class="q-mt-sm full-width" 
            push
          />
        </div>

      </div>

      <div v-else class="text-center q-pa-xl text-grey-6 text-h5">
        No tienes animales guardados todavía. 
      </div>
    </div>

    <div class="row justify-center q-mt-xl">
      <q-btn 
        to="/catalogo/index" 
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
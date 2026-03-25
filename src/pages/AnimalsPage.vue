<template>
  <q-page padding>
    <h2 class="text-h4 q-mb-lg">Catàleg d'Animals</h2>
    
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-4" v-for="animal in animals" :key="animal.id">
        
        <AnimalCard 
          :animal="animal" 
          @guardar="guardarAnimal" 
        />
        
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

// Importamos la tarjeta. Revisa que la ruta sea correcta según tus carpetas.
import AnimalCard from 'components/AnimalCard.vue' 

const animals = ref([])
const $q = useQuasar()

const carregarAnimals = async () => {
  try {
    const response = await api.get('/api/animals')
    animals.value = response.data
  } catch (error) {
    console.error('Error al carregar animals:', error)
    $q.notify({ type: 'negative', message: 'Error en carregar les dades' })
  }
}

const guardarAnimal = async (animalId) => {
  try {
    await api.post('/api/animals_saved', 
      { animalId: animalId }, 
      { withCredentials: true } 
    )
    $q.notify({ type: 'positive', message: 'Animal guardado 🐾' })
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Error al guardar el animal' })
  }
}

onMounted(() => {
  carregarAnimals()
})
</script>
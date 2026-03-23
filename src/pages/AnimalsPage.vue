<template>
  <q-page padding>
    <h2 class="text-h4">Catàleg d'Animals</h2>
    
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4" v-for="animal in animals" :key="animal.id">
        <q-card>
          <img :src="animal.imageUrl || 'https://via.placeholder.com/150'" style="height: 200px; object-fit: cover;">
          <q-card-section>
            <div class="text-h6">{{ animal.name }}</div>
            <div class="text-subtitle2">{{ animal.scientific_name }}</div>
            <q-badge color="primary">{{ animal.category }}</q-badge>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="secondary" label="Guardar a favorits" @click="guardarAnimal(animal.id)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar' // Per fer servir el plugin Notify que et demanen

const animals = ref([])
const $q = useQuasar()

const carregarAnimals = async () => {
  try {
    // Crida al teu backend de Nuxt (animals.get.ts)
    const response = await api.get('/api/animals')
    animals.value = response.data
  } catch (error) {
    console.error('Error al carregar animals:', error)
    $q.notify({ type: 'negative', message: 'Error en carregar les dades' })
  }
}

// En el método donde guardas el animal en Quasar:
const guardarAnimal = async (animalId) => {
  try {
    await api.post('/animals_saved', 
      { animalId: animalId }, 
      { withCredentials: true } // 🔑 ¡ESTA ES LA LLAVE MÁGICA!
    )
    $q.notify({ type: 'positive', message: 'Animal guardado 🐾' })
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  carregarAnimals()
})
</script>
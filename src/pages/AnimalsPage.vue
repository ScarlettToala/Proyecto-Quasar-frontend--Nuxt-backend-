<template>
  <q-page padding>
    <h2 class="text-h4 q-mb-lg text-center text-primary text-weight-bold">Catálogo de Animales</h2>
    
<div class="row justify-center q-mb-xl">
      <q-tabs
        v-model="categoriaSeleccionada"
        dense
        class="text-grey full-width"
        active-color="primary"
        indicator-color="primary"
        align="center"
        narrow-indicator
        outside-arrows
        mobile-arrows
      >
        <q-tab name="Todos" icon="🌍" label="TODOS" />
        <q-tab name="mammal" icon="🐶" label="MAMÍFEROS" />
        <q-tab name="bird" icon="🐦" label="AVES" />
        <q-tab name="reptile" icon="🐍" label="REPTILES" />
        <q-tab name="amphibian" icon="🐸" label="ANFIBIOS" />
        <q-tab name="fish" icon="🐠" label="PECES" />
        <q-tab name="insect" icon="🦋" label="INSECTOS" />
        <q-tab name="mollusk" icon="🐌" label="MOLUSCOS" />
        <q-tab name="arachnid" icon="🕷️" label="ARÁCNIDOS" />
        <q-tab name="crustacean" icon="🦀" label="CRUSTÁCEOS" />
      </q-tabs>
    </div>

    <div class="row q-col-gutter-lg items-stretch">
      <div 
        class="col-12 col-sm-6 col-md-4 col-lg-3" 
        v-for="animal in animalesFiltrados" 
        :key="animal.id"
      >
        <AnimalCard 
          :animal="animal" 
          @guardar="guardarAnimal"
        />
      </div>
      
      <div v-if="animalesFiltrados.length === 0" class="col-12 text-center q-pa-xl text-grey-6 text-h6">
        No hay animales en esta categoría.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import AnimalCard from 'components/AnimalCard.vue'

const $q = useQuasar()
const animals = ref([])

const categoriaSeleccionada = ref('Todos')

const animalesFiltrados = computed(() => {
  if (categoriaSeleccionada.value === 'Todos') {
    return animals.value
  }
  return animals.value.filter(animal => animal.category === categoriaSeleccionada.value)
})

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
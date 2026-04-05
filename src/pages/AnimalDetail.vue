<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios' // Tu instancia de axios configurada

const route = useRoute()
const animalId = route.params.id

// Estados manuales (lo que useFetch hacía automáticamente)
const animal = ref(null)
const pending = ref(true)
const error = ref(false)

const cargarDetalles = async () => {
  try {
    const response = await api.get(`/api/animals/${animalId}`)
    animal.value = response.data
  } catch (err) {
    console.error('Error al cargar el animal:', err)
    error.value = true
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  cargarDetalles()
})
</script>


<template>
  <q-page padding class="flex flex-center">
    
    <div v-if="pending" class="text-center q-pa-xl">
      <q-spinner-tail color="primary" size="4em" />
      <div class="text-h6 q-mt-md text-grey-7">Cargando detalles...</div>
    </div>

    <div v-else-if="error || !animal" class="text-center q-pa-xl">
      <h2 class="text-h4 text-negative">Animal no encontrado</h2>
      <q-btn color="primary" to="/catalogo" label="Volver al catálogo" class="q-mt-md" />
    </div>

    <q-card v-else class="my-card" style="max-width: 720px; width: 100%;">
      <q-img 
        v-if="animal.imageUrl" 
        :src="animal.imageUrl" 
        height="420px" 
        fit="cover" 
      />

      <q-card-section>
        <div class="text-h3 text-weight-bold text-grey-9">{{ animal.name }}</div>
        <div v-if="animal.scientific_name" class="text-subtitle1 text-italic text-grey-6 q-mb-sm">
          {{ animal.scientific_name }}
        </div>
        <q-badge color="accent" class="text-capitalize q-px-sm q-py-xs text-subtitle2">
          {{ animal.category }}
        </q-badge>
      </q-card-section>

      <q-card-section class="q-pt-none text-body1 text-grey-8">
        <p v-if="animal.notes"><strong>Notas:</strong> {{ animal.notes }}</p>
        <p v-if="animal.seenAt">
          <strong>Visto el:</strong> {{ new Date(animal.seenAt).toLocaleDateString() }}
        </p>
      </q-card-section>

      <q-card-actions align="left" class="q-pa-md">
        <q-btn push color="secondary" to="/" icon="arrow_back" label="Volver al catálogo" />
        <q-btn push color="secondary" to="/mis-animales" icon="arrow_back" label="Ir a mi lista de animales" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>
<template>
  <q-card v-if="animal" class="mi-card q-hoverable cursor-pointer shadow-5">
    <div class="q-focus-helper"></div>

    <q-img
      v-if="animal.imageUrl"
      :src="animal.imageUrl"
      :alt="animal.name"
      class="imagen-animal"
      :ratio="16/9"
    >
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
          <q-icon name="hide_image" size="lg" />
        </div>
      </template>
    </q-img>

    <q-card-section>
      <div class="text-h6 text-weight-bold text-blue-grey-9 text-center q-mb-xs">
        {{ animal.name }}
      </div>
      
      <div class="info-texto q-gutter-y-xs">
        <div v-if="animal.scientific_name" class="text-caption italic text-grey-7">
          <strong>Científico:</strong> <i>{{ animal.scientific_name }}</i>
        </div>
        
        <div class="flex items-center q-mt-sm">
          <span class="text-weight-bold q-mr-sm text-caption">Categoría:</span>
          <q-badge rounded class="badge-gradiente">
            {{ animal.category }}
          </q-badge>
        </div>

        <p v-if="animal.notes" class="text-body2 text-grey-8 q-mt-md notas-truncadas">
          <strong>Notas:</strong> {{ animal.notes }}
        </p>
      </div>
    </q-card-section>

    <q-card-actions class="q-pa-md row q-col-gutter-sm">
      <div class="col">
        <q-btn
          flat
          no-caps
          label="👁️ Ver detalle"
          :to="`/animal/${animal.id}`"
          class="full-width btn-detalle rounded-borders"
        />
      </div>
      <div v-if="isLoggedIn" class="col">
        <q-btn
          unelevated
          no-caps
          label="✏️ Editar"
          :to="`/animal/editar/${animal.id}`"
          class="full-width btn-editar text-weight-bold"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps(['animal'])

// En Quasar usamos el check del localStorage que ya tienes en el layout
const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
})
</script>

<style lang="scss" scoped>
.mi-card {
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: white;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
    
    .imagen-animal {
      transform: scale(1.08);
    }
  }
}

.imagen-animal {
  transition: transform 0.5s ease;
}

.badge-gradiente {
  background: linear-gradient(135deg, #38bdf8, #6366f1) !important;
  padding: 4px 12px;
  text-transform: capitalize;
}

.notas-truncadas {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

/* Estilos de botones */
.btn-detalle {
  background: #f1f5f9;
  color: #1e293b;
  &:hover {
    background: #e2e8f0;
  }
}

.btn-editar {
  background: linear-gradient(135deg, #facc15, #f59e0b) !important;
  color: #1e293b;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2);
}
</style>
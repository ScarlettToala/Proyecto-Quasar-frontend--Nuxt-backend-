
<script setup>
defineProps({
  listId:{
    required:true,
    type:String
  }
})
</script>

<template>
  <q-page class="flex flex-center">
    listId{{listId}}
    <ul>
      <li>Element 1</li>
      <li>Element 2</li>
      <li>Element 3</li>
    </ul>
  </q-page>
</template>

// router/routes.js
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // 1. Catálogo principal
      { path: '/', component: () => import('pages/AnimalsPage.vue') },

      // 2. Gestión de Animales
      // Fíjate en el orden: primero las rutas fijas, luego las dinámicas (:id)
      { path: 'animal/nuevo', component: () => import('pages/NewAnimal.vue') },
      
      // Editar un animal
      { path: 'animal/editar/:id', component: () => import('pages/EditAnimal.vue') },
      
      { path: 'animal/:id', component: () => import('pages/AnimalDetail.vue') },
      { path: 'mis-animales', component: () => import('pages/AnimalSaved.vue') },

      // 3. Autenticación
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },

      // 4. Tus otras rutas
      { path: 'llistat', component: () => import('pages/LlistatPage.vue') },
      { path: ':listId/llistat', props: true, component: () => import('pages/LlistatPage.vue') }
    ],
  },

  // Catch-all
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
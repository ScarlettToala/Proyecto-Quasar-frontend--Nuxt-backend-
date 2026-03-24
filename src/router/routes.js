const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // 1. Catálogo principal (es lo primero que carga al entrar a '/')
      { path: '/', component: () => import('pages/AnimalsPage.vue') },

      // 2. Gestión de Animales (Nuevas rutas)
      // IMPORTANTE: 'nuevo' debe ir antes de ':id'
      { path: 'animal/nuevo', component: () => import('pages/NewAnimal.vue') },
      { path: 'animal/:id', component: () => import('pages/AnimalDetail.vue') },
      { path: 'mis-animales', component: () => import('pages/AnimalSaved.vue') },

      // 3. Autenticación
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },

      // 4. Tus otras rutas que ya tenías
      { path: 'llistat', component: () => import('pages/LlistatPage.vue') },
      { path: ':listId/llistat', props: true, component: () => import('pages/LlistatPage.vue') }
    ],
  },

  // Catch-all para errores 404 (Siempre al final)
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
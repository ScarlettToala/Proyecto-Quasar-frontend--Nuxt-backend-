const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'llistat', component: () => import('pages/LlistatPage.vue') },
      { path: ':listId/llistat', props: true, component: () => import('pages/LlistatPage.vue') },
      { path: 'animals', component: () => import('pages/AnimalsPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') }
      // { path: 'animals_saved', component: () => import('pages/AnimalsPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },



]

export default routes

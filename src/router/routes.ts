import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/NormalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/HomePage.vue') },
      { path: '/trip', component: () => import('pages/TripPage.vue') },
      {
        path: '/dogs',
        component: () => import('pages/DogPage.vue'),
        children: [
          { path: 'tutoradd', component: () => import('pages/DogsAdicionarTutor_walker.vue') },
          { path: '/dog', component: () => import('pages/DogsInfoDog.vue') },
          { path: 'dogadd', component: () => import('pages/DogsAdicionar_tutor.vue') },
          { path: '/tutorinfo', component: () => import('pages/DogsInfoTutor_walker.vue') },
        ],
      },
      { path: '/settings', component: () => import('pages/SettingsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

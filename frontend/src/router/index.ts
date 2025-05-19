// frontend\src\router\index.ts

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    // meta: { requiresAuth: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})


// function isLoggedIn(): boolean {
//   return !!localStorage.getItem('token')
// }

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isLoggedIn()) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

// export { router }

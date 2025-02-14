import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/PartOne.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'partOne',
      component: HomeView,
    },
    {
      path: '/part2',
      name: 'partTwo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PartTwo.vue'),
    },
    {
      path: '/part3',
      name: 'partThree',
      component: () => import('../views/PartThree.vue'),
    },
    {
      path: '/solarSystem',
      name: 'solarSystem',
      component: () => import('../views/SolarSystem.vue'),
    },
    {
      path: '/documentationTesting',
      name: 'documentationTesting',
      component: () => import('../views/DocumentationTesting.vue'),
    },
  ],
})

export default router

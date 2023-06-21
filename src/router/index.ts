import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: 'home', icon: 'home' },
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/geometry',
        name: 'geometry',
        meta: { title: 'geometry', icon: 'form' },
        component: () => import('@/views/geometry/index.vue'),
      },
      {
        path: '/camera',
        name: 'camera',
        meta: { title: 'camera', icon: 'form' },
        component: () => import('@/views/camera/index.vue'),
      },
      {
        path: '/light',
        name: 'light',
        meta: { title: 'light', icon: 'form' },
        component: () => import('@/views/light/index.vue'),
      },
      {
        path: '/helper',
        name: 'helper',
        meta: { title: 'helper', icon: 'form' },
        component: () => import('@/views/helper/index.vue'),
      },
      {
        path: '/gui',
        name: 'gui',
        meta: { title: 'gui', icon: 'form' },
        component: () => import('@/views/gui/index.vue'),
      },
      {
        path: '/group',
        name: 'group',
        meta: { title: 'group', icon: 'form' },
        component: () => import('@/views/group/index.vue'),
      },
      {
        path: '/buffer',
        name: 'buffer',
        meta: { title: 'buffer', icon: 'form' },
        component: () => import('@/views/buffer/index.vue'),
      },
      {
        path: '/loader',
        name: 'loader',
        meta: { title: 'loader', icon: 'form' },
        component: () => import('@/views/loader/index.vue'),
      },
      {
        path: '/demo',
        name: 'demo',
        meta: { title: 'demo', icon: 'form' },
        component: () => import('@/views/demo/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

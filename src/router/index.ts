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
        meta: { title: '首页', icon: 'home' },
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/geometry',
        name: 'geometry',
        meta: { title: '几何体', icon: 'form' },
        component: () => import('@/views/geometry/index.vue'),
      },
      {
        path: '/camera',
        name: 'camera',
        meta: { title: '相机', icon: 'form' },
        component: () => import('@/views/camera/index.vue'),
      },
      {
        path: '/light',
        name: 'light',
        meta: { title: '灯光', icon: 'form' },
        component: () => import('@/views/light/index.vue'),
      },
      {
        path: '/helper',
        name: 'helper',
        meta: { title: '辅助线', icon: 'form' },
        component: () => import('@/views/helper/index.vue'),
      },
      {
        path: '/gui',
        name: 'gui',
        meta: { title: 'Gui', icon: 'form' },
        component: () => import('@/views/gui/index.vue'),
      },
      {
        path: '/group',
        name: 'group',
        meta: { title: '组', icon: 'form' },
        component: () => import('@/views/group/index.vue'),
      },
      {
        path: '/buffer',
        name: 'buffer',
        meta: { title: '缓冲器', icon: 'form' },
        component: () => import('@/views/buffer/index.vue'),
      },
      {
        path: '/loader',
        name: 'loader',
        meta: { title: '加载器', icon: 'form' },
        component: () => import('@/views/loader/index.vue'),
      },
      {
        path: '/demo',
        name: 'demo',
        meta: { title: '案例', icon: 'form' },
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

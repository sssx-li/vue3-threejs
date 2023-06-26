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
        path: '/base',
        name: 'base',
        meta: { title: '基础', icon: 'home' },
        redirect: '/base/lineCharacter',
        children: [
          {
            path: '/base/lineCharacter',
            name: 'lineCharacter',
            meta: { title: '线条-文字', icon: 'form' },
            component: () => import('@/views/lineCharacter/index.vue'),
          },
          {
            path: '/base/curve',
            name: 'curve',
            meta: { title: '曲线', icon: 'form' },
            component: () => import('@/views/curve/index.vue'),
          },
          {
            path: '/base/geometry',
            name: 'geometry',
            meta: { title: '几何体', icon: 'form' },
            component: () => import('@/views/geometry/index.vue'),
          },
          {
            path: '/base/objects',
            name: 'objects',
            meta: { title: '物体', icon: 'form' },
            component: () => import('@/views/objects/index.vue'),
          },
          {
            path: '/base/camera',
            name: 'camera',
            meta: { title: '相机', icon: 'form' },
            component: () => import('@/views/camera/index.vue'),
          },
          {
            path: '/base/light',
            name: 'light',
            meta: { title: '灯光', icon: 'form' },
            component: () => import('@/views/light/index.vue'),
          },
        ],
      },
      {
        path: '/senior',
        name: 'senior',
        meta: { title: '高级', icon: 'form' },
        children: [
          {
            path: '/senior/controls',
            name: 'controls',
            meta: { title: '控制器', icon: 'form' },
            component: () => import('@/views/controls/index.vue'),
          },
          {
            path: '/senior/loader',
            name: 'loader',
            meta: { title: '加载器', icon: 'form' },
            component: () => import('@/views/loader/index.vue'),
          },
          {
            path: '/senior/material',
            name: 'material',
            meta: { title: '材质', icon: 'form' },
            component: () => import('@/views/material/index.vue'),
          },
          {
            path: '/senior/shadow',
            name: 'shadow',
            meta: { title: '阴影', icon: 'form' },
            component: () => import('@/views/shadow/index.vue'),
          },
          {
            path: '/senior/texture',
            name: 'texture',
            meta: { title: '纹理贴图', icon: 'form' },
            component: () => import('@/views/texture/index.vue'),
          },
        ],
      },
      {
        path: '/advanced',
        name: 'advanced',
        meta: { title: '进阶', icon: 'form' },
        children: [
          {
            path: '/advanced/manager',
            name: 'manager',
            meta: { title: '管理器', icon: 'form' },
            component: () => import('@/views/manager/index.vue'),
          },
          {
            path: '/advanced/animation',
            name: 'animation',
            meta: { title: '动画', icon: 'form' },
            component: () => import('@/views/animation/index.vue'),
          },
          {
            path: '/advanced/frameTrack',
            name: 'frameTrack',
            meta: { title: '轨道', icon: 'form' },
            component: () => import('@/views/frameTrack/index.vue'),
          },
          {
            path: '/advanced/audio',
            name: 'audio',
            meta: { title: '音频', icon: 'form' },
            component: () => import('@/views/audio/index.vue'),
          },
        ],
      },
      {
        path: '/helper',
        name: 'helper',
        meta: { title: '辅助', icon: 'form' },
        children: [
          {
            path: '/helper/helperObject',
            name: 'helperObject',
            meta: { title: '辅助对象', icon: 'form' },
            component: () => import('@/views/helperObject/index.vue'),
          },
          {
            path: '/helper/gui',
            name: 'gui',
            meta: { title: 'Gui', icon: 'form' },
            component: () => import('@/views/gui/index.vue'),
          },
        ],
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

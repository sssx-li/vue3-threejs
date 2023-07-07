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
        redirect: '/base/line',
        children: [
          {
            path: '/base/line',
            name: 'line',
            meta: { title: '线条', icon: 'form' },
            component: () => import('@/views/base/line/index.vue'),
          },
          {
            path: '/base/curve',
            name: 'curve',
            meta: { title: '曲线', icon: 'form' },
            component: () => import('@/views/base/curve/index.vue'),
          },
          {
            path: '/base/geometry',
            name: 'geometry',
            meta: { title: '几何体', icon: 'form' },
            redirect: '/base/geometry/first',
            children: [
              {
                path: '/base/geometry/first',
                name: 'geometryFirst',
                meta: { title: '几何体1' },
                component: () => import('@/views/base/geometry/index.vue'),
              },
              {
                path: '/base/geometry/secound',
                name: 'geometrySecound',
                meta: { title: '几何体2' },
                component: () => import('@/views/base/geometry/secound.vue'),
              },
              {
                path: '/base/geometry/buffer',
                name: 'geometryBuffer',
                meta: { title: 'bufferGeometry' },
                component: () => import('@/views/base/geometry/buffer.vue'),
              },
            ],
          },
          {
            path: '/base/objects',
            name: 'objects',
            meta: { title: '物体', icon: 'form' },
            component: () => import('@/views/base/objects/index.vue'),
          },
          {
            path: '/base/camera',
            name: 'camera',
            meta: { title: '相机', icon: 'form' },
            component: () => import('@/views/base/camera/index.vue'),
          },
          {
            path: '/base/light',
            name: 'light',
            meta: { title: '灯光', icon: 'form' },
            component: () => import('@/views/base/light/index.vue'),
          },
          {
            path: '/senior/material',
            name: 'material',
            meta: { title: '材质', icon: 'form' },
            component: () => import('@/views/base/material/index.vue'),
          },
          {
            path: '/senior/shadow',
            name: 'shadow',
            meta: { title: '阴影', icon: 'form' },
            component: () => import('@/views/base/shadow/index.vue'),
          },
        ],
      },
      {
        path: '/senior',
        name: 'senior',
        meta: { title: '高级', icon: 'form' },
        children: [
          {
            path: '/senior/loader',
            name: 'loader',
            meta: { title: '加载器', icon: 'form' },
            component: () => import('@/views/senior/loader/index.vue'),
          },
          {
            path: '/senior/manager',
            name: 'manager',
            meta: { title: '管理器', icon: 'form' },
            component: () => import('@/views/senior/manager/index.vue'),
          },
          {
            path: '/senior/texture',
            name: 'texture',
            meta: { title: '纹理贴图', icon: 'form' },
            component: () => import('@/views/senior/texture/index.vue'),
          },
        ],
      },
      {
        path: '/advanced',
        name: 'advanced',
        meta: { title: '进阶', icon: 'form' },
        children: [
          {
            path: '/advanced/text',
            name: 'text',
            meta: { title: '文字', icon: 'form' },
            component: () => import('@/views/advanced/text/index.vue'),
          },
          {
            path: '/advanced/animation',
            name: 'animation',
            meta: { title: '动画', icon: 'form' },
            component: () => import('@/views/advanced/animation/index.vue'),
          },
          {
            path: '/advanced/frameTrack',
            name: 'frameTrack',
            meta: { title: '轨道', icon: 'form' },
            component: () => import('@/views/advanced/frameTrack/index.vue'),
          },
          {
            path: '/advanced/audio',
            name: 'audio',
            meta: { title: '音频', icon: 'form' },
            component: () => import('@/views/advanced/audio/index.vue'),
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
            component: () => import('@/views/helper/helperObject/index.vue'),
          },
          {
            path: '/helper/gui',
            name: 'gui',
            meta: { title: 'Gui', icon: 'form' },
            component: () => import('@/views/helper/gui/index.vue'),
          },
        ],
      },
      {
        path: '/demo',
        name: 'demo',
        meta: { title: '案例', icon: 'form' },
        redirect: '/demo/earth',
        children: [
          {
            path: '/demo/earth',
            name: 'demoEarth',
            meta: { title: '地球' },
            component: () => import('@/views/demo/1-earth.vue'),
          },
          {
            path: '/demo/snow',
            name: 'demoSnow',
            meta: { title: '雪花' },
            component: () => import('@/views/demo/2-snow.vue'),
          },
        ],
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

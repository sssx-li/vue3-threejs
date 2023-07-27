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
          {
            path: '/senior/raycaster',
            name: 'raycaster',
            meta: { title: '射线', icon: 'form' },
            component: () => import('@/views/base/raycaster/index.vue'),
          },
          {
            path: '/base/loader',
            name: 'loader',
            meta: { title: '加载器', icon: 'form' },
            component: () => import('@/views/base/loader/index.vue'),
          },
        ],
      },
      {
        path: '/advanced',
        name: 'advanced',
        meta: { title: '进阶', icon: 'form' },
        children: [
          {
            path: '/advanced/physics',
            name: 'physics',
            meta: { title: '物理引擎', icon: 'form' },
            component: () => import('@/views/advanced/physics/index.vue'),
          },
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
            path: '/advanced/collision',
            name: 'collision',
            meta: { title: '碰撞检测', icon: 'form' },
            redirect: '/advanced/collision/raycaster',
            children: [
              {
                path: '/advanced/collision/raycaster',
                name: 'raycaster',
                meta: { title: '碰撞检测-射线', icon: 'form' },
                component: () => import('@/views/advanced/collision/index.vue'),
              },
              {
                path: '/advanced/collision/bounding',
                name: 'bounding',
                meta: { title: '碰撞检测-包围盒', icon: 'form' },
                component: () =>
                  import('@/views/advanced/collision/bounding.vue'),
              },
            ],
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
            path: '/demo/earthSunMoon',
            name: 'demoEarthSunMoon',
            meta: { title: '地月日' },
            component: () => import('@/views/demo/1.1-earth-sun-moon.vue'),
          },
          {
            path: '/demo/snow',
            name: 'demoSnow',
            meta: { title: '雪花' },
            component: () => import('@/views/demo/2-snow.vue'),
          },
          {
            path: '/demo/shoe',
            name: 'demoShoe',
            meta: { title: '鞋' },
            component: () => import('@/views/demo/3-shoe.vue'),
          },
          {
            path: '/demo/skyBox',
            name: 'demoSkyBox',
            meta: { title: '包围盒-立方纹理' },
            component: () => import('@/views/demo/4-skyBox.vue'),
          },
          {
            path: '/demo/house',
            name: 'demoHouse',
            meta: { title: '房子' },
            component: () => import('@/views/demo/5-house.vue'),
          },
          {
            path: '/demo/naruto',
            name: 'demoNaruto',
            meta: { title: '鸣人' },
            component: () => import('@/views/demo/6-naruto.vue'),
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

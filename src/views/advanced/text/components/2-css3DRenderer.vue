<template>
  <el-card class="mr-14px mb-14px relative">
    <template #header> 2.文字-CSS3DRenderer </template>
    <div id="advanced-css3DRenderer"></div>
  </el-card>
</template>

<script setup lang="ts">
import {
  CSS3DRenderer,
  CSS3DObject,
} from 'three/examples/jsm/renderers/CSS3DRenderer';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

defineOptions({
  name: 'advanced-css3DRenderer',
  inheritAttrs: false,
});

const width = 400;
const height = 400;

const scene = new THREE.Scene();

const renderer = new CSS3DRenderer();
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(5, 5, 5);

new OrbitControls(camera, renderer.domElement);

function addTextObj() {
  const element = document.createElement('span');
  element.innerHTML = 'Hello CSS3D';
  const obj = new CSS3DObject(element);
  obj.position.set(0, 0, 0);
  obj.rotateY(Math.PI / 4);
  obj.rotateX(-Math.PI / 10);
  obj.scale.setScalar(0.05);
  scene.add(obj);
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

onMounted(() => {
  addTextObj();
  render();
  document
    .getElementById('advanced-css3DRenderer')
    ?.appendChild(renderer.domElement);
});
</script>

<style lang="scss" scoped></style>

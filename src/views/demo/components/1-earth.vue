<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.旋转的地球 </template>
    <div id="demo-earth"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { Mesh } from 'three';

defineOptions({
  name: 'demo-earth',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('demo-earth', {
  config: {
    width,
    height,
    cameraType: 'PerspectiveCamera',
    renderOptions: {
      antialias: true,
    },
  },
  cameraOptions: {
    fov: 75,
    aspect: width / height,
    near: 0.1,
    far: 10000,
  },
  cameraPosition: { x: 150, y: 150, z: 150 },
  renderFn: initRender,
});

let earth;
function initGeometry() {
  const geometry = new THREE.SphereGeometry(80, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('/src/assets/imgs/earth.jpg'),
  });
  earth = new Mesh(geometry, material);
  threeState.scene?.add(earth);
}
function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(150, 150, 150);
  threeState.scene?.add(point);
  // 环境光
  const directional = new THREE.DirectionalLight(0x444444);
  directional.target = earth!;
  threeState.scene?.add(directional);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  // 旋转
  earth!.rotation.y += 0.002;
  requestAnimationFrame(render);
}

function initRender() {
  initGeometry();
  addLight();
  render();
}
</script>

<style lang="scss" scoped></style>

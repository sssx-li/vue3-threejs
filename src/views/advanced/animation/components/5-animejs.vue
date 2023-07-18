<template>
  <el-card class="mr-14px mb-14px">
    <template #header>
      5.Animejs <el-button id="translate-btn">点我平移</el-button>
      <el-button id="translate-reset-btn">复位</el-button>
    </template>
    <div id="advance-animejs"></div>
  </el-card>
</template>

<script setup lang="ts">
import anime from 'animejs';
import { createLight, useThree } from '@/hooks';

defineOptions({
  name: 'advance-animejs',
  inheritAttrs: false,
});
const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advance-animejs', {
  config: {
    width,
    height,
    cameraType: 'PerspectiveCamera',
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 5,
    },
    renderOptions: {
      antialias: true,
    },
  },
  cameraOptions: {
    fov: 75,
    aspect: width / height,
    near: 0.1,
    far: 100,
  },
  cameraPosition: { x: 5, y: 5, z: 5 },
});

let mesh;
function addGeometry() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
  mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);
}

function addLight() {
  // 环境光
  const hemisphere = new THREE.HemisphereLight();
  hemisphere.intensity = 0.3;
  threeState.scene?.add(hemisphere);

  // 平行光
  const dirLight = createLight('DirectionalLight', {
    position: { x: 5, y: 5, z: -5 },
  });
  threeState.scene?.add(dirLight!.lightInstance!);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}
onMounted(() => {
  addGeometry();
  addLight();
  render();
  document.getElementById('translate-btn')!.addEventListener('click', () => {
    anime({
      targets: mesh!.position,
      duration: 3000,
      x: 3,
    });
  });
  document
    .getElementById('translate-reset-btn')!
    .addEventListener('click', () => {
      anime({
        targets: mesh!.position,
        duration: 3000,
        x: 0,
      });
    });
});
</script>

<style lang="scss" scoped></style>

<template>
  <el-card class="mr-14px mb-14px">
    <template #header>
      6.Animejs-easeOutCubic
      <el-button id="camera-btn">点我拉近视角</el-button>
      <el-button id="camera-reset-btn">复位</el-button>
    </template>
    <div id="advance-animejs-easeOutCubic"></div>
  </el-card>
</template>

<script setup lang="ts">
import anime from 'animejs';
import { createLight, useThree } from '@/hooks';

defineOptions({
  name: 'advance-animejs-easeOutCubic',
  inheritAttrs: false,
});

const easeBtnRef = ref<HTMLElement>();

const width = 400;
const height = 400;
const { threeState, THREE, helperState } = useThree(
  'advance-animejs-easeOutCubic',
  {
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
  }
);

function addGeometry() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
  const mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);
}

let dirLight: Record<string, any> = {};
function addLight() {
  // 环境光
  const hemisphere = new THREE.HemisphereLight();
  hemisphere.intensity = 0.3;
  threeState.scene?.add(hemisphere);

  // 平行光
  dirLight = createLight('DirectionalLight', {
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
  document.getElementById('camera-btn')!.addEventListener('click', () => {
    anime({
      targets: threeState.camera!.position,
      duration: 2000,
      x: 0,
      y: 1.5,
      z: 1.5,
      easing: 'easeOutCubic',
      update: () => {
        helperState.controlInstance?.update();
      },
    });
  });
  document.getElementById('camera-reset-btn')!.addEventListener('click', () => {
    anime({
      targets: threeState.camera!.position,
      duration: 2000,
      x: 5,
      y: 5,
      z: 5,
      easing: 'easeOutCubic',
      update: () => {
        helperState.controlInstance?.update();
      },
    });
  });
});
</script>

<style lang="scss" scoped></style>

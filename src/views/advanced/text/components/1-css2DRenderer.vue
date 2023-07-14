<template>
  <el-card class="mr-14px mb-14px relative">
    <template #header> 1.文字-CSS2DRenderer </template>
    <div id="advanced-css2DRenderer"></div>
  </el-card>
</template>

<script setup lang="ts">
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer';
import { createLight, useThree } from '@/hooks';

defineOptions({
  name: 'advanced-css2DRenderer',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advanced-css2DRenderer', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    cameraType: 'PerspectiveCamera',
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

function addText() {
  // const geometry = new THREE.SphereGeometry(1);
  // const material = new THREE.MeshLambertMaterial({
  //   color: 0x0000ff,
  // });
  // const spherre = new THREE.Mesh(geometry, material);
  // threeState.scene?.add(spherre);

  const textDiv = document.createElement('div');
  textDiv.style.color = '#f60';
  textDiv.className = 'text-div';
  textDiv.innerHTML = 'Hello CSS2D';
  const text = new CSS2DObject(textDiv);
  text.position.set(0, 0, 0);
  threeState.scene?.add(text);
  // 与几何体绑定
  // text.position.set(
  //   spherre.position.x,
  //   spherre.position.y + 1.5,
  //   spherre.position.z
  // );
  // spherre.add(text);
  // 实例化CSS2D渲染器
  const textRenderer = new CSS2DRenderer();
  textRenderer.setSize(width, height);
  textRenderer.domElement.style.position = 'absolute';
  textRenderer.domElement.style.pointerEvents = 'none';
  textRenderer.domElement.style.zIndex = '1';
  textRenderer.domElement.style.top = '80px';
  textRenderer.domElement.style.left = '20px';
  document
    .getElementById('advanced-css2DRenderer')
    ?.appendChild(textRenderer.domElement);
  textRenderer.render(threeState.scene!, threeState.camera!);
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
  // threeState.scene?.add(dirLight.lightHelper!);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

onMounted(() => {
  addText();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

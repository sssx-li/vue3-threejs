<template>
  <div id="demo-earth"></div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { Mesh } from 'three';

defineOptions({
  name: 'demo-earth',
  inheritAttrs: false,
});

const width = window.innerWidth - 290;
const height = window.innerHeight - 100;
const { threeState, THREE, stats } = useThree('demo-earth', {
  config: {
    width,
    height,
    cameraType: 'PerspectiveCamera',
    enableStats: true,
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
});
let earth;
function addEarth() {
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
  stats.value?.update();
  requestAnimationFrame(render);
}

onMounted(() => {
  addEarth();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

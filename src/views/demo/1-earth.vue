<template>
  <div id="demo-earth"></div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'demo-earth',
  inheritAttrs: false,
});

let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
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
    far: 1000,
  },
  cameraPosition: { x: 5, y: 5, z: 5 },
});
let earth;
function addEarth() {
  const geometry = new THREE.SphereGeometry(2, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('/src/assets/imgs/demo/earth.jpg'),
  });
  earth = new THREE.Mesh(geometry, material);
  threeState.scene?.add(earth);
}

function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(5, 5, 5);
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

const resize = () => {
  width = window.innerWidth - 290;
  height = window.innerHeight - 100;
  threeState.camera!.aspect = width / height;
  threeState.camera!.updateProjectionMatrix();
  threeState.renderer.setSize(width, height);
};

onMounted(() => {
  addEarth();
  addLight();
  render();
  stats.value!.dom.style.left = '250px';
  stats.value!.dom.style.top = '60px';
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped></style>

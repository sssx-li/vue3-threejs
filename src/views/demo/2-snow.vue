<template>
  <div id="demo-snow"></div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'demo-snow',
  inheritAttrs: false,
});

let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
const { threeState, THREE, stats, helperState } = useThree('demo-snow', {
  config: {
    width,
    height,
    enableStats: true,
    cameraType: 'PerspectiveCamera',
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
  cameraPosition: { x: 3.5, y: 2.5, z: 2 },
});
threeState.scene!.background = new THREE.Color(0x111111);
const group = new THREE.Group();
function addSnow() {
  const texture = new THREE.TextureLoader().load('/src/assets/imgs/snow.png');
  const material = new THREE.SpriteMaterial({
    map: texture,
  });
  for (let i = 0; i < 500; i++) {
    const snow = new THREE.Sprite(material);
    snow.scale.set(0.25, 0.25, 1);
    snow.position.set(
      Math.random() * 10 - 5,
      Math.random() * 10,
      Math.random() * 10 - 5
    );
    group.add(snow);
  }
  threeState.scene?.add(group);
}

// 雪花下落动画
function downLoop() {
  group.children.forEach((snow) => {
    snow.position.y -= 0.01;
    // 掉到地面时，重新掉落
    if (snow.position.y < -5) {
      snow.position.y = 5;
    }
  });
  requestAnimationFrame(downLoop);
}

function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(5, 5, 5);
  threeState.scene?.add(point);
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
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
  addSnow();
  downLoop();
  addLight();
  render();
  stats.value!.dom.style.left = '250px';
  stats.value!.dom.style.top = '60px';
  window.addEventListener('resize', resize);
  helperState.controlInstance!.maxDistance = 5; // 离中心物体的最远距离
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped></style>

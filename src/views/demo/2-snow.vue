<template>
  <div id="demo-snow"></div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'demo-snow',
  inheritAttrs: false,
});

const width = window.innerWidth - 290;
const height = window.innerHeight - 100;
const { threeState, THREE, stats } = useThree('demo-snow', {
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
    far: 10000,
  },
  cameraPosition: { x: 100, y: 500, z: 600 },
});
threeState.scene!.background = new THREE.Color(0x111111);
const group = new THREE.Group();
function addSnow() {
  const texture = new THREE.TextureLoader().load('/src/assets/imgs/snow.png');
  const material = new THREE.SpriteMaterial({
    map: texture,
  });
  for (let i = 0; i < 4000; i++) {
    const snow = new THREE.Sprite(material);
    snow.scale.set(10, 10, 1);
    snow.position.set(
      (Math.random() - 0.5) * 1000,
      Math.random() * 1000,
      Math.random() * 1000
    );
    group.add(snow);
  }
  threeState.scene?.add(group);
}

// 雪花下落动画
function downLoop() {
  group.children.forEach((snow) => {
    snow.position.y -= 0.7;
    // 掉到地面时，重新掉落
    if (snow.position.y < 0) {
      snow.position.y = 1000;
    }
  });
  requestAnimationFrame(downLoop);
}

function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(150, 150, 150);
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

onMounted(() => {
  addSnow();
  downLoop();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

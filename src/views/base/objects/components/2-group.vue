<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.组-Group </template>
    <div id="base-group"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-group',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-group', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 200,
    },
    renderOptions: {
      antialias: true,
    },
  },
  cameraOptions: {
    left: -width / 2,
    right: width / 2,
    top: height / 2,
    bottom: -height / 2,
    near: 1,
    far: 1000,
  },
  cameraPosition: { x: 350, y: 350, z: 350 },
});

function addSprites() {
  const material = new THREE.SpriteMaterial({
    // color: 0xff0000,
    map: new THREE.TextureLoader().load('/src/assets/imgs/snow.png'),
  });
  const group = new THREE.Group();
  group.name = '精灵';
  for (let i = 0; i <= 10; i++) {
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(20, 20, 1);
    sprite.position.set(
      Math.random() * 150 + 10,
      Math.random() * 150 + 10,
      Math.random() * 50 + 10
    );
    group.add(sprite);
  }
  threeState.scene?.add(group);
  console.log(group.children);
}

function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(100, 300, 0);
  threeState.scene?.add(point);
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

onMounted(() => {
  addSprites();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.精灵-Sprite </template>
    <div id="base-sprite"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-sprite',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-sprite', {
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

function addSprite() {
  const material = new THREE.SpriteMaterial({
    color: 0xff0000,
  });
  // 精灵是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理。
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(30, 30, 1);
  threeState.scene?.add(sprite);
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
  addSprite();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

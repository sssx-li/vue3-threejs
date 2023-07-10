<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 2.加载obj文件 </template>
    <div id="base-obj"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

defineOptions({
  name: 'baseObj',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-obj', {
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

function addObjModel() {
  const loader = new OBJLoader();
  // 设置资产的基本路径
  loader.path = '/src/assets/models/';
  loader.load('emerald.obj', (emerald) => {
    console.log('emerald', emerald);
    emerald.scale.setScalar(5);
    // 修改材质颜色
    (emerald.children[0] as any).material.color = new THREE.Color(0xff0000);
    threeState.scene?.add(emerald);
  });

  loader.load('tree.obj', (tree) => {
    tree.scale.setScalar(100);
    tree.position.set(100, 0, 0);
    // 修改材质颜色
    threeState.scene?.add(tree);
  });

  loader.load('cup.obj', (cup) => {
    console.log('cup', cup);
    cup.scale.setScalar(30);
    cup.position.set(0, 0, 100);
    cup.traverse((object) => {
      if ((object as any).isMesh && object.name === 'Plane') {
        // object.visible = false; // 地面不可见
        cup.remove(object); // 移除地面
      }
    });
    // 修改材质颜色
    threeState.scene?.add(cup);
  });
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
  addObjModel();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

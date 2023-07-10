<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.加载glb/gltf文件 </template>
    <div id="base-glb"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
defineOptions({
  name: 'baseGlb',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-glb', {
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

function addGlbModel() {
  // GLTFLoader 用于载入glTF 2.0资源的加载器。该类文件以JSON（.gltf）格式或二进制（.glb）格式提供
  const loader = new GLTFLoader();
  // DRACOLoader： 用Draco库压缩的几何图形加载器。(文件过大时可以使用，越大压缩效率越高)
  const dracoLoader = new DRACOLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load('/src/assets/models/glb.glb', (glb) => {
    console.log('glb', glb);
    const mode = glb.scene;
    mode.children.forEach((item: any) => {
      // 圆环节(这里的模型大小过小，对其进行放大及位置修改)
      if (item.isMesh && item.name === 'TorusKnot') {
        item.scale.setScalar(4);
        item.position.set(0, 8, 0);
      }
    });
    mode.scale.setScalar(5);
    threeState.scene?.add(mode);
  });
  loader.load('/src/assets/models/SimpleSkinning.gltf', (gltf) => {
    console.log('gltf', gltf);
    const mode = gltf.scene;
    mode.scale.setScalar(10);
    mode.position.set(100, 50, 0);
    threeState.scene?.add(gltf.scene);
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
  addGlbModel();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

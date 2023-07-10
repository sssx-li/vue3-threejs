<template>
  <div class="shoe-container relative">
    <div id="demo-shoe"></div>
    <el-radio-group v-model="typeModel" class="absolute bottom-10px left-20px">
      <el-radio label="diffuseMidnight" size="large">弥漫午夜</el-radio>
      <el-radio label="diffuseStreet" size="large">漫游街道</el-radio>
      <el-radio label="diffuseBeach" size="large">海滩漫步</el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

defineOptions({
  name: 'demo-shoe',
  inheritAttrs: false,
});
type TModel = 'diffuseBeach' | 'diffuseMidnight' | 'diffuseStreet';
const typeModel = ref<TModel>('diffuseMidnight');
const width = window.innerWidth - 290;
const height = window.innerHeight - 100;
const { threeState, THREE, helperState } = useThree('demo-shoe', {
  config: {
    width,
    height,
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
  cameraPosition: { x: 150, y: 150, z: 150 },
});
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
let model, point;
loader.setDRACOLoader(dracoLoader);
function addShoe() {
  loader.load('/src/assets/models/glTF/MaterialsVariantsShoe.gltf', (gltf) => {
    model = gltf.scene;
    model.scale.setScalar(800);
    threeState.scene?.add(model);
  });
}
function addLight() {
  // 点光源
  point = new THREE.PointLight(0xffffff, 1);
  threeState.scene?.add(point);
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  helperState.controlInstance?.update();
  // 灯光跟随相机
  point!.position.copy(threeState.camera?.position);
  requestAnimationFrame(render);
}

watch(typeModel, (val) => {
  const loader = new THREE.TextureLoader();
  loader.load(`/src/assets/models/glTF/${val}.jpg`, (texture) => {
    model!.children[0].children[0].children[0].material.map = texture;
  });
});

onMounted(() => {
  addShoe();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

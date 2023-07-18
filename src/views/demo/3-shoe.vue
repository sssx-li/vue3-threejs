<template>
  <div class="shoe-container relative">
    <div id="demo-shoe"></div>
    <el-radio-group v-model="typeModel" class="absolute bottom-10px left-20px">
      <el-radio label="diffuseMidnight" size="large">浪漫午夜</el-radio>
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
let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
const { threeState, THREE, helperState, stats } = useThree('demo-shoe', {
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
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
let model: any, point;
loader.setDRACOLoader(dracoLoader);
function addShoe() {
  loader.load('/src/assets/models/glTF/MaterialsVariantsShoe.gltf', (gltf) => {
    model = gltf.scene;
    model.scale.setScalar(30);
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
  if (model) {
    model.rotation.y -= 0.001;
  }
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

const resize = () => {
  width = window.innerWidth - 290;
  height = window.innerHeight - 100;
  threeState.camera!.aspect = width / height;
  threeState.camera!.updateProjectionMatrix();
  threeState.renderer.setSize(width, height);
};

onMounted(() => {
  addShoe();
  addLight();
  render();
  stats.value!.dom.style.left = '250px';
  stats.value!.dom.style.top = '60px';
  window.addEventListener('resize', resize);
  console.log('helperState.controlInstance', helperState.controlInstance);
  helperState.controlInstance!.minDistance = 5;
  helperState.controlInstance!.maxDistance = 20;
});
onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped></style>

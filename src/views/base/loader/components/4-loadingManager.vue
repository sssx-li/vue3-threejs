<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 4.多模型加载管理器 </template>
    <div id="base-loading"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
defineOptions({
  name: 'baseLoading',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-loading', {
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

// 其功能是处理并跟踪已加载和待处理的数据。如果未手动设置加强管理器，则会为加载器创建和使用默认全局实例加载器管理器
let loadingManager = new THREE.LoadingManager();
const loader = new OBJLoader(loadingManager);
loader.path = '/src/assets/models/';
// 其功能是处理并跟踪已加载和待处理的数据;

const files = ['cup', 'emerald', 'tree'];
loadingManager.onStart = (url, loaded, total) => {
  console.log(
    `开始加载模型:${url}, 当前已加载模型:${loaded}, 总模型数:${total}`
  );
};
loadingManager.onProgress = (url, loaded, total) => {
  console.log(`${url}已加载完成,当前已加载模型:${loaded},总模型数:${total}`);
};

loadingManager.onError = (url) => {
  console.log('加载模型时出现错误，错误的模型:' + url);
};
function addObjModel() {
  for (let index = 0; index < files.length; index++) {
    loader.load(`${files[index]}.obj`, (file) => {
      threeState.scene?.add(file);
      if (index === 0) {
        file.scale.setScalar(30);
        file.traverse((object) => {
          if ((object as any).isMesh && object.name === 'Plane') {
            file.remove(object);
          }
        });
      } else if (index === 1) {
        file.scale.setScalar(5);
        file.position.set(100, 0, 0);
      } else {
        file.scale.setScalar(100);
        file.position.set(0, 0, 100);
      }
    });
  }
}

// LoadingManager是一个全局实例, 当其他加载器没有指定加载管理器时，它将被其他大多数的加载器设为默认的加载管理器。
const defaultLoadingManage = THREE.DefaultLoadingManager;
defaultLoadingManage.onStart = (url, loaded, total) => {
  console.log(
    `defaultLoadingManage-开始加载模型:${url}, 当前已加载模型:${loaded}, 总模型数:${total}`
  );
};
defaultLoadingManage.onProgress = (url, loaded, total) => {
  console.log(
    `defaultLoadingManage-${url}已加载完成,当前已加载模型:${loaded},总模型数:${total}`
  );
};

defaultLoadingManage.onError = (url) => {
  console.log('defaultLoadingManage-加载模型时出现错误，错误的模型:' + url);
};

const glbLoader = new GLTFLoader();
glbLoader.path = '/src/assets/models/';
function addGlbModel() {
  glbLoader.load('Parrot.glb', (parrot) => {
    const model = parrot.scene;
    model.scale.setScalar(4);
    model.position.set(50, 100, 50);
    model.rotateY(Math.PI / 4);
    threeState.scene?.add(model);
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
  addGlbModel();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

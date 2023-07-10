<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 3.加载fbx文件 </template>
    <div id="base-fbx"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

defineOptions({
  name: 'baseFbx',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-fbx', {
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

let mixer: any; // 混合器变量
function addObjModel() {
  const loader = new FBXLoader();
  // 设置资产的基本路径
  loader.path = '/src/assets/models/';
  loader.load('fbx.fbx', (rect) => {
    console.log('rect', rect);
    rect.scale.setScalar(0.25);
    threeState.scene?.add(rect);
    // rect作为参数创建一个混合器，解析播放rect及其子对象包含的动画数据
    mixer = new THREE.AnimationMixer(rect);
    // obj.animations[0]：获得剪辑对象clip
    const AnimationAction = mixer.clipAction(rect.animations[0]);
    // AnimationAction.loop = THREE.LoopOnce; //不循环播放
    // AnimationAction.clampWhenFinished = true; //暂停在最后一帧播放的状态
    // 调节播放速度
    AnimationAction.timeScale = 0.5;
    AnimationAction.play(); // 开始播放
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

const clock = new THREE.Clock();
function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
  if (mixer) {
    //clock.getDelta()方法获得两帧的时间间隔
    // 更新混合器相关的时间
    mixer.update(clock.getDelta());
  }
}

onMounted(() => {
  addObjModel();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

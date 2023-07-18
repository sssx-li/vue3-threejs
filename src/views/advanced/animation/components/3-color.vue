<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 3.颜色变化 </template>
    <div id="advance-color"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createLight, useThree } from '@/hooks';

defineOptions({
  name: 'advance-color',
  inheritAttrs: false,
});
const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advance-color', {
  config: {
    width,
    height,
    cameraType: 'PerspectiveCamera',
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 5,
    },
    renderOptions: {
      antialias: true,
    },
  },
  cameraOptions: {
    fov: 75,
    aspect: width / height,
    near: 0.1,
    far: 100,
  },
  cameraPosition: { x: 5, y: 5, z: 5 },
});

let box;
function addGeometry() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
  box = new THREE.Mesh(geometry, material);
  threeState.scene?.add(box);
}

function addLight() {
  // 环境光
  const hemisphere = new THREE.HemisphereLight();
  hemisphere.intensity = 0.3;
  threeState.scene?.add(hemisphere);

  // 平行光
  const dirLight = createLight('DirectionalLight', {
    position: { x: 5, y: 5, z: -5 },
  });
  threeState.scene?.add(dirLight!.lightInstance!);
}

function initAnimation() {
  addClip();
  addAnimation();
}

let clip; // 剪辑
function addClip() {
  /**
   * ColorKeyframeTrack
   * 反应颜色变化的关键帧轨道。
   * 
   ColorKeyframeTrack( name : String, times : Array, values : Array )
      name - (必须) 关键帧轨道(KeyframeTrack)的标识符.
      times - (必须) 关键帧的时间数组.
      values - 与时间数组中的时间点对应的值数组.
      interpolation - 使用的插值类型。 取值参考 Animation Constants. 默认值为 InterpolateLinear.
   */
  const colorKeyFrame = new THREE.ColorKeyframeTrack(
    '.material.color',
    [0, 1, 2], // 三帧
    [
      0xff0000, // 第一帧
      0x00ff00, // 第一帧
      0x0000ff, // 第一帧
    ]
  );
  clip = new THREE.AnimationClip('color', 4, [colorKeyFrame]);
}

let mixer;
function addAnimation() {
  mixer = new THREE.AnimationMixer(box!);
  const clipAction = mixer.clipAction(clip!);
  clipAction.play();
}

let clock = new THREE.Clock();

function render() {
  const delta = clock.getDelta();
  mixer!.update(delta);
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}
onMounted(() => {
  addGeometry();
  addLight();
  initAnimation();
  render();
});
</script>

<style lang="scss" scoped></style>

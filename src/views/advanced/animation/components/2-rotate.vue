<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 2.旋转动画 </template>
    <div id="advance-rotate"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createLight, useThree } from '@/hooks';

defineOptions({
  name: 'advance-rotate',
  inheritAttrs: false,
});
const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advance-rotate', {
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
  // 旋转(沿x轴)
  const xAxis = new THREE.Vector3(1, 0, 0);
  const qInitial = new THREE.Quaternion().setFromAxisAngle(xAxis, 0); // 起点角度
  const qFinal = new THREE.Quaternion().setFromAxisAngle(xAxis, Math.PI); // 终点角度
  /**
   * QuaternionKeyframeTrack
   * 四元数类型的关键帧轨道。
   * 
   QuaternionKeyframeTrack( name : String, times : Array, values : Array )
      name - (必须) 关键帧轨道(KeyframeTrack)的标识符.
      times - (必须) 关键帧的时间数组.
      values - 与时间数组中的时间点对应的值数组.
      interpolation - 使用的插值类型。 取值参考 Animation Constants 默认值为 InterpolateLinear.
   */
  const rotationKeyFrame = new THREE.QuaternionKeyframeTrack(
    '.quaternion',
    [0, 1, 2], //三帧
    [
      qInitial.x,
      qInitial.y,
      qInitial.z,
      qInitial.w, //第一帧
      qFinal.x,
      qFinal.y,
      qFinal.z,
      qFinal.w, //第二帧
      qInitial.x,
      qInitial.y,
      qInitial.z,
      qInitial.w, //第三帧
    ]
  );
  clip = new THREE.AnimationClip('rotate', 3, [rotationKeyFrame]);
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

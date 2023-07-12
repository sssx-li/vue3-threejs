<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 3.动画混合 </template>
    <div id="advance-combine"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createLight, useThree } from '@/hooks';

defineOptions({
  name: 'advance-combine',
  inheritAttrs: false,
});
const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advance-combine', {
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

let dirLight: Record<string, any> = {};
function addLight() {
  // 环境光
  const hemisphere = new THREE.HemisphereLight();
  hemisphere.intensity = 0.3;
  threeState.scene?.add(hemisphere);

  // 平行光
  dirLight = createLight('DirectionalLight', {
    position: { x: 5, y: 5, z: -5 },
  });
  threeState.scene?.add(dirLight!.lightInstance!);
  // threeState.scene?.add(dirLight.lightHelper!);
}

function initAnimation() {
  addClip();
  addAnimation();
}

let clip; // 剪辑
function addClip() {
  // 1.平移
  const moveKeyFrame = new THREE.VectorKeyframeTrack(
    '.position',
    [0, 1, 2], // 共三帧动画
    [
      0,
      0,
      0, //第一帧位置
      5,
      0,
      0, //第二帧位置
      0,
      0,
      0, //第三帧位置
    ]
  );
  // 2.旋转(沿x轴)
  const xAxis = new THREE.Vector3(1, 0, 0);
  const qInitial = new THREE.Quaternion().setFromAxisAngle(xAxis, 0); // 起点角度
  const qFinal = new THREE.Quaternion().setFromAxisAngle(xAxis, Math.PI); // 终点角度
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
  // 3.颜色变化
  const colorKeyFrame = new THREE.ColorKeyframeTrack(
    '.material.color',
    [0, 1, 2],
    [0xff0000, 0x00ff00, 0x0000ff]
  );
  clip = new THREE.AnimationClip('combine', 3, [
    moveKeyFrame,
    rotationKeyFrame,
    colorKeyFrame,
  ]);
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

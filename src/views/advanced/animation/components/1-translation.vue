<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.平移动画 </template>
    <div id="advance-translation"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createLight, useThree } from '@/hooks';

defineOptions({
  name: 'advance-translation',
  inheritAttrs: false,
});
const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advance-translation', {
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
  // -------1. 定义动画帧 --------
  // 动画关键帧
  /**
   * VectorKeyframeTrack
   * 向量类型的关键帧轨道
   * 
   VectorKeyframeTrack( name : String, times : Array, values : Array )
      name - (必须) 关键帧轨道(KeyframeTrack)的标识符.
      times - (必须) 关键帧的时间数组.
      values - 与时间数组中的时间点对应的值数组.
      interpolation - 使用的插值类型。 取值参考 Animation Constants 默认值为 InterpolateLinear.
   */
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
  /**
   *AnimationClip 
   * 动画剪辑（AnimationClip）是一个可重用的关键帧轨道集，它代表动画。
   * 
   AnimationClip( name : String, duration : Number, tracks : Array )
      name - 此剪辑的名称
      duration - 持续时间 (单位秒). 如果传入负数, 持续时间将会从传入的数组中计算得到。
      tracks - 一个由关键帧轨道（KeyframeTracks）组成的数组。
   */
  // -------2. 创建动画剪辑 --------
  clip = new THREE.AnimationClip('translation', 3, [moveKeyFrame]);
}

let mixer; // 混合器
function addAnimation() {
  // -------3. 创建混合器，将clip与物体关联起来 --------
  // 将动画与物体关联起来
  mixer = new THREE.AnimationMixer(box!);
  // 通过clipAction方法，实现动画剪辑clip与动画混合器的关联
  const clipAction = mixer.clipAction(clip!);
  // 开始动画
  clipAction.play();
}

// -------4. 创建始终对象，用于跟踪时间 --------
let clock = new THREE.Clock();

function render() {
  // -------5. 更新动画混合器 --------
  const delta = clock.getDelta(); // 获取自 .oldTime 设置后到当前的秒数。同时将 .oldTime 设置为当前时间。
  // 更新mixer
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

<template>
  <el-card class="mr-14px mb-14px">
    <template #header>
      7.路径移动
      <el-button id="path-move-btn">点我开始运动</el-button>
      <el-button id="path-move-reset-btn">反转运动方向</el-button>
    </template>
    <div id="advance-pathToMove"></div>
  </el-card>
</template>

<script setup lang="ts">
import anime from 'animejs';
import { createLight, useThree } from '@/hooks';
import type { Vector3 } from 'three';

defineOptions({
  name: 'advance-pathToMove',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advance-pathToMove', {
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

function addGeometry() {
  // 线段A --> C --> B
  const pointA = new THREE.Vector3(0, 0, 3);
  const pointB = new THREE.Vector3(3, 0, 0);
  const pointC = new THREE.Vector3(0, 0, 0);
  // 两点式创建线段
  const lineAc = new THREE.LineCurve3(pointA, pointC);
  const lineCB = new THREE.LineCurve3(pointC, pointB);
  // 创建曲线路径
  const curvePath = new THREE.CurvePath();
  // 在曲线路径上添加两条线段
  curvePath.add(lineAc);
  curvePath.add(lineCB);

  // 在曲线路径上平均获取100个顶点
  // 这里得到的是一个数组，数组中全部都是 Vector3 类型的对象，用于表示分段后的顶点
  const points = curvePath.getSpacedPoints(100);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
  const mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);

  let param = {
    index: 0,
  };
  const pathMove = anime({
    targets: param, //动画目标
    index: 100, // 数组下标从0~100
    easing: 'linear', // 线性播放
    round: 1, // 限制数据精度为整数
    autoplay: false, // 不自动播放
    update: () => {
      // 数组下标变化后,根据数组下标获取到当前帧物体所在的位置
      const point = points[param.index];
      mesh.position.copy(point as Vector3);
    },
  });
  document.getElementById('path-move-btn')?.addEventListener('click', () => {
    pathMove.play();
  });
  document
    .getElementById('path-move-reset-btn')
    ?.addEventListener('click', () => {
      // pathMove.restart(); // 重新开始运动
      pathMove.reverse(); // 反转方向翻转
      pathMove.play();
    });
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

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}
onMounted(() => {
  addGeometry();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

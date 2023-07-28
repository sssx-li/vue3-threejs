<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 2.RapierPhysics </template>
    <div id="advance-rapierPhysics"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createLight, useThree } from '@/hooks';
/* eslint-disable */
// @ts-ignore
import { RapierPhysics } from 'three/examples/jsm/physics/RapierPhysics';

defineOptions({
  name: 'advance-rapierPhysics',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advance-rapierPhysics', {
  config: {
    width,
    height,
    cameraType: 'PerspectiveCamera',
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 2,
    },
    renderOptions: {
      antialias: true,
    },
  },
  cameraOptions: {
    fov: 60,
    aspect: width / height,
    near: 0.1,
    far: 1000,
  },
  cameraPosition: { x: 5, y: 5, z: 5 },
});

let plane;
function addPlane() {
  const geometry = new THREE.BoxGeometry(10, 1, 10);
  const material = new THREE.ShadowMaterial({ color: 0x111111 });
  plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, -0.5, 0);
  threeState.scene?.add(plane);
}

let ball;
function addGeometry() {
  const geometry = new THREE.SphereGeometry(0.25, 32, 16);
  const material = new THREE.MeshLambertMaterial();
  ball = new THREE.Mesh(geometry, material);
  ball.position.set(0, 2, 0);
  threeState.scene?.add(ball);
}

let dirLight: Record<string, any> = {};
function addLight() {
  // 环境光
  const hemisphere = new THREE.HemisphereLight();
  hemisphere.intensity = 0.3;
  threeState.scene?.add(hemisphere);

  // dirLight!.lightInstance = new THREE.DirectionalLight();
  // dirLight!.lightInstance.position.set(150, 300, -150);
  // 平行光
  dirLight = createLight('DirectionalLight', {
    position: { x: 5, y: 5, z: -5 },
  });
  threeState.scene?.add(dirLight!.lightInstance!);
  threeState.scene?.add(dirLight.lightHelper!);
}

let physics;
async function enablePhysics() {
  physics = await RapierPhysics();
  physics.addMesh(plane!); //添加一个地面 --（第二个参数不写，表示为刚体）
  physics.addMesh(ball!, 1);
}

// 添加阴影
function enableShadow() {
  plane!.receiveShadow = true; // 地面接收阴影
  ball!.castShadow = true; // 物体投射阴影
  dirLight!.lightInstance.castShadow = true; // 灯光投射阴影
  threeState.renderer.shadowMap.enabled = true; // 渲染器显示阴影
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

onMounted(() => {
  threeState.scene!.background = new THREE.Color(0x888888); // 修改场景背景
  addPlane();
  addGeometry();
  addLight();
  enableShadow();
  enablePhysics();
  render();
});
</script>

<style lang="scss" scoped></style>

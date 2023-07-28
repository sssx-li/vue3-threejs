<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 3.Cannon </template>
    <div id="advance-cannon"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as CANNON from 'cannon-es';
import { createLight, useThree } from '@/hooks';

defineOptions({
  name: 'advance-cannon',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advance-cannon', {
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
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.ShadowMaterial({ color: 0x111111 });
  plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  // plane.position.set(0, -1, 0);
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

  // 平行光
  dirLight = createLight('DirectionalLight', {
    position: { x: 5, y: 5, z: -5 },
  });
  threeState.scene?.add(dirLight!.lightInstance!);
  threeState.scene?.add(dirLight.lightHelper!);
}

// 添加阴影
function enableShadow() {
  plane!.receiveShadow = true; // 地面接收阴影
  ball!.castShadow = true; // 物体投射阴影
  dirLight!.lightInstance.castShadow = true; // 灯光投射阴影
  threeState.renderer.shadowMap.enabled = true; // 渲染器显示阴影
}

// 创建物理世界
const physicsWorld = new CANNON.World();
physicsWorld.gravity.set(0, -9.8, 0); // 设置重力加速度
let sphereMaterial, sphereBody, floorMaterial;
function addPhysicsWorld() {
  addPhysicsShape();
  addPhysicsPlan();
  // 设置2种材质碰撞的参数
  const defaultContactMaterial = new CANNON.ContactMaterial(
    sphereMaterial!,
    floorMaterial!,
    {
      //   摩擦力
      friction: 0.3,
      // 弹性
      restitution: 0.6,
    }
  );
  // 将材料的关联设置添加的物理世界
  physicsWorld.addContactMaterial(defaultContactMaterial);
}

// 添加物理世界小球
function addPhysicsShape() {
  const sphereShape = new CANNON.Sphere(0.25);
  sphereMaterial = new CANNON.Material();
  // 创建物理世界的物体
  sphereBody = new CANNON.Body({
    shape: sphereShape,
    position: new CANNON.Vec3(0, 2, 0),
    mass: 1, // 小球质量
    material: sphereMaterial,
  });
  physicsWorld.addBody(sphereBody);
  sphereBody!.addEventListener('collide', HitEvent); // 监听碰撞事件
}
// 添加物理世界地面
function addPhysicsPlan() {
  const floorShape = new CANNON.Plane();
  const floorBody = new CANNON.Body();
  floorMaterial = new CANNON.Material('floor');
  floorBody.material = floorMaterial;
  floorBody.mass = 0; // 质量为0: 当质量为0时，会使物体保持不动
  floorBody.addShape(floorShape);
  // 绕x旋转90度
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  physicsWorld.addBody(floorBody);
}
// 添加监听碰撞事件
function HitEvent(e: any) {
  // 获取碰撞的强度
  const impactStrength = e.contact.getImpactVelocityAlongNormal();
  console.log('碰撞强度', impactStrength);
}

const clock = new THREE.Clock();
function render() {
  let deltaTime = clock.getDelta();
  // 更新物理引擎世界的物体
  physicsWorld.step(1 / 120, deltaTime);
  // 将物理世界里的物体位置赋值给threejs里的物体
  ball!.position.copy(sphereBody!.position);
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

onMounted(() => {
  threeState.scene!.background = new THREE.Color(0x888888); // 修改场景背景
  addPlane();
  addGeometry();
  addLight();
  enableShadow();
  addPhysicsWorld();
  render();
});
</script>

<style lang="scss" scoped></style>

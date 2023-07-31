<!-- 碰撞检测-cannonjs -->
<template>
  <div class="connon-container relative">
    <div id="advanced-connon"></div>
    <div class="desc absolute top-10px right-10px c-#fff">
      W: 上移 <br />
      S: 下移 <br />
      A: 左移 <br />
      D: 右移
    </div>
  </div>
</template>

<script setup lang="ts">
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

import { useThree } from '@/hooks';

defineOptions({
  name: 'advanced-connon',
  inheritAttrs: false,
});

let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
const { threeState, THREE } = useThree('advanced-connon', {
  config: {
    width,
    height,
    cameraType: 'PerspectiveCamera',
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
  cameraPosition: { x: 0, y: 2, z: 5 },
});

let box, box1;
const boxSize = 1;
function addBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  box = new THREE.Mesh(geometry, material);
  threeState.scene?.add(box);

  const box1Geometry = geometry.clone();
  const box1Matreial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  box1 = new THREE.Mesh(box1Geometry, box1Matreial);
  box1.position.set(2, 0, 0);
  threeState.scene?.add(box1);

  window.addEventListener('keydown', keydown);
}

const world = new CANNON.World();
world.gravity.set(0, 0, 0);
// NaiveBroadphase: 简单的宽松边界框碰撞检测。
// SAPBroadphase: 排序轴算法碰撞检测，用于更高效地检测大量对象之间的碰撞。
world.broadphase = new CANNON.NaiveBroadphase();
let boxBody, box1Body, boxMaterial, box1Material;
let isCollide = ref(false);
function addPhysicsWorld() {
  addPhysicsBox();
  // // 设置2种材质碰撞的参数
  const defaultContactMaterial = new CANNON.ContactMaterial(
    boxMaterial!,
    box1Material!,
    {
      friction: 0, // 摩擦力
      restitution: 0, // 反弹系数
    }
  );
  // 将材料的关联设置添加的物理世界
  world.addContactMaterial(defaultContactMaterial);
}

function addPhysicsBox() {
  const boxShape = new CANNON.Box(
    new CANNON.Vec3(boxSize / 2, boxSize / 2, boxSize / 2)
  );
  boxMaterial = new CANNON.Material();
  boxBody = new CANNON.Body({
    shape: boxShape,
    mass: 1,
    position: new CANNON.Vec3(0, 0, 0),
    material: boxMaterial,
  });
  world.addBody(boxBody);

  box1Material = new CANNON.Material();
  box1Body = new CANNON.Body({
    shape: boxShape,
    mass: 0,
    position: new CANNON.Vec3(2, 0, 0),
    material: box1Material,
  });
  world.addBody(box1Body);
  console.log(boxBody);

  // 监听开始碰撞事件
  world.addEventListener('beginContact', (event: any) => {
    console.log('endContact', event);
    isCollide.value = true;
  });
  // 监听结束碰撞事件
  world.addEventListener('endContact', (event: any) => {
    console.log('endContact', event);
    isCollide.value = false;
  });
}

function addLight() {
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

const keyCodes = ['KeyW', 'KeyS', 'KeyA', 'KeyD'] as const;
type KeyCodes = (typeof keyCodes)[number];
let curCode: KeyCodes = 'KeyA';
// 控制box移动
function keydown(e: KeyboardEvent) {
  const key = e.code as KeyCodes;
  if (!keyCodes.includes(key) || (curCode === key && isCollide.value)) return;
  let x = box!.position.x;
  const y = box!.position.y;
  let z = box!.position.z;

  switch (key) {
    case 'KeyA': // 左移
      x -= 0.1;
      break;
    case 'KeyD': // 右移
      x += 0.1;
      break;
    case 'KeyW': // 上移
      z -= 0.1;
      break;
    case 'KeyS': // 下移
      z += 0.1;
      break;
    default:
      const n: never = key;
      console.log('keydown', n);
      break;
  }
  if (!isCollide.value) {
    console.log('key', key);
    curCode = key;
  }
  // 由于js存在进度丢失问题，故使用toFixed对其做处理
  box!.position.set(+parseFloat(x).toFixed(1), y, +parseFloat(z).toFixed(1));
  boxBody!.position.copy(box!.position);
}

const cannonDebugRenderer = CannonDebugger(threeState.scene!, world, {});
function render() {
  // 更新Cannon.js世界
  world.step(1 / 60);
  cannonDebugRenderer.update();
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

const resize = () => {
  width = window.innerWidth - 290;
  height = window.innerHeight - 100;
  threeState.camera!.aspect = width / height;
  threeState.camera!.updateProjectionMatrix();
  threeState.renderer.setSize(width, height);
};

watch(isCollide, (val) => {
  box!.material.color.set(val ? 0x00ff00 : 0xff0000);
});

onMounted(() => {
  addBox();
  addLight();
  addPhysicsWorld();
  render();
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
  window.removeEventListener('keydown', keydown);
});
</script>

<style lang="scss" scoped></style>

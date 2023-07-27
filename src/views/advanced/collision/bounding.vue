<!-- 碰撞检测-包围盒检测 -->
<template>
  <div id="advanced-bounding"></div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'advanced-bounding',
  inheritAttrs: false,
});

let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
const { threeState, THREE } = useThree('advanced-bounding', {
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

let box, box1, boxHelper, box1Helper;
function addBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  box = new THREE.Mesh(geometry, material);
  threeState.scene?.add(box);
  console.log(box);

  const box1Geometry = new THREE.SphereGeometry(0.5);
  const box1Matreial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  box1 = new THREE.Mesh(box1Geometry, box1Matreial);
  box1.position.set(2, 0, 0);
  threeState.scene?.add(box1);

  // 创建包围盒辅助对象
  boxHelper = new THREE.BoxHelper(box);
  threeState.scene?.add(boxHelper);
  box1Helper = new THREE.BoxHelper(box1);
  threeState.scene?.add(box1Helper);
  window.addEventListener('keydown', keydown);
}

function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(5, 5, 5);
  threeState.scene?.add(point);
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

const keyCodes = ['KeyW', 'KeyS', 'KeyA', 'KeyD'] as const;
type KeyCodes = (typeof keyCodes)[number];
// 控制box移动
function keydown(e: KeyboardEvent) {
  const key = e.code as KeyCodes;
  if (!keyCodes.includes(key)) return;
  switch (key) {
    case 'KeyA': // 左移
      box!.position.x -= 0.1;
      break;
    case 'KeyD': // 右移
      box!.position.x += 0.1;
      break;
    case 'KeyW': // 上移
      box!.position.z -= 0.1;
      break;
    case 'KeyS': // 下移
      box!.position.z += 0.1;
      break;
    default:
      const n: never = key;
      console.log('keydown', n);
      break;
  }
  if (detectCollisions()) {
    box!.material.color.set(0x00ff00);
  } else {
    box!.material.color.set(0xff0000);
  }
}

// 碰撞检测-包围盒法
function detectCollisions() {
  // 更新包围盒辅助器
  boxHelper!.update();
  box1Helper!.update();

  // 判断两个几何体是否相交
  const cube = new THREE.Box3().setFromObject(box!);
  const cube1 = new THREE.Box3().setFromObject(box1!);
  return cube.intersectsBox(cube1);
}

function render() {
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

onMounted(() => {
  addBox();
  addLight();
  render();
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
  window.removeEventListener('keydown', keydown);
});
</script>

<style lang="scss" scoped></style>

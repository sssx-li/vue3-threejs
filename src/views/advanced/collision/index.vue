<!-- 碰撞检测-射线检测 -->
<template>
  <div class="collision-container relative">
    <div id="advanced-collision"></div>
    <div class="desc absolute top-10px right-10px c-#fff">
      W: 上移 <br />
      S: 下移 <br />
      A: 左移 <br />
      D: 右移
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'advanced-collision',
  inheritAttrs: false,
});

let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
const { threeState, THREE } = useThree('advanced-collision', {
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
function addBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  box = new THREE.Mesh(geometry, material);
  threeState.scene?.add(box);
  console.log(box);

  const box1Geometry = geometry.clone();
  const box1Matreial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  box1 = new THREE.Mesh(box1Geometry, box1Matreial);
  box1.position.set(2, 0, 0);
  threeState.scene?.add(box1);

  window.addEventListener('keydown', keydown);
}

function addLight() {
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

// 碰撞检测-射线法(不准确...)
function detectCollisions() {
  let isCollision = false;
  // 获取box的模型世界坐标
  const centerCoord = box!.position.clone();
  // 获取几何体的顶点对象
  const position = box!.geometry.attributes.position;
  // 保存顶点三维向量
  const vertices = [];
  for (let i = 0; i < position.count; i++) {
    vertices.push(
      new THREE.Vector3(position.getX(i), position.getY(i), position.getZ(i))
    );
  }
  for (let i = 0; i < vertices.length; i++) {
    // matrixWorld 物体的世界坐标变换 -- 物体旋转、位移 的四维矩阵
    // applyMatrix4() 对当前物体应用这个变换矩阵，并更新物体的位置、旋转和缩放。
    // 获取世界坐标下 网格 变换后的坐标
    let vertexWorldCoord = vertices[i].clone().applyMatrix4(box!.matrixWorld);

    // sub(x) 从该向量减去x向量
    // 获得由中心指向顶点的向量
    var dir = vertexWorldCoord.clone().sub(centerCoord);

    // normalize() 将该向量转换为单位向量
    // Raycaster(光线投射的原点向量, 向射线提供方向的方向向量)
    let raycaster = new THREE.Raycaster(centerCoord, dir.clone().normalize());

    // 放入要检测的 物体cube2，返回相交物体
    // intersectObjects('检测和射线相交的一组物体', '若为true，则同时也会检测所有物体的后代')
    let intersects = raycaster.intersectObjects([box1!], true);
    if (intersects.length > 0) {
      console.log(intersects, dir.length());
      // intersects[0].distance: 射线投射原点和相交部分之间的距离
      // dir.length()：几何体顶点和几何体中心构成向量的长度
      // distance 小于 length 则表示物体相交
      if (intersects.some((item) => item.distance < dir.length())) {
        isCollision = true;
      }
    }
  }
  return isCollision;
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

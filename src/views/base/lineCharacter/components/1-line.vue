<template>
  <el-card>
    <template #header> 1.线条 </template>
    <div id="base-line"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-line',
  inheritAttrs: false,
});

const width = 300;
const height = 300;
const { THREE, threeState } = useThree('base-line', {
  config: {
    width,
    height,
    cameraType: 'OrthographicCamera',
    renderOptions: {
      alpha: true, // 是否透明
    },
  },
  cameraOptions: {
    left: -width / 2,
    right: width / 2,
    top: height / 2,
    bottom: -height / 2,
    near: 1,
    far: 1000,
  },
  initFn: initRender,
});

interface ICoordinate {
  x: number;
  y: number;
  z: number;
}
function addPointToLine(pointArr: Array<ICoordinate>) {
  const points: any[] = [];
  pointArr.forEach((item) => {
    points.push(new THREE.Vector3(item.x, item.y, item.z));
  });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const line = new THREE.Line(geometry, material);
  return line;
}

function addRect() {
  const geometry = new THREE.BufferGeometry();
  // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
  // 因为在两个三角面片里，这两个顶点都需要被用到。
  const vertices = new Float32Array([
    -50, -50, 50, 50, -50, 50, 50, 50, 50,

    50, 50, 50, -50, 50, 50, -50, -50, 50,
  ]);
  // itemSize = 3 因为每个顶点都是一个三元组。
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const rect = new THREE.Mesh(geometry, material);
  return rect;
}

function initRender() {
  threeState.camera?.position.set(0, 0, 100);
  threeState.camera?.lookAt(threeState.scene!.position);
  const lineX = addPointToLine([
    { x: -50, y: 0, z: 0 },
    { x: 50, y: 0, z: 0 },
  ]);
  lineX.position.set(0, 150, 0);
  threeState.scene?.add(lineX);
  const arrow = addPointToLine([
    { x: -10, y: 0, z: 0 },
    { x: 0, y: 10, z: 0 },
    { x: 10, y: 0, z: 0 },
  ]);
  arrow.position.set(0, 120, 0);
  threeState.scene?.add(arrow);
  const react = addPointToLine([
    { x: -30, y: 0, z: 0 },
    { x: 30, y: 0, z: 0 },
    { x: 30, y: 30, z: 0 },
    { x: -30, y: 30, z: 0 },
    { x: -30, y: 0, z: 0 },
  ]);
  react.position.set(0, 60, 0);
  threeState.scene?.add(react);

  threeState.scene?.add(addRect());
  // 渲染
  threeState.renderer?.render(threeState.scene!, threeState.camera!);
}
</script>

<style lang="scss" scoped></style>

<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 14.形状缓冲几何体-ShapeGeometry </template>
    <div id="base-shapeGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-shapeGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-shapeGeometry', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 200,
    },
    renderOptions: {
      antialias: true,
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
  cameraPosition: { x: 350, y: 350, z: 350 },
  renderFn: initRender,
});

let mesh;
function initGeometry() {
  /**
   * 形状缓冲几何体
   ShapeGeometry(shapes : Array, curveSegments : Integer)
      shapes — 一个单独的shape，或者一个包含形状的Array。Default is a single triangle shape.
      curveSegments - Integer - 每一个形状的分段数，默认值为12。
   */
  const x = 0,
    y = 0;

  const heartShape = new THREE.Shape();

  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  const geometry = new THREE.ShapeGeometry(heartShape);
  const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });
  mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);
  mesh.scale.set(4, 4, 4);
}
function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(100, 300, 0);
  threeState.scene?.add(point);
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  mesh!.rotation.y += 0.01;

  requestAnimationFrame(render);
}

function initRender() {
  initGeometry();
  addLight();
  render();
}
</script>

<style lang="scss" scoped></style>

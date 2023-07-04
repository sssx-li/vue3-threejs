<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 20.网格几何体-WireframeGeometry </template>
    <div id="base-wireframeGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import type { BufferGeometry, Material } from 'three';

defineOptions({
  name: 'base-wireframeGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-wireframeGeometry', {
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

let line;

function initGeometry() {
  /**
   * 网格几何体
   WireframeGeometry( geometry : BufferGeometry )
      geometry — 任意几何体对象。
   */
  const geometry = new THREE.SphereGeometry(100, 100, 100);
  const wireframe = new THREE.WireframeGeometry(geometry);
  line = new THREE.LineSegments<BufferGeometry, Material>(wireframe);
  line.material.depthTest = false;
  line.material.opacity = 0.25;
  line.material.transparent = true;
  threeState.scene?.add(line);
  // const material = new THREE.MeshLambertMaterial({
  //   color: 0xff0000,
  //   side: THREE.DoubleSide,
  // });
  // mesh = new THREE.Mesh(geometry, material);
  // threeState.scene?.add(mesh);
  // mesh.position.set(80, 0, 0);

  // const material1 = new THREE.MeshLambertMaterial({
  //   color: 0x00ff00,
  //   wireframe: true,
  // });
  // mesh1 = new THREE.Mesh(geometry, material1);
  // threeState.scene?.add(mesh1);
  // mesh1.position.set(0, 0, 80);
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
  line!.rotation.x += 0.01;
  line!.rotation.y += 0.01;

  requestAnimationFrame(render);
}

function initRender() {
  initGeometry();
  addLight();
  render();
}
</script>

<style lang="scss" scoped></style>

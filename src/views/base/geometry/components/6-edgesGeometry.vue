<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 6.边缘几何体-EdgesGeometry </template>
    <div id="base-edgesGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { createLineMateral } from '@/hooks/useThree/utils/line/utils';

defineOptions({
  name: 'base-edgesGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-edgesGeometry', {
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
   * 边缘几何体
   EdgesGeometry( geometry : BufferGeometry, thresholdAngle : Integer )
      geometry — 任何一个几何体对象。
      thresholdAngle — 仅当相邻面的法线之间的角度（单位为角度）超过这个值时，才会渲染边缘。默认值为1。
   */
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const edges = new THREE.EdgesGeometry(geometry);
  // MeshLambertMaterial：一种非光泽表面的材质，没有镜面高光。
  line = new THREE.LineSegments(
    edges,
    createLineMateral('LineBasicMaterial', {
      color: '#f60',
    })
  );
  threeState.scene?.add(line);
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

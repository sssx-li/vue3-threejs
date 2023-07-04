<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 13.圆环缓冲几何体-RingGeometry </template>
    <div id="base-ringGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-ringGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-ringGeometry', {
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

let mesh, mesh1;
function initGeometry() {
  /**
   * 圆环缓冲几何体
   RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)
      innerRadius — 内部半径，默认值为0.5。
      outerRadius — 外部半径，默认值为1。
      thetaSegments — 圆环的分段数。这个值越大，圆环就越圆。最小值为3，默认值为32。
      phiSegments — 最小值为1，默认值为8。
      thetaStart — 起始角度，默认值为0。
      thetaLength — 圆心角，默认值为Math.PI * 2。
   */
  const geometry = new THREE.RingGeometry(20, 40);
  const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });
  mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);
  mesh.position.set(80, 0, 0);

  const material1 = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  mesh1 = new THREE.Mesh(geometry, material1);
  threeState.scene?.add(mesh1);
  mesh1.position.set(0, 0, 80);
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
  mesh!.rotation.x += 0.01;
  mesh!.rotation.y += 0.01;
  mesh1!.rotation.x -= 0.01;
  mesh1!.rotation.y -= 0.01;

  requestAnimationFrame(render);
}

function initRender() {
  initGeometry();
  addLight();
  render();
}
</script>

<style lang="scss" scoped></style>

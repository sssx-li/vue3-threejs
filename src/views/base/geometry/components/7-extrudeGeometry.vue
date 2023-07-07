<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 7.挤压缓冲几何体-ExtrudeGeometry </template>
    <div id="base-extrudeGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-extrudeGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-extrudeGeometry', {
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
});

function addGeometry() {
  const length = 60,
    width = 40;
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, width);
  shape.lineTo(length, width);
  shape.lineTo(length, 0);
  shape.lineTo(0, 0);
  /**
   * 挤压缓冲几何体
   ExtrudeGeometry(shapes : Array, options : Object)
      shapes — 形状或者一个包含形状的数组。
      options — 一个包含有下列参数的对象：

      curveSegments — int，曲线上点的数量，默认值是12。
      steps — int，用于沿着挤出样条的深度细分的点的数量，默认值为1。
      depth — float，挤出的形状的深度，默认值为1。
      bevelEnabled — bool，对挤出的形状应用是否斜角，默认值为true。
      bevelThickness — float，设置原始形状上斜角的厚度。默认值为0.2。
      bevelSize — float。斜角与原始形状轮廓之间的延伸距离，默认值为bevelThickness-0.1。
      bevelOffset — float. 与倒角开始的形状轮廓的距离。默认值为0.
      bevelSegments — int。斜角的分段层数，默认值为3。
      extrudePath — THREE.Curve对象。一条沿着被挤出形状的三维样条线。Bevels not supported for path extrusion.
      UVGenerator — Object。提供了UV生成器函数的对象。
   */
  const geometry = new THREE.ExtrudeGeometry(shape, {
    steps: 10,
    depth: 40,
    bevelThickness: 5,
    bevelSize: 1,
    bevelOffset: 1,
    bevelSegments: 500,
  });
  const material = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);
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
  // line!.rotation.x += 0.01;
  // line!.rotation.y += 0.01;

  requestAnimationFrame(render);
}

onMounted(() => {
  addGeometry();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

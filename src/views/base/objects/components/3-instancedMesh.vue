<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 3.实例化网格-InstancedMesh </template>
    <div id="base-instancedMesh"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-instancedMesh',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-instancedMesh', {
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
  /**
   * InstancedMesh
   * 一种具有实例化渲染支持的特殊版本的Mesh。你可以使用 InstancedMesh 来渲染大量具有相同几何体与材质、但具有不同世界变换的物体。 使用 InstancedMesh 将帮助你减少 draw call 的数量，从而提升你应用程序的整体渲染性能。
   *
   InstancedMesh( geometry : BufferGeometry, material : Material, count : Integer )
      geometry - 一个 BufferGeometry 的实例。
      material - 一个 Material 的实例。默认为一个新的 MeshBasicMaterial 。
      count - 实例的数量
   */
  const amount = 10;
  const count = Math.pow(10, 3); // 10^3 = 1000
  const geometry = new THREE.SphereGeometry(5);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const meshes = new THREE.InstancedMesh(geometry, material, count);
  // 定义每个球的索引，作为小球的标识
  let index = 0;
  // 定义每个小球位置的偏移量
  const offset = ((amount - 1) / 2) * 10;
  // 转换矩阵
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      for (let k = 0; k < amount; k++) {
        // 设置matrix的位置，根据偏移量
        matrix.setPosition(offset - i * 10, offset - j * 10, offset - k * 10); //-45 ~ 45
        // 将index和matrix赋值给meshes
        meshes.setMatrixAt(index, matrix);
        // 随机颜色
        const white = new THREE.Color().setHex(Math.random() * 0xffffff);
        // 设置每个小球的颜色
        meshes.setColorAt(index, white);
        index += 1;
      }
    }
  }
  threeState.scene?.add(meshes);
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
  requestAnimationFrame(render);
}

onMounted(() => {
  addGeometry();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

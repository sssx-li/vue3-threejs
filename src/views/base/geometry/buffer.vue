<template>
  <div class="buffer-container">
    <el-radio-group v-model="material" class="ml-4">
      <el-radio label="point" size="large"> 点 </el-radio>
      <el-radio label="line" size="large"> 线 </el-radio>
      <el-radio label="lineLoop" size="large"> 闭合线条 </el-radio>
      <el-radio label="lineSegments" size="large"> 非连续线条 </el-radio>
      <el-radio label="mesh" size="large"> 面 </el-radio>
    </el-radio-group>
    <div id="base-buffer"></div>
  </div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'buffer',
});
const material = ref<'point' | 'line' | 'mesh' | 'lineLoop' | 'lineSegments'>(
  'mesh'
);
const width = 700;
const height = 800;
const { threeState, THREE } = useThree('base-buffer', {
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
  cameraPosition: { x: 100, y: 100, z: 100 },
  renderFn: initRender,
});
let point, mesh, line, lineLoop, lineSegments;
function initGeometry() {
  const geometry = new THREE.BufferGeometry();
  //创建顶点数据
  const vertices = new Float32Array([
    0,
    0,
    0, //顶点1坐标
    100,
    0,
    0, //顶点2坐标
    0,
    100,
    0, //顶点3坐标
    0,
    0,
    30, //顶点4坐标
    0,
    0,
    100, //顶点5坐标
    60,
    0,
    30, //顶点6坐标
  ]);
  // 创建属性缓冲区对象
  const attribute = new THREE.BufferAttribute(vertices, 3);
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribute;
  // 面材质
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);

  // 点材质
  const pointMaterial = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 10,
  });
  point = new THREE.Points(geometry, pointMaterial);
  point.visible = false;
  threeState.scene?.add(point);

  // 线材质
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffff00,
  });
  line = new THREE.Line(geometry, lineMaterial);
  line.visible = false;
  threeState.scene?.add(line);

  // 闭合线条
  lineLoop = new THREE.LineLoop(geometry, lineMaterial);
  lineLoop.visible = false;
  threeState.scene?.add(lineLoop);

  // 非连续线条
  lineSegments = new THREE.LineSegments(geometry, lineMaterial);
  lineSegments.visible = false;
  threeState.scene?.add(lineSegments);
}
// 几何体顶点索引数据
function addIndexGeometry() {
  const geometry = new THREE.BufferGeometry();
  // const vertices = new Float32Array([
  //   0,
  //   0,
  //   0, // 顶点1
  //   50,
  //   0,
  //   0, // 顶点2
  //   50,
  //   50,
  //   0, // 顶点3
  //   0,
  //   0,
  //   0, // 顶点4(与顶点1重复)
  //   50,
  //   50,
  //   0, // 顶点5(与顶点3重复)
  //   0,
  //   50,
  //   0, // 顶点6
  // ]);
  // 有重复坐标时，可以使用顶点索引geometry.index。这样可以省去重复的顶点位置坐标
  const vertices = new Float32Array([
    0,
    0,
    0, // 顶点1
    50,
    0,
    0, // 顶点2
    50,
    50,
    0, // 顶点3
    0,
    50,
    0, // 顶点4
  ]);
  // 然后，通过BufferAttribute定义顶点索引.index数据；这里通过javascript类型数组Uint16Array创建顶点索引.index数据。
  // Uint16Array类型数组创建顶点索引数据
  // 下面索引值对应顶点位置数据中的顶点坐标
  const indexes = new Uint16Array([0, 1, 2, 0, 2, 3]);
  // 索引数据赋值给几何体的index属性
  geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组

  // 创建属性缓冲区对象
  const attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;

  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(100, 100, 0);
  threeState.scene?.add(mesh);
}

// 顶点法线数据
function addNormalGeometry() {
  const geometry = new THREE.BufferGeometry();
  // const vertices = new Float32Array([
  //   0,
  //   0,
  //   0, // 顶点1
  //   50,
  //   0,
  //   0, // 顶点2
  //   50,
  //   50,
  //   0, // 顶点3
  //   0,
  //   0,
  //   0, // 顶点4(与顶点1重复)
  //   50,
  //   50,
  //   0, // 顶点5(与顶点3重复)
  //   0,
  //   50,
  //   0, // 顶点6
  // ]);
  // 有重复坐标时，可以使用顶点索引geometry.index。这样可以省去重复的顶点位置坐标
  const vertices = new Float32Array([
    0,
    0,
    0, // 顶点1
    50,
    0,
    0, // 顶点2
    50,
    50,
    0, // 顶点3
    0,
    50,
    0, // 顶点4
  ]);
  // 然后，通过BufferAttribute定义顶点索引.index数据；这里通过javascript类型数组Uint16Array创建顶点索引.index数据。
  // Uint16Array类型数组创建顶点索引数据
  // 下面索引值对应顶点位置数据中的顶点坐标
  const indexes = new Uint16Array([0, 1, 2, 0, 2, 3]);
  // 索引数据赋值给几何体的index属性
  geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组

  // 创建属性缓冲区对象
  const attribute = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribute;

  // 每个顶点的法线数据和顶点位置数据一一对应
  const normals = new Float32Array([
    0,
    0,
    1, //顶点1法线( 法向量 )
    0,
    0,
    1, //顶点2法线
    0,
    0,
    1, //顶点3法线
    0,
    0,
    1, //顶点4法线
  ]);
  // 在Threejs中，通过.attributes.normal设置几何体的顶点法线属性
  // 设置几何体的顶点法线属性.attributes.normal
  geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

  // 这里使用了MeshLambertMaterial材质，受光照影响，需要给每个顶点添加法线，才能看见图形
  const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-100, 100, 0);
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
  requestAnimationFrame(render);
}

watch(material, (val) => {
  point!.visible = val === 'point';
  line!.visible = val === 'line';
  lineLoop!.visible = val === 'lineLoop';
  lineSegments!.visible = val === 'lineSegments';
  mesh!.visible = val === 'mesh';
});

function initRender() {
  initGeometry();
  addIndexGeometry();
  addNormalGeometry();
  addLight();
  render();
}
</script>

<style lang="scss" scoped></style>

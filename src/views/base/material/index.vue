<template>
  <div class="material-containal">
    <el-checkbox v-model="checkedPoint">点光源</el-checkbox>
    <el-checkbox v-model="checkedAmbient">环境光</el-checkbox>
    <br />
    材质:
    <el-select
      v-model="selectMaterial"
      class="m-2"
      placeholder="请选择材质"
      size="large"
      @change="changeMaterial"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div id="base-material"></div>
  </div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-material',
  inheritAttrs: false,
});
const checkedPoint = ref(true);
const checkedAmbient = ref(true);
type TMaterial =
  | 'MeshBasicMaterial'
  | 'MeshDepthMaterial'
  | 'MeshLambertMaterial'
  | 'MeshMatcapMaterial'
  | 'MeshNormalMaterial'
  | 'MeshPhongMaterial'
  | 'MeshPhysicalMaterial'
  | 'MeshStandardMaterial'
  | 'MeshToonMaterial'
  | 'PointsMaterial'
  | 'ShaderMaterial';

const selectMaterial = ref<TMaterial>('MeshLambertMaterial');
const options: Array<{ value: TMaterial; label: string }> = [
  {
    value: 'MeshBasicMaterial',
    label: '基础网格材质(MeshBasicMaterial)',
  },
  {
    value: 'MeshDepthMaterial',
    label: '深度网格材质(MeshDepthMaterial)',
  },
  {
    value: 'MeshLambertMaterial',
    label: 'Lambert网格材质(MeshLambertMaterial)',
  },
  {
    value: 'MeshMatcapMaterial',
    label: 'MeshMatcapMaterial',
  },
  {
    value: 'MeshNormalMaterial',
    label: '法线网格材质(MeshNormalMaterial)',
  },
  {
    value: 'MeshPhongMaterial',
    label: 'Phong网格材质(MeshPhongMaterial)',
  },
  {
    value: 'MeshPhysicalMaterial',
    label: '物理网格材质(MeshPhysicalMaterial)',
  },
  {
    value: 'MeshStandardMaterial',
    label: '标准网格材质(MeshStandardMaterial)',
  },
  {
    value: 'MeshToonMaterial',
    label: 'MeshToonMaterial',
  },
  {
    value: 'PointsMaterial',
    label: '点材质(PointsMaterial)',
  },
  {
    value: 'ShaderMaterial',
    label: '着色器材质(ShaderMaterial)',
  },
];
const width = 800;
const height = 700;
const { threeState, THREE } = useThree('base-material', {
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
  },
  cameraPosition: { x: 350, y: 350, z: 350 },
});
function addPlane() {
  const geometry = new THREE.PlaneGeometry(800, 800);
  geometry.rotateX(-Math.PI / 2).translate(0, -100, 0);
  const material = new THREE.MeshLambertMaterial({
    color: 0x444444,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);
}
let mesh;
function addGeometry() {
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  // MeshLambertMaterial：一种非光泽表面的材质，没有镜面高光。
  const material = new THREE.MeshLambertMaterial();
  mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  threeState.scene?.add(mesh);
}
function changeMaterial(type: TMaterial) {
  const material = new THREE[type]();
  mesh!.material = material;
}
let point, ambient;
function addLight() {
  // 点光源
  point = new THREE.PointLight(0xffffff);
  point.position.set(150, 300, 150);
  threeState.scene?.add(point);
  console.log('point', point);
  // 环境光
  ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

watch([checkedPoint, checkedAmbient], () => {
  console.log(checkedPoint.value);
  point!.intensity = checkedPoint.value ? 1 : 0;
  ambient!.intensity = checkedAmbient.value ? 1 : 0;
});
onMounted(() => {
  addGeometry();
  addPlane();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

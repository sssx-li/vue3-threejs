<template>
  <div class="building-container">
    <div id="demo-building"></div>
  </div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'demo-building',
  inheritAttrs: false,
});
const width = window.innerWidth - 290;
const height = window.innerHeight - 100;
const { threeState, THREE, helperState } = useThree('demo-building', {
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
    far: 10000,
  },
  cameraPosition: { x: 150, y: 150, z: 150 },
});
const loader = new THREE.CubeTextureLoader();
loader.setPath('/src/assets/imgs/building/');
function addBuilding() {
  loader.load(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    (texture) => {
      const material = new THREE.MeshStandardMaterial({
        roughness: 0, // 材质的粗糙程度。0表示平滑的镜面反射，1表示完全漫反射
        metalness: 0.5, // 材质与金属的相似度[0-1]
        envMap: texture, // 环境贴图
      });
      const geometry = new THREE.BoxGeometry(100, 100, 100);
      const mesh = new THREE.Mesh(geometry, material);
      threeState.scene?.add(mesh);
      threeState.scene!.background = texture;
    }
  );
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  helperState.controlInstance?.update();
  helperState.controlInstance?.update(); // 开启阻尼需要调用update
  requestAnimationFrame(render);
}

onMounted(() => {
  addBuilding();
  helperState.controlInstance!.addEventListener('change', () => {
    helperState.controlInstance!.enablePan = false; // 禁止右键平移
    helperState.controlInstance!.enableZoom = false; // 禁止缩放
    helperState.controlInstance!.enableDamping = true; // 启用阻尼(关心)
    helperState.controlInstance!.rotateSpeed = -0.25; // 旋转速度
  });
  render();
});
</script>

<style lang="scss" scoped></style>

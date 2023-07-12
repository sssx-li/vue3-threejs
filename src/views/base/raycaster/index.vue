<template>
  <div class="raycaster-container">
    <div id="base-raycaster"></div>
  </div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
defineOptions({
  name: 'raycaster',
});

const width = window.innerWidth - 290;
const height = window.innerHeight - 100;
const { threeState, THREE } = useThree('base-raycaster', {
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

const canSelectedMesh = [];
function addGeometry() {
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  for (let i = 0; i < 200; i++) {
    let material = new THREE.MeshStandardMaterial({
      color: 0xffffff * Math.random(),
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 200 - 100;
    mesh.position.y = Math.random() * 200 - 100;
    mesh.position.z = Math.random() * 200 - 100;
    canSelectedMesh.push(mesh);
    threeState.scene?.add(mesh);
  }
}

function addRaycaster() {
  const raycaster = new THREE.Raycaster();
  // 用于保存映射结果的顶点
  const mouse = new THREE.Vector2();
  threeState.renderer.domElement.addEventListener('click', (e) => {
    // 屏幕坐标转换标准设备坐标
    // 1. 全屏----计算公式
    // mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // 2. 非全屏----计算公式
    // mouse.x =
    //   ((e.clientX -
    //     threeState.renderer.domElement.getBoundingClientRect().left) /
    //     threeState.renderer.domElement.offsetWidth) *
    //     2 -
    //   1;
    // mouse.y =
    //   -(
    //     (e.clientY -
    //       threeState.renderer.domElement.getBoundingClientRect().top) /
    //     threeState.renderer.domElement.offsetHeight
    //   ) *
    //     2 +
    //   1;

    // 3. 使用clientY
    const px = e.clientX - 270;
    const py = e.clientY - 80;
    mouse.x = (px / width) * 2 - 1;
    mouse.y = -(py / height) * 2 + 1;

    // 4. 使用offset
    // const px = e.offsetX;
    // const py = e.offsetY;
    // mouse.x = (px / width) * 2 - 1;
    // mouse.y = -(py / height) * 2 + 1;

    console.log(mouse);

    // 使用当前相机和映射点修改当前射线属性
    raycaster.setFromCamera(mouse, threeState.camera!);

    // 计算物体和射线的交点
    let intersects = raycaster.intersectObjects(threeState.scene!.children);
    console.log(intersects);
    if (intersects.length > 0) {
      // 取第一个元素, 并将其改变颜色
      const object = intersects[0].object;
      (object as any).material.color = new THREE.Color('#f60');
    }
  });
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
  addRaycaster();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>

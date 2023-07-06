<template>
  <div class="light-container relative" ref="lightRef">
    <el-checkbox v-model="checkedAmbient" size="large">
      环境光(AmbientLight)
    </el-checkbox>
    <br />
    <el-radio-group v-model="light" class="ml-4 w-800px">
      <el-radio label="DirectionalLight" size="large">
        平行光(DirectionalLight)
      </el-radio>
      <el-radio label="HemisphereLight" size="large">
        半球光(HemisphereLight)
      </el-radio>
      <el-radio label="PointLight" size="large"> 点光源(PointLight) </el-radio>
      <el-radio label="RectAreaLight" size="large">
        平面光光源(RectAreaLight)
      </el-radio>
      <el-radio label="SpotLight" size="large"> 聚光灯(SpotLight) </el-radio>
    </el-radio-group>
    <div id="base-light"></div>
  </div>
</template>

<script setup lang="ts">
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { useThree } from '@/hooks';
import { UnionToObj } from '@/typing';
import { TLight, createLight, ILight } from '@/hooks/useThree/utils/light';

defineOptions({
  name: 'base-light',
});
const lightRef = ref();
const checkedAmbient = ref(true);
const light =
  ref<Exclude<TLight, 'AmbientLightProbe' | 'HemisphereLightProbe'>>(
    'DirectionalLight'
  );

const width = 800;
const height = 700;
const { threeState, THREE } = useThree('base-light', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 350,
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
    far: 10000,
  },
  cameraPosition: { x: 500, y: 500, z: 500 },
  renderFn: initRender,
});

function initGeometry() {
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);

  const rectGeometry = new THREE.BoxGeometry(50, 50, 50);
  const rectMaterial = new THREE.MeshStandardMaterial();
  const rectMesh = new THREE.Mesh(rectGeometry, rectMaterial);
  rectMesh.position.set(150, 0, 150);
  threeState.scene?.add(rectMesh);
}

const lightObj: UnionToObj<
  Exclude<TLight, 'AmbientLightProbe' | 'HemisphereLightProbe'>,
  { lightInstance: any; lightHelper?: any }
> = {
  AmbientLight: {
    lightInstance: null,
  },
  DirectionalLight: {
    lightInstance: null,
    lightHelper: null,
  },
  HemisphereLight: {
    lightInstance: null,
    lightHelper: null,
  },
  PointLight: {
    lightInstance: null,
    lightHelper: null,
  },
  RectAreaLight: {
    lightInstance: null,
    lightHelper: null,
  },
  SpotLight: {
    lightInstance: null,
    lightHelper: null,
  },
};

function createLightFn<T extends TLight = 'AmbientLight'>(
  type: TLight | T,
  hasHelper = true,
  params: ILight<T> = {
    position: { x: 100, y: 300, z: 150 },
    helperConfig: {
      hidden: true, // 默认不显示该光源辅助对象
    },
    options: {
      intensity: 0, // 默认光照强度为0
    },
  }
) {
  const lightType = type as Exclude<
    TLight,
    'AmbientLightProbe' | 'HemisphereLightProbe'
  >;
  lightObj[lightType] = createLight(lightType, params);
  threeState.scene?.add(lightObj[lightType].lightInstance);
  if (hasHelper) {
    threeState.scene?.add(lightObj[lightType].lightHelper);
  }
}
function addLight() {
  // 环境光
  createLightFn('AmbientLight', false, {
    options: { color: 0x444444 },
  });

  // 平行光
  createLightFn('DirectionalLight', true, {
    helperConfig: {
      hidden: false,
    },
    options: {
      intensity: 1, // 默认光照强度为0
    },
    position: { x: 100, y: 300, z: 150 },
  });

  // 半球光
  createLightFn('HemisphereLight', true);

  // 点光源
  createLightFn('PointLight', true);

  // 平面光光源
  createLightFn('RectAreaLight', true);
  lightObj.RectAreaLight.lightInstance.lookAt(160, 0, 160);

  // 聚光灯
  createLightFn('SpotLight', true);
}

function addGUI() {
  const gui = new GUI({
    container: lightRef.value,
  });
  const guiA = gui.addFolder('环境光参数').close();
  const ambient = {
    intensity: lightObj.AmbientLight.lightInstance.intensity, // 光强
    color: 0x444444, // 光颜色
  };
  guiA
    .add(ambient, 'intensity', 0, 500, 0.01)
    .name('光照强度')
    .onChange((val: number) => {
      lightObj.AmbientLight.lightInstance.intensity = val;
    });
  guiA
    .addColor(ambient, 'color')
    .listen()
    .name('光照颜色')
    .onChange((val: number) => {
      lightObj.AmbientLight.lightInstance.color = new THREE.Color(val);
    });

  const guiD = gui.addFolder('平行光参数').close();
  const durectuibak = {
    intensity: lightObj.DirectionalLight.lightInstance.intensity, // 光强
    color: 0x444444, // 光颜色
  };
  guiD
    .add(durectuibak, 'intensity', 0, 500, 0.01)
    .name('强度')
    .onChange((val: number) => {
      lightObj.DirectionalLight.lightInstance.intensity = val;
    });
  guiD
    .addColor(durectuibak, 'color')
    .listen()
    .name('颜色')
    .onChange((val: number) => {
      lightObj.DirectionalLight.lightInstance.color = new THREE.Color(val);
      lightObj.DirectionalLight.lightHelper.update();
    });

  const guiH = gui.addFolder('半球光参数').close();
  const hemisphere = {
    intensity: lightObj.HemisphereLight.lightInstance.intensity, // 光强
    color: 0x444444, // 天空中发出光线的颜色
    groundColor: 0x444444, // 地面发出光线的颜色
  };
  guiH
    .add(hemisphere, 'intensity', 0, 500, 0.01)
    .name('强度')
    .onChange((val: number) => {
      lightObj.HemisphereLight.lightInstance.intensity = val;
    });
  guiH
    .addColor(hemisphere, 'color')
    .listen()
    .name('天空颜色')
    .onChange((val: number) => {
      lightObj.HemisphereLight.lightInstance.color = new THREE.Color(val);
      lightObj.HemisphereLight.lightHelper.update();
    });
  guiH
    .addColor(hemisphere, 'groundColor')
    .listen()
    .name('地面颜色')
    .onChange((val: number) => {
      lightObj.HemisphereLight.lightInstance.groundColor = new THREE.Color(val);
      lightObj.HemisphereLight.lightHelper.update();
    });

  const guiP = gui.addFolder('点光源参数').close();
  const point = {
    intensity: lightObj.PointLight.lightInstance.intensity, // 光强
    color: 0x444444, // 光颜色
    distance: 0,
    decay: 2,
  };
  guiP
    .add(point, 'intensity', 0, 500, 0.01)
    .name('强度')
    .onChange((val: number) => {
      lightObj.PointLight.lightInstance.intensity = val;
    });
  guiP
    .addColor(point, 'color')
    .listen()
    .name('颜色')
    .onChange((val: number) => {
      lightObj.PointLight.lightInstance.color = new THREE.Color(val);
      lightObj.PointLight.lightHelper.update();
    });
  guiP
    .add(point, 'distance', 0, 1000, 0.01)
    .name('距离')
    .onChange((val: number) => {
      lightObj.PointLight.lightInstance.distance = val;
    });
  guiP
    .add(point, 'decay', 0, 1000, 0.01)
    .name('衰退量')
    .onChange((val: number) => {
      lightObj.PointLight.lightInstance.decay = val;
    });

  const guiR = gui.addFolder('平面光光源参数').close();
  const rectArea = {
    intensity: lightObj.RectAreaLight.lightInstance.intensity, // 光强
    color: 0x444444, // 光颜色
    width: 10,
    height: 10,
  };
  guiR
    .add(rectArea, 'intensity', 0, 500, 0.01)
    .name('强度')
    .onChange((val: number) => {
      lightObj.RectAreaLight.lightInstance.intensity = val;
    });
  guiR
    .addColor(rectArea, 'color')
    .listen()
    .name('颜色')
    .onChange((val: number) => {
      lightObj.RectAreaLight.lightInstance.color = new THREE.Color(val);
    });
  guiR
    .add(rectArea, 'width', 0, 1000, 0.01)
    .name('宽度')
    .onChange((val: number) => {
      lightObj.RectAreaLight.lightInstance.width = val;
    });
  guiR
    .add(rectArea, 'height', 0, 1000, 0.01)
    .name('高度')
    .onChange((val: number) => {
      lightObj.RectAreaLight.lightInstance.height = val;
    });

  const guiS = gui.addFolder('聚光灯参数').close();
  const spot = {
    intensity: lightObj.SpotLight.lightInstance.intensity, // 光强
    color: 0x444444, // 光颜色
    distance: 0,
    decay: 2,
    angle: 0,
    penumbra: 0,
  };
  guiS
    .add(spot, 'intensity', 0, 500, 0.01)
    .name('强度')
    .onChange((val: number) => {
      lightObj.SpotLight.lightInstance.intensity = val;
    });
  guiS
    .addColor(spot, 'color')
    .listen()
    .name('颜色')
    .onChange((val: number) => {
      lightObj.SpotLight.lightInstance.color = new THREE.Color(val);
      lightObj.SpotLight.lightHelper.update();
    });
  guiS
    .add(spot, 'distance', 0, 1000, 0.01)
    .name('距离')
    .onChange((val: number) => {
      lightObj.SpotLight.lightInstance.distance = val;
    });
  guiS
    .add(spot, 'decay', 0, 1000, 0.01)
    .name('衰退量')
    .onChange((val: number) => {
      lightObj.SpotLight.lightInstance.decay = val;
    });
  guiS
    .add(spot, 'penumbra', 0, 1, 0.01)
    .name('聚光锥半影衰减百分比')
    .onChange((val: number) => {
      lightObj.SpotLight.lightInstance.penumbra = val;
    });
  guiS
    .add(spot, 'angle', 0, Math.PI / 2)
    .name('散射角度')
    .onChange((val: number) => {
      lightObj.SpotLight.lightInstance.angle = val;
      lightObj.SpotLight.lightHelper.update();
    });
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

function initRender() {
  initGeometry();
  addLight();
  addGUI();
  render();
}

watch(checkedAmbient, (val) => {
  lightObj.AmbientLight.lightInstance.intensity = val ? 1 : 0;
});
watch(light, (val) => {
  for (const key in lightObj) {
    const indexKey = key as Exclude<
      TLight,
      'AmbientLightProbe' | 'HemisphereLightProbe'
    >;
    if (key !== 'AmbientLight') {
      if (val === indexKey) {
        lightObj[indexKey].lightInstance.intensity =
          val === 'RectAreaLight' ? 300 : 1;
        if (lightObj[indexKey].lightHelper) {
          lightObj[indexKey].lightHelper.visible = true;
        }
      } else {
        lightObj[indexKey].lightInstance.intensity = 0;
        if (lightObj[indexKey].lightHelper) {
          lightObj[indexKey].lightHelper.visible = false;
        }
      }
    }
  }
});
</script>

<style lang="scss">
.lil-gui.allow-touch-styles.root {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
F

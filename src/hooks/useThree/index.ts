import * as THREE from 'three';

// 轨道控制器(视觉控制器)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import {
  LineMaterial,
  LineMaterialParameters,
} from 'three/examples/jsm/lines/LineMaterial';

import { IThree, IThreeState } from './type';

export function useThree(id: string, params: IThree) {
  const {
    config: {
      width = window.innerWidth,
      height = window.innerHeight,
      cameraType = 'PerspectiveCamera',
      renderOptions = {},
      enableControl = true,
      enableAxesHelper = false,
      helperConfig = {
        axesHelperSize: 10,
      },
    },
    cameraOptions: {
      left = 0,
      top = 0,
      right = 0,
      bottom = 0,
      near = 1,
      far = 1000,
      fov = 0,
      aspect = 0,
    },
  } = params;

  let camera;
  switch (cameraType) {
    case 'OrthographicCamera':
      camera = new THREE.OrthographicCamera(
        left,
        right,
        top,
        bottom,
        near,
        far
      );
      break;
    case 'PerspectiveCamera':
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      break;
    default:
      break;
  }
  const helperState = reactive<{
    controlInstance?: OrbitControls;
    axesHelperInstance?: THREE.AxesHelper;
  }>({});
  const threeState: IThreeState<typeof camera> = {
    width,
    height,
    scene: new THREE.Scene(),
    camera,
    renderer: new THREE.WebGLRenderer(renderOptions),
  };
  // 设置渲染器宽高
  threeState.renderer?.setSize(width!, height!);
  // 设置渲染器背景颜色及其透明度
  // threeState.renderer?.setClearColor(0xb9d3ff, 1);

  // 绘制线条
  function drawLine({
    points,
    lineOptions = {},
  }: {
    points: number[] | Float32Array;
    lineOptions?: LineMaterialParameters;
  }) {
    const geometry = new LineGeometry();
    geometry.setPositions(points);
    const material = new LineMaterial({ color: 0x0000ff, ...lineOptions });
    material.resolution.set(width, height);
    const line = new Line2(geometry, material);
    // 使用虚线必须调用computeLineDistances
    line.computeLineDistances();
    return line;
  }

  // 渲染函数
  onMounted(() => {
    document.getElementById(id)?.appendChild(threeState.renderer!.domElement);
    // 轨道(视觉控制器)
    if (enableControl) {
      helperState.controlInstance = new OrbitControls(
        threeState.camera!,
        threeState.renderer.domElement
      );
    }
    // 三维坐标轴辅助线
    if (enableAxesHelper) {
      helperState.axesHelperInstance = new THREE.AxesHelper(
        helperConfig.axesHelperSize
      );
      threeState.scene?.add(toRaw(helperState.axesHelperInstance));
    }
    params.renderFn && params.renderFn();
  });
  return {
    THREE,
    OrbitControls,

    threeState,
    helperState,

    drawLine,
  };
}

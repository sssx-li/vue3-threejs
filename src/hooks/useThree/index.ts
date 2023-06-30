export * from './utils';

import * as THREE from 'three';
// 轨道控制器(视觉控制器)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { ICameraType, IThree, IThreeState, TCamera } from './type';
import { isCameraType } from './utils';

export function useThree<T extends TCamera = 'OrthographicCamera'>(
  id: string,
  params: IThree<T>
) {
  const {
    config: {
      width = window.innerWidth,
      height = window.innerHeight,
      cameraType = 'OrthographicCamera',
      renderOptions = {},
      enableControl = true,
      enableAxesHelper = false,
      helperConfig = {
        axesHelperSize: 10,
      },
    },
    cameraOptions: { near = 1, far = 1000 },
  } = params;

  let camera;
  if (isCameraType<T>('OrthographicCamera', cameraType as TCamera as T)) {
    const {
      left = 0,
      right = 0,
      top = 0,
      bottom = 0,
    } = params.cameraOptions as ICameraType['OrthographicCamera']['options'];
    camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
  } else {
    const { fov = 0, aspect = 0 } =
      params.cameraOptions as ICameraType['PerspectiveCamera']['options'];
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  }
  const threeState: IThreeState<T> = {
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

  // 辅助对象
  const helperState = reactive<{
    controlInstance?: OrbitControls;
    axesHelperInstance?: THREE.AxesHelper;
  }>({});

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
  };
}

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
    cameraOptions: { near = 0.1, far = 2000 },
    cameraPosition = {},
  } = params;

  let camera;
  if (isCameraType<T>('OrthographicCamera', cameraType as TCamera as T)) {
    const {
      left = -1,
      right = 1,
      top = 1,
      bottom = -1,
    } = params.cameraOptions as ICameraType['OrthographicCamera']['options'];
    /**
     * 透视相机
     * 这一摄像机使用orthographic projection（正交投影）来进行投影。
     * 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。
     * 
     OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
        left — 摄像机视锥体左侧面。
        right — 摄像机视锥体右侧面。
        top — 摄像机视锥体上侧面。
        bottom — 摄像机视锥体下侧面。
        near — 摄像机视锥体近端面。
        far — 摄像机视锥体远端面。
     */
    camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
  } else {
    const { fov = 50, aspect = 1 } =
      params.cameraOptions as ICameraType['PerspectiveCamera']['options'];
    /**
     * 透视相机
     * 这一摄像机使用perspective projection（透视投影）来进行投影。
     * 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
     * 
     PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
        fov — 摄像机视锥体垂直视野角度
        aspect — 摄像机视锥体长宽比
        near — 摄像机视锥体近端面
        far — 摄像机视锥体远端面
     */
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
    // 设置相机位置
    threeState.camera?.position.set(
      cameraPosition.x || 0,
      cameraPosition.y || 0,
      cameraPosition.z || 0
    );
    threeState.camera?.lookAt(threeState.scene!.position);
    params.renderFn && params.renderFn();
  });
  return {
    THREE,
    OrbitControls,

    threeState,
    helperState,
  };
}

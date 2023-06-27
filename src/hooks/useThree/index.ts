import * as THREE from 'three';
import { ICoordinate, IThree, IThreeState } from './type';

export function useThree(id: string, params: IThree) {
  const {
    config: {
      width = window.innerWidth,
      height = window.innerHeight,
      cameraType = 'PerspectiveCamera',
      renderOptions = {},
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
  const threeState: IThreeState<typeof camera> = {
    width,
    height,
    scene: new THREE.Scene(),
    camera,
    renderer: new THREE.WebGLRenderer({
      ...renderOptions,
    }),
  };
  // 设置渲染器宽高
  threeState.renderer?.setSize(width!, height!);
  // 设置渲染器背景颜色及其透明度
  // threeState.renderer?.setClearColor(0xb9d3ff, 1);

  function addPointToLine(pointArr: Array<ICoordinate>) {
    const points: any[] = [];
    pointArr.forEach((item) => {
      points.push(new THREE.Vector3(item.x, item.y, item.z));
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    let material;
    if (
      !params.lineConfig?.type ||
      params.lineConfig?.type === 'LineBasicMaterial'
    ) {
      material = new THREE.LineBasicMaterial(params.lineConfig!.options);
    } else {
      material = new THREE.LineDashedMaterial(params.lineConfig!.options);
    }
    const line = new THREE.Line(geometry, material);
    return line;
  }

  nextTick(() => {
    document.getElementById(id)?.appendChild(threeState.renderer!.domElement);
    params.initFn && params.initFn();
  });
  return {
    THREE,
    threeState,
    addPointToLine,
  };
}

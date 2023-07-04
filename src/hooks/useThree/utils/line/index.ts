import { BufferGeometry, Line, Vector3 } from 'three';

import { ILine, TLineMaterial } from './type';
import { createLineMateral, isLineMateralType } from './utils';

// Line2
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

// 线条
export function cereateLine<T extends TLineMaterial = 'LineBasicMaterial'>(
  params: ILine<T>
) {
  const {
    type = 'LineBasicMaterial' as T,
    points = [],
    options = {},
    useLine2 = false,
    line2Options = { points: [] },
    position = {},
  } = params;
  const isDashed = isLineMateralType<T>(
    'LineDashedMaterial',
    type as TLineMaterial as T
  );
  let geometry, material, lineInstance;
  if (!useLine2) {
    if (!points || points.length === 0) {
      throw new Error('请传入points');
    }
    const linePoints = points.map(
      (item) => new Vector3(item[0], item[1], item[2])
    );
    geometry = new BufferGeometry().setFromPoints(linePoints);
    material = createLineMateral<T>(type as TLineMaterial as T, options!);
    lineInstance = new Line(geometry, material);
  } else {
    geometry = new LineGeometry();
    if (!line2Options?.points || line2Options.points.length === 0) {
      throw new Error('请传入points');
    }
    geometry.setPositions(line2Options.points);
    material = new LineMaterial({
      color: 0x0000ff,
      ...line2Options?.options,
      dashed: isDashed,
    });
    material.resolution.set(
      line2Options?.width || window.innerWidth,
      line2Options?.height || window.innerHeight
    );
    lineInstance = new Line2(geometry, material);
  }

  if (isDashed) {
    // 使用虚线必须调用computeLineDistances
    lineInstance.computeLineDistances();
  }
  lineInstance.position.set(position.x || 0, position.y || 0, position.z || 0);

  return {
    geometry,
    material,
    lineInstance,
  };
}

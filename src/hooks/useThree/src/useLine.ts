import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

import { ILine, IWH } from '../type';

export function useLine(params: Partial<IWH> = {}) {
  const { width = window.innerWidth, height = window.innerHeight } = params;

  function pointToLine(options: ILine) {
    const { points, lineOptions = {} } = options;
    const geometry = new LineGeometry();
    geometry.setPositions(points);
    const material = new LineMaterial({ color: 0x0000ff, ...lineOptions });
    material.resolution.set(width, height);
    const line = new Line2(geometry, material);
    // 使用虚线必须调用computeLineDistances
    line.computeLineDistances();
    return line;
  }

  return {
    pointToLine,
  };
}

import { ArcCurve, BufferGeometry, CubicBezierCurve, Line } from 'three';
import { TLine } from '../line/type';
import { ICurve, TCurve } from './type';
import { createLineMateral } from '../line/utils';

// 曲线
export function createCurve<
  T extends TCurve = 'ArcCurve',
  D extends TLine = 'LineBasicMaterial'
>(
  type: T,
  {
    options,
    lineconfig = {
      dashed: false,
    },
  }: ICurve<T, D>
) {
  let curve;
  switch (type) {
    case 'ArcCurve':
      const { aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise } =
        options as ICurve<'ArcCurve'>['options'];
      curve = new ArcCurve(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise);
      break;
    case 'CatmullRomCurve3':
      break;
    case 'CubicBezierCurve':
      const { v0, v1, v2, v3 } =
        options as ICurve<'CubicBezierCurve'>['options'];
      curve = new CubicBezierCurve(v0, v1, v2, v3);
      break;
    case 'CubicBezierCurve3':
      break;
    case 'EllipseCurve':
      break;
    case 'LineCurve':
      break;
    case 'LineCurve3':
      break;
    case 'QuadraticBezierCurve':
      break;
    case 'QuadraticBezierCurve3':
      break;
    case 'SplineCurve':
      break;
    default:
      break;
  }

  const points = curve?.getPoints(lineconfig.pointsCount);
  const geometry = new BufferGeometry().setFromPoints(points!);
  const material = createLineMateral<D>(
    lineconfig.dashed,
    lineconfig.options || {}
  );
  const curveInstance = new Line(geometry, material);
  // 使用虚线必须调用computeLineDistances
  lineconfig.dashed && curveInstance.computeLineDistances();

  // 弧线
  return {
    curve,
    curveInstance,
  };
}
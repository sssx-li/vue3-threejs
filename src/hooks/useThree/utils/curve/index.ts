import {
  ArcCurve,
  BufferGeometry,
  CatmullRomCurve3,
  CubicBezierCurve,
  CubicBezierCurve3,
  EllipseCurve,
  Line,
  LineCurve,
  LineCurve3,
  QuadraticBezierCurve,
  QuadraticBezierCurve3,
  SplineCurve,
} from 'three';
import { TLineMaterial } from '../line/type';
import { ICurve, TCurve } from './type';
import { createLineMateral, isLineMateralType } from '../line/utils';
import { pointsToVector, pointsToVectorArr } from '..';

// 曲线
/**
 *
 * @param type 曲线类型
 * @param params 曲线配置参数
 * @returns
 */
export function createCurve<
  T extends TCurve = 'ArcCurve',
  D extends TLineMaterial = 'LineBasicMaterial'
>(type: TCurve | T, params: ICurve<T, D>) {
  const {
    options,
    lineconfig = {
      type: 'LineBasicMaterial',
      dashed: false,
    },
    position = {},
  } = params;
  const isDashed = isLineMateralType<D>(
    'LineDashedMaterial',
    lineconfig.type as TLineMaterial as D
  );
  let curve;
  switch (type) {
    case 'ArcCurve': // 弧线(圆弧)
      const arc = options as ICurve<'ArcCurve', D>['options'];
      curve = new ArcCurve(
        arc.aX || 0,
        arc.aY || 0,
        arc.aRadius,
        arc.aStartAngle || 0,
        arc.aEndAngle || 2 * Math.PI,
        arc.aClockwise
      );
      break;
    case 'CatmullRomCurve3': // 三维样条曲线
      const catmullRom3 = options as ICurve<'CatmullRomCurve3', D>['options'];
      curve = new CatmullRomCurve3(
        pointsToVectorArr('Vector3', catmullRom3.points),
        catmullRom3.closed,
        catmullRom3.curveType || 'centripetal',
        catmullRom3.tension || 0.5
      );
      break;
    case 'CubicBezierCurve': // 二维三次贝塞尔曲线
      const cubicBezier = options as ICurve<'CubicBezierCurve', D>['options'];
      curve = new CubicBezierCurve(
        pointsToVector('Vector2', cubicBezier.v0),
        pointsToVector('Vector2', cubicBezier.v1),
        pointsToVector('Vector2', cubicBezier.v2),
        pointsToVector('Vector2', cubicBezier.v3)
      );
      break;
    case 'CubicBezierCurve3': // 三维三次贝塞尔曲线
      const cubicBezier3 = options as ICurve<'CubicBezierCurve3', D>['options'];
      curve = new CubicBezierCurve3(
        pointsToVector('Vector3', cubicBezier3.v0),
        pointsToVector('Vector3', cubicBezier3.v1),
        pointsToVector('Vector3', cubicBezier3.v2),
        pointsToVector('Vector3', cubicBezier3.v3)
      );
      break;
    case 'EllipseCurve': // 椭圆曲线
      const ellipse = options as ICurve<'EllipseCurve'>['options'];
      curve = new EllipseCurve(
        ellipse.aX || 0,
        ellipse.aY || 0,
        ellipse.xRadius || 1,
        ellipse.yRadius || 1,
        ellipse.aStartAngle || 0,
        ellipse.aEndAngle || 2 * Math.PI,
        ellipse.aClockwise,
        ellipse.aRotation || 0
      );
      break;
    case 'LineCurve': // 二维线段曲线
      const line = options as ICurve<'LineCurve'>['options'];
      curve = new LineCurve(
        pointsToVector('Vector2', line.v1),
        pointsToVector('Vector2', line.v2)
      );
      break;
    case 'LineCurve3': // 三维线段曲线
      const line3 = options as ICurve<'LineCurve3'>['options'];
      curve = new LineCurve3(
        pointsToVector('Vector3', line3.v1),
        pointsToVector('Vector3', line3.v2)
      );
      break;
    case 'QuadraticBezierCurve': // 二维二次贝塞尔曲线
      const quadraticBezier =
        options as ICurve<'QuadraticBezierCurve'>['options'];
      curve = new QuadraticBezierCurve(
        pointsToVector('Vector2', quadraticBezier.v0),
        pointsToVector('Vector2', quadraticBezier.v1),
        pointsToVector('Vector2', quadraticBezier.v2)
      );
      break;
    case 'QuadraticBezierCurve3': // 三维二次贝塞尔曲线
      const quadraticBezier3 =
        options as ICurve<'QuadraticBezierCurve3'>['options'];
      curve = new QuadraticBezierCurve3(
        pointsToVector('Vector3', quadraticBezier3.v0),
        pointsToVector('Vector3', quadraticBezier3.v1),
        pointsToVector('Vector3', quadraticBezier3.v2)
      );
      break;
    case 'SplineCurve': // 样条曲线
      const spline = options as ICurve<'SplineCurve'>['options'];
      curve = new SplineCurve(pointsToVectorArr('Vector2', spline.points));
      break;
    default:
      break;
  }

  const points = curve?.getPoints(params.lineconfig?.pointsCount);
  const geometry = new BufferGeometry().setFromPoints(points!);
  const material = createLineMateral<D>(
    lineconfig.type as TLineMaterial as D,
    isDashed,
    params.lineconfig?.options || {}
  );
  const curveInstance = new Line(geometry, material);
  // 使用虚线必须调用computeLineDistances
  isDashed && curveInstance.computeLineDistances();
  curveInstance.position.set(position.x || 0, position.y || 0, position.z || 0);

  // 弧线
  return {
    curve,
    curveInstance,
  };
}

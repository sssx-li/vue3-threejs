export * from './line';
export * from './curve';
export * from './light';

import { Vector2, Vector3 } from 'three';
import { IVector, TCamera, TVector, isVector } from '../type';

// 判断value的值是否属于TCamera
export function isCameraType<T extends TCamera>(type: TCamera, value: T) {
  return type === value;
}

// 坐标点转Vector
export function pointsToVector<T extends TVector = 'Vector2'>(
  type: TVector | T = 'Vector2',
  points: IVector[T]
) {
  let vector;
  if (type === 'Vector2') {
    vector = new Vector2(points[0], points[1]);
  } else {
    vector = new Vector3(points[0], points[1], points[2]);
  }
  return vector! as isVector<T>;
}

// 坐标点转Vector数组
export function pointsToVectorArr<T extends TVector = 'Vector2'>(
  type: TVector | T = 'Vector2',
  points: IVector[T][]
) {
  let vectorArr;
  if (type === 'Vector2') {
    vectorArr = points.map((item) => new Vector2(item[0], item[1]));
  } else {
    vectorArr = points.map((item) => new Vector3(item[0], item[1], item[2]));
  }
  return vectorArr as isVector<T>[];
}

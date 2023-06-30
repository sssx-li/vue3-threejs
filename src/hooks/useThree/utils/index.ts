export * from './line';
export * from './curve';

import { TCamera } from '../type';

// 判断value的值是否属于TCamera
export function isCameraType<T extends TCamera>(
  type: TCamera,
  value: T
): value is T {
  return type === value;
}

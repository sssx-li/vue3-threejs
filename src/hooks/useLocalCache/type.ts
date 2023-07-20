import { ObjToUnion } from '@/typing';

export interface ILocalCache {
  token: string;
  userInfo: { username: string; avatar: string }; // 用户信息
}
export type Keys = ObjToUnion<ILocalCache>;

export type TGetCache = ILocalCache['userInfo'] | string;

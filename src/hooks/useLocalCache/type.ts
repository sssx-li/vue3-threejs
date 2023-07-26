export interface ILocalCache {
  token: string;
  userInfo: { username: string; avatar: string }; // 用户信息
}
export type Keys = keyof ILocalCache;

export type TGetCache = ILocalCache['userInfo'] | string;

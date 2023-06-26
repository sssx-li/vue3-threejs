import { useLocalCache, useMessage } from '@/hooks';
import { responseStatusCode } from './api';
import Fetch from './fetch';

const { getCache, clearCache } = useLocalCache();
const { error } = useMessage();
const whiteApis = ['/login']; // 接口白名单

export const Request = new Fetch({
  baseUrl: import.meta.env.VITE_BASE_URL,
  options: {
    beforeFetch({ options, cancel, url }) {
      const token = getCache('token');
      if (!whiteApis.find((item) => url.includes(item)) && !token) {
        cancel();
      }
      options.headers = {
        ...options.headers,
        Authorization: token,
      };
      return { options };
    },
    afterFetch(ctx) {
      // 这里做统一错误处理
      const { code, message } = ctx.data;
      if (code === responseStatusCode.tokenInvalid) {
        error('登录过期，请重新登录');
        clearCache();
        location.reload();
      } else if (code !== responseStatusCode.success) {
        error(message || '请求失败，请稍后再试');
      }
      return ctx;
    },
    onFetchError(ctx) {
      console.log('ctx', ctx);
      const { code, message } = ctx.error;
      if (code === responseStatusCode.aborted) {
        error(message || '请求取消');
      } else {
        error('请求错误，请稍后再试');
      }
      return ctx;
    },
    timeout: 10000,
  },
});
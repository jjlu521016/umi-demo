import { login } from '../services/index';
import { message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'loginToNamespace',
  state: {},
  subscriptions: {},
  effects: {
    * platformLogin({ payload }, { call }) {
      const response = yield call(login, payload);
      if (response && response.is_success === true) {
        const token = response.result.token;
        sessionStorage.setItem('platform_token', token);
        router.push('/');
      } else if (response && response.is_success === false) {
        message.error(response.error_info.msg);
      }
    },
  },
  reducers: {},
};

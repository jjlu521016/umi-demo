import request from '../request/request';
import router from 'umi/router';
import { message } from 'antd';

async function logout(params) {
  return request.post(request.api.platformLogout, params);
}


export default {
  namespace: 'logoutToNamespace',
  state: {},
  subscriptions: {},
  effects: {
    * platformLogout({ payload }, { call }) {
      const response = yield call(logout, payload);
      if (response && response.is_success === true) {
        sessionStorage.removeItem('platform_token');
        router.push('/login');
      } else {
        message.error(response.error_info.msg);
      }
    },
  },
  reducers: {},
};

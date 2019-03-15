import request from '../../../request/request';

export async function login(params) {
  return request.post(request.api.platformLogin, params);
}

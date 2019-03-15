import request from '../../../request/request';

export async function serviceFindPage(params) {
  return request.post(request.api.platformRolePage, params);
}

export async function serviceFindObject(params) {
  return request.get(request.api.platformRoleObject, params);
}

export async function serviceAdd(params) {
  return request.post(request.api.platformRoleAdd, params);
}

export async function serviceUpdate(params) {
  return request.post(request.api.platformRoleUpdate, params);
}

export async function serviceBatchDelete (params) {
  return request.post(request.api.platformRoleBatchDelete, params);
}


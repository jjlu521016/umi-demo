import {
  serviceFindPage,
  serviceAdd,
  serviceFindObject,
  serviceUpdate,
  serviceDelete,
  serviceBatchDelete,
} from '../services';
import { message } from 'antd';

export default {
  namespace: 'roleToNamespace',
  state: {
    tableData: {},
    defaultValue: {},
  },
  subscriptions: {},
  effects: {

    * findPage({ payload }, { call, put }) {
      const response = yield call(serviceFindPage, payload);
      if (response['is_success'] === true) {
        yield put({
          type: 'refreshTable',
          payload: response.result,
        });
      } else {
        message.error(response.error_info.msg);
      }
    },

    * findObject({ payload }, { call, put }) {
      const response = yield call(serviceFindObject, { id: payload });
      if (response['is_success'] === true) {
        yield put({
          type: 'refreshDefaultValue',
          payload: response.result,
        });
      } else {
        message.error(response.error_info.msg);
      }
    },

    * add({ payload }, { call }) {
      const response = yield call(serviceAdd, payload);
      if (response['is_success'] === true) {
        message.success(response.result.msg);
        return 1;
      } else {
        message.error(response.error_info.msg);
        return 2;
      }
    },

    * update({ payload }, { call }) {
      const response = yield call(serviceUpdate, payload);
      if (response['is_success'] === true) {
        message.success(response.result.msg);
        return 1;
      } else {
        message.error(response.error_info.msg);
        return 2;
      }
    },

    * batchDelete({ payload }, { call }) {
      const response = yield call(serviceBatchDelete, { id_list: payload });
      if (response['is_success'] === true) {
        message.success(response.result.msg);
        return 1;
      } else {
        message.error(response.error_info.msg);
        return 2;
      }
    },
  },

  reducers: {

    refreshTable(state, action) {
      return {
        ...state,
        tableData: action.payload,
      };
    },

    refreshDefaultValue(state, action) {
      return {
        ...state,
        defaultValue: action.payload,
      };
    },

    clearDefaultValue(state) {
      return {
        ...state,
        defaultValue: {},
      };
    },
  },
};

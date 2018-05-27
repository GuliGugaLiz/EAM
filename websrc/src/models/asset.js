import { queryAsset, removeAsset, addAsset, updateAsset } from '../services/api';

export default {
  namespace: 'asset',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAsset, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addAsset, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback},{ call, put }){
      const response = yield call(updateAsset, payload);
      yield put({
        type: 'save',
        payload:response
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeAsset, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

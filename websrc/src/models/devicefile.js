import { queryDeviceFile } from '../services/api';

export default {
  namespace: 'devicefile',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDeviceFile, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *download({payload},{ call }) {
        //TODO传出一个id
    }
    
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

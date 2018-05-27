import { queryTag, updateTag, removeTag} from '../services/api';

export default {
  namespace: 'tag',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({payload}, { call, put }) {
      const response = yield call(queryTag, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *update({payload}, { call, put }){
      const response = yield call(updateTag,payload);
      yield put({
        type:'save',
        payload:response
      });
    },
    *remove({payload}, { call, put}){
      const response = yield call(removeTag,payload);
      yield put({
        type:'save',
        payload:response
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    clear() {
      return {
        data: {
          list: [],
          pagination: {},
        },
      };
    },
  },
};

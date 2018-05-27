import { queryUsers, queryCurrent, updateUsers, removeUsers,addUser } from '../services/user';

export default {
  namespace: 'user',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch({payload}, { call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUsers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  
    *update({payload},{call,put,select}){
      yield call(updateUsers,payload);
      const response = yield call(updateUsers,payload);
      yield put({
        type:'save',
        payload:response,
      });
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};

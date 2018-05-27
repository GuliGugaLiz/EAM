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
  
    *removeUsers({payload,callback},{call,put,select}){
      const response = yield call(removeUsers,payload);
      const page = yield select(state => state.data)
      yield put({
        type:'fetch',
        payload:page,
      });
      if (callback) callback();
    },
    *updateUsers({id,params},{call,put,select}){
      yield call(updateUsers,id,params);
      const response = yield call(updateUsers,payload);
      yield put({
        type:'updateUsers',
        payload:response,
      });
    },
    *update({payload},{select,call,put}){
      const id = yield select(({user}) => user.currentUser.id)
      const newUser = {...payload,id}
      const data = yield call(update,newUser)
      yield put({
        type:'save',
      
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
    deleteUsers(state,action){
      return {
        ...state,
        data:action.payload,
      };
    },
    updateUsers(state,action) {
      return {
        ...state,
        data:action.payload,
      };
    }
  },
};

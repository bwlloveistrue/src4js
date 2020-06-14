import { 
  getConditionField, 
  addSubscribeInfo, 
  deleteSubscribeInfo, 
  updateSubscribeInfo, 
  fetch, 
  getTableInfoList,
  getSubscribeInfoFields } from './service';
  import { message } from 'antd';

const Model = {
  namespace: 'selectSubscribe',

  state: {
    data: {
      list: [],
      pagination: {},
    },//查看列表数据
    columns: [],//查看列表列
    condition:[],//高级搜索需要
    infoFields:[],//
  },

  effects: {
    *initForm({ payload }, { call, put }) {
      yield put({
        type: 'initFields',
      });
    },
    *getCondition({ payload }, { call, put }) {
      const response = yield call(getConditionField, payload);
      yield put({
        type: 'getConditionField',
        payload: response,
      });
    },
    *getTableInfo({ payload, callback }, { call, put }) {
      const response = yield call(getTableInfoList, payload);
      yield put({
        type: 'getTableInfoList',
        payload: response,
      });
      if (callback) callback(response);
    },
    *getSubscribeFields({ payload }, { call, put }) {
      const response = yield call(getSubscribeInfoFields, payload);
      yield put({
        type: 'getSubscribeInfoFields',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addSubscribeInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateSubscribeInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteSubscribeInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      if(action.payload.status){
        message.success(action.message || 'This is a success message')
      }else{
        message.error(action.error || 'This is a error message')
      }
      return {
        ...state
      }
    },
    initFields(state, action) {
      return {
        ...state,
        infoFields:[]
      }
    },
    getTableInfoList(state, action) {
      return {
        ...state,
        data: action.payload.data,
        columns: action.payload.columns,
      };
    },
    getConditionField(state, action) {
      return {
        ...state,
        condition: action.payload,
      };
    },
    getSubscribeInfoFields(state, action) {
      return {
        ...state,
        infoFields: {data:action.payload.data},
      };
    },
  },
};

export default Model;

import { 
  getConditionField, 
  addDriverInfo, 
  deleteDriverInfo, 
  updateDriverInfo, 
  fetch, 
  getTableInfoList,
  getDriverInfoFields } from './service';
  import { message } from 'antd';

const Model = {
  namespace: 'selectDriver',

  state: {
    data: {
      list: [],
      pagination: {},
    },//查看列表数据
    columns: [],//查看列表列
    condition:[],//高级搜索需要
    infoFields:[],//车辆录入主题
  },

  effects: {
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
    *getTruckFields({ payload }, { call, put }) {
      const response = yield call(getDriverInfoFields, payload);
      yield put({
        type: 'getDriverInfoFields',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addDriverInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateDriverInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteDriverInfo, payload);
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
    getDriverInfoFields(state, action) {
      return {
        ...state,
        infoFields: {data:action.payload.data},
      };
    },
  },
};

export default Model;

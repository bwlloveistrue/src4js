import { 
  getConditionField, 
  addOrderTaker, 
  deleteOrderTaker, 
  updateOrderTaker, 
  fetch, 
  getTableInfoList,
  getOrderTakersInfoFields,
  getorderTakersDispatchInfo } from './service';
  import { message } from 'antd';

const Model = {
  namespace: 'selectOrderApportion',

  state: {
    data: {
      list: [],
      pagination: {},
    },//查看列表数据
    columns: [],//查看列表列
    condition:[],//高级搜索需要
    infoFields:[],//车辆录入主题
    initFormFields:[],//车辆录入分配列表列
    initDatas:[],//车辆录入分配
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
    *getOrderTakersFields({ payload }, { call, put }) {
      const response = yield call(getOrderTakersInfoFields, payload);
      yield put({
        type: 'getOrderTakersInfoFields',
        payload: response,
      });
    },
    *getorderTakersDispatch({ payload }, { call, put }) {
      const response = yield call(getorderTakersDispatchInfo, payload);
      yield put({
        type: 'getOrderTakersInfoFields',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addOrderTaker, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateOrderTaker, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteOrderTaker, payload);
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
    getOrderTakersInfoFields(state, action) {
      return {
        ...state,
        infoFields: {data:action.payload.data},
        initFormFields:action.payload.initFormFields,//车辆录入分配列表列
        initDatas:action.payload.initDatas,//车辆录入分配
      };
    },
  },
};

export default Model;

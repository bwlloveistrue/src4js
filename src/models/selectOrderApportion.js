import { 
  getConditionField, 
  saveOrderApportion, 
  dispatchOrderApportion,
  deleteOrderApportion, 
  getTableInfoList,
  getOrderTakersApportionInfo } from '@/services/selectOrderApportionS';;
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
    initFormFields:[],//车辆分配列表列
    initDatas:[],//车辆分配
    orderTakerInfoColumns: [],//车辆录入列表列
    orderTakerInfoDetail: [],//车辆录入
  },

  effects: {
    *initForm({ payload }, { call, put }) {
      yield put({
        type: 'initFields',
      });
    },
    *getCondition({ payload, callback }, { call, put }) {
      const response = yield call(getConditionField, payload);
      yield put({
        type: 'getConditionField',
        payload: response,
      });
      if (callback) callback(response);
    },
    *getTableInfo({ payload, callback }, { call, put }) {
      const response = yield call(getTableInfoList, payload);
      yield put({
        type: 'getTableInfoList',
        payload: response,
      });
      if (callback) callback(response);
    },
    *getOrderTakersApportion({ payload }, { call, put }) {
      const response = yield call(getOrderTakersApportionInfo, payload);
      yield put({
        type: 'getOrderTakersInfoFields',
        payload: response,
      });
    },
    *saveOrderApportionInfo({ payload, callback }, { call, put }) {
      const response = yield call(saveOrderApportion, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *dispatchOrderApportionInfo({ payload, callback }, { call, put }) {
      const response = yield call(dispatchOrderApportion, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteOrderApportion, payload);
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
    getOrderTakersInfoFields(state, action) {
      return {
        ...state,
        infoFields: {data:action.payload.data},
        orderTakerInfoColumns: action.payload.editcolumns,
        orderTakerInfoDetail: action.payload.editdatas,
        initFormFields:action.payload.initFormFields,//车辆录入分配列表列
        initDatas:action.payload.initDatas,//车辆录入分配
      };
    },
  },
};

export default Model;

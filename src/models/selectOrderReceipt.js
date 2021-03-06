import { 
  getConditionField, 
  deleteOrderReceipt, 
  updateOrderReceipt, 
  getTableInfoList,
  getOrderReceiptInfoFields,
  addOrderReceipt } from '@/services/selectOrderReceiptS';;
  import { message } from 'antd';

const Model = {
  namespace: 'selectOrderReceipt',

  state: {
    data: {
      list: [],
      pagination: {},
    },//查看列表数据
    columns: [],//查看列表列
    condition:[],//高级搜索需要
    infoFields:[],//车辆录入主题
    receiptDetailIds:[],// 明细行数，用于计算费用盈利
    feeTypes:'', //所有费用类型，用于动态计算费用
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
    *getOrderReceiptDispatch({ payload }, { call, put }) {
      const response = yield call(getOrderReceiptInfoFields, payload);
      yield put({
        type: 'getOrderReceiptInfoFields',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addOrderReceipt, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateOrderReceipt, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteOrderReceipt, payload);
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
    getOrderReceiptInfoFields(state, action) {
      return {
        ...state,
        infoFields: {data:action.payload.data},
        receiptDetailIds:action.payload.receiptDetailIds,//车辆录入分配
        feeTypes:action.payload.feeTypes,//费用详情
      };
    },
  },
};

export default Model;

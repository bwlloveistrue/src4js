import request from '@/utils/request';

export async function getConditionField() {
  return request('/api/feeTypeInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addFeeTypeInfo(params) {
  return request('/api/feeTypeInfo/addFeeTypeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/feeTypeInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteFeeTypeInfo(params) {
  return request('/api/feeTypeInfo/deleteFeeTypeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFeeTypeInfo(params) {
  return request('/api/feeTypeInfo/updateFeeTypeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/feeTypeInfo/fetch', {
  });
}

export async function getFeeTypeInfoFields(params){
  return request('/api/feeTypeInfo/getFeeTypeInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
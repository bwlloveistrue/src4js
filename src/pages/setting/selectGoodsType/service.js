import request from '@/utils/request';

export async function getConditionField() {
  return request('/api/goodsTypeInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addGoodsTypeInfo(params) {
  return request('/api/goodsTypeInfo/addGoodsTypeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/goodsTypeInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteGoodsTypeInfo(params) {
  return request('/api/goodsTypeInfo/deleteGoodsTypeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateGoodsTypeInfo(params) {
  return request('/api/goodsTypeInfo/updateGoodsTypeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/goodsTypeInfo/fetch', {
  });
}

export async function getGoodsTypeInfoFields(params){
  return request('/api/goodsTypeInfo/getGoodsTypeInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
import request from '@/utils/request';

export async function getConditionField() {
  console.log('getCondition api----')
  return request('/api/orderApportion/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/orderApportion/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteOrderApportion(params) {
  return request('/api/orderApportion/deleteOrderApportion', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function addOrderApportion(params) {
  return request('/api/orderApportion/addOrderApportion', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function updateOrderApportion(params) {
  return request('/api/orderApportion/updateOrderApportion', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function getOrderTakersApportionInfo(params){
  return request('/api/orderApportion/getOrderApportionFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}


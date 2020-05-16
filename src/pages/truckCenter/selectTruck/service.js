import request from '@/utils/request';

export async function getConditionField() {
  console.log('getCondition api----')
  return request('/api/orderTaker/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addOrderTaker(params) {
  return request('/api/orderTaker/addOrderTaker', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/orderTaker/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteOrderTaker(params) {
  return request('/api/orderTaker/deleteOrderTaker', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateOrderTaker(params) {
  return request('/api/orderTaker/updateOrderTaker', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/orderTaker/fetch', {
  });
}

export async function getOrderTakersInfoFields(params){
  return request('/api/orderTaker/getOrderTakersInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
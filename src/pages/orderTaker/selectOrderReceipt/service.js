import request from '@/utils/request';

export async function getConditionField() {
  console.log('getCondition api----')
  return request('/api/orderReceipt/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/orderReceipt/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteOrderReceipt(params) {
  return request('/api/orderReceipt/deleteOrderReceipt', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateOrderReceipt(params) {
  return request('/api/orderReceipt/updateOrderReceipt', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function getOrderReceiptDispatchInfo(params){
  return request('/api/orderReceipt/getOrderReceiptDispatchInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}


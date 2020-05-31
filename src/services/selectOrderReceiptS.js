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

export async function addOrderReceipt(params) {
  return request('/api/orderReceipt/addOrderReceipt', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
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

export async function getOrderReceiptInfoFields(params){
  return request('/api/orderReceipt/getOrderReceiptFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}


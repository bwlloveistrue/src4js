import request from '@/utils/request';

export async function getConditionField() {
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

export async function saveOrderApportion(params) {
  return request('/api/orderApportion/saveOrderApportion', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function dispatchOrderApportion(params) {
  return request('/api/orderApportion/dispatchOrderApportion', {
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


import request from '@/utils/request';

export async function getConditionField() {
  return request('/api/subscribeInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addSubscribeInfo(params) {
  return request('/api/subscribeInfo/addSubscribeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/subscribeInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteSubscribeInfo(params) {
  return request('/api/subscribeInfo/deleteSubscribeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSubscribeInfo(params) {
  return request('/api/subscribeInfo/updateSubscribeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/subscribeInfo/fetch', {
  });
}

export async function getSubscribeInfoFields(params){
  return request('/api/subscribeInfo/getSubscribeInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
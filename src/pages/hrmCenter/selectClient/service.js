import request from '@/utils/request';

export async function getConditionField() {
  return request('/api/clientInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addClientInfo(params) {
  return request('/api/clientInfo/addClientInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/clientInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteClientInfo(params) {
  return request('/api/clientInfo/deleteClientInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateClientInfo(params) {
  return request('/api/clientInfo/updateClientInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/clientInfo/fetch', {
  });
}

export async function getClientInfoFields(params){
  return request('/api/clientInfo/getClientInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
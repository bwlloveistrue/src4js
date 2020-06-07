import request from '@/utils/request';

export async function getConditionField() {
  return request('/api/messageTypeInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addMessageTypeInfo(params) {
  return request('/api/messageTypeInfo/addMessageTypeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/messageTypeInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteMessageTypeInfo(params) {
  return request('/api/messageTypeInfo/deleteMessageTypeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateMessageTypeInfo(params) {
  return request('/api/messageTypeInfo/updateMessageTypeInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/messageTypeInfo/fetch', {
  });
}

export async function getMessageTypeInfoFields(params){
  return request('/api/messageTypeInfo/getMessageTypeInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
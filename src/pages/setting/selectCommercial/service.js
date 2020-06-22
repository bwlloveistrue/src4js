import request from '@/utils/request';

export async function getConditionField() {
  return request('/api/commercialInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addCommercialInfo(params) {
  return request('/api/commercialInfo/addCommercialInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/commercialInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteCommercialInfo(params) {
  return request('/api/commercialInfo/deleteCommercialInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateCommercialInfo(params) {
  return request('/api/commercialInfo/updateCommercialInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/commercialInfo/fetch', {
  });
}

export async function getCommercialInfoFields(params){
  return request('/api/commercialInfo/getCommercialInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
import request from '@/utils/request';

export async function getConditionField() {
  return request('/api/compulsoryInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addCompulsoryInfo(params) {
  return request('/api/compulsoryInfo/addCompulsoryInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/compulsoryInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteCompulsoryInfo(params) {
  return request('/api/compulsoryInfo/deleteCompulsoryInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateCompulsoryInfo(params) {
  return request('/api/compulsoryInfo/updateCompulsoryInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/compulsoryInfo/fetch', {
  });
}

export async function getCompulsoryInfoFields(params){
  return request('/api/compulsoryInfo/getCompulsoryInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
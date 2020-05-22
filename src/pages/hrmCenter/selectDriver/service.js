import request from '@/utils/request';

export async function getConditionField() {
  console.log('getCondition api----')
  return request('/api/driverInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addDriverInfo(params) {
  return request('/api/driverInfo/addDriverInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/driverInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteDriverInfo(params) {
  return request('/api/driverInfo/deleteDriverInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateDriverInfo(params) {
  return request('/api/driverInfo/updateDriverInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/driverInfo/fetch', {
  });
}

export async function getDriverInfoFields(params){
  return request('/api/driverInfo/getDriverInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
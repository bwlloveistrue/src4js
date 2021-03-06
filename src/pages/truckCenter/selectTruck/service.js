import request from '@/utils/request';

export async function getConditionField() {
  return request('/api/truckInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addTruckInfo(params) {
  return request('/api/truckInfo/addTruckInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/truckInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteTruckInfo(params) {
  return request('/api/truckInfo/deleteTruckInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateTruckInfo(params) {
  return request('/api/truckInfo/updateTruckInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function fetch() {
  return request('/api/truckInfo/fetch', {
  });
}

export async function getTruckInfoFields(params){
  return request('/api/truckInfo/getTruckInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
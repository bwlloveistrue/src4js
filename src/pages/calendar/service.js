import request from '@/utils/request';

export async function getData() {
  return request('/api/calendarInfo/getData', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getClientList(params) {
  return request('/api/calendarInfo/getClientList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getDriverList(params) {
  return request('/api/calendarInfo/getDriverList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTruckList(params) {
  return request('/api/calendarInfo/getTruckList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
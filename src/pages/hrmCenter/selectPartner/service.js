import request from '@/utils/request';

export async function getConditionField() {
  return request('/api/partnerInfo/getCondition', {
    method: 'POST',
    data: {
      method: 'post',
    },
  });
}

export async function addPartnerInfo(params) {
  return request('/api/partnerInfo/addPartnerInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getTableInfoList(params) {
  return request('/api/partnerInfo/getTableInfoList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function deletePartnerInfo(params) {
  return request('/api/partnerInfo/deletePartnerInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updatePartnerInfo(params) {
  return request('/api/partnerInfo/updatePartnerInfo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  })
}

export async function getPartnerInfoFields(params){
  return request('/api/partnerInfo/getPartnerInfoFields', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
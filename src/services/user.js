import request from '@/utils/request';

export async function query() {
  return request('/api/user/getUsers');
}

export async function queryCurrent() {
  return request('/api/user/getCurrentUser', {
    method: 'POST',
  });
}

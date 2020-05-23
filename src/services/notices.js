import request from '@/utils/request';

export async function queryNotices() {
  return request('/api/notices/getNotices', {
    method: 'POST',
  });
}

export async function clearNotices() {
  return request('/api/notices/clearNotices', {
    method: 'POST',
  });
}

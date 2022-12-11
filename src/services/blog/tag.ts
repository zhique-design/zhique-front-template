import request from '@/utils/request';

const BASE_URL = '/v1/blog';

export async function queryTagList(params?) {
  return request(`${BASE_URL}/tags`, {
    method: 'GET',
    params,
  });
}

export async function submitTag(params) {
  const { id } = params;
  if (id) {
    return request(`${BASE_URL}/tags/${id}`, {
      method: 'PATCH',
      data: params,
    });
  }
  return request(`${BASE_URL}/tags`, {
    method: 'POST',
    data: params,
  });
}

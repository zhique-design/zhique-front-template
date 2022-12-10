import request from '@/utils/request';

const BASE_URL = '/v1/blog';

export async function queryCategoryList(params?) {
  return request(`${BASE_URL}/categories`, {
    method: 'GET',
    params,
  });
}

export async function submitCategory(params) {
  const { id } = params;
  if (id) {
    return request(`${BASE_URL}/categories/${id}`, {
      method: 'PATCH',
      data: params,
    });
  }
  return request(`${BASE_URL}/categories`, {
    method: 'POST',
    data: params,
  });
}

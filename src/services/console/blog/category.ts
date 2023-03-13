import request from '@/utils/request';

const BASE_URL = '/v1/console';

export async function queryCategoryList(params?): Promise<any> {
  return request(`${BASE_URL}/categories`, {
    method: 'GET',
    params,
  });
}

export async function submitCategory(params): Promise<any> {
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

export async function deleteCategory(id): Promise<any> {
  if (id) {
    return request(`${BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
  }
  return Promise.reject();
}

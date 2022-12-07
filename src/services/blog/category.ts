import request from '@/utils/request';

const BASE_URL = '/v1/blog';

export async function queryCategoryList(params) {
  return request(`${BASE_URL}/categories`, {
    method: 'GET',
    params,
  });
}

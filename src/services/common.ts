import request from '@/utils/request';

const BASE_URL = '/v1/common';

export async function queryCategoryOptions(params?): Promise<any> {
  return request(`${BASE_URL}/category-select-options`, {
    method: 'GET',
    params,
  });
}

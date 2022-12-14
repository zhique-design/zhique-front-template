import request from '@/utils/request';

const BASE_URL = '/v1/console';

export async function queryMenuList(params?) {
  return request(`${BASE_URL}/menus`, {
    method: 'GET',
    params,
  });
}

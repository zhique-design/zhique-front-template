import request from '@/utils/request';

const BASE_URL = '/v1/blog';

export async function queryArticleById(id) {
  return request(`${BASE_URL}/articles/${id}`, {
    method: 'GET',
  });
}

export async function submitArticle(params) {
  const { id } = params;
  if (id) {
    return request(`${BASE_URL}/articles/${id}`, {
      method: 'PATCH',
      data: params,
    });
  }
  return request(`${BASE_URL}/articles`, {
    method: 'POST',
    data: params,
  });
}

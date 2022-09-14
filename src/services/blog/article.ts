import request from '@/utils/request';

const BASE_URL = '/v1/blog';

export async function queryArticleList(params?) {
  return request(`${BASE_URL}/articles`, {
    method: 'GET',
    params
  });
}

export async function queryHotArticleList(params?) {
  return request(`${BASE_URL}/hot-articles`, {
    method: 'GET',
    params
  });
}

export async function queryRecommendArticleList(params?) {
  return request(`${BASE_URL}/recommend-articles`, {
    method: 'GET',
    params
  });
}

export async function queryArticleById(id: string) {
  return request(`${BASE_URL}/articles/${id}`, {
    method: 'GET',
  });
}

export async function submitArticle(data) {
  const { id, ...rest } = data;
  if (id) {
    return request(`${BASE_URL}/articles/${id}`, {
      method: 'PATCH',
      data: rest,
    });
  }
  return request(`${BASE_URL}/articles`, {
    method: 'POST',
    data,
  });
}

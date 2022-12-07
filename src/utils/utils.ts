export const getResponseList = (response) => {
  if (response && Array.isArray(response.results)) return response.results;
  if (Array.isArray(response)) return response;
  return [];
};
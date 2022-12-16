export const getResponseList = (response): Array<any> => {
  if (response && Array.isArray(response.results)) return response.results;
  if (Array.isArray(response)) return response;
  return [];
};

export const defaultPagination = {
  pageSizeOptions: ['5', '10', '20', '50', '100'],
  showQuickJumper: true,
  showSizeChanger: true,
  locale: {
    items_per_page: '条/页',
  },
  showTotal: (total) => `共 ${total} 页`,
};

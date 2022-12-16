import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  action,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

import { queryCategoryList } from '@/services/console/blog/category';
import { getResponseList } from '@/utils/utils';

interface Category {
  id: number;
  name: string;
  path: string;
  children: Array<Category>;
}

@observer
export default class CategoryList extends Component {
  columns: ColumnsType<Category> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分类路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: () => (
        <Space>
          <Button type="link">编辑</Button>
        </Space>
      ),
    },
  ];

  categoryList: Array<Category> = [];

  totalCount = 0;

  loading = false;

  page = 1;

  pageSize = 10;

  disposer: IReactionDisposer;

  constructor(props) {
    super(props);
    makeObservable(this, {
      categoryList: observable,
      loading: observable,
      page: observable,
      pageSize: observable,
      setPageSize: action,
    });
    this.disposer = reaction(
      () => ({
        page: this.page,
        pageSize: this.pageSize,
      }),
      this.setCategoryList,
      { fireImmediately: true }
    );
  }

  componentWillUnmount() {
    this.disposer();
  }

  setCategoryList = async (params) => {
    runInAction(() => {
      this.loading = true;
    });
    const data: any = (await queryCategoryList(params)) || {};
    runInAction(() => {
      this.categoryList = getResponseList(data);
      this.totalCount = data.count || 0;
      this.loading = false;
    });
  };

  setPageSize = (current: number, size: number) => {
    this.page = current;
    this.pageSize = size;
  };

  render() {
    return (
      <Table
        loading={this.loading}
        dataSource={this.categoryList}
        columns={this.columns}
        rowKey="id"
        pagination={{
          current: this.page,
          pageSize: this.pageSize,
          disabled: this.loading,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          showQuickJumper: true,
          showSizeChanger: true,
          locale: {
            items_per_page: '条/页',
          },
          showTotal: (total) => `共 ${total} 页`,
          total: this.totalCount,
          onChange: this.setPageSize,
          onShowSizeChange: this.setPageSize,
        }}
      />
    );
  }
}

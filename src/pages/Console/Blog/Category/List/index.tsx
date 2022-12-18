import React, { Component } from 'react';
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

import { queryCategoryList } from '@/services/console/blog/category';
import { defaultPagination, getResponseList } from '@/utils/utils';
import { CategoryForm } from '@/components';

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
          <Button type="link" onClick={this.handleEdit}>
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  categoryList: Array<Category> = [];

  totalCount = 0;

  loading = false;

  page = 1;

  pageSize = 10;

  modalOpen = false;

  disposer: IReactionDisposer;

  constructor(props) {
    super(props);
    makeObservable(this, {
      categoryList: observable,
      loading: observable,
      page: observable,
      pageSize: observable,
      modalOpen: observable,
      setPageSize: action,
      setModalOpen: action,
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
    const data: ResponseWithPagination<Category> = await queryCategoryList(
      params
    );
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

  setModalOpen = (open: boolean) => {
    this.modalOpen = open;
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.setModalOpen(true);
  };

  handleCancel = () => {
    this.setModalOpen(false);
  };

  render() {
    return (
      <>
        <Table
          loading={this.loading}
          dataSource={this.categoryList}
          columns={this.columns}
          rowKey="id"
          pagination={{
            ...defaultPagination,
            current: this.page,
            pageSize: this.pageSize,
            disabled: this.loading,
            total: this.totalCount,
            onChange: this.setPageSize,
            onShowSizeChange: this.setPageSize,
          }}
        />
        <CategoryForm open={this.modalOpen} onCancel={this.handleCancel} />
      </>
    );
  }
}

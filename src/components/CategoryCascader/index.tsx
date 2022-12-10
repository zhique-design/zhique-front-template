import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { Button, Cascader, CascaderProps } from 'antd';

import { Icon } from '@/components';
import { queryCategoryList, submitCategory } from '@/services/blog/category';
import { getResponseList } from '@/utils/utils';

import CategoryForm from './CategoryForm';

@observer
export default class CategoryCascader extends Component<
  CascaderProps<{ value?: string }>
> {
  loading = true;

  modalOpen = false;

  categoryList: Array<any> = [];

  constructor(props) {
    super(props);
    makeObservable(this, {
      categoryList: observable,
      modalOpen: observable,
      setModalOpen: action,
    });
  }

  async componentDidMount() {
    await this.setCategoryList();
  }

  setCategoryList = async () => {
    const data = await queryCategoryList({
      level: 1,
    });
    runInAction(() => {
      this.categoryList = getResponseList(data);
      this.loading = false;
    });
  };

  setModalOpen = (open: boolean) => {
    this.modalOpen = open;
  };

  handleAdd = (e) => {
    e.preventDefault();
    this.setModalOpen(true);
  };

  handleSubmit = async (values: any) => {
    const data: any = (await submitCategory(values)) || {};
    this.setModalOpen(false);
    const { onChange } = this.props;
    if (onChange) {
      onChange(data.tree, data);
    }
    await this.setCategoryList();
  };

  handleCancel = () => {
    this.setModalOpen(false);
  };

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Cascader
          {...this.props}
          loading={this.loading}
          fieldNames={{ label: 'name', value: 'id', children: 'children' }}
          options={this.categoryList}
          style={{ flex: '1 1' }}
        />
        <CategoryForm
          open={this.modalOpen}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
        <Button type="link" onClick={this.handleAdd}>
          <Icon type="plus" /> 新增分类
        </Button>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  action,
  makeObservable,
  observable,
  IReactionDisposer,
  reaction,
  runInAction,
} from 'mobx';
import { Button, Pagination } from 'antd';

import { ArticleList as List, Icon, withRouter } from '@/components';

import { queryArticleList } from '@/services/blog/article';
import { getResponseList } from '@/utils/utils';
import { Link } from 'react-router-dom';

@withRouter
@observer
export default class ArticleList extends Component<RouterComponentProps> {
  articleList: Array<any> = [];

  totalCount = 0;

  loading = false;

  page = 1;

  pageSize = 10;

  disposer: IReactionDisposer;

  constructor(props) {
    super(props);
    makeObservable(this, {
      articleList: observable,
      totalCount: observable,
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
      this.setArticleList,
      { fireImmediately: true }
    );
  }

  componentWillUnmount() {
    this.disposer();
  }

  setArticleList = async (params) => {
    runInAction(() => {
      this.loading = true;
    });
    const data: any = (await queryArticleList(params)) || {};
    runInAction(() => {
      this.articleList = getResponseList(data) || {};
      this.totalCount = data.count || 0;
      this.loading = false;
    });
  };

  setPageSize = (current: number, size: number) => {
    this.page = current;
    this.pageSize = size;
  };

  handleAdd = (e) => {
    e.preventDefault();
    const { navigate } = this.props;
    navigate('/console/blog/article/edit');
  };

  render() {
    return (
      <>
        <Button
          type="dashed"
          style={{ width: '100%', marginBottom: 10 }}
          onClick={this.handleAdd}
        >
          <Icon type="plus" /> 新增文章
        </Button>
        <List
          articleList={this.articleList}
          loading={this.loading}
          actions={(item) => [
            <Link to={`/console/blog/article/edit/${item.id}`}>编辑</Link>,
          ]}
        />
        <Pagination
          style={{ marginTop: 15, textAlign: 'right' }}
          current={this.page}
          pageSize={this.pageSize}
          pageSizeOptions={['5', '10', '20', '50', '100']}
          disabled={this.loading}
          showQuickJumper
          showSizeChanger
          locale={{
            items_per_page: '条/页',
          }}
          showTotal={(total) => `共 ${total} 页`}
          total={this.totalCount}
          onChange={this.setPageSize}
          onShowSizeChange={this.setPageSize}
        />
      </>
    );
  }
}

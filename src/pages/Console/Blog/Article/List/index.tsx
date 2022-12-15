import React, { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';
import {
  action,
  makeObservable,
  observable,
  IReactionDisposer,
  reaction,
  runInAction,
} from 'mobx';
import { Button, Card, List, Skeleton, Tag } from 'antd';

import { Icon, withRouter } from '@/components';

import { queryArticleList } from '@/services/blog/article';
import { getResponseList } from '@/utils/utils';
import { Link } from 'react-router-dom';

import moment from 'moment/moment';
import styles from './index.module.less';

interface IconTextProps {
  type: string;
  text: ReactNode;
}
const IconText: React.FC<IconTextProps> = ({ type, text }) => (
  <div>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </div>
);

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
      <Card>
        <Button
          type="dashed"
          style={{ width: '100%', marginBottom: 10 }}
          onClick={this.handleAdd}
        >
          <Icon type="plus" /> 新增文章
        </Button>
        <List
          className={styles.list}
          itemLayout="vertical"
          split
          dataSource={this.articleList}
          loading={this.loading}
          rowKey="id"
          renderItem={({
            id,
            views,
            category,
            url,
            title,
            tags,
            body,
            publishTime,
          }) => (
            <List.Item
              key={id}
              actions={[
                <IconText type="eye" text={views} />,
                <IconText type="appstore" text={category.name} />,
                <IconText
                  type="calendar"
                  text={moment(publishTime).format('YYYY-MM-DD HH:mm')}
                />,
              ]}
            >
              <Skeleton loading={this.loading} active avatar>
                <List.Item.Meta
                  title={
                    <Link className={styles.listItemMetaTitle} to={url}>
                      {title}
                    </Link>
                  }
                  description={
                    tags &&
                    tags.map(({ id: tagId, name, color }) => (
                      <Tag key={tagId} color={color}>
                        {name}
                      </Tag>
                    ))
                  }
                />
                <div className={styles.listContent}>
                  <div className={styles.description}>
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                  </div>
                  <div className={styles.extra}>
                    <span>
                      <Link to={`/console/blog/article/edit/${id}`}>编辑</Link>
                    </span>
                  </div>
                </div>
              </Skeleton>
            </List.Item>
          )}
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
      </Card>
    );
  }
}

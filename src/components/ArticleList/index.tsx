import React, { ReactNode } from 'react';
import { Col, Row, Spin, Tag } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import moment from 'moment';
import { Icon } from '@/components';

import { observer } from 'mobx-react';
import styles from './index.module.less';

interface ArticleListProps {
  className?: string;
  articleList?: Array<any>;
  loading?: boolean;
  actions?: (data: any) => Array<ReactNode>;
}

const ArticleList: React.FC<ArticleListProps> = observer(
  ({ className, articleList, loading, actions }) => (
    <Spin spinning={loading}>
      <Row className={classNames(className, styles.articleList)}>
        {articleList?.map((item) => {
          const { url, title, category, body, id, publishTime, views, tags } =
            item;
          return (
            <Col key={id} className={styles.articleItem} span={24}>
              <div style={{ flex: '1 1' }}>
                <section>
                  <div>
                    <Link to={url} className={styles.articleTitle}>
                      {title}
                    </Link>
                  </div>
                  <div className={styles.articleTag}>
                    {tags.map(({ id: tagId, name, color }) => (
                      <Tag key={tagId} color={color}>
                        {name}
                      </Tag>
                    ))}
                  </div>
                  <article
                    className={styles.articleContent}
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                  <div className={styles.extra}>
                    <em>
                      <Icon type="eye" />
                      <span>{views}</span>
                      <Icon type="calendar" />
                      <span>
                        {moment(publishTime).format('YYYY-MM-DD HH:mm')}
                      </span>
                      <Icon type="appstore" />
                      <span>
                        <Link to={category.url}>{category.name}</Link>
                      </span>
                    </em>
                  </div>
                </section>
              </div>
              {actions &&
                actions(item).map((action, index) => (
                  <span key={`action-${index}`} className={styles.action}>
                    {action}
                  </span>
                ))}
            </Col>
          );
        })}
      </Row>
    </Spin>
  )
);

export default ArticleList;

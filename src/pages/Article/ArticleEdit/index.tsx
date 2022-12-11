import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { MarkdownEditor } from 'zhique-editor';
import { Button, Card, Form, Input, Spin } from 'antd';
import {
  computed,
  makeObservable,
  observable,
  runInAction,
  IReactionDisposer,
  reaction,
} from 'mobx';

import 'github-markdown-css/github-markdown-light.css';

import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm';

import { CategoryCascader, TagSelect, withRouter } from '@/components';
import { queryArticleById, submitArticle } from '@/services/blog/article';

const FormItem = Form.Item;

@withRouter
@observer
export default class ArticleEdit extends Component<RouterComponentProps> {
  articleDetail: any = {};

  loading = false;

  submitting = false;

  disposer: IReactionDisposer;

  constructor(props) {
    super(props);
    makeObservable(this, {
      articleDetail: observable,
      loading: observable,
      submitting: observable,
      articleId: computed,
    });
    this.disposer = reaction(() => this.articleId, this.setArticleDetail, {
      fireImmediately: true,
    });
  }

  componentWillUnmount() {
    this.disposer();
  }

  get articleId(): string | undefined {
    const {
      params: { articleId },
    } = this.props;
    return articleId;
  }

  setArticleDetail = async (articleId) => {
    runInAction(() => {
      this.loading = true;
    });
    let data = {};
    if (articleId) {
      data = await queryArticleById(articleId);
    }
    runInAction(() => {
      this.articleDetail = data || {};
      this.loading = false;
    });
  };

  handleSubmit = async (values: any = {}) => {
    runInAction(() => {
      this.submitting = true;
    });
    const { id } = this.articleDetail;
    const { category = [], ...rest } = values;
    await submitArticle({
      id,
      categoryId: category[category.length - 1],
      ...rest,
    });
    runInAction(() => {
      this.submitting = false;
    });
    await this.setArticleDetail(this.articleId);
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 18 },
      },
    };

    const { title, category, tagList, body } = this.articleDetail;

    return (
      <Card bordered={false} loading={this.loading}>
        <Spin spinning={this.submitting}>
          <Form onFinish={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="文章标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
              initialValue={title}
            >
              <Input placeholder="请输入文章标题" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章分类"
              name="category"
              rules={[{ required: true, message: '请选择文章分类' }]}
              initialValue={category?.tree}
            >
              <CategoryCascader placeholder="请选择文章分类" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章标签"
              name="tags"
              initialValue={tagList?.map(({ id }) => id)}
            >
              <TagSelect expandable />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="文章内容"
              name="body"
              rules={[{ required: true, message: '请输入文章内容' }]}
              initialValue={body}
            >
              <MarkdownEditor
                cmOptions={{
                  mode: 'gfm',
                  theme: 'default',
                  lineWrapping: true,
                  lineNumbers: true,
                  foldGutter: true,
                  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                  matchBrackets: true,
                  autofocus: true,
                  autoCloseBrackets: true,
                  matchTags: true,
                  autoCloseTags: true,
                  styleActiveLine: true,
                  styleSelectedText: true,
                }}
                width="100%"
              />
            </FormItem>
            <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
              <Button style={{ marginRight: 20 }}>取消</Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    );
  }
}

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { MarkdownEditor } from 'zhique-editor';
import { Button, Card, Form, Input } from 'antd';
import { makeObservable, observable, runInAction } from 'mobx';

import 'github-markdown-css/github-markdown-light.css';

import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm';

import { CategoryCascader, TagSelect } from '@/components';
import { queryArticleById, submitArticle } from '@/services/blog/article';

const FormItem = Form.Item;

@observer
export default class ArticleEdit extends Component {
  articleDetail: any = {};

  loading = true;

  constructor(props) {
    super(props);
    makeObservable(this, {
      articleDetail: observable,
      loading: observable,
    });
  }

  async componentDidMount() {
    await this.setArticleDetail();
  }

  setArticleDetail = async () => {
    const data = await queryArticleById('07a2edf2-1d0e-4e37-bb91-77db9e4b9676');
    runInAction(() => {
      this.articleDetail = data || {};
      this.loading = false;
    });
  };

  handleSubmit = async (values: any = {}) => {
    const { id } = this.articleDetail;
    const { category = [], ...rest } = values;
    return submitArticle({
      id,
      categoryId: category[category.length - 1],
      ...rest,
    });
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

    const { title, category, body } = this.articleDetail;

    return (
      <Card bordered={false} loading={this.loading}>
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
            initialValue={[...(category?.tree || [])]}
          >
            <CategoryCascader placeholder="请选择文章分类" />
          </FormItem>
          <FormItem {...formItemLayout} label="文章分类" name="tags">
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button style={{ marginRight: 20 }}>取消</Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

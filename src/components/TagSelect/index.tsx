import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import { Button, Spin, Tag } from 'antd';
import classNames from 'classnames';

import { Icon } from '@/components';
import { queryTagList } from '@/services/blog/tag';
import { getResponseList } from '@/utils/utils';
import TagForm from './TagForm';

import styles from './index.module.less';

const { CheckableTag } = Tag;

interface TagSelectProps {
  expandable?: boolean;
  hideCheckAll?: boolean;
  value?: Array<string>;
  onChange?: (value?: Array<string>) => void;
}

@observer
export default class TagSelect extends Component<TagSelectProps> {
  loading = true;

  modalOpen = false;

  expand = false;

  tagList: Array<any> = [];

  selectedKeys: Array<string>;

  disposer: IReactionDisposer;

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.selectedKeys = value || [];
    makeObservable(this, {
      modalOpen: observable,
      loading: observable,
      expand: observable,
      tagList: observable,
      selectedKeys: observable,
      tagKeys: computed,
      checkAll: computed,
      setModalOpen: action,
      setExpand: action,
      setSelectedKeys: action,
    });
    this.disposer = reaction(() => this.selectedKeys, this.handleChange);
  }

  async componentDidMount() {
    await this.setTagList();
  }

  componentWillUnmount() {
    this.disposer();
  }

  get tagKeys(): Array<string> {
    return this.tagList.map(({ id }) => id);
  }

  get checkAll(): boolean {
    return (
      this.tagKeys.filter((key) => !this.selectedKeys.includes(key)).length ===
      0
    );
  }

  setModalOpen = (open: boolean) => {
    this.modalOpen = open;
  };

  setExpand = (expand: boolean) => {
    this.expand = expand;
  };

  setSelectedKeys = (keys: Array<string>) => {
    this.selectedKeys = keys;
  };

  setTagList = async () => {
    const data = await queryTagList();
    runInAction(() => {
      this.tagList = getResponseList(data) || [];
      this.loading = false;
    });
  };

  handleChange = (keys: Array<string>) => {
    const { onChange } = this.props;
    if (onChange) onChange(keys);
  };

  handleAdd = (e) => {
    e.preventDefault();
    this.setModalOpen(true);
  };

  handleExpand = (e) => {
    e.preventDefault();
    this.setExpand(!this.expand);
  };

  handleSubmit = async (values) => {
    console.log(values);
    await this.setTagList();
    this.setModalOpen(false);
  };

  handleCancel = () => {
    this.setModalOpen(false);
  };

  handleTagChange = (checked: boolean, id: string) => {
    if (checked) {
      this.setSelectedKeys([...this.selectedKeys, id]);
    } else {
      const index = this.selectedKeys.indexOf(id);
      if (index !== -1) {
        runInAction(() => {
          this.selectedKeys.splice(index, 1);
          const { onChange } = this.props;
          if (onChange) onChange(this.selectedKeys);
        });
      }
    }
  };

  handleCheckAll = (checkAll: boolean) => {
    if (checkAll) {
      this.setSelectedKeys(this.tagKeys);
    } else {
      this.setSelectedKeys([]);
    }
  };

  render() {
    const { hideCheckAll, expandable } = this.props;

    const cls = classNames(styles.tagSelect, {
      [styles.hasExpandTag]: expandable,
      [styles.expanded]: this.expand,
    });

    return (
      <Spin spinning={this.loading} size="small">
        <div className={cls}>
          {!hideCheckAll && (
            <CheckableTag
              checked={this.checkAll}
              onChange={this.handleCheckAll}
            >
              全部
            </CheckableTag>
          )}
          {this.tagList.map(({ id, name }) => (
            <CheckableTag
              checked={this.selectedKeys.includes(id)}
              key={id}
              onChange={(checked) => this.handleTagChange(checked, id)}
            >
              {name}
            </CheckableTag>
          ))}
          <CheckableTag
            checked={false}
            onClick={this.handleAdd}
            style={{
              backgroundColor: '#fff',
              borderStyle: 'dashed',
              cursor: 'pointer',
            }}
          >
            <Icon type="plus" /> 新增标签
          </CheckableTag>
          {expandable && (
            <Button
              className={styles.trigger}
              type="link"
              onClick={this.handleExpand}
            >
              {this.expand ? '收起' : '展开'}
              <Icon type={this.expand ? 'up' : 'down'} />
            </Button>
          )}
          <TagForm
            open={this.modalOpen}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
          />
        </div>
      </Spin>
    );
  }
}

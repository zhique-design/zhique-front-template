import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Modal, Tag } from 'antd';
import { SketchPicker } from 'react-color';

import styles from './index.module.less';

interface TagFormProps {
  open?: boolean;
  onCancel?: () => void;
  onSubmit?: (value: any) => void;
}

const TagForm: React.FC<TagFormProps> = observer(
  ({ open, onSubmit, onCancel }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [color, setColor] = useState<string>('');
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="新增文章标签"
        okText="确定"
        cancelText="取消"
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            if (onSubmit) onSubmit({ ...values, color });
          });
        }}
        onCancel={onCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="标签名称"
            rules={[{ required: true, message: '请输入标签名称' }]}
          >
            <Input placeholder="请输入标签名称" />
          </Form.Item>
          <Form.Item name="color" label="标签颜色">
            <div className={styles.colorPickerWrapper}>
              {visible ? (
                <>
                  <div
                    className={styles.colorPickerCover}
                    onClick={() => setVisible(false)}
                  />
                  <SketchPicker
                    onChange={(value) => setColor(value.hex)}
                    color={color}
                  />
                </>
              ) : (
                <Tag
                  color={color}
                  onClick={() => setVisible(true)}
                  style={{ cursor: 'pointer' }}
                >
                  {color || '默认'}
                </Tag>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default TagForm;

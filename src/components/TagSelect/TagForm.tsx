import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Modal } from 'antd';
import { SketchPicker } from 'react-color';

interface TagFormProps {
  open?: boolean;
  onCancel?: () => void;
  onSubmit?: (value: any) => void;
}

const TagForm: React.FC<TagFormProps> = observer(
  ({ open, onSubmit, onCancel }) => {
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
            if (onSubmit) onSubmit(values);
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
            <SketchPicker />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default TagForm;

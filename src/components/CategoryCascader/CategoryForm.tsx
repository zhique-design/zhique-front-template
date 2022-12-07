import React from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { observer } from 'mobx-react';

const FormItem = Form.Item;

interface CategoryFormProps {
  open?: boolean;
  onCancel?: () => void;
  onSubmit?: (value: any) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = observer(
  ({ open, onSubmit, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="新增文章分类"
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
          <FormItem
            name="name"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </FormItem>
          <FormItem name="parentCategory" label="父级分类">
            <Select placeholder="请选择父级分类" />
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default CategoryForm;

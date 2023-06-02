import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { observer } from 'mobx-react';
import CategorySelect from '../CategorySelect';

const FormItem = Form.Item;

interface CategoryFormProps {
  open?: boolean;
  onCancel?: () => void;
  onSubmit?: (value: any) => void;

  currentCategory?: Category;
}

const CategoryForm: React.FC<CategoryFormProps> = observer(
  ({ open, onSubmit, onCancel, currentCategory }) => {
    const [form] = Form.useForm();
    useEffect(() => {
      form.setFieldsValue({
        id: currentCategory?.id,
        name: currentCategory?.name,
        parentCategory: currentCategory?.parent?.id,
      });
    }, [currentCategory, form]);
    return (
      <Modal
        open={open}
        title="新增文章分类"
        okText="确定"
        cancelText="取消"
        destroyOnClose
        forceRender
        onOk={async () => {
          return form.validateFields().then(async (values) => {
            form.resetFields();
            if (onSubmit) return onSubmit(values);
            return Promise.resolve();
          });
        }}
        onCancel={onCancel}
      >
        <Form form={form} layout="vertical">
          <FormItem name="id">
            <Input hidden />
          </FormItem>
          <FormItem
            name="name"
            required
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </FormItem>
          <FormItem name="parentCategory" label="父级分类">
            <CategorySelect placeholder="请选择父级分类" />
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default CategoryForm;

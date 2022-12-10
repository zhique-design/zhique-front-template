import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { observer } from 'mobx-react';
import { queryCategoryList } from '@/services/blog/category';
import { getResponseList } from '@/utils/utils';

const FormItem = Form.Item;

interface CategoryFormProps {
  open?: boolean;
  onCancel?: () => void;
  onSubmit?: (value: any) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = observer(
  ({ open, onSubmit, onCancel }) => {
    const [categoryList, setCategoryList] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      async function getCategoryList() {
        const data = await queryCategoryList();
        setCategoryList(getResponseList(data));
      }
      getCategoryList().then(() => {
        setLoading(false);
      });
    }, []);
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
            <Select placeholder="请选择父级分类" loading={loading}>
              {categoryList.map(({ id, name }) => (
                <Select.Option value={id} key={id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default CategoryForm;

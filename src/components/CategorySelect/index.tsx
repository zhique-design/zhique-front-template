import React, { useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import { queryCategoryOptions } from '@/services/common';
import { getResponseList } from '@/utils/utils';
import { observer } from 'mobx-react';

const CategorySelect: React.FC<SelectProps> = observer((props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<Category>>([]);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    async function getOptions() {
      const data: ResponseWithoutPagination<Category> =
        await queryCategoryOptions();
      setOptions(getResponseList(data));
    }
    if (open) {
      setLoading(true);
      getOptions().then(() => {
        setLoading(false);
      });
    }
  }, [open]);
  return (
    <Select
      loading={loading}
      {...props}
      open={open}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
    >
      {options.map(({ id, name }) => (
        <Select.Option key={id} value={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
});

export default CategorySelect;

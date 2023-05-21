import { Empty, Select, SelectProps } from 'antd';
import { FC, PropsWithChildren } from 'react';
import { NO_DATA } from '../../constants';

const CustomSelect: FC<PropsWithChildren<SelectProps<any>>> = ({ children, ...selectProps }) => {
  return (
    <Select notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={NO_DATA} />} {...selectProps}>
      {children}
    </Select>
  );
};

export default CustomSelect;

import { Radio, Space } from 'antd';
import React from 'react';

type Props = {
  lable: string;
  options: Array<string>;
  onChangeOption: (label, value: string) => void;
  value?: any;
};

const Options = ({ lable, options, onChangeOption, value }: Props) => {
  console.log('value', value);
  return (
    // <div className="mt-4">
    //   <span className="mr-4">{lable}:</span>
    //   <Space size={[0, 8]} wrap>
        <Radio.Group>
          {options?.map((item, index) => (
            <Radio key={index} value={item} style={{ border: 'red' }}>
              {item}
            </Radio>
          ))}
        </Radio.Group>
    //   </Space>
    // </div>
  );
};

export default Options;

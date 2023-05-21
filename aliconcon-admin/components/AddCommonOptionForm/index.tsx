import { Form, Input, Button, Typography, FormProps } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import clsx from 'clsx';
import FormWrapper from '../FormWrapper';
import _debounce from 'lodash/debounce';
import _throttle from 'lodash/throttle';
import { useForm } from 'antd/lib/form/Form';
import styles from './styles.module.less';
import { useCallback, useEffect, useRef, useState } from 'react';
import OptionItem from './OptionItem';

type AddCommonOptionFormProps = FormProps & {
  label: string;
  options: any;
  loading: boolean;
  onCancel: () => void;
  onDelete: (id: string) => void;
  onAdd: (value: any, cb: any) => void;
};

export default function AddCommonOptionForm({
  label,
  onCancel,
  onAdd,
  loading,
  options = [],
  onDelete,
  ...props
}: AddCommonOptionFormProps) {
  const [optionsHere, setOptionHere] = useState(options);
  const [form] = useForm();
  const rule = {
    name: [
      { required: true, message: `Vui lòng điền đầy đủ thông tin` },
      { whitespace: true },
      {
        validator: (_: any, option: string) => {
          if (options.map((o) => o.name).includes(option)) {
            return Promise.reject(new Error(`${label} đã tồn tại`));
          }
          return Promise.resolve();
        },
      },
    ],
  };
  const handleOnFinish = (values) => {
    onAdd(values, () => {});
    form.resetFields(['name']);
  };

  const renderCard = useCallback((opt, index) => {
    return <OptionItem opt={opt} onDelete={onDelete} id={opt?._id} key={opt?.id} />;
  }, []);

  useEffect(() => {
    setOptionHere(options);
  }, [options]);

  return (
    <div className={clsx(styles.formWrapper, 'shadow-4')}>
      <DndProvider backend={HTML5Backend}>
        <Typography.Title level={4} className="title">
          {`${label}`}
        </Typography.Title>
        <FormWrapper loading={loading}>
          <Form name="add-option-form" layout="inline" colon={false} form={form} onFinish={handleOnFinish} {...props}>
            <Form.Item name="name" required className="add-input" rules={rule.name}>
              <Input size="middle" />
            </Form.Item>
            <Button type="primary" size="middle" htmlType="submit">
              Gửi
            </Button>
          </Form>
          <div className="w-100 vh-50 mt4 ba bw1 b--light-gray overflow-y-auto">
            {optionsHere.map((opt, index) => renderCard(opt, index))}
          </div>
          <div className="mt4 tc">
            <Button size="middle" onClick={onCancel}>
              Hủy
            </Button>
          </div>
        </FormWrapper>
      </DndProvider>
    </div>
  );
}

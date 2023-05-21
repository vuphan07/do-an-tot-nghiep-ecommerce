import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styles from './style.module.less';
import { useForm, FormInstance } from 'antd/lib/form/Form';
import clsx from 'clsx';

type FormFilterProps = {
  onFinish: (value: any) => void;
  placeholder?: string;
  labelSearch?: string;
  actionFilter?: React.ReactNode;
  nameInputSearch?: string;
};
const FormFilter = ({
  onFinish,
  actionFilter = undefined,
  placeholder = undefined,
  labelSearch = '',
  nameInputSearch,
}: FormFilterProps) => {
  const [form] = useForm();
  return (
    <Row>
      <Col span={24} md={24}>
        <Form form={form} name="filter_form" layout="inline" onFinish={onFinish} className={styles.form}>
          <div className={clsx('input-name', 'name')}>
            <span className="span_description fw6">{labelSearch}</span>
            <Form.Item className={clsx('input-name')} name={nameInputSearch || 'name'}>
              <Input placeholder={placeholder} size="middle" allowClear />
            </Form.Item>
          </div>
          {actionFilter && actionFilter}
          <div className="btn-submit">
            <Form.Item>
              <Button
                icon={<FilterOutlined />}
                type="primary"
                className="bg-color-indigo"
                htmlType="submit"
                size="middle"
                block
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default FormFilter;

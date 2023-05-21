import { Button, Form, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import FormWrapper from '../FormWrapper';
import { useForm } from 'antd/lib/form/Form';

const Editor = ({ onFinish, disabled = false }) => {
  const [form] = useForm();
  const handleFinish = (values) => {
    onFinish(values);
    form.resetFields();
  };
  return (
    <>
      <FormWrapper loading={false} className="w-full">
        <Form form={form} onFinish={handleFinish} className="w-full">
          <Form.Item name="rate" rules={[{ required: true, message: 'Vui lòng nhập đầy đủ' }]} className="w-full">
            <Rate disabled={disabled} />
          </Form.Item>
          <Form.Item name="content" rules={[{ required: true, message: 'Vui lòng nhập đầy đủ' }]} className="w-full">
            <TextArea disabled={disabled} rows={4} />
          </Form.Item>
          <Form.Item>
            <Button disabled={disabled} htmlType="submit" type="primary">
              Thêm nhận xét
            </Button>
          </Form.Item>
        </Form>
      </FormWrapper>
    </>
  );
};

export default Editor;

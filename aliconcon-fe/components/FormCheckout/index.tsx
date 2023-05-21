import React, { useEffect, useState } from 'react';
import style from './style.module.less';
import FormWrapper from '../FormWrapper';
import { Button, Form, Input, Select } from 'antd';
import { PayPalButton } from 'react-paypal-button-v2';
import ButtonPaypalContainer from '../../containers/ButtonPaypalContainer';
import { PAYMENT_METHOD } from '../../interfaces/enums/paymentMethod';
import useProfile from '../../app/hooks/useProfile';
import { useForm } from 'antd/lib/form/Form';

type Props = {
  onFinish: any;
  amount: number;
  paymentMethod: PAYMENT_METHOD;
  onChangePaymentMethod: any;
  loading: boolean;
};

const rules = {
  name: [{ required: true, message: 'Vui lòng nhập đầy đủ thông tin' }],
};

const FormCheckout = ({ onFinish, amount, paymentMethod, onChangePaymentMethod, loading }: Props) => {
  const { currentUser } = useProfile();
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ name: currentUser.name, email: currentUser.email, phone: currentUser.phone });
  }, [currentUser]);

  const handleFinish = (values) => {
    onFinish({ ...values, ...form.getFieldsValue(), paymentMethod: paymentMethod });
  };

  return (
    <div className={style.formWrapper}>
      <FormWrapper loading={loading} theme={'secondary'}>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item label="Tên" name="name" rules={rules.name}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules.name}>
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone" rules={rules.name}>
            <Input />
          </Form.Item>
          <Form.Item label="Địa chỉ nhận hàng" name="address" rules={rules.name}>
            <Input />
          </Form.Item>
          <Form.Item label="Thanh toán">
            <Select value={paymentMethod} onChange={onChangePaymentMethod}>
              <Select.Option value={PAYMENT_METHOD.PAYMENT_ON_DELIVERY}>Thanh toán khi nhận hàng</Select.Option>
              <Select.Option value={PAYMENT_METHOD.PAYPAL}>Thanh toán qua paypal</Select.Option>
            </Select>
          </Form.Item>
          {paymentMethod === PAYMENT_METHOD.PAYPAL && <ButtonPaypalContainer onFinish={handleFinish} amount={amount} />}
          {paymentMethod === PAYMENT_METHOD.PAYMENT_ON_DELIVERY && (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thanh toán
              </Button>
            </Form.Item>
          )}
        </Form>
      </FormWrapper>
    </div>
  );
};

export default FormCheckout;

import { Form, Input, Button, Typography, Alert, Row, Space } from 'antd';
import clsx from 'clsx';
import { LockOutlined } from '@ant-design/icons';

import style from './styles.module.less';
import FormWrapper from '../FormWrapper';

export type FormValueType = {
  currentPassword: string;
  newPassword: string;
};

type ChangePWFirsttimeFormType = {
  loading: boolean;
  errorMsg: string | null;
  onSubmit: (data: FormValueType) => void;
};

export default function ChangePasswordForm({ loading, onSubmit, errorMsg }: ChangePWFirsttimeFormType) {
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
  };

  const handleOnFinish = async (values: FormValueType) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.log(error);
    }
  };

  const rules = {
    currentPassword: [
      { required: true, message: 'Vui lòng nhập mật khẩu hiện tại của bạn.' },
      { whitespace: true },
      { min: 6, message: 'Mật khẩu không hợp lệ' },
    ],
    password: [
      { required: true, message: 'Vui lòng nhập mật khẩu.' },
      { whitespace: true },
      { min: 6, message: 'Mật khẩu không hợp lệ' },
    ],
    confirmPassword: [
      { required: true, message: 'Vui lòng nhập mật khẩu xác nhận.' },
      { whitespace: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('newPassword') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Mật khẩu không khớp'));
        },
      }),
    ],
  };

  return (
    <div className={clsx(style.changePasswordFormWrapper)}>
      <div className="title">
        <Typography.Title level={3}>Đổi mật khẩu</Typography.Title>
      </div>
      <div className="form__wrapper">
        {errorMsg && <Alert message={errorMsg} type="error" showIcon />}
        <FormWrapper loading={loading} theme={'secondary'}>
          <Form form={form} name="login_form" layout="inline" onFinish={handleOnFinish} autoComplete="off">
            <Form.Item className="w-100" label="Mật khẩu cũ" name="currentPassword" rules={rules.currentPassword}>
              <Input.Password
                prefix={<LockOutlined className="form__item__icon" />}
                size="middle"
                placeholder="Mật khẩu cũ"
                type="password"
                allowClear
              />
            </Form.Item>
            <Form.Item className="w-100" label="Mật khẩu mới" name="newPassword" rules={rules.password}>
              <Input.Password
                prefix={<LockOutlined className="form__item__icon" />}
                size="middle"
                placeholder="Mật khẩu mới"
                type="password"
                allowClear
              />
            </Form.Item>
            <Form.Item
              className="w-100"
              name="confirmPassword"
              label="Xác nhận khẩu mới"
              rules={rules.confirmPassword}
              dependencies={['password']}
            >
              <Input.Password
                prefix={<LockOutlined className="form__item__icon" />}
                size="middle"
                placeholder="Xác nhận khẩu mới"
                type="password"
                allowClear
              />
            </Form.Item>
            <Space size={12}>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
              <Button className="btn-cancel" onClick={handleCancel}>
                Hủy
              </Button>
            </Space>
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
}

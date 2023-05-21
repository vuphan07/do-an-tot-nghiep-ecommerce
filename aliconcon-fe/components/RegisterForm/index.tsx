import Image from 'next/image';
import { Form, Input, Button, Checkbox, Typography, Alert, Space } from 'antd';
import clsx from 'clsx';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';

import LOGO from '../../assets/images/Logo1.png';
import style from './styles.module.less';
import FormWrapper from '../FormWrapper';

export default function RegisterForm({ loading, onSubmit, errorMsg, onChangeState, onCancel }) {
  const [form] = Form.useForm();

  const handleOnFinish = (values) => onSubmit(values);

  const rules = {
    email: [
      { required: true, message: 'Vui lòng nhập email.' },
      { whitespace: true },
      { type: 'email', message: 'Email không hợp lệ.' },
    ],
    password: [
      { required: true, message: 'Vui lòng nhập mật khẩu của bạn.' },
      { whitespace: true },
      { min: 6, message: 'Mật khẩu không hợp lệ' },
    ],
  };

  return (
    <div>
      <div className={clsx(style.loginFormWrapper, 'bg-white', 'shadow-4')}>
        <div className="w-full text-center">
          <Image src={LOGO} alt="Logo" width={100} height={100} />
        </div>
        <div className="form__wrapper mt-6">
          {errorMsg && <Alert message={errorMsg} type="error" showIcon />}
          <FormWrapper loading={loading}>
            <Form form={form} name="login_form" layout="inline" onFinish={handleOnFinish} autoComplete="off">
              <Form.Item className="w-full" name="email" rules={rules.email as any}>
                <Input
                  prefix={<UserOutlined className="form__item__icon" />}
                  size="middle"
                  placeholder=""
                  allowClear
                />
              </Form.Item>
              <div className="h-4"></div>
              <Form.Item className="w-full" name="name" required>
                <Input
                  prefix={<UserOutlined className="form__item__icon" />}
                  size="middle"
                  placeholder=""
                  allowClear
                />
              </Form.Item>
              <div className="h-4"></div>
              <Form.Item className="w-full" name="phone" required>
                <Input
                  prefix={<PhoneOutlined className="form__item__icon" />}
                  size="middle"
                  placeholder="Email"
                  allowClear
                />
              </Form.Item>
              <div className="h-4"></div>
              <Form.Item className="w-full" name="password" rules={rules.password}>
                <Input.Password
                  prefix={<LockOutlined className="form__item__icon" />}
                  size="middle"
                  placeholder="Mật khẩu"
                  type="password"
                  allowClear
                />
              </Form.Item>
              <span>
                Bạn đã có tài khoản?
                <a href="#" onClick={onChangeState}>
                  Đăng nhập
                </a>
              </span>
              <Form.Item className="w-full">
                <Space className="mt-10 w-full flex justify-center">
                  <Button type="primary" htmlType="submit" size="middle">
                    Đăng kí
                  </Button>
                  <Button size="middle" onClick={onCancel}>
                    Hủy
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}

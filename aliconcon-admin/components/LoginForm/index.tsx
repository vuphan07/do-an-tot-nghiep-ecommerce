import Image from 'next/image';
import { Form, Input, Button, Checkbox, Typography, Alert } from 'antd';
import clsx from 'clsx';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import LOGO from '../../assets/images/Logo.png';
import style from './styles.module.less';
import FormWrapper from '../FormWrapper';
import { FORGOT_PW_PATH } from '../../constants';

export type FormValueType = {
  username: string;
  password: string;
  remember: boolean | undefined;
};

type LoginFormType = {
  loading: boolean;
  errorMsg: string | null;
  onSubmit: (values: FormValueType) => void;
};

export default function LoginForm({ loading, onSubmit, errorMsg }: LoginFormType) {
  const [form] = Form.useForm();

  const handleOnFinish = (values) => onSubmit(values);

  const rules = {
    username: [
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
        <div className="w-100 tc">
          <Image src={LOGO} alt="Logo" width={50} height={48} />
        </div>
        <div className="form__wrapper">
          {errorMsg && <Alert message={errorMsg} type="error" showIcon />}
          <FormWrapper loading={loading}>
            <Form form={form} name="login_form" layout="inline" onFinish={handleOnFinish} autoComplete="off">
              <Form.Item className="w-100" name="username" rules={rules.username as never}>
                <Input
                  prefix={<UserOutlined className="form__item__icon" />}
                  size="middle"
                  allowClear
                  placeholder="email"
                />
              </Form.Item>
              <Form.Item className="w-100" name="password" rules={rules.password}>
                <Input.Password
                  prefix={<LockOutlined className="form__item__icon" />}
                  size="middle"
                  placeholder="Mật khẩu"
                  type="password"
                  allowClear
                />
              </Form.Item>
              <Form.Item className="form__item__submitBtn w-100">
                <Button type="primary" htmlType="submit" size="middle" block>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </FormWrapper>
        </div>
      </div>
      <Typography.Paragraph className={clsx(style.copyrightTxt, 'tc')}>
        Copyright © yourCompany all rights reserved.
      </Typography.Paragraph>
    </div>
  );
}

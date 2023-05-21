import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import { RcFile } from 'antd/lib/upload';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AVATAR_SIZE, ruleFormCommon } from '../../constants';
import AvatarContainer from '../../containers/Avatar';
import SettingAvatarContainer from '../SettingAvatar';
import CardWrapper from '../CardWrapper';
import FormWrapper from '../FormWrapper';
import styles from './style.module.less';
type Props = {
  data?: any;
  loading?: boolean;
  onFinish?: any;
  title?: any;
};

const UserFormInfomation = ({ data, loading, onFinish, title = ' Tạo người dùng mới' }: Props) => {
  const router = useRouter();
  const [form] = useForm();
  const [base64ImageUrl, setBase64ImageUrl] = useState('');
  const [fileAvatar, setFileAvatar] = useState<RcFile>();

  const handleSubmit = async(values) => {
   await onFinish({ ...values, avtFile: fileAvatar });
    setFileAvatar(undefined)
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
    setFileAvatar(img);
  };

  const handleOnImage = (img) => {
    getBase64(img as RcFile, (url) => {
      setBase64ImageUrl(url);
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, _id: data._id });
    }
  }, [data]);

  return (
    <CardWrapper>
      <div className={styles.root}>
        <Title className={clsx(styles.title, 'mb3')} level={4}>
          {title}
        </Title>
        <div className="content">
          <Title level={4}>Thông tin người dùng</Title>
          <FormWrapper loading={loading}>
            <Form
              name="info-user"
              autoComplete="off"
              form={form}
              onFinish={handleSubmit}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              colon={false}
            >
              <Form.Item label="Ảnh đại diện" className="flex items-center relative">
                {data && (
                  <>
                    <AvatarContainer
                      className={styles.logo}
                      size={AVATAR_SIZE.LARGE}
                      image={data?.avatar}
                      imageDefault={'/images/logo.png'}
                      base64ImageUrl={base64ImageUrl}
                    />
                    <div className={styles.btnUpload}>
                      <SettingAvatarContainer shape="rect" onChange={handleOnImage} />
                    </div>
                  </>
                )}
              </Form.Item>
              <Form.Item label="" name="_id"></Form.Item>
              <Form.Item label="Tên người dùng" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input readOnly={!!data} />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phone">
                <Input />
              </Form.Item>
              {!data && (
                <Form.Item label="Mật khẩu" name="password">
                  <Input readOnly={!!data} />
                </Form.Item>
              )}

              <Form.Item label="Vai trò" name="role">
                <Select defaultValue={0}>
                  <Select.Option value={0}>Người dùng</Select.Option>
                  <Select.Option value={1}>admin</Select.Option>
                </Select>
              </Form.Item>
              <div className="group-btn">
                <Button type="primary" htmlType="submit">
                  Đăng kí
                </Button>
                <Button className="btn-cancel" onClick={() => router.back()}>
                  Hủy
                </Button>
              </div>
            </Form>
          </FormWrapper>
        </div>
      </div>
    </CardWrapper>
  );
};

export default UserFormInfomation;

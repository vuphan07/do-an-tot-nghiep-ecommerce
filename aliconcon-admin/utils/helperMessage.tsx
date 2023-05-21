import { Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react';
const { confirm } = Modal;

export const showConfirm = (msg, onOK, onCancel = () => {}) => {
  confirm({
    icon: <ExclamationCircleOutlined />,
    content: <Typography.Text>{msg}</Typography.Text>,
    okText: 'Đồng ý',
    cancelText: 'Hủy',
    onOk() {
      onOK();
    },
    onCancel() {
      onCancel();
    },
  });
};

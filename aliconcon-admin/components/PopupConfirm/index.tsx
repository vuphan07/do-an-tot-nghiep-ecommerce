import React from 'react';
import { Modal, Typography } from 'antd';
import styles from './styles.module.less';

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  description: string;
  cancelText?: string;
  okText?: string;
};
const { Paragraph } = Typography;

const PopupConfirm = (props: Props) => {
  const { isOpen, onConfirm, onCancel, description, ...rest } = props;
  return (
    <Modal {...rest} visible={isOpen} onOk={onConfirm} onCancel={onCancel} closeIcon={<></>} className={styles.root}>
      <Paragraph>{description}</Paragraph>
    </Modal>
  );
};

export default PopupConfirm;

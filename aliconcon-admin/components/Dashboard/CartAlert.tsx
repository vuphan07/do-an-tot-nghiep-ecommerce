import { Card, Typography, Spin } from 'antd';
import Image from 'next/image';
import React from 'react';
import styles from './style.module.less';
import clsx from 'clsx';
import { formatMonney } from '../../utils/helper';
import { DollarOutlined } from '@ant-design/icons';
import { AiOutlineDollar } from 'react-icons/ai';
const { Paragraph } = Typography;

type CartAlertProps = {
  missing: number;
  loading: boolean;
  icon: any;
  text: string;
};

const CartAlert = ({ missing = 0, loading, icon, text }: CartAlertProps) => {
  return (
    <Card className={clsx(styles.card, 'shadow-4')} bordered={false}>
      <div className="flex w-100">
        {icon}
        <div className="ml4">
          <Paragraph className={styles.cardTitle}>{text}</Paragraph>
          <Paragraph className={styles.cardTitle}>{missing}</Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default CartAlert;

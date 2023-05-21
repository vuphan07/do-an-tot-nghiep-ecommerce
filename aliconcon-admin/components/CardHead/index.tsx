import React from 'react';
import styles from './style.module.less';
import { Typography, Button, Space } from 'antd';
import clsx from 'clsx';

const { Title } = Typography;

const CARD_HEADS = {
  PROJECT: {
    title: '担当案件状況',
    buttonDefault: '個人',
    buttonPrimary: 'プロジェクト',
  },
  NOTIFICATION: {
    title: 'お知らせ',
    buttonDefault: '今日',
    buttonPrimary: '全月',
  },
};

function CardHead(props) {
  const { cardType } = props;

  return (
    <div className={clsx(styles.header)}>
      <Title level={4}>{CARD_HEADS[cardType].title}</Title>
      <Space size="middle">
        <Button className={clsx(styles.btnDefault)}>{CARD_HEADS[cardType].buttonDefault}</Button>
        <Button className={clsx(styles.btnPrimary)}>{CARD_HEADS[cardType].buttonPrimary}</Button>
      </Space>
    </div>
  );
}

export default CardHead;

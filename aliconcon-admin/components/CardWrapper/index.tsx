import React from 'react';
import { Card } from 'antd';
import styles from './style.module.less';
import clsx from 'clsx';

function CardWrapper(props) {
  const { title, children, styleName } = props;

  return (
    <Card title={title} className={clsx(styles.container, 'shadow-4',styleName)}>
      {children}
    </Card>
  );
}

export default CardWrapper;

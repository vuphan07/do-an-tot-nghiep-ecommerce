import { Typography } from 'antd';
import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './styles.module.less';

type LabelProps = {
  txt: String | ReactNode;
  type?: 'primary' | 'secondary';
  className?: String;
};
export default function Label({ txt, type = 'primary', className = '' }: LabelProps) {
  return (
    <div className={clsx({ [styles.label]: true, [styles.labelShowTextOnly]: type === 'secondary' }, className)}>
      <Typography.Text>{txt}</Typography.Text>
    </div>
  );
}

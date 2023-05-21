import { Button, Typography } from 'antd';
import { DeleteOutlined, DragOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import clsx from 'clsx';
import styles from './styles.module.less';

const Name = ({ name, color, txtColor }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={styles.name} style={{ backgroundColor: color }}>
        <Typography.Text style={{ color: txtColor }}>{name}</Typography.Text>
      </div>
    </div>
  );
};

export default function OptionItem({ id, opt, onDelete }) {
  const ref = useRef(null);
  const handleOnDelete = () => {
    onDelete(id);
  };

  return (
    <div className={clsx('pa2 flex justify-between items-center bb bw1 b--light-gray', 'o-100')} ref={ref}>
      <DragOutlined />
      <Typography.Text>{opt.name}</Typography.Text>
      <div>
        <Button type="text" icon={<DeleteOutlined />} onClick={handleOnDelete} />
      </div>
    </div>
  );
}

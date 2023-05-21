import { PropsWithChildren } from 'react';
import { Spin, SpinProps } from 'antd';

import styles from './styles.module.less';
import clsx from 'clsx';

type FormWrapperType = PropsWithChildren<
  {
    loading: boolean;
    theme?: 'primary' | 'secondary';
    className?: string;
  } & SpinProps
>;

export default function FormWrapper({
  loading = false,
  theme = 'primary',
  className = '',
  size = 'default',
  children,
}: FormWrapperType) {
  return (
    <div
      className={clsx({
        [className]: true,
        [styles.formWrapper]: true,
        [styles.formWrapperIsLoading]: loading,
        [styles.themeSecondary]: theme === 'secondary',
        [className]: true,
      })}
    >
      {loading && (
        <div className="spinWrapper">
          <Spin size={size} />
        </div>
      )}
      {children}
    </div>
  );
}

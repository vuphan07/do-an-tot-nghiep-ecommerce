import Head from 'next/head';

import clsx from 'clsx';
import style from './styles.module.less';

export default function AuthLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={clsx(style.layout, 'vw-100 vh-100 flex justify-center items-center')}>{children}</div>
    </>
  );
}

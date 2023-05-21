import React from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './style.module.less';

export type Path = {
  url: string;
  name: string;
};

type MyBreadcrumbProps = {
  paths?: Path[];
};

const MyBreadcrumb = ({ paths = undefined }: MyBreadcrumbProps) => {
  let extraBreadcrumbItems = [];
  if (paths) {
    extraBreadcrumbItems = paths.map((path, idx) => (
      <Breadcrumb.Item key={path.url}>
        <Link href={path.url}>{path.name}</Link>
      </Breadcrumb.Item>
    ));
  }
  const breadcrumbItems = [].concat(extraBreadcrumbItems);

  return <Breadcrumb className={styles.breadcrumb}>{breadcrumbItems}</Breadcrumb>;
};

export default MyBreadcrumb;

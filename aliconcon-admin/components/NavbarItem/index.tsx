import React, { ReactNode } from 'react';
import style from './styles.module.less';
import Link from 'next/link';
import classNames from 'classnames';
import { Space } from 'antd';
type NavbarItemProps = {
  icon: ReactNode;
  text: string;
  href: string;
  focus?: boolean;
  iconFocus: ReactNode;
};

const NavbarItem = (props: NavbarItemProps) => {
  const { icon, iconFocus, text, focus, href = '/' } = props;
  return (
    <Space className={classNames(style.navItem, focus && style.focus)}>
      {focus ? iconFocus : icon}
      <Link href={href}>
        <a>
          <span>{text}</span>
        </a>
      </Link>
    </Space>
  );
};

export default NavbarItem;

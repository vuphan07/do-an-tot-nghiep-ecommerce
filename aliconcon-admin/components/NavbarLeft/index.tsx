import React from 'react';
import { useRouter } from 'next/router';
import { Space } from 'antd';
import NavbarItem from '../NavbarItem';
import { NAVBAR_ITEM } from '../../constants/layout';

const NavbarLeft = () => {
  const router = useRouter();
  return (
    <Space direction="vertical" className="mt5">
      {NAVBAR_ITEM.map((item, index: number) => (
        <NavbarItem
          key={index}
          href={item.href}
          focus={router.pathname === item.href}
          icon={item.icon}
          iconFocus={item.iconFocus}
          text={item.text}
        />
      ))}
    </Space>
  );
};

export default NavbarLeft;

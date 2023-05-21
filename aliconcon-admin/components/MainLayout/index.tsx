import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LOGO from '../../assets/images/Logo.png';
import NavbarLeft from '../NavbarLeft';
import style from './styles.module.less';
import useProfile from '../../app/hooks/useProfile';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import useAuth from '../../app/hooks/useAuth';
import Link from 'next/link';
import Head from 'next/head';
import PopupAddOption from '../PopupAddOption';

interface Props {
  children: ReactNode;
  isGoBack?: boolean;
  title?: string;
}

function MainLayout({ children, isGoBack = false, title }: Props) {
  const router = useRouter();
  const { currentUser } = useProfile();
  const { logout } = useAuth();
  const handleLogout = async () => logout();

  const handleGoBack = useCallback(() => {
    router.back();
  }, []);

  const optionsHeaderUser = () => {
    return (
      <Menu>
        <Menu.Item>
          <Link href="/infor">Thông tin cá nhân</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/change-password">Đổi mật khẩu</Link>
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
      </Menu>
    );
  };

  return (
    <main id="main" className={style.container}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width maximum-scale=1" />
      </Head>
      <div className={style.nav}>
        <div className={style.navLogo}>
          <Link href="/" passHref>
            <a>
              <Image src={LOGO} width={60} height={60} alt="logo" />
            </a>
          </Link>
        </div>
        <div className={style.navPage}>
          <NavbarLeft />
        </div>
      </div>
      <div className={style.header}>
        <div className={style.back} onClick={handleGoBack}>
          {isGoBack && <span>{`< Quay lại`}</span>}
        </div>
        <Space>
          <Dropdown trigger={['click']} overlay={optionsHeaderUser()}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="mr3">
                <Avatar src={currentUser?.avatar} alt="avatar" />
                <span>{currentUser?.name}</span>
              </Space>
            </a>
          </Dropdown>
        </Space>
      </div>
      <div className={style.main}>{children}</div>
      <PopupAddOption />
    </main>
  );
}

export default MainLayout;

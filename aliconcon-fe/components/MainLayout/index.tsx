import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import useProfile from '../../app/hooks/useProfile';
import { Avatar, Badge, Dropdown, Layout, Menu, Space, Input, Col, Row } from 'antd';
import useAuth from '../../app/hooks/useAuth';
import Link from 'next/link';
import Head from 'next/head';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../../assets/images/Logo1.png';
import Image from 'next/image';
import PopupAuth from '../../containers/PopupAuth';
import useGlobalModal from '../../app/hooks/useGlobalModal';
import FooterComponent from "../Footer"
const { Header, Footer, Sider, Content } = Layout;

function MainLayout({ children, isGoBack = false, title }) {
  const router = useRouter();
  const { currentUser } = useProfile();
  const { logout } = useAuth();
  const { turnOnPopupAuth } = useGlobalModal();
  const handleLogout = async () => logout();

  const handleGoBack = useCallback(() => {
    router.push('/');
  }, []);

  const optionsHeaderUser = () => {
    return (
      <Menu>
        <Menu.Item>
          <Link href="/my-info">Thông tin cá nhân</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/change-password">Đổi mật khẩu</Link>
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
      </Menu>
    );
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width maximum-scale=1" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <Header className="fixed left-0 right-0 z-50 " style={{ backgroundColor: '#fff' }}>
        <div className="flex justify-between bg-white items-center h-full">
          <div className="h-full mt-4" onClick={handleGoBack}>
            <Image alt="Logo" src={Logo} width={48} height={48} />
          </div>
          <Space>
            <Badge size="small" count={currentUser?.cart?.length}>
              <ShoppingCartOutlined
                className="cursor-pointer"
                color="black"
                style={{ fontSize: 24 }}
                onClick={() => router.push('/cart')}
              />
            </Badge>
            {currentUser ? (
              <Dropdown className="ml-2" trigger={['click']} overlay={optionsHeaderUser()}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space className="mr3">
                    <Avatar
                      src={
                        currentUser?.avatar ||
                        'https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-1/124820552_744423282820166_400071713503603036_n.jpg?stp=cp0_dst-jpg_p32x32&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=HwUHgS2lFDcAX-Dg5wH&tn=9b6Yn1g6JRuQjJv9&_nc_ht=scontent-dfw5-2.xx&oh=00_AfD3lL4xB0errJDtDuqkRaBpe-JFN1Ylgkm1YluYmN-SZA&oe=64132EA2'
                      }
                      alt="avatar"
                    />
                    <span>{currentUser?.name}</span>
                  </Space>
                </a>
              </Dropdown>
            ) : (
              <UserOutlined onClick={turnOnPopupAuth} style={{ fontSize: 24 }} />
            )}
          </Space>
        </div>
      </Header>
      <Content className="mt-16 ml-auto mr-auto min-h-screen" style={{ minHeight: '100vh', width: 1120 }}>
        {children}
      </Content>
      <PopupAuth />
      <FooterComponent/>
    </Layout>
  );
}

export default MainLayout;
